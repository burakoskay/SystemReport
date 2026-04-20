// Cloudflare Workers AI — Flux-1 Schnell. Returns PNG bytes.
// Docs: https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/

const STEPS = 4; // 4 is the default; 8 is max quality but 2× time. 4 is plenty for thumbnails.

function buildPrompt(visualKeyword, title) {
  // STRICT: never include any text/letters/numbers/words/captions/labels/logos
  // in generated images. Flux readily hallucinates garbled signage — we ban it.
  return `Editorial tech news illustration: ${visualKeyword}. Context: ${title}. Clean minimalist composition, muted palette, abstract-realistic style, subtle grain, 16:9 composition, studio lighting. ABSOLUTELY NO TEXT, no letters, no words, no numbers, no captions, no labels, no signage, no typography, no writing of any kind, no logos, no watermarks, no UI elements with text.`.slice(0, 2048);
}

async function callFlux(accountId, apiToken, visualKeyword, title) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-1-schnell`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: buildPrompt(visualKeyword, title), steps: STEPS }),
    signal: AbortSignal.timeout(60000),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`CF Flux ${res.status}: ${body.slice(0, 300)}`);
  }

  const j = await res.json();
  const b64 = j?.result?.image || j?.image;
  if (!b64) throw new Error('CF Flux: no image in response');
  const buf = Buffer.from(b64, 'base64');
  if (buf.length < 5000) throw new Error(`CF Flux: suspiciously small image (${buf.length} bytes)`);
  return buf;
}

// AI hero is the house style — Pexels photography should only appear when
// Flux is genuinely unavailable, not on a transient 5xx. Retry 3× with
// exponential backoff before surrendering the slot.
export async function generateHeroImage(visualKeyword, title) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken  = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error('Cloudflare credentials missing');

  const MAX_ATTEMPTS = 3;
  let lastErr;
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    try {
      return await callFlux(accountId, apiToken, visualKeyword, title);
    } catch (e) {
      lastErr = e;
      if (i < MAX_ATTEMPTS - 1) {
        const delay = 2000 * Math.pow(2, i);
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }
  throw lastErr;
}
