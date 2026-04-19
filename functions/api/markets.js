// Cloudflare Pages Function — server-side proxy for the live markets ticker.
// Avoids browser CORS issues with Stooq and reduces rate-limit exposure on
// CoinGecko by fanning out from a single edge cache entry.

const CRYPTO = [
  { sym: 'BTC',  id: 'bitcoin' },
  { sym: 'ETH',  id: 'ethereum' },
  { sym: 'SOL',  id: 'solana' },
  { sym: 'XRP',  id: 'ripple' },
  { sym: 'DOGE', id: 'dogecoin' },
];

const STOOQ = [
  { sym: '^SPX',   stooq: '%5Espx' },
  { sym: '^NDX',   stooq: '%5Endx' },
  { sym: '^DJI',   stooq: '%5Edji' },
  { sym: 'EURUSD', stooq: 'eurusd' },
  { sym: 'USDJPY', stooq: 'usdjpy' },
  { sym: 'XAUUSD', stooq: 'xauusd' },
];

async function fetchCrypto() {
  const ids = CRYPTO.map(c => c.id).join(',');
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
  try {
    const r = await fetch(url, { cf: { cacheTtl: 60, cacheEverything: true } });
    if (!r.ok) return {};
    const data = await r.json();
    const out = {};
    for (const c of CRYPTO) {
      const d = data[c.id];
      if (d && typeof d.usd === 'number') {
        out[c.sym] = { v: d.usd, c: typeof d.usd_24h_change === 'number' ? d.usd_24h_change : null };
      }
    }
    return out;
  } catch { return {}; }
}

async function fetchOneStooq(entry) {
  try {
    const r = await fetch(`https://stooq.com/q/l/?s=${entry.stooq}&f=sohlc&h&e=csv`, {
      cf: { cacheTtl: 60, cacheEverything: true },
    });
    if (!r.ok) return null;
    const text = await r.text();
    const lines = text.trim().split('\n');
    if (lines.length < 2) return null;
    const p = lines[1].split(',');
    const open  = parseFloat(p[1]);
    const close = parseFloat(p[4]);
    if (!isFinite(open) || !isFinite(close) || open === 0) return null;
    return { sym: entry.sym, v: close, c: ((close - open) / open) * 100 };
  } catch { return null; }
}

export async function onRequestGet() {
  const [crypto, stooq] = await Promise.all([
    fetchCrypto(),
    Promise.all(STOOQ.map(fetchOneStooq)),
  ]);
  const items = { ...crypto };
  for (const s of stooq) if (s) items[s.sym] = { v: s.v, c: s.c };

  return new Response(JSON.stringify({ items, ts: Date.now() }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
