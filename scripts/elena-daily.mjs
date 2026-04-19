// Elena Marchetti's daily editorial pipeline.
//
// Runs once per day. Pulls world-news feeds, picks the single story with
// the strongest tech-industry consequence, researches it, and drafts a
// 1500-2000w opinionated column via a smart model (GitHub Models — GPT-5
// / Llama-405B — with Groq/Gemini fallbacks).
//
// Idempotent: if an Elena article already exists for today, the run exits
// without publishing a second one.

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { Type } from '@google/genai';
import dotenv from 'dotenv';

import { routeCall } from '../src/pipeline/router.mjs';
import { selectPrompt } from '../src/pipeline/prompts.mjs';
import { fetchWorldCandidates, expandStoryForEditorial } from '../src/pipeline/elena-feeds.mjs';
import { generateHeroImage } from '../src/pipeline/image-gen.mjs';
import { synthesizeSpeech, markdownToSpeechText } from '../src/pipeline/tts.mjs';
import { groundWithSpans, applyInlineCitations, citationsToMarkdown } from '../src/pipeline/grounding.mjs';
import { pingIndexNow } from '../src/pipeline/indexnow.mjs';
import { pingWebSub } from '../src/pipeline/websub.mjs';
import { sendAlert } from '../src/pipeline/alerts.mjs';
import { getAuthor } from '../src/lib/authors.mjs';

dotenv.config();

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const HERO_DIR  = path.join(process.cwd(), 'public/hero');
const AUDIO_DIR = path.join(process.cwd(), 'public/audio');
const EDITORIAL_VOICE_FILE = path.join(process.cwd(), 'docs/EDITORIAL_VOICE.md');

const ELENA_SLUG = 'elena-marchetti';
const MIN_WORDS = 1500;
const MAX_WORDS = 2100;

// --- Idempotency: is there already an Elena post dated today? ---
async function alreadyPublishedToday() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const files = await fs.readdir(POSTS_DIR);
    for (const f of files) {
      if (!f.startsWith(today)) continue;
      try {
        const body = await fs.readFile(path.join(POSTS_DIR, f), 'utf-8');
        if (body.includes(`author: "${ELENA_SLUG}"`)) return f;
      } catch { /* ignore */ }
    }
  } catch { /* dir missing */ }
  return null;
}

// --- Picker: rank world candidates → choose one + generate tech-angle brief ---
const pickSchema = {
  type: Type.OBJECT,
  properties: {
    pick_index: { type: Type.INTEGER },
    tech_angle: { type: Type.STRING },
    search_query: { type: Type.STRING },
    reason: { type: Type.STRING },
  },
  required: ['pick_index', 'tech_angle', 'search_query'],
};

async function pickStory(candidates) {
  // Cap candidate count so the picker prompt stays small.
  const short = candidates.slice(0, 60);
  const sel = selectPrompt('editorial-pick');
  const prompt = sel.render({ candidates: short });
  const res = await routeCall({
    task: 'editorial-pick',
    prompt,
    schema: pickSchema,
    timeoutMs: 60000,
    promptMeta: { id: sel.id, variant: sel.variant },
  });
  const parsed = JSON.parse(res.text);
  const idx = Number.isInteger(parsed.pick_index) ? parsed.pick_index : 0;
  const chosen = short[idx] || short[0];
  return {
    chosen,
    techAngle: parsed.tech_angle || '',
    searchQuery: parsed.search_query || chosen.title,
    reason: parsed.reason || '',
  };
}

// --- Draft the editorial ---
const editorialSchema = {
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

function buildRelatedBlock(related) {
  if (!related || related.length === 0) return '';
  return related.map((r, i) =>
    `[${i + 1}] ${r.title}\nSource: ${r.source}\n${r.body.slice(0, 2200)}`
  ).join('\n\n---\n\n');
}

// Editorial is locked to GPT-5 (router has no fallback). On transient 429s
// we wait and retry here rather than failing the day. Cooldowns written by
// the router get reset so the next attempt actually hits the model.
async function callEditorialWithRetry({ prompt, promptMeta }) {
  const HEALTH_FILE = path.join(process.cwd(), 'ops/provider-health.json');
  const clearGpt5Cooldown = async () => {
    try {
      const h = JSON.parse(await fs.readFile(HEALTH_FILE, 'utf-8'));
      const key = 'github-models:openai/gpt-5';
      if (h[key]?.cooldown_until) {
        delete h[key].cooldown_until;
        await fs.writeFile(HEALTH_FILE, JSON.stringify(h, null, 2) + '\n');
      }
    } catch { /* ignore */ }
  };

  const attempts = [60, 180, 300]; // seconds between attempts
  for (let i = 0; i <= attempts.length; i++) {
    try {
      await clearGpt5Cooldown();
      return await routeCall({
        task: 'editorial',
        prompt,
        schema: editorialSchema,
        timeoutMs: 240000,
        promptMeta,
      });
    } catch (err) {
      const msg = String(err?.message || err);
      const transient = /429|rate|timeout|5\d\d|server/i.test(msg);
      if (!transient || i === attempts.length) throw err;
      const wait = attempts[i] * 1000;
      console.log(`  GPT-5 transient failure (${msg.slice(0, 120)}); waiting ${attempts[i]}s before retry ${i + 1}/${attempts.length}`);
      await new Promise((r) => setTimeout(r, wait));
    }
  }
  throw new Error('unreachable');
}

async function draftEditorial({ chosen, techAngle, primary, related, authorVoice }) {
  const sel = selectPrompt('editorial');
  const prompt = sel.render({
    authorVoice,
    primaryTitle: chosen.title,
    primaryBody: (primary.body || chosen.snippet || '').slice(0, 4000),
    relatedBlock: buildRelatedBlock(related),
    techAngle,
  });

  const res = await callEditorialWithRetry({
    prompt,
    promptMeta: { id: sel.id, variant: sel.variant },
  });

  const parsed = JSON.parse(res.text);
  if (!parsed.title || !parsed.article_markdown || !parsed.tags) {
    throw new Error(`Editorial draft missing required fields from ${res.provider}/${res.model}`);
  }
  parsed._drafter = `${res.provider}/${res.model}`;
  return parsed;
}

// --- Word-count gate: lengthen via explicit directive, not padding ---
const countWords = (s) => (s || '').split(/\s+/).filter(Boolean).length;

async function lengthenEditorial(draft, { chosen, techAngle, primary, related, authorVoice }) {
  const wc = countWords(draft.article_markdown);
  const deficit = MIN_WORDS - wc;
  const prompt = `You are Elena Marchetti. Your draft below is ${wc} words. The hard minimum is ${MIN_WORDS}. You are short by approximately ${deficit} words.

${authorVoice}

EXPAND — do not pad. Add at least ${Math.ceil(deficit * 1.15)} words of genuinely new material. Options:
- Deepen the historical parallel section with a second specific example.
- Add a paragraph on a specific country, company, or regulator's position.
- Introduce one more concrete mechanism: a named chokepoint, a specific clause, a specific infrastructure asset.
- Steelman the counter-argument more fully.

DO NOT: repeat yourself, add filler adjectives, hedge with "some analysts say," insert bullet lists, or restate the thesis twice.

CONTEXT (for reference, do not repeat verbatim):
Primary story: ${chosen.title}
Tech angle: ${techAngle}
${related && related.length > 0 ? `Related coverage headlines: ${related.map(r => r.title).join(' | ')}` : ''}

CURRENT DRAFT (title / description / body):
Title: ${draft.title}
Description: ${draft.description}

${draft.article_markdown}

Return the SAME JSON schema: { "title", "description", "article_markdown", "tags", "visual_keyword" }. Target 1700 words. Keep the strongest paragraphs intact.`;

  const res = await callEditorialWithRetry({
    prompt,
    promptMeta: { id: 'editorial-lengthen', variant: 'v1' },
  });
  const parsed = JSON.parse(res.text);
  if (!parsed.title || !parsed.article_markdown || !parsed.tags) {
    throw new Error(`Lengthen pass from ${res.provider}/${res.model} missing fields`);
  }
  parsed._drafter = draft._drafter;
  parsed._lengthened_by = `${res.provider}/${res.model}`;
  return parsed;
}

// --- Stylometric gate — shares the tell-phrase list with the main pipeline ---
const BANNED_PHRASES = [
  'in today\'s fast-paced', 'in the ever-evolving', 'in the realm of',
  'tapestry', 'delve into', 'delving into', 'dive into',
  'navigate the complexities', 'navigating the complexities',
  'it\'s worth noting', 'stands as a testament', 'testament to',
  'landscape of', 'game-changer', 'game changer', 'at the forefront of',
  'pave the way', 'paving the way', 'cutting-edge', 'state-of-the-art',
  'revolutionize', 'revolutionizing', 'unlock the potential',
  'harness the power', 'a new era', 'crucial to', 'pivotal',
  'paradigm shift', 'holistic approach', 'seamless integration', 'synergy',
];

function scanBanned(text) {
  const lower = text.toLowerCase();
  return BANNED_PHRASES.filter((p) => lower.includes(p));
}

// --- Hero image (Flux primary, Pexels fallback) ---
async function getPexelsImage(visualKeyword) {
  if (!process.env.PEXELS_API_KEY) return null;
  const r = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(visualKeyword)}&orientation=landscape&per_page=5`,
    { headers: { Authorization: process.env.PEXELS_API_KEY }, signal: AbortSignal.timeout(10000) }
  );
  if (!r.ok) return null;
  const data = await r.json();
  if (!data.photos?.length) return null;
  const photo = data.photos[Math.floor(Math.random() * data.photos.length)];
  return { url: photo.src.landscape, creditName: photo.photographer, creditUrl: photo.photographer_url };
}

async function downloadBinary(url, destPath) {
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  if (!r.ok) throw new Error(`Download ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.writeFile(destPath, buf);
}

// --- Main ---
async function main() {
  console.log('Elena daily editorial pipeline starting...');
  const runStart = Date.now();

  const existing = await alreadyPublishedToday();
  if (existing) {
    console.log(`Elena already published today (${existing}). Exiting.`);
    return;
  }

  let EDITORIAL_VOICE = '';
  try { EDITORIAL_VOICE = (await fs.readFile(EDITORIAL_VOICE_FILE, 'utf-8')).trim(); } catch { /* optional */ }

  const elena = getAuthor(ELENA_SLUG);
  if (!elena) throw new Error('Elena author record missing');
  // Voice block: Elena's byline voice DOMINATES for her pieces (editorial is
  // stylistically different from wire desk). House voice appears as backdrop.
  const authorVoice = `${elena.voice}\n${EDITORIAL_VOICE ? `\nHouse style backdrop (secondary — byline voice wins on any conflict):\n${EDITORIAL_VOICE}` : ''}`;

  console.log('Fetching world-affairs feeds...');
  const candidates = await fetchWorldCandidates();
  console.log(`  ${candidates.length} candidate stories.`);
  if (candidates.length === 0) throw new Error('No world-affairs candidates fetched — all feeds failed');

  console.log('Picking story...');
  const { chosen, techAngle, searchQuery, reason } = await pickStory(candidates);
  console.log(`  picked: "${chosen.title}"`);
  console.log(`  source: ${chosen.source}`);
  console.log(`  why: ${reason.slice(0, 160)}`);
  console.log(`  tech angle: ${techAngle.slice(0, 200)}`);

  console.log('Expanding story + related coverage...');
  const { primary, related } = await expandStoryForEditorial(chosen.link, searchQuery, { maxRelated: 6 });
  console.log(`  primary body: ${primary.body.length} chars`);
  console.log(`  related pieces: ${related.length}`);

  console.log('Drafting editorial (smart model)...');
  let article = await draftEditorial({ chosen, techAngle, primary, related, authorVoice });
  console.log(`  drafter: ${article._drafter}`);
  let wc = countWords(article.article_markdown);
  console.log(`  draft word count: ${wc}`);

  // Up to 2 lengthen passes if we come in short.
  let attempts = 0;
  while (wc < MIN_WORDS && attempts < 2) {
    attempts++;
    console.log(`  word-count gate: ${wc} < ${MIN_WORDS}, lengthen pass ${attempts}/2`);
    try {
      article = await lengthenEditorial(article, { chosen, techAngle, primary, related, authorVoice });
      wc = countWords(article.article_markdown);
      console.log(`  post-lengthen word count: ${wc}`);
    } catch (e) {
      console.log(`  lengthen pass failed: ${e.message.slice(0, 160)}`);
      break;
    }
  }
  if (wc < MIN_WORDS) {
    throw new Error(`Editorial below hard minimum after lengthen: ${wc} < ${MIN_WORDS}`);
  }

  // Stylometric gate — one revise pass if tell-phrases slipped through.
  const hits = scanBanned(article.article_markdown + ' ' + article.title);
  if (hits.length > 0) {
    console.log(`  stylometric gate: ${hits.length} banned phrase(s): ${hits.slice(0, 4).join(', ')}`);
    try {
      article = await lengthenEditorial(article, { chosen, techAngle, primary, related, authorVoice });
    } catch (e) {
      console.log(`  stylometric revise failed (keeping draft): ${e.message.slice(0, 120)}`);
    }
  }

  // Cap long drafts — the model occasionally overshoots hard.
  wc = countWords(article.article_markdown);
  if (wc > MAX_WORDS) {
    console.log(`  draft is ${wc} words; over cap ${MAX_WORDS} — publishing as-is (no trim, could cut an argument)`);
  }

  // Grounding — inline citations. Fail-open.
  try {
    const { citations, supports } = await groundWithSpans({ title: article.title, body: article.article_markdown });
    if (citations.length > 0 && supports.length > 0) {
      article.article_markdown = applyInlineCitations(article.article_markdown, supports, citations);
      console.log(`  🔗 grounded: ${supports.length} claim(s), ${citations.length} source(s)`);
    } else if (citations.length > 0) {
      article.article_markdown += citationsToMarkdown(citations);
      console.log(`  🔗 grounded (flat): ${citations.length} source(s)`);
    }
  } catch (e) {
    console.log(`  ⚠ grounding skipped: ${e.message.slice(0, 120)}`);
  }

  // Slug + paths
  const dateStr = new Date().toISOString();
  const datePrefix = dateStr.split('T')[0];
  const slug = article.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const hash = crypto.createHash('md5').update(article.title + dateStr).digest('hex').slice(0, 6);
  const baseSlug = `${datePrefix}-${slug}-${hash}`;
  const filename = `${baseSlug}.md`;

  // Hero image
  let heroPath = '';
  let creditName = '';
  let creditUrl = '';
  await fs.mkdir(HERO_DIR, { recursive: true });
  if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
    try {
      console.log(`  Generating hero via Flux: "${article.visual_keyword}"`);
      const img = await generateHeroImage(article.visual_keyword, article.title);
      const localPath = path.join(HERO_DIR, `${baseSlug}.png`);
      await fs.writeFile(localPath, img);
      heroPath = `/hero/${baseSlug}.png`;
      creditName = 'System Report (Flux Schnell)';
      creditUrl = 'https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/';
    } catch (e) {
      console.log(`  ⚠ Flux failed: ${e.message.slice(0, 120)}`);
    }
  }
  if (!heroPath) {
    const pex = await getPexelsImage(article.visual_keyword);
    if (pex) {
      try {
        const localPath = path.join(HERO_DIR, `${baseSlug}.jpg`);
        await downloadBinary(pex.url, localPath);
        heroPath = `/hero/${baseSlug}.jpg`;
      } catch {
        heroPath = pex.url;
      }
      creditName = pex.creditName;
      creditUrl = pex.creditUrl;
    }
  }

  // Audio narration (best-effort)
  let audioPath = '';
  let audioBytes = 0;
  try {
    const speech = markdownToSpeechText(article.title, article.description, article.article_markdown);
    const wav = await synthesizeSpeech(speech);
    await fs.mkdir(AUDIO_DIR, { recursive: true });
    const audioFile = path.join(AUDIO_DIR, `${baseSlug}.wav`);
    await fs.writeFile(audioFile, wav);
    audioPath = `/audio/${baseSlug}.wav`;
    audioBytes = wav.length;
    console.log(`  🔊 narration: ${(wav.length / 1024).toFixed(0)} KB`);
  } catch (e) {
    console.log(`  ⚠ TTS skipped: ${e.message.slice(0, 120)}`);
  }

  const fm = `---
title: "${article.title.replace(/"/g, '\\"')}"
date: ${dateStr}
tags: ${JSON.stringify(article.tags)}
hero_image: "${heroPath}"
hero_image_credit_name: "${(creditName || '').replace(/"/g, '\\"')}"
hero_image_credit_url: "${creditUrl || ''}"
visual_keyword: "${article.visual_keyword.replace(/"/g, '\\"')}"
description: "${article.description.replace(/"/g, '\\"')}"
sources_count: ${1 + related.length}
author: "${ELENA_SLUG}"${audioPath ? `
audio_path: "${audioPath}"
audio_bytes: ${audioBytes}` : ''}
---

`;
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.writeFile(path.join(POSTS_DIR, filename), fm + article.article_markdown, 'utf-8');
  console.log(`  ✓ Saved: ${filename} (${countWords(article.article_markdown)} words)`);

  // Pings
  try {
    const url = `https://www.systemreport.net/posts/${baseSlug}`;
    const r = await pingIndexNow([url]);
    console.log(`  IndexNow: ${r.ok ? 'ok' : r.error || r.status}`);
    const ws = await pingWebSub();
    console.log(`  WebSub: ${ws.filter(x => x.ok).length}/${ws.length}`);
  } catch (e) {
    console.log(`  ping skipped: ${e.message.slice(0, 120)}`);
  }

  const dur = Math.round((Date.now() - runStart) / 1000);
  console.log(`\nElena editorial published in ${dur}s.`);
  await sendAlert({
    title: `Elena editorial: ${article.title}`,
    level: 'info',
    lines: [`${countWords(article.article_markdown)} words`, `Drafter: ${article._drafter}`, `Duration: ${dur}s`],
  }).catch(() => {});
}

main().catch(async (err) => {
  console.error('Elena pipeline failed:', err);
  try {
    await sendAlert({
      title: 'Elena editorial failed',
      level: 'error',
      lines: [String(err.message || err).slice(0, 400)],
    });
  } catch { /* ignore */ }
  process.exit(1);
});
