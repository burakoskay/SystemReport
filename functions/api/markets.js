// Cloudflare Pages Function — server-side proxy for the live markets ticker.
// Avoids browser CORS issues with Stooq and reduces rate-limit exposure on
// CoinGecko by fanning out from a single edge cache entry.

// Binance spot pairs. CoinGecko blocks Cloudflare Worker IPs with 403/429,
// so we use Binance's public ticker endpoint instead — no key, CF-friendly,
// and returns both lastPrice and 24h % change in one call.
const CRYPTO = [
  { sym: 'BTC',  pair: 'BTCUSDT'  },
  { sym: 'ETH',  pair: 'ETHUSDT'  },
  { sym: 'SOL',  pair: 'SOLUSDT'  },
  { sym: 'XRP',  pair: 'XRPUSDT'  },
  { sym: 'DOGE', pair: 'DOGEUSDT' },
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
  const symbols = JSON.stringify(CRYPTO.map(c => c.pair));
  const url = `https://api.binance.com/api/v3/ticker/24hr?symbols=${encodeURIComponent(symbols)}`;
  try {
    const r = await fetch(url, { cf: { cacheTtl: 60, cacheEverything: true } });
    if (!r.ok) return {};
    const data = await r.json();
    const byPair = {};
    for (const row of Array.isArray(data) ? data : []) byPair[row.symbol] = row;
    const out = {};
    for (const c of CRYPTO) {
      const d = byPair[c.pair];
      if (!d) continue;
      const price = parseFloat(d.lastPrice);
      const chg   = parseFloat(d.priceChangePercent);
      if (isFinite(price)) out[c.sym] = { v: price, c: isFinite(chg) ? chg : null };
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

// FX rates from Frankfurter (ECB reference rates, keyless, CORS-open).
// Used client-side to re-quote USD-denominated items in the user's chosen
// display currency. Kept to the currencies we expose in the ticker dropdown.
const FX_TARGETS = ['EUR', 'GBP', 'JPY', 'TRY', 'CAD', 'AUD', 'INR', 'CNY', 'CHF', 'MXN', 'BRL'];

async function fetchRates() {
  try {
    const url = `https://api.frankfurter.app/latest?from=USD&to=${FX_TARGETS.join(',')}`;
    const r = await fetch(url, { cf: { cacheTtl: 3600, cacheEverything: true } });
    if (!r.ok) return { USD: 1 };
    const data = await r.json();
    return { USD: 1, ...(data.rates || {}) };
  } catch { return { USD: 1 }; }
}

export async function onRequestGet() {
  const [crypto, stooq, rates] = await Promise.all([
    fetchCrypto(),
    Promise.all(STOOQ.map(fetchOneStooq)),
    fetchRates(),
  ]);
  const items = { ...crypto };
  for (const s of stooq) if (s) items[s.sym] = { v: s.v, c: s.c };

  return new Response(JSON.stringify({ items, rates, ts: Date.now() }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
