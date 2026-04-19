// Reporter roster for System Report.
// Each author has a beat, a short bio, and a voice signature — a small
// prompt snippet injected into the draft so the generated copy picks up
// the reporter's rhythm and angle. Routing goes keyword → beat → author.

/**
 * @typedef {Object} Author
 * @property {string} slug
 * @property {string} name
 * @property {string} title
 * @property {string} beat
 * @property {string} bio
 * @property {string} location
 * @property {string} joined
 * @property {string} voice        injected into draft prompt
 * @property {string} avatar       /authors/<slug>.jpg
 * @property {string[]} categorySlugs
 * @property {string[]} tagHints
 */

/** @type {Record<string, Author>} */
export const AUTHORS = {
  'maya-chen': {
    slug: 'maya-chen',
    name: 'Maya Chen',
    title: 'AI & Machine Learning',
    beat: 'AI / ML',
    bio: "Stanford CS, then three years on an ML team before I got tired of shipping demos. I write about frontier models and the labs building them. Mostly I'm curious where the hype diverges from what the math supports.",
    location: 'San Francisco, CA',
    joined: '2024-11-01',
    avatar: '/authors/maya-chen.jpg',
    categorySlugs: ['ai'],
    tagHints: ['ai', 'llm', 'openai', 'anthropic', 'gemini', 'nvidia', 'model', 'neural', 'machine learning', 'copilot', 'agent', 'gpu', 'training'],
    voice: [
      'Write like Maya Chen: technical, skeptical of marketing claims, comfortable saying "we don\'t know yet."',
      'Short declarative sentences. Lead with what the model/company actually did, not what it promises.',
      'Name the tradeoff or open question by the third paragraph. Never use the word "revolutionary."',
    ].join(' '),
  },
  'david-okafor': {
    slug: 'david-okafor',
    name: 'David Okafor',
    title: 'Hardware & Chips',
    beat: 'Hardware / semiconductors',
    bio: "EE degree from Georgia Tech, seven years as a systems engineer before I started writing full-time. Silicon, displays, the devices everything else runs on. I still read datasheets for fun.",
    location: 'Austin, TX',
    joined: '2024-09-15',
    avatar: '/authors/david-okafor.jpg',
    categorySlugs: ['hardware'],
    tagHints: ['chip', 'semiconductor', 'cpu', 'gpu', 'arm', 'qualcomm', 'smartphone', 'laptop', 'iphone', 'tablet', 'oled', 'display', 'battery', 'foldable', 'wearable', 'camera'],
    voice: [
      'Write like David Okafor: detail-dense, specs-first, quietly dry humor.',
      'When numbers exist, use them. Use comparatives sparingly — only when you can name the thing being compared.',
      'Avoid "game-changing," "revolutionary," "breakthrough." Describe what the hardware does differently, in concrete terms.',
    ].join(' '),
  },
  'lena-volkov': {
    slug: 'lena-volkov',
    name: 'Lena Volkov',
    title: 'Policy & Regulation',
    beat: 'Tech policy, antitrust, privacy',
    bio: "Georgetown Law, then a few years at a think tank before this. I cover how regulators, courts, and Congress shape the industry. I read every filing so you don't have to.",
    location: 'Washington, D.C.',
    joined: '2024-08-20',
    avatar: '/authors/lena-volkov.jpg',
    categorySlugs: [],
    tagHints: ['regulation', 'antitrust', 'privacy', 'congress', 'doj', 'ftc', 'eu', 'gdpr', 'law', 'court', 'lawsuit', 'ruling', 'policy', 'whistleblower', 'compliance', 'surveillance'],
    voice: [
      'Write like Lena Volkov: measured, procedural, careful with verbs.',
      'Cite the agency, statute, or filing by name. Distinguish what a regulator said from what they can do.',
      'Never speculate beyond the record. If an outcome is uncertain, say so plainly.',
    ].join(' '),
  },
  'ryan-tanaka': {
    slug: 'ryan-tanaka',
    name: 'Ryan Tanaka',
    title: 'Consumer Tech & Mobile',
    beat: 'Consumer devices, apps, mobile',
    bio: "I've been buying gadgets I didn't need since I was twelve. Now I get to call it a job. Phones, apps, the small product decisions that actually matter. Reformed early adopter.",
    location: 'Los Angeles, CA',
    joined: '2024-10-05',
    avatar: '/authors/ryan-tanaka.jpg',
    categorySlugs: ['tech'],
    tagHints: ['consumer', 'review', 'app', 'mobile', 'ios', 'android', 'deal', 'shopping', 'launch', 'accessory', 'earbuds', 'smartwatch'],
    voice: [
      'Write like Ryan Tanaka: conversational, grounded in daily use, willing to be opinionated.',
      'Lead with what it feels like to actually use the thing, not the spec sheet.',
      'When something is bad, say it is bad — not "may not appeal to every user."',
    ].join(' '),
  },
  'priya-raman': {
    slug: 'priya-raman',
    name: 'Priya Raman',
    title: 'Enterprise & Security',
    beat: 'Cloud, enterprise software, security',
    bio: "CMU grad, five years on-call as an SRE. I cover the unglamorous layer that runs modern business — cloud, breaches, the enterprise buying cycle. If it pages someone at 3 a.m., I'm probably writing about it.",
    location: 'Seattle, WA',
    joined: '2024-07-12',
    avatar: '/authors/priya-raman.jpg',
    categorySlugs: ['software'],
    tagHints: ['cloud', 'aws', 'azure', 'gcp', 'enterprise', 'saas', 'security', 'vulnerability', 'breach', 'cve', 'cisa', 'ransomware', 'zero-day', 'open source', 'infrastructure', 'devops'],
    voice: [
      'Write like Priya Raman: tight, insider tone, treats the reader as technical.',
      'Use proper nouns — products, vendors, protocols — without over-explaining them.',
      'When covering an incident, lead with scope and blast radius, not the vendor\'s press release.',
    ].join(' '),
  },
  'elena-marchetti': {
    slug: 'elena-marchetti',
    name: 'Elena Marchetti',
    title: 'Global Affairs',
    beat: 'Global affairs, geopolitics, international policy',
    bio: "Italian, raised between Milan and London. Journalism at City, St George's. I cover the world outside Silicon Valley — diplomacy, trade, conflict — and how it all lands back on the industry.",
    location: 'London, UK',
    joined: '2025-02-10',
    avatar: '/authors/elena-marchetti.jpg',
    categorySlugs: [],
    tagHints: ['world', 'global', 'geopolitics', 'diplomacy', 'un', 'nato', 'eu', 'g20', 'g7', 'treaty', 'sanctions', 'ukraine', 'russia', 'china', 'israel', 'gaza', 'iran', 'taiwan', 'africa', 'trade war', 'tariff', 'foreign policy', 'elections'],
    voice: [
      'Write like Elena Marchetti: AP-style, neutral, precise.',
      'Attribute claims to named sources, agencies, or officials. Prefer "said" over "claimed" or "admitted."',
      'Lead with the who/what/where/when. Keep adjectives scarce and verbs strong. No editorializing.',
    ].join(' '),
  },
  'sam-whitfield': {
    slug: 'sam-whitfield',
    name: 'Sam Whitfield',
    title: 'Culture & Gaming',
    beat: 'Internet culture, gaming, creator economy',
    bio: "I write about dope shit. Games, streams, the chaos online. Opinionated on purpose.",
    location: 'Brooklyn, NY',
    joined: '2024-12-01',
    avatar: '/authors/sam-whitfield.jpg',
    categorySlugs: ['gaming'],
    tagHints: ['gaming', 'game', 'playstation', 'xbox', 'nintendo', 'steam', 'esports', 'streaming', 'twitch', 'youtube', 'creator', 'social media', 'culture', 'meme', 'reddit', 'tiktok'],
    voice: [
      'Write like Sam Whitfield: punchy, short grafs, personality allowed.',
      'Use a specific example in the first 100 words — a game, a stream, a specific post — not an abstract trend.',
      'You can be funny. You cannot be cute.',
    ].join(' '),
  },
};

export const AUTHOR_LIST = Object.values(AUTHORS);

export function getAuthor(slug) {
  if (!slug) return null;
  return AUTHORS[slug] || null;
}

// Deterministic cheap string hash for fallback routing (no dependency).
function hashStr(s) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Pick an author for an article. Routing priority:
 *   1. Tag hint match (policy / security / culture beats often cross categories)
 *   2. Category match (ai → Maya, gaming → Sam, etc.)
 *   3. Hash fallback across the full roster so articles with no signal still
 *      get a consistent byline.
 * @param {string[]} tags
 * @param {string} categorySlug
 * @param {string} seed
 * @returns {Author}
 */
export function assignAuthor(tags = [], categorySlug = 'tech', seed = '') {
  const lowerTags = (tags || []).map(t => String(t).toLowerCase());

  // 1. Tag-hint scoring (cross-beat match)
  let best = null;
  for (const author of AUTHOR_LIST) {
    let score = 0;
    for (const hint of author.tagHints) {
      if (lowerTags.some(t => t === hint || t.includes(hint) || hint.includes(t))) {
        score += 2;
      }
    }
    if (author.categorySlugs.includes(categorySlug)) score += 1;
    if (score > 0 && (!best || score > best.score)) best = { author, score };
  }
  if (best && best.score >= 2) return best.author;

  // 2. Pure category match
  const byCat = AUTHOR_LIST.find(a => a.categorySlugs.includes(categorySlug));
  if (byCat) return byCat;

  // 3. Deterministic hash fallback
  const key = seed || lowerTags.join(',') || categorySlug;
  const pick = AUTHOR_LIST[hashStr(key) % AUTHOR_LIST.length];
  return pick;
}
