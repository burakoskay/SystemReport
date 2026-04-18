// Groq Orpheus TTS. Returns raw WAV bytes.
// Endpoint is OpenAI-compatible: POST /openai/v1/audio/speech.
// Docs: https://console.groq.com/docs/text-to-speech

const ENDPOINT = 'https://api.groq.com/openai/v1/audio/speech';
const MODEL    = 'canopylabs/orpheus-v1-english';
const VOICE    = 'hannah'; // options: troy, hannah, austin
const MAX_INPUT_CHARS = 4000; // Orpheus-style models prefer <5k; we trim to 4k for safety

export async function synthesizeSpeech(text, { signal } = {}) {
  if (!process.env.GROQ_API_KEY) throw new Error('GROQ_API_KEY missing');
  const trimmed = String(text || '').slice(0, MAX_INPUT_CHARS);
  if (!trimmed) throw new Error('TTS: empty input');

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      input: trimmed,
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
