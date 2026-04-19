// Groq Orpheus TTS. Returns raw WAV bytes.
// Endpoint is OpenAI-compatible: POST /openai/v1/audio/speech.
// Docs: https://console.groq.com/docs/text-to-speech
//
// The free tier caps Orpheus at ~1,200 tokens per minute (per request) and
// ~3,600 tokens per day. A full v3-900w article comfortably exceeds the
// per-request limit, so we split the speech text into sentence-bounded
// chunks, synthesize each one separately, and concatenate the WAVs. We also
// cap total input per article so one story can't burn the entire daily
// budget and starve subsequent runs of narration.

const ENDPOINT = 'https://api.groq.com/openai/v1/audio/speech';
const MODEL    = 'canopylabs/orpheus-v1-english';
const VOICE    = 'hannah'; // options: troy, hannah, austin

// Empirical from Groq errors: ~0.69 tokens/char for English. 1,200 TPM / 0.7
// ≈ 1,700 chars — we pad the safety margin.
const MAX_CHARS_PER_CHUNK = 1400;
// Cap total narrated content per article so TPD survives multiple articles
// per cron run. ~4,200 chars ≈ 2 chunks ≈ 2,400 tokens, leaving room.
const MAX_CHARS_PER_ARTICLE = 4200;

// Split on sentence boundaries, then pack sentences greedily until adding
// one more would exceed the chunk size. Keeps chunk boundaries natural-sounding.
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
  // A single sentence longer than the limit — hard-cut it.
  return chunks.flatMap((c) => c.length > maxChars
    ? c.match(new RegExp('.{1,' + maxChars + '}', 'g'))
    : [c]);
}

async function synthesizeOne(text, { signal } = {}) {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: text,
      voice: VOICE,
      response_format: 'wav',
    }),
    signal: signal || AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`TTS ${res.status}: ${body.slice(0, 300)}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1000) throw new Error(`TTS: suspiciously small payload (${buf.length} bytes)`);
  return buf;
}

// Concatenate WAV buffers produced by the same model (same sample rate,
// channels, bit depth). RIFF header = 44 bytes; we keep the first header,
// strip the headers off subsequent chunks, then fix the two size fields
// (overall RIFF size @ offset 4, data chunk size @ offset 40).
function concatWavs(buffers) {
  if (buffers.length === 1) return buffers[0];
  const HEADER = 44;
  const datas = buffers.map((b, i) => i === 0 ? b.subarray(HEADER) : b.subarray(HEADER));
  const headerBuf = Buffer.from(buffers[0].subarray(0, HEADER));
  const dataTotal = datas.reduce((n, d) => n + d.length, 0);
  headerBuf.writeUInt32LE(36 + dataTotal, 4);
  headerBuf.writeUInt32LE(dataTotal, 40);
  return Buffer.concat([headerBuf, ...datas]);
}

export async function synthesizeSpeech(text, { signal } = {}) {
  if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY missing');
  const trimmed = String(text || '').slice(0, MAX_CHARS_PER_ARTICLE).trim();
  if (!trimmed) throw new Error('TTS: empty input');

  const chunks = splitIntoChunks(trimmed, MAX_CHARS_PER_CHUNK);
  const wavs = [];
  for (let i = 0; i < chunks.length; i++) {
    const wav = await synthesizeOne(chunks[i], { signal });
    wavs.push(wav);
  }
  return concatWavs(wavs);
}

// Strip markdown formatting so the voice doesn't say "hash hash title" or "asterisk".
export function markdownToSpeechText(title, description, markdownBody) {
  const body = String(markdownBody || '')
    .replace(/```[\s\S]*?```/g, '')          // code fences
    .replace(/`([^`]+)`/g, '$1')              // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')    // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → text
    .replace(/^#{1,6}\s+/gm, '')              // heading markers
    .replace(/\*\*([^*]+)\*\*/g, '$1')        // bold
    .replace(/\*([^*]+)\*/g, '$1')            // italic
    .replace(/^\s*[-*+]\s+/gm, '')            // list bullets
    .replace(/^\s*>\s+/gm, '')                // blockquotes
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  const head = `${title}. ${description || ''}`.trim();
  return `${head}\n\n${body}`;
}
