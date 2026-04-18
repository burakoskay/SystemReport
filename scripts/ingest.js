import fs from 'fs/promises';
import path from 'path';
import Parser from 'rss-parser';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { routeCall } from '../src/pipeline/router.mjs';
import { sendAlert } from '../src/pipeline/alerts.mjs';
import { collapseNearDuplicates } from '../src/pipeline/dedup.mjs';
import { synthesizeSpeech, markdownToSpeechText } from '../src/pipeline/tts.mjs';
import { generateHeroImage } from '../src/pipeline/image-gen.mjs';

dotenv.config();

const FEEDS = [
  'https://www.wired.com/feed/rss',
  'https://techcrunch.com/feed/',
  'https://www.theverge.com/rss/index.xml',
  'https://feeds.arstechnica.com/arstechnica/index',
  'https://hnrss.org/newest?points=100',
  'https://www.engadget.com/rss.xml',
  'https://9to5google.com/feed/',
  'https://9to5mac.com/feed/',
];

const PROCESSED_URLS_FILE = path.join(process.cwd(), 'processed_urls.json');
const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const AUDIO_DIR = path.join(process.cwd(), 'public/audio');
const EDITORIAL_VOICE_FILE = path.join(process.cwd(), 'docs/EDITORIAL_VOICE.md');

// Loaded once at startup; injected into draft/revise prompts.
let EDITORIAL_VOICE = '';
try {
  EDITORIAL_VOICE = (await fs.readFile(EDITORIAL_VOICE_FILE, 'utf-8')).trim();
} catch {
  EDITORIAL_VOICE = '';
}

// Setup DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// LLM calls go through src/pipeline/router.mjs — provider-agnostic with failover.

// --- Retry helper with exponential backoff (respects 429 Retry-After) ---
async function withRetry(fn, retries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) throw error;
      const is429 = error.message?.includes('429');
      const delay = is429 ? 15000 : baseDelay * Math.pow(2, attempt - 1);
      console.log(`  Retry ${attempt}/${retries} after ${delay}ms: ${error.message}`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// --- State management (local JSON only) ---
async function loadProcessedUrls() {
  try {
    const data = await fs.readFile(PROCESSED_URLS_FILE, 'utf-8');
    return new Set(JSON.parse(data));
  } catch (e) {
    return new Set();
  }
}

const MAX_TRACKED_URLS = 10000;

async function saveProcessedUrls(urlsSet) {
  let urls = Array.from(urlsSet);
  // Trim oldest entries to prevent unbounded file growth
  if (urls.length > MAX_TRACKED_URLS) {
    urls = urls.slice(urls.length - MAX_TRACKED_URLS);
  }
  const jsonContent = JSON.stringify(urls, null, 2);
  await fs.writeFile(PROCESSED_URLS_FILE, jsonContent, 'utf-8');
}

// --- Feed ingestion ---
async function fetchAndSanitizeFeeds(processedUrls) {
  const parser = new Parser();
  const articles = [];

  for (const feedUrl of FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      for (const item of feed.items.slice(0, 15)) {
        if (processedUrls.has(item.link)) continue;

        const rawContent = item.contentSnippet || item.content || item.summary || '';
        const sanitizedContent = purify.sanitize(rawContent, { ALLOWED_TAGS: [] }).trim();

        if (sanitizedContent) {
          articles.push({
            title: item.title,
            link: item.link,
            content: sanitizedContent,
            source: feed.title,
          });
        }
      }
    } catch (err) {
      console.error(`Error fetching feed ${feedUrl}:`, err.message);
    }
  }

  return articles;
}

// --- Semantic clustering ---
// Chunk articles into batches that fit the provider's TPM window. Clusters are
// merged naively by index (articles in different chunks won't dedupe across
// chunks — acceptable because feed-burst duplicates usually arrive in the
// same poll anyway). 30 articles × ~200 chars ≈ 6K chars ≈ 1.5K tokens, well
// under the smallest TPM limit (6K) and comfortable for scout-17b's 30K TPM.
const CLUSTER_CHUNK_SIZE = 30;
const CLUSTER_SUMMARY_CHARS = 200;

const clusterSchema = {
  type: Type.OBJECT,
  properties: {
    clusters: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          theme: { type: Type.STRING },
          article_indices: { type: Type.ARRAY, items: { type: Type.INTEGER } },
        },
        required: ['theme', 'article_indices'],
      },
    },
  },
  required: ['clusters'],
};

async function clusterChunk(chunk) {
  const prompt = `Analyze the following batch of tech news articles. Group duplicate or highly similar stories about the exact same event into semantic clusters.
Return a JSON object with a "clusters" array. Each cluster must have:
- "theme": A short description of the cluster.
- "article_indices": An array of the integer indices of the articles belonging to this cluster.

Every article must appear in exactly one cluster. A cluster of size 1 is valid.

Example shape: {"clusters":[{"theme":"...","article_indices":[0,3]}]}

Articles:
${chunk.map((a, i) => `[${i}] Title: ${a.title}\nSummary: ${a.content.substring(0, CLUSTER_SUMMARY_CHARS)}\n`).join('\n')}`;

  const response = await withRetry(() =>
    routeCall({ task: 'cluster', prompt, schema: clusterSchema })
  );

  try {
    const parsed = JSON.parse(response.text);
    const clustersInfo = Array.isArray(parsed) ? parsed : (parsed.clusters || []);
    return clustersInfo
      .map((c) => ({
        theme: c.theme,
        articles: c.article_indices.map((i) => chunk[i]).filter(Boolean),
      }))
      .filter((c) => c.articles.length > 0);
  } catch (e) {
    console.error('Error parsing clustering response:', e);
    return [];
  }
}

async function clusterArticles(articles) {
  if (articles.length === 0) return [];

  const chunks = [];
  for (let i = 0; i < articles.length; i += CLUSTER_CHUNK_SIZE) {
    chunks.push(articles.slice(i, i + CLUSTER_CHUNK_SIZE));
  }
  console.log(`  Clustering ${articles.length} articles in ${chunks.length} chunk(s) of up to ${CLUSTER_CHUNK_SIZE}...`);

  const all = [];
  for (let i = 0; i < chunks.length; i++) {
    try {
      const clusters = await clusterChunk(chunks[i]);
      all.push(...clusters);
    } catch (e) {
      console.error(`  Chunk ${i + 1}/${chunks.length} failed: ${e.message}`);
    }
  }
  return all;
}

// --- Stylometric filter: LLM tell-phrases we refuse to ship ---
// Sourced from published analyses of GPT/Claude/Llama output + manual audit of prior drafts.
const BANNED_PHRASES = [
  'in today\'s fast-paced',
  'in the ever-evolving',
  'in the realm of',
  'tapestry',
  'delve into',
  'delving into',
  'dive into',
  'navigate the complexities',
  'navigating the complexities',
  'it\'s worth noting',
  'stands as a testament',
  'testament to',
  'landscape of',
  'game-changer',
  'game changer',
  'at the forefront of',
  'pave the way',
  'paving the way',
  'cutting-edge',
  'state-of-the-art',
  'revolutionize',
  'revolutionizing',
  'unlock the potential',
  'harness the power',
  'a new era',
  'the future of',  // allow only when NOT at sentence start
  'crucial to',
  'pivotal',
  'paradigm shift',
  'holistic approach',
  'seamless integration',
  'synergy',
];

function scanBannedPhrases(markdown) {
  const lower = markdown.toLowerCase();
  const hits = [];
  for (const phrase of BANNED_PHRASES) {
    if (lower.includes(phrase)) hits.push(phrase);
  }
  return hits;
}

const synthesisSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    description: { type: Type.STRING },
    article_markdown: { type: Type.STRING },
    tags: { type: Type.ARRAY, items: { type: Type.STRING } },
    visual_keyword: { type: Type.STRING },
  },
  required: ['title', 'description', 'article_markdown', 'tags', 'visual_keyword'],
};

// --- Draft (single pass) ---
async function draftArticle(cluster, taskClass = 'draft') {
  const sourceTexts = cluster.articles
    .map((a) => `Title: ${a.title}\nSource: ${a.source}\nContent: ${a.content}`)
    .join('\n\n---\n\n');

  const voiceBlock = EDITORIAL_VOICE
    ? `EDITORIAL VOICE GUIDE (follow exactly):\n${EDITORIAL_VOICE}\n\n---\n\n`
    : '';

  const prompt = `${voiceBlock}You are writing for System Report, per the voice guide above.
Synthesize a 400-word original article in Markdown based on the source texts below. No plagiarism.

You must output a JSON object containing:
- "title": A catchy, professional headline (no colons unless absolutely needed).
- "description": A compelling 1-2 sentence summary suitable for SEO meta descriptions and article previews (max 160 characters).
- "article_markdown": The full markdown body of the article (without main # title, just the content).
- "tags": An array of 3-5 relevant lowercase string tags.
- "visual_keyword": A single, highly descriptive keyword or short phrase suitable for an image generation prompt.

Source Texts:
${sourceTexts}`;

  const response = await withRetry(() =>
    routeCall({ task: taskClass, prompt, schema: synthesisSchema })
  );

  let result;
  try {
    result = JSON.parse(response.text);
  } catch (e) {
    throw new Error(`Draft returned invalid JSON from ${response.provider}: ${e.message}`);
  }
  if (!result.title || !result.article_markdown || !result.tags) {
    throw new Error(`Draft from ${response.provider} missing required fields`);
  }
  result._drafter = `${response.provider}/${response.model}`;
  return result;
}

// Judge two drafts. Returns 'A' | 'B'. On any failure, returns 'A' (no harm).
const judgeSchema = {
  type: Type.OBJECT,
  properties: {
    winner: { type: Type.STRING, enum: ['A', 'B'] },
    reason: { type: Type.STRING },
  },
  required: ['winner'],
};

async function judgeDrafts(draftA, draftB) {
  const prompt = `You are a tough senior editor picking the better of two drafts of the same story.
Criteria, in order: (1) sourcing — claims grounded in reality, no hallucinated specifics; (2) hook — first sentence earns the read; (3) voice — concrete, declarative, no marketing verbs or consultant nouns; (4) structure — tight, no filler; (5) headline quality.

Return a JSON object: { "winner": "A" | "B", "reason": "<one sentence>" }.

DRAFT A (by ${draftA._drafter}):
Title: ${draftA.title}
${draftA.article_markdown}

---

DRAFT B (by ${draftB._drafter}):
Title: ${draftB.title}
${draftB.article_markdown}`;

  try {
    const res = await routeCall({ task: 'judge', prompt, schema: judgeSchema });
    const parsed = JSON.parse(res.text);
    if (parsed.winner === 'B') {
      console.log(`    🏆 Judge picked B (${draftB._drafter}) over A (${draftA._drafter})${parsed.reason ? `: ${String(parsed.reason).slice(0, 120)}` : ''}`);
      return 'B';
    }
    console.log(`    🏆 Judge picked A (${draftA._drafter}) over B (${draftB._drafter})${parsed.reason ? `: ${String(parsed.reason).slice(0, 120)}` : ''}`);
    return 'A';
  } catch (e) {
    console.log(`    ⚠ judge failed, defaulting to A: ${e.message.slice(0, 120)}`);
    return 'A';
  }
}

// --- Critique (different model family) ---
async function critiqueDraft(draft, cluster) {
  const sourceTexts = cluster.articles
    .map((a) => `Title: ${a.title}\nContent: ${a.content.substring(0, 400)}`)
    .join('\n\n---\n\n');

  const prompt = `You are a ruthless editor reviewing a junior writer's draft.
Compare the DRAFT against the SOURCE MATERIAL. Return a JSON object with:
- "factual_issues": array of strings. Claims in the draft NOT supported by sources, or outright contradictions. Empty array if none.
- "style_issues": array of strings. LLM tell-phrases, purple prose, clichés, weak openings, filler sentences.
- "missing_angles": array of strings. Important facts or angles in the sources the draft omitted.
- "verdict": "ship" | "revise" | "reject". "ship" = publish as-is. "revise" = fixable issues. "reject" = factually compromised, regenerate from scratch.

Be concise. One sentence per issue. No pleasantries.

DRAFT TITLE: ${draft.title}
DRAFT DESCRIPTION: ${draft.description}
DRAFT BODY:
${draft.article_markdown}

---
SOURCE MATERIAL:
${sourceTexts}`;

  const critiqueSchema = {
    type: Type.OBJECT,
    properties: {
      factual_issues: { type: Type.ARRAY, items: { type: Type.STRING } },
      style_issues:   { type: Type.ARRAY, items: { type: Type.STRING } },
      missing_angles: { type: Type.ARRAY, items: { type: Type.STRING } },
      verdict:        { type: Type.STRING },
    },
    required: ['factual_issues', 'style_issues', 'missing_angles', 'verdict'],
  };

  try {
    const res = await routeCall({ task: 'critique', prompt, schema: critiqueSchema });
    const parsed = JSON.parse(res.text);
    // Defensive: Groq JSON mode doesn't enforce schemas — fields can be missing or misnamed.
    parsed.factual_issues = Array.isArray(parsed.factual_issues) ? parsed.factual_issues : [];
    parsed.style_issues   = Array.isArray(parsed.style_issues)   ? parsed.style_issues   : [];
    parsed.missing_angles = Array.isArray(parsed.missing_angles) ? parsed.missing_angles : [];
    parsed.verdict        = typeof parsed.verdict === 'string' ? parsed.verdict : 'revise';
    parsed._critic = `${res.provider}/${res.model}`;
    return parsed;
  } catch (e) {
    // Fail-open: ship original draft rather than blocking on critic outage.
    // Log prominently so we can tell from the run log that critique was skipped.
    console.log(`    ⚠ critique skipped (failing open to ship): ${e.message.slice(0, 160)}`);
    return { factual_issues: [], style_issues: [], missing_angles: [], verdict: 'ship', _critic: 'none' };
  }
}

// --- Revise (based on critique) ---
async function reviseDraft(draft, critique, cluster) {
  const issues = [
    ...critique.factual_issues.map(s => `FACT: ${s}`),
    ...critique.style_issues.map(s => `STYLE: ${s}`),
    ...critique.missing_angles.map(s => `MISSING: ${s}`),
  ];
  if (issues.length === 0) return draft;

  const sourceTexts = cluster.articles
    .map((a) => `Title: ${a.title}\nContent: ${a.content.substring(0, 400)}`)
    .join('\n\n---\n\n');

  const voiceBlock = EDITORIAL_VOICE
    ? `EDITORIAL VOICE GUIDE (follow exactly):\n${EDITORIAL_VOICE}\n\n---\n\n`
    : '';

  const prompt = `${voiceBlock}Revise the draft below to fix every issue the editor flagged. Keep the same structure and approximate length (400 words). Adhere to the voice guide.

Return a JSON object with the SAME schema as the original draft: title, description (≤160 chars), article_markdown, tags (3-5), visual_keyword.

ISSUES TO FIX:
${issues.map(s => `- ${s}`).join('\n')}

ORIGINAL DRAFT:
Title: ${draft.title}
Description: ${draft.description}
Body:
${draft.article_markdown}

SOURCE MATERIAL (for fact-fixing):
${sourceTexts}`;

  try {
    const res = await routeCall({ task: 'draft', prompt, schema: synthesisSchema });
    const parsed = JSON.parse(res.text);
    if (!parsed.title || !parsed.article_markdown || !parsed.tags) {
      console.log(`    revision missing fields, keeping original draft`);
      return draft;
    }
    parsed._drafter = draft._drafter;
    parsed._revisor = `${res.provider}/${res.model}`;
    return parsed;
  } catch (e) {
    console.log(`    revision failed, keeping original draft: ${e.message.slice(0, 120)}`);
    return draft;
  }
}

// Multi-draft threshold: only stories backed by this many+ sources get the A+B+judge
// treatment. Cheaper stories stick with the single-draft path to conserve TPM budget.
const MULTI_DRAFT_MIN_SOURCES = 3;

// --- Full synthesize pipeline: draft (optional A+B+judge) → critique → revise → stylometric gate ---
async function synthesizeArticle(cluster) {
  // 1. Draft — parallel A+B+judge when the story is well-sourced; single draft otherwise.
  let article;
  if (cluster.articles.length >= MULTI_DRAFT_MIN_SOURCES) {
    console.log(`    multi-draft: ${cluster.articles.length} sources ≥ ${MULTI_DRAFT_MIN_SOURCES}`);
    const [aRes, bRes] = await Promise.allSettled([
      draftArticle(cluster, 'draft'),
      draftArticle(cluster, 'draft-b'),
    ]);
    const a = aRes.status === 'fulfilled' ? aRes.value : null;
    const b = bRes.status === 'fulfilled' ? bRes.value : null;
    if (a && b) {
      const winner = await judgeDrafts(a, b);
      article = winner === 'B' ? b : a;
      article._judge_loser = winner === 'B' ? a._drafter : b._drafter;
    } else {
      article = a || b;
      if (!article) throw new Error(`Both drafts failed: A=${aRes.reason?.message || 'ok'} B=${bRes.reason?.message || 'ok'}`);
      console.log(`    only one draft succeeded (${article._drafter}); skipping judge`);
    }
  } else {
    article = await draftArticle(cluster);
  }

  // 2. Critique (different family than drafter — gives fresh eyes)
  const critique = await critiqueDraft(article, cluster);
  const issueCount = critique.factual_issues.length + critique.style_issues.length + critique.missing_angles.length;
  console.log(`    critique=${critique._critic} verdict=${critique.verdict} issues=${issueCount}`);

  if (critique.verdict === 'reject') {
    throw new Error(`Critic rejected draft as factually compromised. style=${critique.style_issues.length} fact=${critique.factual_issues.length}`);
  }

  // 3. Revise if critique flagged anything
  if (critique.verdict === 'revise' || issueCount > 0) {
    article = await reviseDraft(article, critique, cluster);
  }

  // 4. Stylometric gate — if banned phrases slipped through, one more revision attempt
  const hits = scanBannedPhrases(article.article_markdown + ' ' + article.title);
  if (hits.length > 0) {
    console.log(`    stylometric gate: ${hits.length} banned phrase(s): ${hits.slice(0, 3).join(', ')}`);
    article = await reviseDraft(
      article,
      { factual_issues: [], missing_angles: [], style_issues: hits.map(h => `Remove banned phrase: "${h}"`), verdict: 'revise' },
      cluster
    );
  }

  return article;
}

// --- Image fetching (Pexels) + self-hosting ---
// We download the image binary to public/hero/<slug>.jpg so the final page
// serves only first-party URLs. Rationale: Pexels' CDN sets third-party
// tracking cookies which drops Lighthouse Best Practices from 100 to 77.
// Self-hosting also improves LCP (no extra DNS/TLS round trip) and
// insulates us from upstream URL churn.
const HERO_DIR = path.join(process.cwd(), 'public/hero');

async function getImageData(visualKeyword) {
  const res = await withRetry(async () => {
    const r = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(visualKeyword)}&orientation=landscape&per_page=5`,
      {
        headers: { Authorization: process.env.PEXELS_API_KEY },
        signal: AbortSignal.timeout(10000),
      }
    );
    if (r.status === 429) throw new Error('Pexels 429 rate limit');
    if (!r.ok) throw new Error(`Pexels API error: ${r.status}`);
    return r;
  });

  const data = await res.json();
  if (!data.photos?.length) throw new Error(`No Pexels results for: ${visualKeyword}`);

  // Pick randomly from top results for variety
  const photo = data.photos[Math.floor(Math.random() * data.photos.length)];
  return {
    url: photo.src.landscape,
    creditName: photo.photographer,
    creditUrl: photo.photographer_url,
  };
}

async function downloadHero(remoteUrl, slug) {
  await fs.mkdir(HERO_DIR, { recursive: true });
  const localPath = path.join(HERO_DIR, `${slug}.jpg`);
  const webPath = `/hero/${slug}.jpg`;

  const r = await fetch(remoteUrl, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`Hero download ${r.status} for ${remoteUrl}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(localPath, buf);
  return webPath;
}

// --- Main pipeline ---
async function main() {
  console.log('Starting ETL pipeline...');
  const runStart = Date.now();
  let publishedCount = 0;
  let failedClusters = 0;
  const processedUrls = await loadProcessedUrls();
  console.log(`Loaded ${processedUrls.size} previously processed URLs.`);

  console.log('Fetching and sanitizing feeds...');
  const rawArticles = await fetchAndSanitizeFeeds(processedUrls);
  console.log(`Found ${rawArticles.length} new articles.`);

  if (rawArticles.length === 0) {
    console.log('No new articles. Exiting.');
    return;
  }

  // SimHash dedup — collapse near-identical feed entries before paying LLM tokens.
  const { kept: newArticles, collapsed, groups } = collapseNearDuplicates(rawArticles);
  if (collapsed > 0) {
    console.log(`Dedup: collapsed ${collapsed} near-duplicates (${rawArticles.length} → ${newArticles.length}).`);
    // Mark collapsed URLs as processed so we don't re-evaluate them next run.
    for (const group of groups) {
      for (let i = 1; i < group.length; i++) processedUrls.add(group[i].link);
    }
  }

  console.log('Clustering articles...');
  let clusters;
  try {
    clusters = await clusterArticles(newArticles);
  } catch (err) {
    console.error(`⛔ Clustering failed — API may be down or quota exhausted: ${err.message}`);
    console.error('Aborting run. No API calls wasted on synthesis.');
    await sendAlert({
      title: 'Pipeline aborted: clustering failed',
      level: 'error',
      lines: [`${err.message.slice(0, 400)}`, `Queued articles: ${newArticles.length}`],
    });
    return;
  }
  console.log(`Identified ${clusters.length} clusters.`);

  // Cap per-run output to avoid runaway API costs and rate limits
  const MAX_CLUSTERS_PER_RUN = 25;
  const clustersToProcess = clusters.slice(0, MAX_CLUSTERS_PER_RUN);
  if (clusters.length > MAX_CLUSTERS_PER_RUN) {
    console.log(`  Capped to ${MAX_CLUSTERS_PER_RUN} clusters this run.`);
  }

  await fs.mkdir(POSTS_DIR, { recursive: true });

  // Circuit breaker: abort early if too many consecutive failures
  const MAX_CONSECUTIVE_FAILURES = 3;
  let consecutiveFailures = 0;

  for (const cluster of clustersToProcess) {
    try {
      console.log(`\nProcessing cluster: "${cluster.theme}" (${cluster.articles.length} sources)`);

      console.log('  Synthesizing article...');
      const synthesis = await synthesizeArticle(cluster);

      // Prefer a generated hero (CF Flux Schnell) when creds are set; Pexels is fallback.
      let image = null;
      let generatedHero = null;
      if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
        try {
          console.log(`  Generating hero via Flux Schnell: "${synthesis.visual_keyword}"`);
          generatedHero = await generateHeroImage(synthesis.visual_keyword, synthesis.title);
        } catch (e) {
          console.log(`  ⚠ Flux gen failed, falling back to Pexels: ${e.message}`);
        }
      }
      if (!generatedHero) {
        console.log(`  Fetching Pexels image for: "${synthesis.visual_keyword}"`);
        image = await getImageData(synthesis.visual_keyword);
      } else {
        image = { url: '', creditName: 'System Report (Flux Schnell)', creditUrl: 'https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/' };
      }

      const dateStr = new Date().toISOString();
      const slug = synthesis.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const datePrefix = dateStr.split('T')[0];

      // Hash suffix to prevent slug collisions
      const hash = crypto
        .createHash('md5')
        .update(synthesis.title + dateStr)
        .digest('hex')
        .slice(0, 6);
      const baseSlug = `${datePrefix}-${slug}-${hash}`;
      const filename = `${baseSlug}.md`;

      // Self-host the hero. Generated images are written directly;
      // Pexels images are downloaded. Fall back to remote URL on failure.
      let heroPath;
      if (generatedHero) {
        try {
          await fs.mkdir(HERO_DIR, { recursive: true });
          const localPath = path.join(HERO_DIR, `${baseSlug}.png`);
          await fs.writeFile(localPath, generatedHero);
          heroPath = `/hero/${baseSlug}.png`;
        } catch (e) {
          console.log(`  ⚠ generated hero write failed, falling back to Pexels: ${e.message}`);
          image = await getImageData(synthesis.visual_keyword);
          try { heroPath = await downloadHero(image.url, baseSlug); } catch { heroPath = image.url; }
        }
      } else {
        try {
          heroPath = await downloadHero(image.url, baseSlug);
        } catch (e) {
          console.log(`  ⚠ hero download failed, using remote URL: ${e.message}`);
          heroPath = image.url;
        }
      }

      // Generate narration (best-effort; never blocks publishing).
      let audioPath = '';
      let audioBytes = 0;
      try {
        const speechText = markdownToSpeechText(synthesis.title, synthesis.description, synthesis.article_markdown);
        const wav = await synthesizeSpeech(speechText);
        await fs.mkdir(AUDIO_DIR, { recursive: true });
        const audioFile = path.join(AUDIO_DIR, `${baseSlug}.wav`);
        await fs.writeFile(audioFile, wav);
        audioPath = `/audio/${baseSlug}.wav`;
        audioBytes = wav.length;
        console.log(`  🔊 Narration saved: ${audioPath} (${(wav.length / 1024).toFixed(0)} KB)`);
      } catch (e) {
        console.log(`  ⚠ TTS skipped: ${e.message}`);
      }

      const frontmatter = `---
title: "${synthesis.title.replace(/"/g, '\\"')}"
date: ${dateStr}
tags: ${JSON.stringify(synthesis.tags)}
hero_image: "${heroPath}"
hero_image_credit_name: "${image.creditName.replace(/"/g, '\\"')}"
hero_image_credit_url: "${image.creditUrl}"
visual_keyword: "${synthesis.visual_keyword.replace(/"/g, '\\"')}"
description: "${synthesis.description.replace(/"/g, '\\"')}"
sources_count: ${cluster.articles.length}${audioPath ? `
audio_path: "${audioPath}"
audio_bytes: ${audioBytes}` : ''}
---

`;

      const fileContent = frontmatter + synthesis.article_markdown;
      await fs.writeFile(path.join(POSTS_DIR, filename), fileContent, 'utf-8');

      // Mark cluster sources as processed
      cluster.articles.forEach((a) => processedUrls.add(a.link));
      consecutiveFailures = 0;
      publishedCount++;

      console.log(`  ✓ Saved: ${filename}`);
    } catch (err) {
      consecutiveFailures++;
      failedClusters++;
      console.error(`  ✗ Failed cluster "${cluster.theme}":`, err.message);

      if (consecutiveFailures >= MAX_CONSECUTIVE_FAILURES) {
        console.error(`\n⛔ Circuit breaker tripped: ${MAX_CONSECUTIVE_FAILURES} consecutive failures. Aborting run to prevent wasted API calls.`);
        await sendAlert({
          title: 'Circuit breaker tripped',
          level: 'error',
          lines: [
            `${MAX_CONSECUTIVE_FAILURES} consecutive cluster failures.`,
            `Last error: ${String(err.message).slice(0, 300)}`,
            `Published before trip: ${publishedCount}/${clustersToProcess.length}`,
          ],
        });
        break;
      }
    }
  }

  await saveProcessedUrls(processedUrls);
  const durationSec = Math.round((Date.now() - runStart) / 1000);
  console.log(`\nPipeline finished. ${processedUrls.size} total URLs tracked.`);

  // Only alert on notable outcomes: all-failed, partial failure, or success with volume.
  if (publishedCount === 0 && failedClusters > 0) {
    await sendAlert({
      title: 'Run published 0 articles',
      level: 'error',
      lines: [`${failedClusters} clusters failed`, `Duration: ${durationSec}s`],
    });
  } else if (failedClusters > 0) {
    await sendAlert({
      title: `Run: ${publishedCount} published, ${failedClusters} failed`,
      level: 'warn',
      lines: [`Duration: ${durationSec}s`, `Queued: ${newArticles.length}`],
    });
  } else if (publishedCount >= 5) {
    await sendAlert({
      title: `Run: ${publishedCount} articles published`,
      level: 'info',
      lines: [`Duration: ${durationSec}s`, `Queued: ${newArticles.length}`],
    });
  }
}

main().catch(console.error);