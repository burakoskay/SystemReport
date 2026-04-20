// Post-processes the raw markdown exported from Elena's Gemini Deep Research
// Google Docs into the shape our editorial layout expects.
//
// Input contract (what the Gem + Docs export produces):
//   # **Elena <Month> <Day>, <Year> — <Title>: <Dek>**
//   ## **Section Heading**
//   paragraph text…1 (inline numeric footnote refs, no brackets)
//   | col | col | col |
//   ...
//   ### Works cited
//   1. Source title, accessed …, [url](url)
//
// Output contract: { title, dek, body, citations, description, heroQuery }
// where `body` is markdown with the editorial conventions from
// src/content/posts/2026-04-20-*.md — H2 sections, tables preserved, and a
// `---` separator followed by `## Works cited` + a markdown ordered list.

const TITLE_PREFIX_RE = /^Elena\s+[A-Za-z]+\s+\d{1,2},\s+\d{4}\s*[—-]\s*/i;

// Lightweight keyword map for tag extraction. Always include `editorial` and
// `geopolitics`; these just give us a few more specific ones when present.
const TAG_KEYWORDS = [
  ['ai infrastructure', /\b(ai\s+(infrastructure|compute|data\s+centers?)|hyperscale|gpu\s+cluster|training\s+cluster)\b/i],
  ['data centers', /\bdata\s+centers?\b/i],
  ['semiconductors', /\b(semiconductor|chip(makers?|making)?|fab(ricat(ion|or))?|tsmc|asml)\b/i],
  ['sanctions', /\bsanctions?\b/i],
  ['china', /\bchina|beijing|ccp|xi\s+jinping\b/i],
  ['russia', /\brussia|moscow|kremlin|putin\b/i],
  ['middle east', /\b(middle east|gulf|saudi|uae|iran|qatar|bahrain|israel|gaza|lebanon)\b/i],
  ['hormuz', /\bhormuz\b/i],
  ['europe', /\beuropean union|\beu\b|brussels|european commission/i],
  ['trade war', /\btrade war|tariffs?\b/i],
  ['cybersecurity', /\bcyber(security|attack|warfare)|vulnerabilit(y|ies)|zero-day\b/i],
  ['energy', /\bgrid|energy|electricity|oil|petroleum|gas\b/i],
  ['subsea cables', /\b(subsea|undersea)\s+cables?\b/i],
];

// Pull the first line and parse the "Elena <date> — <Title>: <Dek>" pattern.
// Returns { title, dek, rawHeadline }. If the pattern doesn't match cleanly,
// falls back to using the whole first line as the title.
function parseHeadline(firstLine) {
  let line = (firstLine || '').trim()
    .replace(/^#+\s*/, '')       // strip heading marker
    .replace(/^\*\*/, '')        // leading bold
    .replace(/\*\*$/, '')        // trailing bold
    .trim();

  const rawHeadline = line;
  // Strip the "Elena April 20, 2026 — " prefix if present.
  line = line.replace(TITLE_PREFIX_RE, '').trim();

  // Split on first `: ` for title / dek.
  const colonIdx = line.indexOf(': ');
  let title, dek;
  if (colonIdx > 0 && colonIdx < 80) {
    title = line.slice(0, colonIdx).trim();
    dek = line.slice(colonIdx + 2).trim();
  } else {
    title = line;
    dek = '';
  }

  // Title length constraint for SEO — 65 chars. If Gemini gives us something
  // longer, trim at the last whole word under the cap.
  if (title.length > 65) {
    const cut = title.slice(0, 65);
    const space = cut.lastIndexOf(' ');
    title = (space > 40 ? cut.slice(0, space) : cut).replace(/[,;:.\s]+$/, '');
  }

  // Dek hygiene: sentence case first word (but preserve proper nouns), end
  // with a period. Conservative — only downcase the very first character if
  // it's the only capital that "looks" title-cased.
  if (dek) {
    dek = sentenceCaseFirstWord(dek);
    if (!/[.!?]$/.test(dek)) dek += '.';
  }

  return { title, dek, rawHeadline };
}

// Proper-noun allowlist: these keep their title case even when the
// surrounding dek is downcased. Everything else becomes lowercase so the dek
// reads as a sentence rather than a press-release headline.
//
// Strategy: lowercase every Capitalized word unless it's either (a) an
// all-caps acronym (AI, EU, UN, OPEC, NATO, US, UK, UAE, CEO), (b) a known
// proper noun (place/person/org), or (c) the very first word.
const PROPER_NOUNS = new Set([
  'Strait', 'Hormuz', 'Europe', 'European', 'America', 'American', 'China',
  'Chinese', 'Russia', 'Russian', 'Iran', 'Iranian', 'Israel', 'Israeli',
  'Gaza', 'Lebanon', 'Taiwan', 'Ukraine', 'Saudi', 'Arabia', 'UAE', 'Qatar',
  'Bahrain', 'Bab', 'Mandeb', 'Gulf', 'Mediterranean', 'Pacific', 'Atlantic',
  'Apollo', 'Schengen', 'Wall', 'Street', 'Silicon', 'Valley', 'Pentagon',
  'Kremlin', 'Brussels', 'Washington', 'Moscow', 'Beijing', 'Tehran',
  'Tokyo', 'London', 'Paris', 'Berlin', 'Amazon', 'Google', 'Microsoft',
  'Apple', 'Nvidia', 'OpenAI', 'Anthropic', 'Meta', 'TSMC', 'Samsung',
  'Intel', 'ASML', 'BlackRock', 'JPMorgan', 'Goldman', 'Claude', 'Mythos',
]);
function isAcronym(w) { return /^[A-Z]{2,}$/.test(w); }
function sentenceCaseFirstWord(s) {
  let first = true;
  return s.replace(/\b([A-Z][A-Za-z]+)\b/g, (m, w) => {
    if (first) { first = false; return w; }      // leave opener capitalized
    if (isAcronym(w)) return w;                   // AI, EU, UN, etc.
    if (PROPER_NOUNS.has(w)) return w;            // known proper noun
    return w.toLowerCase();
  });
}

// Strip bold wrappers from headings, normalize spacing, etc.
function cleanHeadings(md) {
  return md.replace(/^(#{2,6})\s*\*\*(.+?)\*\*\s*$/gm, (_, h, t) => `${h} ${t.trim()}`);
}

// Split into body + Works-cited. Gemini's export writes "Works cited" as
// either a `##` or `###` heading near the end; we treat the first occurrence
// case-insensitively as the dividing line.
function splitBodyAndCitations(md) {
  const m = md.match(/\n(#{2,4})\s*Works\s+cited\s*\n/i);
  if (!m) return { body: md, citations: [] };
  const bodyPart = md.slice(0, m.index).trim();
  const citPart = md.slice(m.index + m[0].length).trim();
  const citations = parseCitations(citPart);
  return { body: bodyPart, citations };
}

function parseCitations(section) {
  // Each citation is a line like:
  // 1. Title of the piece, accessed April 20, 2026, [url](url)
  // Some entries span 2 lines; normalize first.
  const text = section.replace(/\r?\n(\s{2,})/g, ' ').replace(/\s*\n\s*([^0-9])/g, ' $1');
  const lines = text.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const out = [];
  for (const line of lines) {
    const m = line.match(/^(\d+)\.\s+(.+?)(?:,\s*accessed\s+[^,]+,)?\s*(?:\[[^\]]+\])?\(?(https?:\/\/[^\s)]+)\)?\s*$/);
    if (m) {
      out.push({ n: parseInt(m[1], 10), title: m[2].trim().replace(/,\s*$/, ''), url: m[3] });
      continue;
    }
    // Fallback: extract first URL.
    const urlMatch = line.match(/(https?:\/\/\S+?)(?:[)\s]|$)/);
    const numMatch = line.match(/^(\d+)\./);
    if (urlMatch && numMatch) {
      const raw = line.replace(/^\d+\.\s*/, '').replace(/\[?https?:\/\/\S+\]?\(?https?:\/\/\S+\)?/g, '').replace(/,\s*accessed[^,]+,?\s*/i, '').trim().replace(/,\s*$/, '');
      out.push({ n: parseInt(numMatch[1], 10), title: raw || urlMatch[1], url: urlMatch[1] });
    }
  }
  // De-duplicate by number, keep smallest-n-first.
  const seen = new Map();
  for (const c of out) if (!seen.has(c.n)) seen.set(c.n, c);
  return [...seen.values()].sort((a, b) => a.n - b.n);
}

function renderCitationsBlock(citations) {
  if (!citations.length) return '';
  const lines = citations.map((c) => `${c.n}. [${cleanTitle(c.title)}](${c.url})`);
  return `\n---\n\n## Works cited\n\n${lines.join('\n')}\n`;
}

// Gem's markdown export escapes hyphens and some punctuation inside link
// titles ("accessed April 20, 2026" boilerplate included). Strip both.
function cleanTitle(s) {
  return String(s)
    .replace(/\\([-_*`])/g, '$1')
    .replace(/,\s*accessed\s+[A-Za-z]+\s+\d{1,2},\s*\d{4}\s*$/i, '')
    .replace(/\s*[—\-]\s*$/, '')
    .replace(/[|]/g, '\\|')
    .trim();
}

// Convert ASCII footnote refs ".1", ".4" that appear at end of sentences into
// unicode superscripts. The export sticks the numbers right before the space
// or the period — we catch both.
const SUPER = { '0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹' };
function toSuper(n) { return String(n).split('').map((d) => SUPER[d] || d).join(''); }
function prettifyFootnoteRefs(md) {
  // After a period/quote/paren, a number not followed by a letter → superscript.
  return md.replace(/([.!?"'\)\]])(\d{1,3})(?=\s|$|\.)/g, (_, p, n) => `${p}${toSuper(n)}`)
           // Trailing ".1" style inside prose without sentence punctuation.
           .replace(/([a-zA-Z])\.(\d{1,3})(?=\s|$)/g, (_, a, n) => `${a}.${toSuper(n)}`);
}

// Derive a short SEO description from the opening paragraph. The Gem export
// separates blocks with single newlines, so we iterate lines and pick the
// first one that's plain prose (not a heading, not a table row, not a list).
function deriveDescription(body) {
  const lines = body.split(/\r?\n/).map((l) => l.trim());
  const firstPara = lines.find((l) =>
    l.length > 60 && !l.startsWith('#') && !l.startsWith('|') && !l.startsWith('*') && !l.startsWith('-') && !/^\d+\.\s/.test(l)
  );
  if (!firstPara) return '';
  const sentence = firstPara.replace(/\s+/g, ' ').split(/(?<=[.!?])\s+/)[0];
  return sentence.slice(0, 160).replace(/[,;:\s]+$/, '');
}

// Derive 4-6 lowercase tags. editorial + geopolitics are the base.
function deriveTags(title, dek, body) {
  const haystack = `${title} ${dek} ${body.slice(0, 4000)}`;
  const tags = new Set(['editorial', 'geopolitics']);
  for (const [tag, re] of TAG_KEYWORDS) {
    if (tags.size >= 6) break;
    if (re.test(haystack)) tags.add(tag);
  }
  return [...tags];
}

// Visual keyword for Pexels / Flux. Pull a couple of concrete nouns from the
// title + dek so the picked photo has something to do with the piece.
function deriveHeroQuery(title, dek) {
  const text = `${title} ${dek}`.toLowerCase();
  const stop = new Set(['the','a','an','of','in','on','at','to','for','and','or','how','what','why','when','where','upends','global','new','silent','breaks','reshapes','ends','day','days','into','from','with','by']);
  const words = text.replace(/[^a-z\s]/g, ' ').split(/\s+/).filter((w) => w.length >= 4 && !stop.has(w));
  const uniq = [...new Set(words)].slice(0, 4);
  return uniq.join(' ') || 'world affairs editorial';
}

// Main entry.
export function convertExportedMarkdown(rawMd, { docCreatedTime }) {
  const lines = rawMd.split(/\r?\n/);

  // First non-empty line holds the H1 title.
  let headlineIdx = lines.findIndex((l) => l.trim());
  const firstLine = headlineIdx >= 0 ? lines[headlineIdx] : '';
  const { title, dek } = parseHeadline(firstLine);

  // Drop the headline line so it doesn't duplicate the frontmatter title.
  const tail = lines.slice(headlineIdx + 1).join('\n').trim();

  // Clean headings (strip **bold** wrappers), collapse double trailing spaces.
  let cleaned = cleanHeadings(tail).replace(/ {2,}$/gm, '').trim();

  const { body, citations } = splitBodyAndCitations(cleaned);
  const prettyBody = prettifyFootnoteRefs(body);

  const finalMd = `${prettyBody.trim()}\n${renderCitationsBlock(citations)}`;

  const description = deriveDescription(prettyBody);
  const tags = deriveTags(title, dek, prettyBody);
  const heroQuery = deriveHeroQuery(title, dek);

  return {
    title,
    dek,
    body: finalMd,
    citations,
    description,
    tags,
    heroQuery,
    date: docCreatedTime,
  };
}
