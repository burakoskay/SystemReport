import { spawn } from 'node:child_process';

// Text-to-speech provider chain.
//
// Audio narration ("Listen to this article") is a load-bearing site feature,
// not a nice-to-have. This module must produce audio for every article that
// goes out — otherwise the button vanishes from the page. Earlier this ran
// on Groq Orpheus alone, whose free tier caps at ~3,600 tokens/DAY; one
// article burns ~2,400, so runs #2 onward shipped without audio.
//
// Provider chain (tried in order, with retries):
//   1. Cloudflare Workers AI — @cf/myshell-ai/melotts. Generous quota,
//      returns MP3 bytes. Primary.
//   2. Groq Orpheus (canopylabs/orpheus-v1-english). Returns WAV bytes.
//      Fallback when CF is unavailable or fails repeatedly.
//
// Returns { bytes: Buffer, ext: 'mp3'|'wav', mime: string, provider: string }.
// The caller chooses where to write and what to record in frontmatter.

const CF_MELOTTS_URL_TMPL = (acct) =>
  `https://api.cloudflare.com/client/v4/accounts/${acct}/ai/run/@cf/myshell-ai/melotts`;
const GROQ_ORPHEUS_URL = 'https://api.groq.com/openai/v1/audio/speech';

const GROQ_ORPHEUS_MODEL = 'canopylabs/orpheus-v1-english';
const GROQ_ORPHEUS_VOICE = 'hannah';

// Cap total narrated content per article — long pieces would otherwise
// chew through quotas and produce 20-minute audio nobody listens to.
const MAX_CHARS_PER_ARTICLE = 6000;

// Per-chunk cap. MeloTTS is comfortable with long inputs; we split anyway so
// a single bad chunk doesn't blow up the whole narration.
const MAX_CHARS_PER_CHUNK = 1400;

function splitIntoChunks(text, maxChars) {
  const sentences = String(text)
    .replace(/\s+/g, ' ')
    .match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
  const chunks = [];
  let cur = '';
  for (const s of sentences) {
    if ((cur + s).length > maxChars && cur) {
      chunks.push(cur.trim());
      cur = s;
    } else {
      cur += s;
    }
  }
  if (cur.trim()) chunks.push(cur.trim());
  return chunks.flatMap((c) => c.length > maxChars
    ? c.match(new RegExp('.{1,' + maxChars + '}', 'g'))
    : [c]);
}

async function withRetry(fn, { retries = 2, baseDelay = 1500 } = {}) {
  let lastErr;
  for (let i = 0; i <= retries; i++) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      if (i === retries) throw e;
      const is429 = String(e.message || '').includes('429');
      const delay = is429 ? 10000 : baseDelay * Math.pow(2, i);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
  throw lastErr;
}

// --- Cloudflare MeloTTS (MP3) ---

async function cfMeloOne(text) {
  const acct = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!acct || !token) throw new Error('Cloudflare credentials missing');
  const res = await fetch(CF_MELOTTS_URL_TMPL(acct), {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: text, lang: 'en' }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`CF MeloTTS ${res.status}: ${body.slice(0, 300)}`);
  }
  const j = await res.json();
  const b64 = j?.result?.audio || j?.audio;
  if (!b64) throw new Error('CF MeloTTS: no audio in response');
  const buf = Buffer.from(b64, 'base64');
  if (buf.length < 1000) throw new Error(`CF MeloTTS: suspiciously small (${buf.length} bytes)`);
  return buf;
}

// Concatenate MP3 buffers. MP3 is frame-based — naive byte concatenation
// plays back fine in every modern browser we care about. No re-encoding.
function concatMp3s(buffers) {
  return buffers.length === 1 ? buffers[0] : Buffer.concat(buffers);
}

async function synthesizeCloudflare(text) {
  const chunks = splitIntoChunks(text, MAX_CHARS_PER_CHUNK);
  const parts = [];
  for (const c of chunks) {
    // 4 retries: MeloTTS quota is generous, the failure mode is transient CF
    // edge hiccups. Cheaper to retry than to fall through to Groq's daily cap.
    parts.push(await withRetry(() => cfMeloOne(c), { retries: 4 }));
  }
  return finalize(concatMp3s(parts), 'cloudflare-melotts');
}

// --- Groq Orpheus (WAV) ---

async function groqOrpheusOne(text) {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error('GROQ_API_KEY missing');
  const res = await fetch(GROQ_ORPHEUS_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_ORPHEUS_MODEL,
      input: text,
      voice: GROQ_ORPHEUS_VOICE,
      response_format: 'wav',
    }),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Groq Orpheus ${res.status}: ${body.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`Groq Orpheus: suspiciously small (${buf.length} bytes)`);
  return buf;
}

// Concatenate WAV buffers (same sample rate, channels, bit depth assumed).
// Keep the first header, strip subsequent headers, fix size fields.
function concatWavs(buffers) {
  if (buffers.length === 1) return buffers[0];
  const HEADER = 44;
  const datas = buffers.map((b) => b.subarray(HEADER));
  const headerBuf = Buffer.from(buffers[0].subarray(0, HEADER));
  const dataTotal = datas.reduce((n, d) => n + d.length, 0);
  headerBuf.writeUInt32LE(36 + dataTotal, 4);
  headerBuf.writeUInt32LE(dataTotal, 40);
  return Buffer.concat([headerBuf, ...datas]);
}

async function synthesizeGroq(text) {
  const GROQ_CHUNK = 1400; // Orpheus 1,200 TPM limit, ~0.69 tok/char.
  const chunks = splitIntoChunks(text, GROQ_CHUNK);
  const parts = [];
  for (const c of chunks) {
    parts.push(await withRetry(() => groqOrpheusOne(c), { retries: 1 }));
  }
  return finalize(concatWavs(parts), 'groq-orpheus');
}

// --- Normalization ---
//
// Providers are wildly inconsistent about encoding. CF MeloTTS has been
// observed returning ~3 Mbps output labeled as MP3 (70s clip → 28 MB),
// which breaks Cloudflare Pages' 25 MiB per-asset limit and halts deploys.
// Groq returns uncompressed WAV. Transcoding every output through ffmpeg
// to a fixed 64 kbps mono MP3 guarantees small (~0.5 MB/min), valid audio
// regardless of what any provider returns. Safety cap: ~20 MiB for a 6000-
// char article at typical speech rate — well under the 25 MiB Pages limit.
async function normalizeToMp3(buffer) {
  return new Promise((resolve, reject) => {
    const ff = spawn('ffmpeg', [
      '-hide_banner', '-loglevel', 'error',
      '-i', 'pipe:0',
      '-vn',
      '-ac', '1',
      '-ar', '22050',
      '-b:a', '64k',
      '-codec:a', 'libmp3lame',
      '-f', 'mp3',
      'pipe:1',
    ], { stdio: ['pipe', 'pipe', 'pipe'] });

    const out = [];
    const err = [];
    ff.stdout.on('data', (d) => out.push(d));
    ff.stderr.on('data', (d) => err.push(d));
    ff.on('error', (e) => reject(new Error(`ffmpeg spawn failed (is it installed?): ${e.message}`)));
    ff.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`ffmpeg exit ${code}: ${Buffer.concat(err).toString('utf8').slice(0, 300)}`));
      }
      resolve(Buffer.concat(out));
    });

    ff.stdin.on('error', (e) => reject(new Error(`ffmpeg stdin: ${e.message}`)));
    ff.stdin.end(buffer);
  });
}

// Hard ceiling below Cloudflare Pages' 25 MiB per-file limit. If we ever hit
// this post-normalization something is very wrong — refuse rather than ship
// a file that would break the site deploy.
const MAX_AUDIO_BYTES = 22 * 1024 * 1024;

async function finalize(bytes, provider) {
  const mp3 = await normalizeToMp3(bytes);
  if (mp3.length > MAX_AUDIO_BYTES) {
    throw new Error(`TTS output oversized after normalize: ${mp3.length} bytes (cap ${MAX_AUDIO_BYTES})`);
  }
  return { bytes: mp3, ext: 'mp3', mime: 'audio/mpeg', provider };
}

// --- Public API ---

export async function synthesizeSpeech(text) {
  const trimmed = String(text || '').slice(0, MAX_CHARS_PER_ARTICLE).trim();
  if (!trimmed) throw new Error('TTS: empty input');

  const errors = [];

  // Try Cloudflare first.
  if (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) {
    try {
      return await synthesizeCloudflare(trimmed);
    } catch (e) {
      errors.push(`cloudflare: ${e.message.slice(0, 160)}`);
    }
  } else {
    errors.push('cloudflare: no credentials');
  }

  // Groq fallback.
  if (process.env.GROQ_API_KEY) {
    try {
      return await synthesizeGroq(trimmed);
    } catch (e) {
      errors.push(`groq: ${e.message.slice(0, 160)}`);
    }
  } else {
    errors.push('groq: no credentials');
  }

  throw new Error(`TTS: all providers failed — ${errors.join(' | ')}`);
}

// Strip markdown so the voice doesn't say "hash hash title" or "asterisk."
// Also strip footnote markers like [^3] and inline URLs — they're noise in audio.
export function markdownToSpeechText(title, description, markdownBody) {
  const body = String(markdownBody || '')
    .replace(/```[\s\S]*?```/g, '')           // fenced code
    .replace(/`([^`]+)`/g, '$1')               // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')     // images
    .replace(/\[\^?[^\]]+\]:[^\n]*/gm, '')    // footnote definitions
    .replace(/\[\^\d+\]/g, '')                 // footnote references [^1]
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')  // links → text
    .replace(/^#{1,6}\s+/gm, '')               // heading markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')         // bold
    .replace(/\*([^*]+)\*/g, '$1')             // italic
    .replace(/^\s*[-*+]\s+/gm, '')             // list bullets
    .replace(/^\s*>\s+/gm, '')                 // blockquotes
    .replace(/^\s*\d+\.\s+/gm, '')             // numbered list markers
    .replace(/\|.*\|/g, '')                    // strip markdown tables (|col|col|)
    .replace(/-{3,}/g, '')                     // horizontal rules / table dividers
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const head = `${title}. ${description || ''}`.trim();
  return `${head}\n\n${body}`;
}
