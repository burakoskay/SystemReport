// World-affairs feeds for Elena Marchetti's daily editorial.
//
// Elena's beat is "what's happening in the world today, and how could it
// reshape the tech industry." So we pull from global news wires (no API
// keys required — all public RSS), then let the picker model decide which
// single story has the strongest tech-adjacency for the day.
//
// Feeds are intentionally broad: foreign policy, conflict, trade, energy,
// elections, climate. The tech angle is drawn OUT of the story by Elena,
// not filtered IN at the source.

import Parser from 'rss-parser';
import { JSDOM } from 'jsdom';

const UA = 'Mozilla/5.0 (compatible; SystemReportBot/1.0; +https://www.systemreport.net)';
const FETCH_TIMEOUT_MS = 10000;
const MAX_ITEMS_PER_FEED = 12;
const MAX_BODY_CHARS = 6000;

// Curated world-affairs RSS. Chosen for: (1) free, no key; (2) covers a
// different slice of the world; (3) uses real editorial filtering (not
// aggregated firehoses). Order doesn't matter — picker weighs on content.
const WORLD_FEEDS = [
  // Reuters world top
  'https://feeds.reuters.com/Reuters/worldNews',
  // BBC World
  'http://feeds.bbci.co.uk/news/world/rss.xml',
  // Al Jazeera English — all
  'https://www.aljazeera.com/xml/rss/all.xml',
  // Guardian — World
  'https://www.theguardian.com/world/rss',
  // Guardian — Business (trade, sanctions, energy — feeds tech angle)
  'https://www.theguardian.com/business/rss',
  // NYT World
  'https://rss.nytimes.com/services/xml/rss/nyt/World.xml',
  // NYT Business
  'https://rss.nytimes.com/services/xml/rss/nyt/Business.xml',
  // Deutsche Welle — world in English
  'https://rss.dw.com/rdf/rss-en-world',
  // France24 English
  'https://www.france24.com/en/rss',
  // AP — top headlines (world-heavy)
  'https://rsshub.app/apnews/topics/apf-topnews',
  // Politico — global
  'https://www.politico.eu/feed/',
  // Foreign Policy
  'https://foreignpolicy.com/feed/',
  // The Economist — International (often paywalled but headlines work)
  'https://www.economist.com/international/rss.xml',
];

// GDELT themes that correlate with tech-industry consequences. Queried as
// an OR bundle so the picker sees a broad but focused candidate set.
const GDELT_TECH_ANGLE_QUERY =
  '("semiconductor" OR "export controls" OR "data center" OR "undersea cable" OR ' +
  '"AI regulation" OR "critical minerals" OR "rare earth" OR "spectrum" OR ' +
  '"sanctions" OR "cyberattack" OR "espionage" OR "energy policy" OR ' +
  '"trade war" OR "tariff" OR "Taiwan" OR "chip" OR "election") sourcelang:english';

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
  return fetch(url, {
    ...opts,
    headers: { 'User-Agent': UA, ...(opts.headers || {}) },
    signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
  });
}

async function fetchOneFeed(url) {
  try {
    const parser = new Parser({ timeout: FETCH_TIMEOUT_MS, headers: { 'User-Agent': UA } });
    const feed = await parser.parseURL(url);
    return (feed.items || []).slice(0, MAX_ITEMS_PER_FEED).map((it) => ({
      title: (it.title || '').trim(),
      link: normalizeUrl(it.link || ''),
      snippet: ((it.contentSnippet || it.content || it.summary || '') + '').trim().slice(0, 500),
      source: feed.title || url,
      published: it.isoDate || it.pubDate || null,
    })).filter((x) => x.title && x.link);
  } catch {
    return [];
  }
}

async function fetchGDELT() {
  try {
    const u = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(GDELT_TECH_ANGLE_QUERY)}&mode=ArtList&format=json&maxrecords=30&sort=hybridrel&timespan=1d`;
    const r = await fetchWithTimeout(u);
    if (!r.ok) return [];
    const data = await r.json().catch(() => ({}));
    return (data.articles || []).slice(0, 25).map((a) => ({
      title: a.title,
      link: normalizeUrl(a.url),
      snippet: '',
      source: a.domain || 'GDELT',
      published: a.seendate || null,
    })).filter((x) => x.title && x.link);
  } catch { return []; }
}

// Pull readable body text from an article URL. Same shape as expandSources
// but tuned for longer bodies — Elena's pieces benefit from real context.
export async function extractArticleBody(url) {
  try {
    const r = await fetchWithTimeout(url);
    if (!r.ok) return '';
    const ct = r.headers.get('content-type') || '';
    if (!ct.includes('html')) return '';
    const html = await r.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    for (const sel of ['script', 'style', 'nav', 'footer', 'aside', 'form', 'noscript', 'iframe']) {
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

// Main entry for Elena's daily ingest. Returns a deduped list of
// {title, link, snippet, source, published} from every configured feed
// plus a GDELT pass. Bodies are NOT fetched here — they're pulled later
// for the single story the picker chooses.
export async function fetchWorldCandidates() {
  const perFeed = await Promise.all(WORLD_FEEDS.map(fetchOneFeed));
  const gdelt = await fetchGDELT();
  const all = [...perFeed.flat(), ...gdelt];
  const seen = new Set();
  const out = [];
  for (const item of all) {
    const key = item.link;
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

// For a chosen story, pull bodies for the primary link plus related
// coverage discovered via GDELT. Returns {primary, related[]}.
export async function expandStoryForEditorial(primaryLink, query, { maxRelated = 6 } = {}) {
  const primaryBody = await extractArticleBody(primaryLink);

  let related = [];
  try {
    const u = `https://api.gdeltproject.org/api/v2/doc/doc?query=${encodeURIComponent(query + ' sourcelang:english')}&mode=ArtList&format=json&maxrecords=15&sort=hybridrel&timespan=3d`;
    const r = await fetchWithTimeout(u);
    if (r.ok) {
      const data = await r.json().catch(() => ({}));
      related = (data.articles || [])
        .map((a) => ({ title: a.title, link: normalizeUrl(a.url), source: a.domain || 'GDELT' }))
        .filter((x) => x.link && x.link !== normalizeUrl(primaryLink));
    }
  } catch { /* ignore */ }

  const picks = related.slice(0, maxRelated);
  const bodies = await Promise.all(picks.map(async (p) => {
    const body = await extractArticleBody(p.link);
    if (body.length < 300) return null;
    return { ...p, body };
  }));

  return {
    primary: { link: primaryLink, body: primaryBody },
    related: bodies.filter(Boolean),
  };
}
