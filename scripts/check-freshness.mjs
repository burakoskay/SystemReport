// Freshness healthcheck. Compares the live site's latest post against the
// latest post on disk (HEAD). Polls the live RSS for up to MAX_WAIT_MS after
// a push so normal Cloudflare Pages build time doesn't flag as a stall;
// fails the workflow only if the site is still behind after the wait window.
//
// Exits non-zero on staleness so the GitHub run turns red and the user sees
// the red check next to the commit.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://www.systemreport.net';
const POSTS_DIR = 'src/content/posts';
// Acceptable skew once the deploy has landed. Small, just to absorb clock
// differences between the local file and the RSS pubDate.
const TOLERANCE_MS = 2 * 60 * 1000; // 2 min
// How long to wait for CF Pages to finish building + deploying before giving
// up. CF typically lands in 2-5 min; 10 min is a comfortable ceiling.
const MAX_WAIT_MS = 10 * 60 * 1000;
const POLL_INTERVAL_MS = 30 * 1000; // 30 s between RSS polls

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
  // Cache-bust to avoid reading a stale CDN copy after a deploy has landed.
  const url = `${SITE}/rss.xml?t=${Date.now()}`;
  const r = await fetch(url, {
    headers: {
      'User-Agent': 'SystemReport-FreshnessCheck',
      'Cache-Control': 'no-cache',
    },
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

const fmt = t => new Date(t).toISOString();
const local = await latestLocalPostDate();
console.log(`latest local: ${fmt(local)}`);

const deadline = Date.now() + MAX_WAIT_MS;
let live = 0;
let lag = Infinity;
let attempt = 0;

while (Date.now() < deadline) {
  attempt++;
  try {
    live = await latestLivePostDate();
    lag = local - live;
    console.log(`[${attempt}] latest live: ${fmt(live)}  lag: ${Math.round(lag / 60000)} min`);
    if (lag <= TOLERANCE_MS) {
      console.log('OK — live site is current.');
      process.exit(0);
    }
  } catch (e) {
    console.log(`[${attempt}] fetch failed: ${e.message}`);
  }
  if (Date.now() + POLL_INTERVAL_MS >= deadline) break;
  await new Promise(r => setTimeout(r, POLL_INTERVAL_MS));
}

console.error(`::error::Live site still ${Math.round(lag / 60000)} min behind main after ${Math.round(MAX_WAIT_MS / 60000)} min wait. ` +
  `Latest on main: ${fmt(local)}, latest served: ${fmt(live)}. ` +
  `Check Cloudflare Pages deployments.`);
process.exit(1);
