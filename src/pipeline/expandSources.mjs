// Thin-cluster rescue: when a story arrives with only 1–2 feed items, query
// free news APIs for additional coverage so the drafter has real material to
// work with instead of padding prose with LLM-generated filler.
//
// Sources (all free, no API key required):
//   - GDELT DOC 2.0 ArtList       (global news index, very broad)
//   - Google News RSS search      (recency + editorial coverage)
//   - Hacker News Algolia search  (tech discussion + primary sources)
//
// For each discovered URL we fetch the page and extract readable body text,
// then dedupe against the cluster's existing links. Failures are soft — we
// return whatever we got rather than blowing up the pipeline.

import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';

const UA = 'Mozilla/5.0 (compatible; SystemReportBot/1.0; +https://www.systemreport.net)';
const FETCH_TIMEOUT_MS = 8000;
const MAX_BODY_CHARS = 3500;
const MAX_NEW_SOURCES = 5;

function normalizeUrl(u) {
  try {
    const url = new URL(u);
    url.hash = '';
    for (const k of [...url.searchParams.keys()]) {
      if (/^(utm_|fbclid|gclid|mc_cid|mc_eid|ref|ref_src)/i.test(k)) url.searchParams.delete(k);
    }
    return url.toString().replace(/\/$/, '');
  } catch {
    return u;
  }
}

async function fetchWithTimeout(url, opts = {}) {
  const ctrl = AbortSignal.timeout(FETCH_TIMEOUT_MS);
  return fetch(url, { ...opts, headers: { 'User-Agent': UA, ...(opts.headers || {}) }, signal: ctrl });
}

// Pull readable body text from an article URL. Prefers <article>/<main>, falls
// back to the largest block of <p> tags. Returns '' on any failure.
async function extractBody(url) {
  try {
    const r = await fetchWithTimeout(url);
    if (!r.ok) return '';
    const ct = r.headers.get('content-type') || '';
    if (!ct.includes('html')) return '';
    const html = await r.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    for (const sel of ['script', 'style', 'nav', 'footer', 'aside', 'form', 'noscript']) {
      doc.querySelectorAll(sel).forEach((n) => n.remove());
    }
    const root = doc.querySelector('article') || doc.querySelector('main') || doc.body;
    if (!root) return '';
    const paras = [...root.querySelectorAll('p')]
      .map((p) => p.textContent.trim())
      .filter((t) => t.length > 40);
    const joined = paras.join('\n\n').replace(/\s+\n/g, '\n').trim();
    return joined.slice(0, MAX_BODY_CHARS);
  } catch {
    return '';
  }
}

// Craft a focused query from the cluster. Theme is usually a short phrase
// like "Apple's on-device AI push" — we strip possessives/filler and clamp
// length so the upstream APIs don't choke on it.
function buildQuery(cluster) {
  const base = cluster.theme || cluster.articles?.[0]?.title || '';
  return base
    .replace(/[\u2018\u2019'`]/g, '')
    .replace(/[^\w\s\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 10)
    .join(' ');
}

async function queryGDELT(q) {
  try {
    const u = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(q + ' sourcelang:english')}&mode=ArtList&format=json&maxrecords=10&sort=hybridrel`;
    const r = await fetchWithTimeout(u);
    if (!r.ok) return [];
    const data = await r.json().catch(() => ({}));
    return (data.articles || []).map((a) => ({
      link: a.url,
      title: a.title,
      source: a.domain || 'GDELT',
    }));
  } catch { return []; }
}

async function queryGoogleNews(q) {
  try {
    const u = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=en-US&gl=US&ceid=US:en`;
    const parser = new Parser({ timeout: FETCH_TIMEOUT_MS, headers: { 'User-Agent': UA } });
    const feed = await parser.parseURL(u);
    return (feed.items || []).slice(0, 10).map((it) => ({
      link: it.link,
      title: it.title,
      source: it.creator || it.source || 'Google News',
    }));
  } catch { return []; }
}

async function queryHN(q) {
  try {
    const u = `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=8`;
    const r = await fetchWithTimeout(u);
    if (!r.ok) return [];
    const data = await r.json().catch(() => ({}));
    return (data.hits || [])
      .filter((h) => h.url && h.title)
      .map((h) => ({ link: h.url, title: h.title, source: `HN (${h.points || 0} pts)` }));
  } catch { return []; }
}

// Main entry. Returns an array of {title, link, content, source} for URLs
// that weren't already in the cluster. Content is best-effort extracted body
// text; items that yield no usable body are dropped.
export async function expandSources(cluster, { maxNew = MAX_NEW_SOURCES } = {}) {
  const q = buildQuery(cluster);
  if (!q) return [];

  const existing = new Set(
    (cluster.articles || []).map((a) => normalizeUrl(a.link)).filter(Boolean)
  );

  const [gdelt, gnews, hn] = await Promise.all([
    queryGDELT(q),
    queryGoogleNews(q),
    queryHN(q),
  ]);

  // Interleave sources so one provider doesn't dominate.
  const interleaved = [];
  const max = Math.max(gdelt.length, gnews.length, hn.length);
  for (let i = 0; i < max; i++) {
    if (gdelt[i]) interleaved.push(gdelt[i]);
    if (gnews[i]) interleaved.push(gnews[i]);
    if (hn[i])    interleaved.push(hn[i]);
  }

  const seen = new Set(existing);
  const picks = [];
  for (const cand of interleaved) {
    if (picks.length >= maxNew) break;
    const norm = normalizeUrl(cand.link);
    if (!norm || seen.has(norm)) continue;
    // Google News wraps links in its own redirector; skip those — we can't
    // reliably extract body from the redirect page.
    if (/news\.google\.com\/(rss\/)?articles\//.test(norm)) continue;
    seen.add(norm);
    picks.push({ ...cand, link: norm });
  }

  // Fetch bodies in parallel; drop anything with <200 chars of extracted text.
  const enriched = await Promise.all(
    picks.map(async (p) => {
      const body = await extractBody(p.link);
      if (body.length < 200) return null;
      return { title: p.title, link: p.link, source: p.source, content: body };
    })
  );

  return enriched.filter(Boolean);
}
