// Google Search grounding via Gemini's built-in googleSearch tool.
// Two modes:
//   1) groundArticle({title, body}) → returns flat [{title, url}] citation list
//      for a "## Sources" block. Used as a fail-open polish step.
//   2) groundWithSpans({title, body}) → returns {citations, supports} where
//      supports = [{startIndex, endIndex, citationIndex}] mapped against the
//      article body. Used for inline numbered footnotes that anchor each
//      cited claim to its source.
//
// Both fail-open: empty results when Gemini is unavailable.

import { GoogleGenAI } from '@google/genai';

const MAX_CITATIONS = 8;

async function callGrounding(title, body) {
  if (!process.env.GEMINI_API_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const prompt = `Repeat the article body below verbatim, then stop. Do not add commentary, do not summarize, do not change wording. While searching for grounding, focus on primary sources for the article's factual claims.

ARTICLE TITLE: ${title}

ARTICLE BODY:
${body.slice(0, 6000)}`;
  const res = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: { tools: [{ googleSearch: {} }] },
  });
  return res?.candidates?.[0]?.groundingMetadata || null;
}

function extractCitations(meta) {
  const chunks = meta?.groundingChunks || [];
  const citations = [];
  const seen = new Map(); // url → index in `citations`
  const indexMap = [];    // chunkIndex → citation index (deduped)
  for (let i = 0; i < chunks.length; i++) {
    const c = chunks[i];
    const url = c?.web?.uri;
    const t = c?.web?.title || url;
    if (!url) { indexMap.push(-1); continue; }
    if (seen.has(url)) { indexMap.push(seen.get(url)); continue; }
    if (citations.length >= MAX_CITATIONS) { indexMap.push(-1); continue; }
    const idx = citations.length;
    seen.set(url, idx);
    citations.push({ title: t, url });
    indexMap.push(idx);
  }
  return { citations, indexMap };
}

export async function groundArticle({ title, body }) {
  try {
    const meta = await callGrounding(title, body);
    if (!meta) return [];
    return extractCitations(meta).citations;
  } catch {
    return [];
  }
}

export async function groundWithSpans({ title, body }) {
  try {
    const meta = await callGrounding(title, body);
    if (!meta) return { citations: [], supports: [] };
    const { citations, indexMap } = extractCitations(meta);
    const supports = (meta.groundingSupports || []).flatMap((s) => {
      const seg = s?.segment;
      if (!seg) return [];
      const text = seg.text || '';
      const chunkIdxs = (s.groundingChunkIndices || [])
        .map((i) => indexMap[i])
        .filter((i) => i >= 0);
      if (chunkIdxs.length === 0 || !text) return [];
      // Dedupe citation indices and keep order stable.
      const cites = Array.from(new Set(chunkIdxs));
      return [{ text, cites }];
    });
    return { citations, supports };
  } catch {
    return { citations: [], supports: [] };
  }
}

// Inserts inline footnote markers like [^1] after every supported sentence in
// `body`. Markers are appended after the matched span text. Returns the
// rewritten body plus a markdown footnote block.
export function applyInlineCitations(body, supports, citations) {
  if (!supports.length || !citations.length) return body;
  let rewritten = body;
  for (const s of supports) {
    const marker = s.cites.map((i) => `[^${i + 1}]`).join('');
    if (!rewritten.includes(s.text)) continue;
    // Avoid duplicating markers on re-runs.
    if (rewritten.includes(s.text + marker)) continue;
    rewritten = rewritten.replace(s.text, s.text + marker);
  }
  const footnotes = citations
    .map((c, i) => `[^${i + 1}]: [${String(c.title).replace(/[\[\]]/g, '')}](${c.url})`)
    .join('\n');
  return `${rewritten}\n\n${footnotes}\n`;
}

export function citationsToMarkdown(citations) {
  if (!citations || citations.length === 0) return '';
  const lines = citations.map(c => `- [${String(c.title).replace(/[\[\]]/g, '')}](${c.url})`);
  return `\n\n## Sources\n\n${lines.join('\n')}\n`;
}
