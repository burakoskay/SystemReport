// A tag becomes a single URL segment under /tags/. Tags that contain a slash
// ("Google I/O") would split into two segments, which Astro rejects with
// "Missing parameter: tag" — and because that throws during static generation,
// one such tag fails the entire build. Collapsing the slash keeps every tag
// addressable. Tags without a slash keep their existing URL unchanged.
export function tagSlug(tag: string): string {
  return tag.replace(/\//g, '-');
}
