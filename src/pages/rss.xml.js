import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

/**
 * Converts a raw Markdown string into semantic HTML suitable for RSS feeds.
 * Handles: headings, bold, italic, links, images, blockquotes, unordered
 * lists, ordered lists, inline code, fenced code blocks, and paragraphs.
 */
function markdownToHtml(md) {
  if (!md) return '';
  let html = md;

  // Fenced code blocks (```...```) — must run before inline rules
  html = html.replace(/```[\s\S]*?```/g, (match) => {
    const inner = match.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    return `<pre><code>${inner.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });

  // Split into blocks on double-newlines
  const blocks = html.split(/\n{2,}/);
  const converted = blocks.map((block) => {
    block = block.trim();
    if (!block) return '';

    // Already processed code blocks
    if (block.startsWith('<pre>')) return block;

    // Headings
    if (/^#{1,6}\s/.test(block)) {
      const level = block.match(/^(#{1,6})\s/)[1].length;
      const text = block.replace(/^#{1,6}\s+/, '');
      return `<h${level}>${applyInline(text)}</h${level}>`;
    }

    // Blockquote
    if (block.startsWith('>')) {
      const text = block.replace(/^>\s?/gm, '');
      return `<blockquote>${applyInline(text)}</blockquote>`;
    }

    // Unordered list
    if (/^[-*]\s/m.test(block)) {
      const items = block.split(/\n/).filter(l => /^[-*]\s/.test(l));
      const lis = items.map(li => `<li>${applyInline(li.replace(/^[-*]\s+/, ''))}</li>`).join('');
      return `<ul>${lis}</ul>`;
    }

    // Ordered list
    if (/^\d+\.\s/m.test(block)) {
      const items = block.split(/\n/).filter(l => /^\d+\.\s/.test(l));
      const lis = items.map(li => `<li>${applyInline(li.replace(/^\d+\.\s+/, ''))}</li>`).join('');
      return `<ol>${lis}</ol>`;
    }

    // Regular paragraph
    return `<p>${applyInline(block)}</p>`;
  });

  return converted.filter(Boolean).join('\n');
}

/** Applies inline Markdown formatting (bold, italic, code, links, images). */
function applyInline(text) {
  // Images: ![alt](src)
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  // Links: [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Bold: **text** or __text__
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>');
  // Italic: *text* or _text_
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
  text = text.replace(/_(.+?)_/g, '<em>$1</em>');
  // Inline code: `text`
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
  // Line breaks within a block
  text = text.replace(/\n/g, '<br/>');
  return text;
}

export async function GET(context) {
  const posts = await getCollection('posts');
  const sortedPosts = posts
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 50);

  const siteUrl = (context.site || 'https://www.systemreport.net').toString().replace(/\/$/, '');

  return rss({
    title: 'System Report',
    description: 'In-depth tech news, analysis, and expert commentary on the stories shaping the industry.',
    site: siteUrl,
    xmlns: {
      content: 'http://purl.org/rss/1.0/modules/content/',
      media: 'http://search.yahoo.com/mrss/',
      dc: 'http://purl.org/dc/elements/1.1/',
      atom: 'http://www.w3.org/2005/Atom',
    },
    items: sortedPosts.map((post) => {
      const htmlBody = markdownToHtml(post.body);

      const heroUrl = post.data.hero_image
        ? (post.data.hero_image.startsWith('http')
            ? post.data.hero_image
            : `${siteUrl}${post.data.hero_image}`)
        : '';

      // Parse width/height from Pexels-style URL params (?w=1260&h=750)
      let imgWidth = 1260;
      let imgHeight = 750;
      if (heroUrl) {
        try {
          const u = new URL(heroUrl);
          const w = parseInt(u.searchParams.get('w') || '0');
          const h = parseInt(u.searchParams.get('h') || '0');
          if (w) imgWidth = w;
          if (h) imgHeight = h;
        } catch (_) { /* use defaults */ }
      }

      let customData = '';

      if (heroUrl) {
        // enclosure: standard podcast/media enclosure for broad RSS reader support
        customData += `<enclosure url="${heroUrl}" type="image/jpeg" length="0" />\n`;
        // media:content: used by Google, Bing, and RSS aggregators
        customData += `<media:content url="${heroUrl}" medium="image" type="image/jpeg" width="${imgWidth}" height="${imgHeight}" />\n`;
        // media:thumbnail: preferred by Apple News RSS parser for article thumbnails
        customData += `<media:thumbnail url="${heroUrl}" width="${imgWidth}" height="${imgHeight}" />\n`;
      }

      // dc:creator: used by Apple News and feed readers for byline display
      customData += `<dc:creator>System Report Staff</dc:creator>\n`;

      // category elements: Apple News uses these for topic classification
      const tags = post.data.tags || [];
      for (const tag of tags.slice(0, 5)) {
        customData += `<category><![CDATA[${tag}]]></category>\n`;
      }

      customData += `<content:encoded><![CDATA[${htmlBody}]]></content:encoded>`;

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || post.data.title,
        link: `/posts/${post.id}/`,
        customData,
      };
    }),
    // atom:link self-reference + language declaration
    customData: `<language>en-us</language>\n<atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />`,
  });
}
