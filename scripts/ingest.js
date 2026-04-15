import fs from 'fs/promises';
import path from 'path';
import Parser from 'rss-parser';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import crypto from 'crypto';

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

// Setup DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Setup Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const MODEL = 'gemini-2.5-flash';

// --- Retry helper with exponential backoff ---
async function withRetry(fn, retries = 3, baseDelay = 1000) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) throw error;
      const delay = baseDelay * Math.pow(2, attempt - 1);
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

async function saveProcessedUrls(urlsSet) {
  const jsonContent = JSON.stringify(Array.from(urlsSet), null, 2);
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
async function clusterArticles(articles) {
  if (articles.length === 0) return [];

  const prompt = `Analyze the following batch of tech news articles. Group duplicate or highly similar stories about the exact same event into semantic clusters. 
Return a JSON array of clusters. Each cluster must have:
- "theme": A short description of the cluster.
- "article_indices": An array of the integer indices of the articles belonging to this cluster.

Articles:
${articles.map((a, i) => `[${i}] Title: ${a.title}\nSummary: ${a.content.substring(0, 300)}...\n`).join('\n')}`;

  const response = await withRetry(() =>
    ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
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
    })
  );

  try {
    const clustersInfo = JSON.parse(response.text);
    return clustersInfo
      .map((c) => ({
        theme: c.theme,
        articles: c.article_indices.map((i) => articles[i]).filter(Boolean),
      }))
      .filter((c) => c.articles.length > 0);
  } catch (e) {
    console.error('Error parsing clustering response:', e);
    return [];
  }
}

// --- Content synthesis ---
async function synthesizeArticle(cluster) {
  const sourceTexts = cluster.articles
    .map((a) => `Title: ${a.title}\nSource: ${a.source}\nContent: ${a.content}`)
    .join('\n\n---\n\n');

  const prompt = `You are a Senior Editor for a top-tier tech publication (like Wired or Hacker News).
Synthesize a comprehensive, 400-word original article in Markdown format based on the following source texts.
Do not plagiarize; write an original, cohesive, and highly engaging journalistic piece. 

You must output a JSON object containing:
- "title": A catchy, professional headline.
- "description": A compelling 1-2 sentence summary suitable for SEO meta descriptions and article previews (max 160 characters).
- "article_markdown": The full markdown body of the article (without main # title, just the content).
- "tags": An array of 3-5 relevant lowercase string tags.
- "visual_keyword": A single, highly descriptive keyword or short phrase suitable for an image generation prompt.

Source Texts:
${sourceTexts}`;

  const response = await withRetry(() =>
    ai.models.generateContent({
      model: MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            article_markdown: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            visual_keyword: { type: Type.STRING },
          },
          required: ['title', 'description', 'article_markdown', 'tags', 'visual_keyword'],
        },
      },
    })
  );

  return JSON.parse(response.text);
}

// --- Image fetching (Pexels) ---
async function getImageData(visualKeyword) {
  const res = await withRetry(() =>
    fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(visualKeyword)}&orientation=landscape&per_page=1`,
      { headers: { Authorization: process.env.PEXELS_API_KEY } }
    )
  );

  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);

  const data = await res.json();
  if (!data.photos?.length) throw new Error(`No Pexels results for: ${visualKeyword}`);

  const photo = data.photos[0];
  return {
    url: photo.src.landscape,
    creditName: photo.photographer,
    creditUrl: photo.photographer_url,
  };
}

// --- Main pipeline ---
async function main() {
  console.log('Starting ETL pipeline...');
  const processedUrls = await loadProcessedUrls();
  console.log(`Loaded ${processedUrls.size} previously processed URLs.`);

  console.log('Fetching and sanitizing feeds...');
  const newArticles = await fetchAndSanitizeFeeds(processedUrls);
  console.log(`Found ${newArticles.length} new articles.`);

  if (newArticles.length === 0) {
    console.log('No new articles. Exiting.');
    return;
  }

  console.log('Clustering articles...');
  const clusters = await clusterArticles(newArticles);
  console.log(`Identified ${clusters.length} clusters.`);

  await fs.mkdir(POSTS_DIR, { recursive: true });

  for (const cluster of clusters) {
    try {
      console.log(`\nProcessing cluster: "${cluster.theme}" (${cluster.articles.length} sources)`);

      console.log('  Synthesizing article...');
      const synthesis = await synthesizeArticle(cluster);

      console.log(`  Fetching Unsplash image for: "${synthesis.visual_keyword}"`);
      const image = await getImageData(synthesis.visual_keyword);

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
      const filename = `${datePrefix}-${slug}-${hash}.md`;

      const frontmatter = `---
title: "${synthesis.title.replace(/"/g, '\\"')}"
date: ${dateStr}
tags: ${JSON.stringify(synthesis.tags)}
hero_image: "${image.url}"
hero_image_credit_name: "${image.creditName.replace(/"/g, '\\"')}"
hero_image_credit_url: "${image.creditUrl}"
visual_keyword: "${synthesis.visual_keyword.replace(/"/g, '\\"')}"
description: "${synthesis.description.replace(/"/g, '\\"')}"
sources_count: ${cluster.articles.length}
---

`;

      const fileContent = frontmatter + synthesis.article_markdown;
      await fs.writeFile(path.join(POSTS_DIR, filename), fileContent, 'utf-8');

      // Mark cluster sources as processed
      cluster.articles.forEach((a) => processedUrls.add(a.link));

      console.log(`  ✓ Saved: ${filename}`);
    } catch (err) {
      console.error(`  ✗ Failed cluster "${cluster.theme}":`, err.message);
    }
  }

  await saveProcessedUrls(processedUrls);
  console.log(`\nPipeline finished. ${processedUrls.size} total URLs tracked.`);
}

main().catch(console.error);