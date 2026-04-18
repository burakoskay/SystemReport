import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// iTunes/Apple Podcasts + Spotify-compatible podcast feed.
// Only posts with a generated audio_path show up here.

export async function GET(context) {
  const all = await getCollection('posts');
  const posts = all
    .filter(p => p.data.audio_path)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
    .slice(0, 100);

  const siteUrl = (context.site || 'https://www.systemreport.net').toString().replace(/\/$/, '');
  const coverUrl = `${siteUrl}/favicon.svg`;

  const channelITunes = `
<itunes:author>System Report</itunes:author>
<itunes:summary>Autonomous tech news, narrated. One episode per story.</itunes:summary>
<itunes:owner>
  <itunes:name>System Report</itunes:name>
  <itunes:email>podcast@systemreport.net</itunes:email>
</itunes:owner>
<itunes:image href="${coverUrl}" />
<itunes:category text="Technology" />
<itunes:explicit>false</itunes:explicit>
<language>en-us</language>
<atom:link href="${siteUrl}/podcast.xml" rel="self" type="application/rss+xml" />`.trim();

  return rss({
    title: 'System Report — Narrated',
    description: 'Autonomous tech news, narrated. One episode per story.',
    site: siteUrl,
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/',
      atom: 'http://www.w3.org/2005/Atom',
      dc: 'http://purl.org/dc/elements/1.1/',
    },
    items: posts.map((post) => {
      const audioUrl = `${siteUrl}${post.data.audio_path}`;
      const len = post.data.audio_bytes || 0;

      // Rough duration: WAV at ~180kbps ≈ 22.5 KB/s → bytes / 22500 = seconds.
      // Orpheus default WAV is 24kHz mono 16-bit ≈ 48 KB/s. Use 48000.
      const durationSec = Math.max(30, Math.round(len / 48000));
      const mm = Math.floor(durationSec / 60).toString().padStart(2, '0');
      const ss = (durationSec % 60).toString().padStart(2, '0');

      const customData = [
        `<enclosure url="${audioUrl}" type="audio/wav" length="${len}" />`,
        `<itunes:duration>${mm}:${ss}</itunes:duration>`,
        `<itunes:author>System Report</itunes:author>`,
        `<itunes:explicit>false</itunes:explicit>`,
        `<dc:creator>System Report</dc:creator>`,
      ].join('\n');

      return {
        title: post.data.title,
        pubDate: post.data.date,
        description: post.data.description || post.data.title,
        link: `/posts/${post.id}/`,
        customData,
      };
    }),
    customData: channelITunes,
  });
}
