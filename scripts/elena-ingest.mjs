#!/usr/bin/env node
// Elena's daily-editorial ingest.
//
// Polls Drive for new Google Docs in the "Elena" folder, converts each one
// to our editorial markdown format, pulls a hero image from Pexels, writes
// the post file, and updates the processed-IDs index. Idempotent: any doc
// already in ops/elena-docs.json is skipped.
//
// Intended to run on an hourly GitHub Actions cron. Safe to run locally too
// — reads .credentials/elena-sa.json if no GOOGLE_SERVICE_ACCOUNT_JSON env.
//
// Required env:
//   ELENA_DRIVE_FOLDER_ID   (default: 1qg6qcalqXj94TgxcmvpUEMbE2bjo0GPQ)
//   PEXELS_API_KEY          (hero image fallback)
// Optional env:
//   GOOGLE_SERVICE_ACCOUNT_JSON   (raw JSON or base64; else falls back to .credentials/)
//   DRY_RUN=1               (log intended writes without touching disk)

import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

import { listDocs, exportDocMarkdown } from '../src/pipeline/elena-drive.mjs';
import { convertExportedMarkdown } from '../src/pipeline/elena-docmd.mjs';

const ROOT = process.cwd();
const FOLDER_ID = process.env.ELENA_DRIVE_FOLDER_ID || '1qg6qcalqXj94TgxcmvpUEMbE2bjo0GPQ';
const OPS_PATH = path.join(ROOT, 'ops', 'elena-docs.json');
const POSTS_DIR = path.join(ROOT, 'src', 'content', 'posts');
const HERO_DIR = path.join(ROOT, 'public', 'hero');
const AUTHOR = 'elena-marchetti';
const DRY = process.env.DRY_RUN === '1';

function log(...a) { console.log('[elena-ingest]', ...a); }

async function loadIndex() {
  try {
    const raw = await fs.readFile(OPS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { version: 1, processed: {} };
  }
}

async function saveIndex(idx) {
  if (DRY) return;
  await fs.mkdir(path.dirname(OPS_PATH), { recursive: true });
  await fs.writeFile(OPS_PATH, JSON.stringify(idx, null, 2) + '\n');
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}

function shortHash(s) {
  return crypto.createHash('sha1').update(s).digest('hex').slice(0, 6);
}

function ymd(isoOrDate) {
  const d = new Date(isoOrDate);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

async function pickPexelsHero(query) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=5&orientation=landscape`;
  const r = await fetch(url, { headers: { Authorization: key }, signal: AbortSignal.timeout(15000) });
  if (!r.ok) return null;
  const j = await r.json();
  const p = (j.photos || [])[0];
  if (!p) return null;
  return {
    src: `${p.src.large2x.split('?')[0]}?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
    photographer: p.photographer,
    photographer_url: p.photographer_url,
  };
}

async function downloadHero(url, destPath) {
  if (DRY) return;
  const r = await fetch(url, { signal: AbortSignal.timeout(20000) });
  if (!r.ok) throw new Error(`hero fetch ${r.status}`);
  const buf = Buffer.from(await r.arrayBuffer());
  await fs.mkdir(path.dirname(destPath), { recursive: true });
  await fs.writeFile(destPath, buf);
}

function buildFrontmatter({ title, dek, date, description, tags, slug, hero, sourcesCount }) {
  const fm = {
    title,
    dek,
    date: new Date(date).toISOString(),
    tags,
    hero_image: `/hero/${slug}.jpg`,
    hero_image_credit_name: hero?.photographer || '',
    hero_image_credit_url: hero?.photographer_url || '',
    visual_keyword: '',
    description,
    sources_count: sourcesCount,
    author: AUTHOR,
    format: 'editorial',
  };
  // Emit in a stable key order so diffs are clean.
  const order = ['title','dek','date','tags','hero_image','hero_image_credit_name','hero_image_credit_url','visual_keyword','description','sources_count','author','format'];
  const lines = ['---'];
  for (const k of order) {
    const v = fm[k];
    if (v === '' || v == null) continue;
    if (Array.isArray(v)) {
      lines.push(`${k}: [${v.map((x) => JSON.stringify(x)).join(',')}]`);
    } else if (typeof v === 'number' || typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else if (k === 'date') {
      lines.push(`${k}: ${v}`);
    } else {
      lines.push(`${k}: ${JSON.stringify(v)}`);
    }
  }
  lines.push('---', '');
  return lines.join('\n');
}

async function ingestDoc(doc, index) {
  log(`processing doc ${doc.id} — "${doc.name}"`);
  const raw = await exportDocMarkdown(doc.id);
  const out = convertExportedMarkdown(raw, { docCreatedTime: doc.createdTime });

  if (!out.title) throw new Error('converter produced no title');
  if ((out.body || '').length < 3000) throw new Error(`body too short (${out.body.length}b) — likely a malformed export`);

  const slugBase = slugify(out.title);
  const slug = `${ymd(out.date)}-${slugBase}-${shortHash(doc.id)}`;
  const postPath = path.join(POSTS_DIR, `${slug}.md`);

  // Hero image — Pexels best-match for the piece.
  const hero = await pickPexelsHero(out.heroQuery).catch((e) => {
    log('pexels lookup failed:', e.message);
    return null;
  });
  if (hero) {
    try {
      await downloadHero(hero.src, path.join(HERO_DIR, `${slug}.jpg`));
    } catch (e) {
      log('hero download failed:', e.message);
    }
  }

  const fm = buildFrontmatter({
    title: out.title,
    dek: out.dek,
    date: out.date,
    description: out.description,
    tags: out.tags,
    slug,
    hero,
    sourcesCount: out.citations.length,
  });

  const fileContents = `${fm}\n${out.body.trim()}\n`;
  if (DRY) {
    log('DRY_RUN — would write', postPath, `(${fileContents.length}b)`);
  } else {
    await fs.mkdir(POSTS_DIR, { recursive: true });
    await fs.writeFile(postPath, fileContents);
    log('wrote', path.relative(ROOT, postPath));
  }

  index.processed[doc.id] = {
    processedAt: new Date().toISOString(),
    docName: doc.name,
    docCreatedTime: doc.createdTime,
    postSlug: slug,
    postPath: path.relative(ROOT, postPath),
    sourcesCount: out.citations.length,
  };
}

async function main() {
  const index = await loadIndex();
  const processed = new Set(Object.keys(index.processed || {}));
  const docs = await listDocs(FOLDER_ID);
  log(`folder has ${docs.length} docs; ${processed.size} already processed`);

  const fresh = docs.filter((d) => !processed.has(d.id));
  if (!fresh.length) {
    log('nothing new — exiting clean');
    return;
  }

  let ok = 0, failed = 0;
  // Oldest-first so post dates increment naturally if the folder has a backlog.
  for (const d of fresh.reverse()) {
    try {
      await ingestDoc(d, index);
      ok++;
      await saveIndex(index); // checkpoint after every success
    } catch (e) {
      failed++;
      log('FAIL', d.id, d.name, '—', e.message);
    }
  }

  log(`done: ${ok} ingested, ${failed} failed`);
  if (failed && !ok) process.exit(1);
}

main().catch((e) => {
  console.error('[elena-ingest] fatal:', e);
  process.exit(1);
});
