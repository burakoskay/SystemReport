// Embedding-based semantic dedup. Catches paraphrased duplicates that
// SimHash misses (e.g., the same story reported in different words by
// different outlets). Cosine similarity ≥ COSINE_THRESHOLD collapses.
//
// Uses Gemini text-embedding-004 (free tier). Fail-open: if the embedding
// API is unavailable, returns input unchanged so the pipeline never blocks
// on a non-essential dedup pass.

import { GoogleGenAI } from '@google/genai';

const COSINE_THRESHOLD = 0.92;
const EMBED_MODEL = 'text-embedding-004';
const MAX_CHARS = 1500;

function embedText(article) {
  const t = `${article.title}\n${(article.content || '').slice(0, MAX_CHARS)}`;
  return t;
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom === 0 ? 0 : dot / denom;
}

export async function collapseSemanticDuplicates(articles) {
  if (!process.env.GEMINI_API_KEY || articles.length < 2) {
    return { kept: articles, collapsed: 0, groups: articles.map(a => [a]) };
  }

  let vectors;
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const res = await ai.models.embedContent({
      model: EMBED_MODEL,
      contents: articles.map(embedText),
    });
    vectors = (res.embeddings || []).map(e => e.values);
    if (vectors.length !== articles.length) throw new Error('embedding count mismatch');
  } catch {
    return { kept: articles, collapsed: 0, groups: articles.map(a => [a]) };
  }

  const kept = [];
  const keptVecs = [];
  const groups = [];
  let collapsed = 0;

  for (let i = 0; i < articles.length; i++) {
    const v = vectors[i];
    const dupIdx = keptVecs.findIndex(kv => cosine(kv, v) >= COSINE_THRESHOLD);
    if (dupIdx === -1) {
      kept.push(articles[i]);
      keptVecs.push(v);
      groups.push([articles[i]]);
    } else {
      groups[dupIdx].push(articles[i]);
      collapsed++;
    }
  }

  return { kept, collapsed, groups };
}
