// IndexNow — instant URL submission to Bing, Yandex, Seznam, Naver, Yep.
// One POST per batch. The key file must be served at /<key>.txt at the root.
// We use a deterministic key derived from a project secret so the file can
// be checked in (no rotating value). Set INDEXNOW_KEY env to override.

import crypto from 'crypto';

// IndexNow spec: `host` and `urlList` entries must share the same host.
// Our canonical surface is www, so all of these must agree.
const HOST = 'www.systemreport.net';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

export function getIndexNowKey() {
  // Derive a stable 32-hex key from any project-side seed so the validator
  // file can sit in /public without secrets leaking. Default seed is the
  // host so a fresh checkout still resolves consistently.
  const seed = process.env.INDEXNOW_KEY || `systemreport-indexnow-${HOST}`;
  return crypto.createHash('sha256').update(seed).digest('hex').slice(0, 32);
}

export async function pingIndexNow(urls) {
  if (!Array.isArray(urls) || urls.length === 0) return { ok: true, skipped: true };
  const key = getIndexNowKey();
  try {
    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        host: HOST,
        key,
        keyLocation: `https://${HOST}/${key}.txt`,
        urlList: urls.slice(0, 10000),
      }),
      signal: AbortSignal.timeout(10000),
    });
    return { ok: r.ok, status: r.status, count: urls.length };
  } catch (e) {
    return { ok: false, error: String(e.message || e) };
  }
}
