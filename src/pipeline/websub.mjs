// WebSub / PubSubHubbub — notify the hub that our feeds changed so subscribed
// aggregators get pushed instead of waiting for their next poll cycle.
// Spec: https://www.w3.org/TR/websub/
// Hub: pubsubhubbub.appspot.com (Google-run, free, keyless).

const HUB = 'https://pubsubhubbub.appspot.com/';
const FEEDS = [
  'https://www.systemreport.net/rss.xml',
  'https://www.systemreport.net/podcast.xml',
];

export async function pingWebSub(feeds = FEEDS) {
  const results = [];
  for (const feed of feeds) {
    try {
      const body = new URLSearchParams({ 'hub.mode': 'publish', 'hub.url': feed });
      const r = await fetch(HUB, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
        signal: AbortSignal.timeout(10000),
      });
      results.push({ feed, ok: r.ok, status: r.status });
    } catch (e) {
      results.push({ feed, ok: false, error: String(e.message || e) });
    }
  }
  return results;
}
