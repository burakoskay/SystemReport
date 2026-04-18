// One JSON object per line: { slug, url, sources_count, tags, date }.
// Smaller and stream-friendlier than posts.json. Useful for downstream
// embeddings, dashboards, ML pipelines.

import { getCollection } from 'astro:content';

const SITE = 'https://www.systemreport.net';

export async function GET() {
  const posts = await getCollection('posts');
  const lines = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((p) => JSON.stringify({
      slug: p.id,
      url: `${SITE}/posts/${p.id}`,
      title: p.data.title,
      date: p.data.date.toISOString(),
      sources_count: p.data.sources_count ?? null,
      tags: p.data.tags || [],
    }));
  return new Response(lines.join('\n') + '\n', {
    headers: {
      'Content-Type': 'application/x-ndjson; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
