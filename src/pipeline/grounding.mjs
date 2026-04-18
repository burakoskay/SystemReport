// Google Search grounding via Gemini's built-in googleSearch tool.
// Returns a list of citation { title, url } supporting the article's claims.
// Fail-open: if Gemini is unavailable / cap-hit / errors, return [].
//
// Usage: const cites = await groundArticle({ title, body });
// Append to article markdown as a "## Sources" section.

import { GoogleGenAI } from '@google/genai';

const MAX_CITATIONS = 5;

export async function groundArticle({ title, body }) {
  if (!process.env.GEMINI_API_KEY) return [];
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const prompt = `You are fact-checking the article below. Search the web and identify primary sources that corroborate its core claims (announcements, official posts, reputable reporting). Return up to ${MAX_CITATIONS} sources.

ARTICLE TITLE: ${title}

ARTICLE BODY:
${body.slice(0, 4000)}`;

    const res = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    // The SDK exposes grounding metadata on candidates.
    const meta = res?.candidates?.[0]?.groundingMetadata;
    const chunks = meta?.groundingChunks || [];
    const citations = [];
    const seen = new Set();
    for (const c of chunks) {
      const url = c?.web?.uri;
      const titleText = c?.web?.title || url;
      if (!url || seen.has(url)) continue;
      seen.add(url);
      citations.push({ title: titleText, url });
      if (citations.length >= MAX_CITATIONS) break;
    }
    return citations;
  } catch {
    return [];
  }
}

export function citationsToMarkdown(citations) {
  if (!citations || citations.length === 0) return '';
  const lines = citations.map(c => `- [${c.title.replace(/[\[\]]/g, '')}](${c.url})`);
  return `\n\n## Sources\n\n${lines.join('\n')}\n`;
}
