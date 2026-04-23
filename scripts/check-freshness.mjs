// Freshness healthcheck. Compares the live site's latest post against the
// latest post on disk (HEAD). Fails the workflow if the live site is
// measurably behind what main is supposed to be serving — catches silent
// deploy failures (CF Pages build quota exhausted, auto-deploy paused, etc.)
// that an all-green ingestion run otherwise hides.
//
// Exits non-zero on staleness so the GitHub run turns red and the user sees
// the red check next to the commit.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://www.systemreport.net';
const POSTS_DIR = 'src/content/posts';
// Live site must be serving a post whose date is >= (local latest - this
// tolerance). Tolerance absorbs minor CF deploy lag.
const TOLERANCE_MS = 45 * 60 * 1000; // 45 min

async function latestLocalPostDate() {
  const files = (await readdir(POSTS_DIR)).filter(f => f.endsWith('.md'));
  let max = 0;
  for (const f of files) {
    const body = await readFile(path.join(POSTS_DIR, f), 'utf8');
    const m = body.match(/^date:\s*(.+)$/m);
    if (!m) continue;
    const d = new Date(m[1].trim().replace(/^["']|["']$/g, '')).getTime();
    if (Number.isFinite(d) && d > max) max = d;
  }
  return max;
}

async function latestLivePostDate() {
  const r = await fetch(`${SITE}/rss.xml`, {
    headers: { 'User-Agent': 'SystemReport-FreshnessCheck' },
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`RSS fetch ${r.status}`);
  const xml = await r.text();
  const dates = [...xml.matchAll(/<pubDate>([^<]+)<\/pubDate>/g)]
    .map(m => new Date(m[1]).getTime())
    .filter(Number.isFinite);
  if (!dates.length) throw new Error('No pubDate entries in live RSS');
  return Math.max(...dates);
}

const [local, live] = await Promise.all([
  latestLocalPostDate(),
  latestLivePostDate(),
]);

const lag = local - live;
const fmt = t => new Date(t).toISOString();
console.log(`latest local: ${fmt(local)}`);
console.log(`latest live : ${fmt(live)}`);
console.log(`lag         : ${Math.round(lag / 60000)} min`);

if (lag > TOLERANCE_MS) {
  console.error(`::error::Live site is ${Math.round(lag / 60000)} min behind main. ` +
    `Latest on main: ${fmt(local)}, latest served: ${fmt(live)}. ` +
    `Check Cloudflare Pages deployments.`);
  process.exit(1);
}
console.log('OK — live site is current.');
