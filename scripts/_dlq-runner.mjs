// Minimal "publish a cluster" helper for the DLQ replay path. Re-uses the
// same synthesis + asset pipeline as scripts/ingest.js but without the
// feed-fetch / dedup / cap stages.

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { Type } from '@google/genai';
import { routeCall } from '../src/pipeline/router.mjs';
import { synthesizeSpeech, markdownToSpeechText } from '../src/pipeline/tts.mjs';
import { generateHeroImage } from '../src/pipeline/image-gen.mjs';
import { groundWithSpans, applyInlineCitations, citationsToMarkdown } from '../src/pipeline/grounding.mjs';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const HERO_DIR  = path.join(process.cwd(), 'public/hero');
const AUDIO_DIR = path.join(process.cwd(), 'public/audio');

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

async function draft(cluster) {
  const sourceTexts = cluster.articles
    .map((a) => `Title: ${a.title}\nSource: ${a.source}\nContent: ${a.content}`)
    .join('\n\n---\n\n');
  const prompt = `Synthesize an 800-word original article in Markdown based on the source texts below. No plagiarism.

Output JSON: { "title", "description" (≤160 chars), "article_markdown", "tags" (3-5), "visual_keyword" }.

Source Texts:
${sourceTexts}`;
  const r = await routeCall({ task: 'draft', prompt, schema: synthesisSchema });
  return JSON.parse(r.text);
}

export async function synthesizeAndPublish(cluster) {
  const synthesis = await draft(cluster);

  // Grounding (best-effort): inline per-claim citations when available.
  try {
    const { citations, supports } = await groundWithSpans({ title: synthesis.title, body: synthesis.article_markdown });
    if (citations.length > 0 && supports.length > 0) {
      synthesis.article_markdown = applyInlineCitations(synthesis.article_markdown, supports, citations);
    } else if (citations.length > 0) {
      synthesis.article_markdown += citationsToMarkdown(citations);
    }
  } catch { /* fail-open */ }

  const dateStr = new Date().toISOString();
  const slug = synthesis.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const datePrefix = dateStr.split('T')[0];
  const hash = crypto.createHash('md5').update(synthesis.title + dateStr).digest('hex').slice(0, 6);
  const baseSlug = `${datePrefix}-${slug}-${hash}`;

  // Hero — Flux preferred when creds present.
  let heroPath = '';
  let creditName = 'System Report';
  let creditUrl = 'https://systemreport.net';
  if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
    try {
      const png = await generateHeroImage(synthesis.visual_keyword, synthesis.title);
      await fs.mkdir(HERO_DIR, { recursive: true });
      await fs.writeFile(path.join(HERO_DIR, `${baseSlug}.png`), png);
      heroPath = `/hero/${baseSlug}.png`;
      creditName = 'System Report (Flux Schnell)';
      creditUrl = 'https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/';
    } catch { /* hero is optional on replay */ }
  }

  // Audio — best-effort.
  let audioPath = '', audioBytes = 0;
  try {
    const wav = await synthesizeSpeech(markdownToSpeechText(synthesis.title, synthesis.description, synthesis.article_markdown));
    await fs.mkdir(AUDIO_DIR, { recursive: true });
    await fs.writeFile(path.join(AUDIO_DIR, `${baseSlug}.wav`), wav);
    audioPath = `/audio/${baseSlug}.wav`;
    audioBytes = wav.length;
  } catch { /* fail-open */ }

  const fm = `---
title: "${synthesis.title.replace(/"/g, '\\"')}"
date: ${dateStr}
tags: ${JSON.stringify(synthesis.tags)}
hero_image: "${heroPath}"
hero_image_credit_name: "${creditName.replace(/"/g, '\\"')}"
hero_image_credit_url: "${creditUrl}"
visual_keyword: "${synthesis.visual_keyword.replace(/"/g, '\\"')}"
description: "${synthesis.description.replace(/"/g, '\\"')}"
sources_count: ${cluster.articles.length}${audioPath ? `
audio_path: "${audioPath}"
audio_bytes: ${audioBytes}` : ''}
---

`;
  await fs.mkdir(POSTS_DIR, { recursive: true });
  await fs.writeFile(path.join(POSTS_DIR, `${baseSlug}.md`), fm + synthesis.article_markdown);
  return baseSlug;
}
