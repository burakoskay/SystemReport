import { getCollection } from 'astro:content';

function xmlEscape(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(context) {
  const posts = await getCollection('posts');
  const siteBase = (context.site || 'https://www.systemreport.net').toString().replace(/\/$/, '');

  // Google News Sitemaps must only include articles published in the last 48 hours.
  // CAVEAT: This filter runs at BUILD TIME. If GitHub Actions builds hourly, an article
  // published 47h before a build will appear here, but may have logically "expired" by
  // the time Googlebot crawls 1-2 hours later. This is an inherent limitation of static
  // site generators. Increasing build frequency mitigates this.
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const recentPosts = posts
    .filter((post) => post.data.date >= fortyEightHoursAgo)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  sitemapXml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n`;
  sitemapXml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  for (const post of recentPosts) {
    const postUrl = `${siteBase}/posts/${post.id}/`;
    const pubDate = post.data.date.toISOString();
    const title = xmlEscape(post.data.title);
    const tags = (post.data.tags || []).slice(0, 10); // Google News keywords: max 10

    sitemapXml += `  <url>\n`;
    sitemapXml += `    <loc>${postUrl}</loc>\n`;

    // Google News entry
    sitemapXml += `    <news:news>\n`;
    sitemapXml += `      <news:publication>\n`;
    sitemapXml += `        <news:name>System Report</news:name>\n`;
    sitemapXml += `        <news:language>en</news:language>\n`;
    sitemapXml += `      </news:publication>\n`;
    sitemapXml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
    sitemapXml += `      <news:title>${title}</news:title>\n`;
    if (tags.length > 0) {
      sitemapXml += `      <news:keywords>${xmlEscape(tags.join(', '))}</news:keywords>\n`;
    }
    sitemapXml += `    </news:news>\n`;

    // Image entry — improves Google Discover / News CTR
    if (post.data.hero_image) {
      const imageUrl = post.data.hero_image.startsWith('http')
        ? post.data.hero_image
        : `${siteBase}${post.data.hero_image}`;
      sitemapXml += `    <image:image>\n`;
      sitemapXml += `      <image:loc>${xmlEscape(imageUrl)}</image:loc>\n`;
      sitemapXml += `      <image:title>${title}</image:title>\n`;
      sitemapXml += `    </image:image>\n`;
    }

    sitemapXml += `  </url>\n`;
  }

  sitemapXml += `</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
