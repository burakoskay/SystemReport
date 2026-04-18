// Cloudflare Workers AI — Flux-1 Schnell. Returns PNG bytes.
// Docs: https://developers.cloudflare.com/workers-ai/models/flux-1-schnell/

const STEPS = 4; // 4 is the default; 8 is max quality but 2× time. 4 is plenty for thumbnails.

function buildPrompt(visualKeyword, title) {
  // Editorial illustration prompt — no text, clean aesthetic, matches site's monochrome-ish vibe.
  return `Editorial tech news illustration: ${visualKeyword}. Context: ${title}. Clean minimalist composition, muted palette, abstract-realistic style, subtle grain, no text or logos, 16:9 composition, studio lighting.`.slice(0, 2048);
}

export async function generateHeroImage(visualKeyword, title) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken  = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) throw new Error('Cloudflare credentials missing');

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
