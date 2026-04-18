// Match a new feed article to an existing published post, so breaking
// developments update the original article (with a changelog) instead of
// spawning a new one.
//
// Strategy: SimHash over (title 3× weight + body) for every existing post,
// compared to the candidate article's hash. A match below MATCH_HAMMING is
// the same story; we route it to the update path.

import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const POSTS_DIR = path.join(process.cwd(), 'src/content/posts');
const MATCH_HAMMING = 16;
const TITLE_WEIGHT = 3;

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 3);
}

function hash64(token) {
  const h = crypto.createHash('sha1').update(token).digest();
  return BigInt('0x' + h.subarray(0, 8).toString('hex'));
}

function simhash(text) {
  const tokens = tokenize(text);
  if (tokens.length === 0) return 0n;
  const v = new Array(64).fill(0);
  for (const tok of tokens) {
    const h = hash64(tok);
    for (let i = 0; i < 64; i++) v[i] += ((h >> BigInt(i)) & 1n) === 1n ? 1 : -1;
  }
  let out = 0n;
  for (let i = 0; i < 64; i++) if (v[i] > 0) out |= 1n << BigInt(i);
  return out;
}

function hamming(a, b) {
  let x = a ^ b, d = 0;
  while (x) { d += Number(x & 1n); x >>= 1n; }
  return d;
}

function articleHash(a) {
  return simhash(`${(a.title + ' ').repeat(TITLE_WEIGHT)}${a.content || a.body || ''}`);
}

// Splits a markdown post file into { frontmatter (object), body (string) }.
function parsePost(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { frontmatter: {}, body: raw, raw };
  const fmText = m[1];
  const body = m[2];
  const frontmatter = {};
  for (const line of fmText.split('\n')) {
    const k = line.match(/^(\w+):\s*(.*)$/);
    if (k) frontmatter[k[1]] = k[2];
  }
  return { frontmatter, body, raw };
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}

async function loadPostsIndex() {
  let entries;
  try {
    entries = await fs.readdir(POSTS_DIR);
  } catch {
    return [];
  }
  const out = [];
  for (const f of entries) {
    if (!f.endsWith('.md')) continue;
    const file = path.join(POSTS_DIR, f);
    const raw = await fs.readFile(file, 'utf-8');
    const parsed = parsePost(raw);
    const titleMatch = parsed.frontmatter.title || '';
    const titleClean = titleMatch.replace(/^"/, '').replace(/"$/, '').replace(/\\"/g, '"');
    out.push({
      filename: f,
      file,
      title: titleClean,
      body: parsed.body,
      raw,
      frontmatter: parsed.frontmatter,
      hash: simhash(`${(titleClean + ' ').repeat(TITLE_WEIGHT)}${parsed.body}`),
    });
  }
  return out;
}

let cachedIndex = null;
export async function getPostsIndex({ refresh = false } = {}) {
  if (cachedIndex && !refresh) return cachedIndex;
  cachedIndex = await loadPostsIndex();
  return cachedIndex;
}

// Returns { match, distance } or { match: null }.
export async function findMatchingPost(article) {
  const idx = await getPostsIndex();
  if (idx.length === 0) return { match: null };
  const h = articleHash(article);
  let best = null;
  for (const p of idx) {
    const d = hamming(p.hash, h);
    if (best === null || d < best.distance) best = { match: p, distance: d };
  }
  if (best && best.distance <= MATCH_HAMMING) return best;
  return { match: null, distance: best?.distance };
}

// Mutates the matched post in place: bumps `dateModified`, appends a changelog
// section, and adds the new source link. Returns the new file body.
export async function applyUpdate(matchedPost, newArticle, summary) {
  const nowISO = new Date().toISOString();
  const note = (summary || newArticle.title).trim();

  // Strip an existing footnote section before re-appending so the changelog
  // sits above footnotes if any. Then rewrite the body with the changelog
  // entry; new entries go at the top of the changelog list (most recent first).
  const body = matchedPost.body;
  let baseBody = body;
  let footnotes = '';
  const fnIdx = body.search(/^\[\^[0-9]+\]:/m);
  if (fnIdx > -1) {
    baseBody = body.slice(0, fnIdx);
    footnotes = body.slice(fnIdx);
  }

  const updateBlockHeader = '## Updates\n\n';
  let updated;
  if (baseBody.includes(updateBlockHeader)) {
    updated = baseBody.replace(
      updateBlockHeader,
      `${updateBlockHeader}- **${nowISO.slice(0, 10)}** — ${note} ([source](${newArticle.link}))\n`,
    );
  } else {
    updated = `${baseBody.trimEnd()}\n\n${updateBlockHeader}- **${nowISO.slice(0, 10)}** — ${note} ([source](${newArticle.link}))\n`;
  }
  if (footnotes) updated = `${updated.trimEnd()}\n\n${footnotes}`;

  // Rewrite frontmatter: bump modified date and increment sources_count.
  const fm = { ...matchedPost.frontmatter };
  fm.modified_date = nowISO;
  if (fm.sources_count !== undefined) {
    const cur = parseInt(String(fm.sources_count).trim(), 10);
    if (!Number.isNaN(cur)) fm.sources_count = String(cur + 1);
  }

  // Serialize frontmatter back into YAML in a stable key order: known keys first,
  // unknowns appended. Preserve string-as-written values so quoting stays sane.
  const KNOWN_ORDER = [
    'title', 'date', 'modified_date', 'tags', 'hero_image',
    'hero_image_credit_name', 'hero_image_credit_url', 'visual_keyword',
    'description', 'sources_count', 'audio_path', 'audio_bytes',
    'locale', 'canonical_slug',
  ];
  const lines = [];
  const seen = new Set();
  for (const k of KNOWN_ORDER) {
    if (fm[k] !== undefined) { lines.push(`${k}: ${fm[k]}`); seen.add(k); }
  }
  for (const k of Object.keys(fm)) {
    if (!seen.has(k)) lines.push(`${k}: ${fm[k]}`);
  }
  const yaml = lines.join('\n');
  const newRaw = `---\n${yaml}\n---\n\n${updated}`;

  await fs.writeFile(matchedPost.file, newRaw, 'utf-8');
  // Bust the cached index so the next match in this run sees the update.
  cachedIndex = null;
  return matchedPost.file;
}
