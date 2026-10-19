// Deploy file budget.
//
// Cloudflare Pages on the free plan rejects any deployment with more than
// 20,000 files. The site crossed that on 22 Sep 2026 — one page per article,
// per translation, per AMP story and per tag, plus hero images, audio and the
// Pagefind index — and every deploy after it failed. The build itself stayed
// green, so the live site froze while the pipeline kept committing, and the
// freshness healthcheck went red on every run.
//
// Content only grows, so a one-off trim would just move the cliff. Instead the
// build decides what to emit against a fixed budget:
//   - tag pages only for tags used by at least MIN_TAG_POSTS articles; a tag
//     on a single article is a page with one link on it
//   - AMP Web Stories only for the newest STORY_LIMIT articles; stories are a
//     discovery surface for fresh news
//   - translated articles newest-first until the budget is spent, so as the
//     archive grows the oldest translations retire on their own
// English articles, their media and their search index are always emitted.
//
// The selections themselves live in content-cache.ts so every route and link
// site reads the same answer and never links to a page that was not built.

import { readdirSync } from 'node:fs';
import path from 'node:path';

/** Hard cap Cloudflare Pages enforces per deployment on the free plan. */
export const CLOUDFLARE_FILE_LIMIT = 20_000;

// Target well under the hard cap: the estimate below is approximate, and the
// pipeline commits several times between checks.
export const FILE_BUDGET = 19_000;

export const MIN_TAG_POSTS = 2;
export const STORY_LIMIT = 100;

// Files emitted regardless of content volume: Astro bundles, Pagefind's
// runtime, root and per-locale static pages, feeds and sitemaps. Measured at
// ~170; the rest is slack.
const FIXED_FILES = 400;

// Per English article: its page, its Pagefind fragment, and a share of
// Pagefind index chunks and listing pagination (about one each per 12 posts).
const FILES_PER_POST = 2.2;

function countFiles(dir: string): number {
  try {
    return readdirSync(dir, { recursive: true, withFileTypes: true })
      .filter((entry) => entry.isFile()).length;
  } catch {
    return 0;
  }
}

interface Emitted {
  posts: number;
  tagPages: number;
  stories: number;
}

/**
 * How many translated articles fit after everything that is always emitted.
 * Static assets under public/ are copied verbatim, so they are counted from
 * disk rather than estimated.
 */
export function translationAllowance({ posts, tagPages, stories }: Emitted): number {
  const assets = countFiles(path.resolve('public'));
  const committed =
    assets + FIXED_FILES + Math.ceil(posts * FILES_PER_POST) + tagPages + 1 + stories;
  return Math.max(0, FILE_BUDGET - committed);
}
