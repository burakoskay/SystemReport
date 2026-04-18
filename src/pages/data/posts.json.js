// Machine-readable index of every published English post.
// Stable schema: bumping fields requires bumping `_schema_version`.

import { getCollection } from 'astro:content';

const SCHEMA_VERSION = 1;
const SITE = 'https://www.systemreport.net';

export async function GET() {
  const posts = await getCollection('posts');
  const items = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .map((p) => ({
      slug: p.id,
      url: `${SITE}/posts/${p.id}`,
      title: p.data.title,
      description: p.data.description || null,
      date: p.data.date.toISOString(),
      tags: p.data.tags || [],
      hero_image: p.data.hero_image
        ? (p.data.hero_image.startsWith('http') ? p.data.hero_image : `${SITE}${p.data.hero_image}`)
        : null,
      audio_path: p.data.audio_path ? `${SITE}${p.data.audio_path}` : null,
      sources_count: p.data.sources_count ?? null,
      story_url: `${SITE}/stories/${p.id}`,
    }));
  const body = JSON.stringify({
    _schema_version: SCHEMA_VERSION,
    generated_at: new Date().toISOString(),
    count: items.length,
    items,
  }, null, 2);
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  });
}
