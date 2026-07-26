// Build-scoped content cache.
//
// `getCollection()` deserializes the whole collection on every call. With 1,348
// posts (10 MB) and 7,136 translations (54 MB), calling it from page frontmatter
// or a shared component means paying that cost once per generated page — roughly
// 12,700 times across a full build. That is what pushed the static generation
// into an escalating slowdown and then an out-of-memory crash, which in turn
// stopped Cloudflare Pages from ever publishing a new deploy.
//
// Every module in a build shares one module instance, so memoizing the promise
// here collapses those repeated loads into exactly one per collection. The
// derived indexes below exist for the same reason: sorting or filtering the
// full collection inside a page renders O(pages x posts), while building the
// index once and looking up by key is O(1) per page.
//
// Anything that needs the full collection during a page render should go
// through this module rather than calling `getCollection()` directly.

import { getCollection, type CollectionEntry } from 'astro:content';

type Post = CollectionEntry<'posts'>;
type Translation = CollectionEntry<'posts-i18n'>;

let postsPromise: Promise<Post[]> | null = null;
let i18nPromise: Promise<Translation[]> | null = null;

/** All English posts, loaded at most once per build. */
export function allPosts(): Promise<Post[]> {
  postsPromise ??= getCollection('posts');
  return postsPromise;
}

/**
 * All translated posts, loaded at most once per build. The collection is
 * optional — a build with translation output disabled has no entries — so a
 * load failure degrades to an empty list rather than breaking every page.
 */
export function allTranslations(): Promise<Translation[]> {
  i18nPromise ??= getCollection('posts-i18n').catch(() => [] as Translation[]);
  return i18nPromise;
}

let sortedPromise: Promise<Post[]> | null = null;

/** Posts newest-first. Sorted once; callers must treat the array as read-only. */
export function postsByDateDesc(): Promise<Post[]> {
  sortedPromise ??= allPosts().then((posts) =>
    [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf()),
  );
  return sortedPromise;
}

export interface Neighbors {
  prev: Post | null;
  next: Post | null;
}

let neighborsPromise: Promise<Map<string, Neighbors>> | null = null;

/**
 * Previous/next neighbour for every post, keyed by post id. Replaces the
 * per-page `findIndex` over the sorted collection.
 */
export function neighborsById(): Promise<Map<string, Neighbors>> {
  neighborsPromise ??= postsByDateDesc().then((sorted) => {
    const map = new Map<string, Neighbors>();
    for (let i = 0; i < sorted.length; i++) {
      map.set(sorted[i].id, {
        prev: i > 0 ? sorted[i - 1] : null,
        next: i < sorted.length - 1 ? sorted[i + 1] : null,
      });
    }
    return map;
  });
  return neighborsPromise;
}

let translationsPromise: Promise<Map<string, Translation[]>> | null = null;

/**
 * Translations grouped by the English slug they were translated from, so a page
 * can look up its own siblings instead of filtering all 7,136 entries.
 */
export function translationsByCanonicalSlug(): Promise<Map<string, Translation[]>> {
  translationsPromise ??= allTranslations().then((all) => {
    const map = new Map<string, Translation[]>();
    for (const entry of all) {
      // Entry ids are "<locale>/<slug>" because of the glob loader's base path.
      const key = entry.data.canonical_slug || entry.id.split('/').slice(1).join('/');
      const bucket = map.get(key);
      if (bucket) bucket.push(entry);
      else map.set(key, [entry]);
    }
    return map;
  });
  return translationsPromise;
}

let localesPromise: Promise<string[]> | null = null;

/**
 * Locale codes that actually have translated content, in their original case
 * (e.g. "zh-CN"). Used by the language switcher's fallback list, which would
 * otherwise load the entire translation collection on every page that does not
 * supply its own hreflang alternates.
 */
export function translatedLocales(): Promise<string[]> {
  localesPromise ??= allTranslations().then((all) => [
    ...new Set(all.map((entry) => entry.id.split('/')[0])),
  ]);
  return localesPromise;
}
