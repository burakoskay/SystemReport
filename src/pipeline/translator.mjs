// LLM translation. Uses the router so we get free failover across providers.
// Returns { title, description, body } translated to the target locale.

import { Type } from '@google/genai';
import { routeCall } from './router.mjs';

// Active locales. Adding a new one is one line; downstream routing/sitemap pick it up.
export const LOCALES = {
  tr: { name: 'Turkish',              hreflang: 'tr',    native: 'Türkçe'    },
  es: { name: 'Spanish',              hreflang: 'es',    native: 'Español'   },
  fr: { name: 'French',               hreflang: 'fr',    native: 'Français'  },
  de: { name: 'German',               hreflang: 'de',    native: 'Deutsch'   },
  ja: { name: 'Japanese',             hreflang: 'ja',    native: '日本語'      },
  'zh-CN': { name: 'Simplified Chinese', hreflang: 'zh-CN', native: '简体中文' },
  ko: { name: 'Korean',               hreflang: 'ko',    native: '한국어'      },
  pt: { name: 'Portuguese (Brazil)',  hreflang: 'pt-BR', native: 'Português' },
  it: { name: 'Italian',              hreflang: 'it',    native: 'Italiano'  },
  ar: { name: 'Arabic',               hreflang: 'ar',    native: 'العربية'   },
};

const translationSchema = {
  type: Type.OBJECT,
  properties: {
    title:       { type: Type.STRING },
    description: { type: Type.STRING },
    body:        { type: Type.STRING },
  },
  required: ['title', 'description', 'body'],
};

export async function translateArticle({ title, description, body }, locale) {
  const meta = LOCALES[locale];
  if (!meta) throw new Error(`Unknown locale: ${locale}`);

  const prompt = `Translate the following English tech-news article into ${meta.name} (${meta.native}).

Rules:
- Preserve all markdown formatting exactly: headings (##), bold (**...**), italic (*...*), links, lists, code spans.
- Translate technical terms naturally — keep universally English terms (API, GPU, LLM, GitHub, OpenAI, Anthropic, etc.) untranslated; localize verbs and connective tissue.
- Description must stay under 160 characters.
- Do not add a translator's note. Do not add anything not in the source. Do not change facts or names.
- Return JSON: { "title": "...", "description": "...", "body": "..." }.

ENGLISH TITLE: ${title}

ENGLISH DESCRIPTION: ${description || ''}

ENGLISH BODY:
${body}`;

  // 'draft' task class works fine for translation — long-form, structured output.
  const res = await routeCall({ task: 'draft', prompt, schema: translationSchema, timeoutMs: 60000 });
  const parsed = JSON.parse(res.text);
  if (!parsed.title || !parsed.body) {
    throw new Error(`Translation to ${locale} missing fields from ${res.provider}/${res.model}`);
  }
  return {
    title:       String(parsed.title).trim(),
    description: String(parsed.description || '').trim().slice(0, 160),
    body:        String(parsed.body).trim(),
    _translator: `${res.provider}/${res.model}`,
  };
}
