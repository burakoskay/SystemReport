// SimHash-based near-duplicate detection for feed articles.
//
// Why: feeds overlap heavily (Verge + Engadget + TechCrunch often post the
// same Apple rumor within minutes). LLM-based clustering handles this but
// burns tokens and TPM budget on duplicates. SimHash pre-collapse cuts
// cluster input by ~15-30% with zero API cost.
//
// Algorithm: token → 64-bit hash → per-bit vote; final bit = 1 if sum>0.
// Two docs are near-dupes if Hamming distance ≤ HAMMING_THRESHOLD.

import crypto from 'crypto';

// SimHash on short feed snippets is noisy; on test pairs identical stories
// measure ~15 while unrelated ones measure ~32, so 18 gives a clean margin.
const HAMMING_THRESHOLD = 18;
const TITLE_WEIGHT = 3; // title tokens repeated N× to dominate the fingerprint

function tokenize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter(t => t.length >= 3);
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
    for (let i = 0; i < 64; i++) {
      v[i] += ((h >> BigInt(i)) & 1n) === 1n ? 1 : -1;
    }
  }

  let out = 0n;
  for (let i = 0; i < 64; i++) {
    if (v[i] > 0) out |= 1n << BigInt(i);
  }
  return out;
}

function hamming(a, b) {
  let x = a ^ b;
  let d = 0;
  while (x) {
    d += Number(x & 1n);
    x >>= 1n;
  }
  return d;
}

/**
 * Collapse near-duplicates. Returns:
 *   { kept: Article[], collapsed: number, groups: Article[][] }
 * The first article in each near-dup group wins (stable order preserved).
 */
export function collapseNearDuplicates(articles) {
  const withHash = articles.map(a => ({
    article: a,
    hash: simhash(`${(a.title + ' ').repeat(TITLE_WEIGHT)}${a.content}`),
  }));

  const kept = [];
  const groups = [];
  let collapsed = 0;

  for (const entry of withHash) {
    const dupIdx = kept.findIndex(k => hamming(k.hash, entry.hash) <= HAMMING_THRESHOLD);
    if (dupIdx === -1) {
      kept.push(entry);
      groups.push([entry.article]);
    } else {
      groups[dupIdx].push(entry.article);
      collapsed++;
    }
  }

  return {
    kept: kept.map(k => k.article),
    collapsed,
    groups,
  };
}
