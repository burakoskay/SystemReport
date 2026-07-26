// Cloudflare Pages Function — server-side proxy for the live markets ticker.
// Avoids browser CORS issues with Stooq and reduces rate-limit exposure on
// CoinGecko by fanning out from a single edge cache entry.

// Crypto from Kraken's public ticker. CoinGecko blocks Cloudflare Worker IPs
// with 403/429, and Binance geo-blocks the datacenter ranges Workers egress
// from (it answers fine from a residential IP, which is what made this look
// healthy in local testing while the deployed ticker showed no data at all).
// Kraken is keyless, CORS-open and serves every pair we quote in one call.
// `c` is the last trade and `o` today's opening price, so the 24h change is
// derived rather than returned directly.
const CRYPTO = [
  { sym: 'BTC',  pair: 'XBTUSD', result: 'XXBTZUSD' },
  { sym: 'ETH',  pair: 'ETHUSD', result: 'XETHZUSD' },
  { sym: 'SOL',  pair: 'SOLUSD', result: 'SOLUSD'   },
  { sym: 'XRP',  pair: 'XRPUSD', result: 'XXRPZUSD' },
  { sym: 'DOGE', pair: 'XDGUSD', result: 'XDGUSD'   },
];

// Indices, FX and gold from Yahoo's chart endpoint. Stooq's /q/l/ CSV quote
// API now 404s for every symbol and parameter combination, including plain
// ones and with a browser user-agent — it is gone, not misconfigured, which
// is why all six of these read as "—" on the live ticker.
const YAHOO = [
  { sym: '^SPX',   y: '^GSPC'    },
  { sym: '^NDX',   y: '^NDX'     },
  { sym: '^DJI',   y: '^DJI'     },
  { sym: 'EURUSD', y: 'EURUSD=X' },
  { sym: 'USDJPY', y: 'USDJPY=X' },
  { sym: 'XAUUSD', y: 'GC=F'     },
];

async function fetchCrypto() {
  const pairs = CRYPTO.map(c => c.pair).join(',');
  const url = `https://api.kraken.com/0/public/Ticker?pair=${pairs}`;
  const r = await fetch(url, { cf: { cacheTtl: 60, cacheEverything: true } });
  if (!r.ok) throw new Error(`Kraken HTTP ${r.status}`);
  const data = await r.json();
  if (data.error?.length) throw new Error(`Kraken: ${data.error.join(', ')}`);

  const result = data.result || {};
  const out = {};
  for (const c of CRYPTO) {
    // Kraken's response keys don't always match the requested pair name.
    const d = result[c.result] || result[c.pair];
    if (!d) continue;
    const price = parseFloat(d.c?.[0]);
    const open = parseFloat(d.o);
    if (!isFinite(price)) continue;
    const chg = isFinite(open) && open !== 0 ? ((price - open) / open) * 100 : null;
    out[c.sym] = { v: price, c: chg };
  }
  return out;
}

async function fetchOneQuote(entry) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(entry.y)}?interval=1d&range=1d`;
  const r = await fetch(url, {
    // Yahoo returns 403 to requests without a browser-shaped user-agent.
    headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'application/json' },
    cf: { cacheTtl: 60, cacheEverything: true },
  });
  if (!r.ok) throw new Error(`${entry.sym}: HTTP ${r.status}`);
  const meta = (await r.json())?.chart?.result?.[0]?.meta;
  if (!meta) throw new Error(`${entry.sym}: no chart metadata`);

  const price = Number(meta.regularMarketPrice);
  const prev = Number(meta.chartPreviousClose ?? meta.previousClose);
  if (!isFinite(price)) throw new Error(`${entry.sym}: no price`);
  const chg = isFinite(prev) && prev !== 0 ? ((price - prev) / prev) * 100 : null;
  return { sym: entry.sym, v: price, c: chg };
}

// FX rates from Frankfurter (ECB reference rates, keyless, CORS-open).
// Used client-side to re-quote USD-denominated items in the user's chosen
// display currency. Kept to the currencies we expose in the ticker dropdown.
const FX_TARGETS = ['EUR', 'GBP', 'JPY', 'TRY', 'CAD', 'AUD', 'INR', 'CNY', 'CHF', 'MXN', 'BRL'];

async function fetchRates() {
  const url = `https://api.frankfurter.app/latest?from=USD&to=${FX_TARGETS.join(',')}`;
  const r = await fetch(url, { cf: { cacheTtl: 3600, cacheEverything: true } });
  if (!r.ok) throw new Error(`Frankfurter HTTP ${r.status}`);
  const data = await r.json();
  return { USD: 1, ...(data.rates || {}) };
}

export async function onRequestGet(context) {
  // Each source is settled independently so one outage degrades a few rows
  // rather than blanking the whole ticker. Failures are reported in `errors`
  // instead of being swallowed — the previous bare `catch { return {} }` meant
  // both upstreams could die and the endpoint would still answer 200 with an
  // empty payload, which is exactly how this went unnoticed.
  const [cryptoRes, quoteRes, ratesRes] = await Promise.all([
    Promise.allSettled([fetchCrypto()]).then(r => r[0]),
    Promise.allSettled(YAHOO.map(fetchOneQuote)),
    Promise.allSettled([fetchRates()]).then(r => r[0]),
  ]);

  const items = {};
  const errors = [];

  if (cryptoRes.status === 'fulfilled') Object.assign(items, cryptoRes.value);
  else errors.push(String(cryptoRes.reason?.message || cryptoRes.reason));

  for (const q of quoteRes) {
    if (q.status === 'fulfilled') items[q.value.sym] = { v: q.value.v, c: q.value.c };
    else errors.push(String(q.reason?.message || q.reason));
  }

  const rates = ratesRes.status === 'fulfilled' ? ratesRes.value : { USD: 1 };
  if (ratesRes.status === 'rejected') {
    errors.push(String(ratesRes.reason?.message || ratesRes.reason));
  }
  if (errors.length) console.error('markets: %s', errors.join(' | '));

  const origin = context.request.headers.get('Origin');
  const allowedOrigins = ['https://www.systemreport.net', 'http://localhost:4321', 'http://localhost:8788'];
  let allowOrigin = 'https://www.systemreport.net';

  if (origin && (allowedOrigins.includes(origin) || origin.endsWith('.systemreport.net'))) {
    allowOrigin = origin;
  }

  return new Response(JSON.stringify({ items, rates, ts: Date.now(), ...(errors.length ? { errors } : {}) }), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=60, s-maxage=60',
      'Access-Control-Allow-Origin': allowOrigin,
      'Vary': 'Origin',
    },
  });
}
