// JSON Feed 1.1 — modern alternative feed format.
// Spec: https://www.jsonfeed.org/version/1.1/
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('posts');
  const sorted = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 50);

  const siteUrl = (context.site || 'https://www.systemreport.net').toString().replace(/\/$/, '');

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'System Report',
    description: 'In-depth tech news, analysis, and expert commentary on the stories shaping the industry.',
    home_page_url: `${siteUrl}/`,
    feed_url: `${siteUrl}/feed.json`,
    language: 'en-US',
    icon: `${siteUrl}/logo.png`,
    favicon: `${siteUrl}/favicon.svg`,
    authors: [{ name: 'System Report Staff', url: `${siteUrl}/about` }],
    items: sorted.map((post) => {
      const hero = post.data.hero_image
        ? (post.data.hero_image.startsWith('http') ? post.data.hero_image : `${siteUrl}${post.data.hero_image}`)
        : undefined;
      return {
        id: `${siteUrl}/posts/${post.id}/`,
        url: `${siteUrl}/posts/${post.id}/`,
        title: post.data.title,
        summary: post.data.description || '',
        content_html: String(post.body || ''),
        date_published: new Date(post.data.date).toISOString(),
        image: hero,
        banner_image: hero,
        tags: post.data.tags || [],
        authors: [{ name: 'System Report Staff' }],
      };
    }),
  };

  return new Response(JSON.stringify(feed, null, 2), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
