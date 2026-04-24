#!/usr/bin/env node
// One-off: force-replace a post's hero with a fresh Pexels fetch.
// Usage: node scripts/repair-hero.mjs <slug> [visual_keyword_override]
import fs from 'node:fs/promises';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { createWriteStream } from 'node:fs';
import { Readable } from 'node:stream';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const HERO_DIR = path.join(process.cwd(), 'public/hero');

async function loadEnv() {
  try {
    const raw = await fs.readFile(path.join(process.cwd(), '.env.local'), 'utf8');
    for (const line of raw.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  } catch {}
}

async function fetchPexels(query) {
  const r = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=10`,
    { headers: { Authorization: process.env.PEXELS_API_KEY } }
  );
  if (!r.ok) throw new Error(`Pexels ${r.status}`);
  const data = await r.json();
  if (!data.photos?.length) throw new Error(`No results for: ${query}`);
  const photo = data.photos[Math.floor(Math.random() * data.photos.length)];
  return { url: photo.src.landscape, creditName: photo.photographer, creditUrl: photo.photographer_url };
}

async function download(url, dest) {
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Download failed: ${r.status}`);
  await pipeline(Readable.fromWeb(r.body), createWriteStream(dest));
}

async function repair(slug, overrideKeyword) {
  const files = await fs.readdir(POSTS_DIR);
  const match = files.find(f => f.includes(slug));
  if (!match) throw new Error(`Post not found for slug: ${slug}`);
  const postPath = path.join(POSTS_DIR, match);
  const content = await fs.readFile(postPath, 'utf8');

  const baseSlug = match.replace(/\.md$/, '');
  const kwMatch = content.match(/^visual_keyword:\s*"([^"]+)"/m);
  const query = overrideKeyword || (kwMatch ? kwMatch[1] : null);
  if (!query) throw new Error('No visual_keyword in frontmatter');

  console.log(`[${baseSlug}] query="${query}"`);
  const { url, creditName, creditUrl } = await fetchPexels(query);

  const jpgPath = path.join(HERO_DIR, `${baseSlug}.jpg`);
  const pngPath = path.join(HERO_DIR, `${baseSlug}.png`);
  await fs.mkdir(HERO_DIR, { recursive: true });
  await download(url, jpgPath);
  console.log(`  wrote ${jpgPath}`);
  try { await fs.unlink(pngPath); console.log(`  removed ${pngPath}`); } catch {}

  let updated = content
    .replace(/^hero_image:.*$/m, `hero_image: "/hero/${baseSlug}.jpg"`)
    .replace(/^hero_image_credit_name:.*$/m, `hero_image_credit_name: "${creditName.replace(/"/g, '\\"')}"`)
    .replace(/^hero_image_credit_url:.*$/m, `hero_image_credit_url: "${creditUrl}"`);
  await fs.writeFile(postPath, updated);
  console.log(`  patched frontmatter (credit: ${creditName})`);
}

await loadEnv();
if (!process.env.PEXELS_API_KEY) { console.error('PEXELS_API_KEY missing'); process.exit(1); }

const [slug, kw] = process.argv.slice(2);
if (!slug) { console.error('usage: repair-hero.mjs <slug> [keyword]'); process.exit(1); }
await repair(slug, kw);
