import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const HEALTH_FILE = path.join(process.cwd(), 'ops/provider-health.json');

// Rankings per task class. First available provider wins.
const RANKINGS = {
  cluster:  ['gemini', 'groq'],   // Gemini handles JSON schemas natively; Groq is JSON-mode fallback
  draft:    ['groq', 'gemini'],   // Groq's Llama 70B is faster and has higher daily quota for long text
  critique: ['groq', 'gemini'],
  headline: ['groq', 'gemini'],
};

// Cooldown durations keyed by error class
const COOLDOWN_MS = {
  spending_cap:   30 * 24 * 60 * 60 * 1000, // 30 days — Gemini monthly cap
  rate_limit:     10 * 60 * 1000,            // 10 min
  server_error:    5 * 60 * 1000,            // 5 min
  timeout:         2 * 60 * 1000,            // 2 min
};

function classifyError(err) {
  const msg = String(err?.message || err);
  if (/spending cap|RESOURCE_EXHAUSTED/i.test(msg)) return 'spending_cap';
  if (/\b429\b|rate.?limit|too many requests/i.test(msg)) return 'rate_limit';
  if (/\b5\d\d\b|server error|service unavailable/i.test(msg)) return 'server_error';
  if (/timeout/i.test(msg)) return 'timeout';
  return null;
}

async function loadHealth() {
  try {
    return JSON.parse(await fs.readFile(HEALTH_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

async function saveHealth(h) {
  await fs.mkdir(path.dirname(HEALTH_FILE), { recursive: true });
  await fs.writeFile(HEALTH_FILE, JSON.stringify(h, null, 2) + '\n');
}

// --- Provider adapters ---

const providers = {
  groq: {
    available: () => Boolean(process.env.GROQ_API_KEY),
    call: async ({ prompt, json, model }) => {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: model || 'llama-3.1-8b-instant',
          messages: [{ role: 'user', content: prompt }],
          ...(json ? { response_format: { type: 'json_object' } } : {}),
          temperature: 0.7,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Groq ${res.status}: ${body.slice(0, 300)}`);
      }
      const j = await res.json();
      const text = j.choices?.[0]?.message?.content;
      if (!text) throw new Error('Groq: empty response');
      return { text, model: j.model };
    },
  },

  gemini: {
    available: () => Boolean(process.env.GEMINI_API_KEY),
    call: async ({ prompt, json, schema, model }) => {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const config = {};
      if (json || schema) config.responseMimeType = 'application/json';
      if (schema) config.responseSchema = schema;
      const res = await ai.models.generateContent({
        model: model || 'gemini-2.5-flash',
        contents: prompt,
        config,
      });
      const text = res.text;
      if (!text) throw new Error('Gemini: empty response');
      return { text, model: model || 'gemini-2.5-flash' };
    },
  },
};

function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout after ${ms}ms`)), ms)),
  ]);
}

/**
 * Route a generation call across providers for a given task class.
 * Returns { text, provider, model } on success, throws on total failure.
 */
export async function routeCall({ task, prompt, json = false, schema = undefined, timeoutMs = 45000 }) {
  const ranked = RANKINGS[task] || ['groq', 'gemini'];
  const health = await loadHealth();
  const now = Date.now();
  const attempts = [];

  for (const name of ranked) {
    const p = providers[name];
    if (!p) continue;
    if (!p.available()) {
      attempts.push({ provider: name, skipped: 'no credentials' });
      continue;
    }

    const h = health[name] || {};
    if (h.cooldown_until && new Date(h.cooldown_until).getTime() > now) {
      attempts.push({ provider: name, skipped: `cooldown until ${h.cooldown_until}` });
      continue;
    }

    const started = Date.now();
    try {
      // Gemini-native schema routing only works on Gemini; other providers get JSON mode.
      const useSchema = name === 'gemini' ? schema : undefined;
      const result = await withTimeout(p.call({ prompt, json: json || Boolean(schema), schema: useSchema }), timeoutMs);

      h.last_success = new Date().toISOString();
      h.consecutive_failures = 0;
      delete h.cooldown_until;
      health[name] = h;
      await saveHealth(health);

      console.log(`  [router] ${task} via ${name}/${result.model} in ${Date.now() - started}ms`);
      return { text: result.text, provider: name, model: result.model };
    } catch (err) {
      const kind = classifyError(err);
      h.consecutive_failures = (h.consecutive_failures || 0) + 1;
      h.last_error = String(err.message || err).slice(0, 300);
      h.last_failure = new Date().toISOString();
      if (kind && COOLDOWN_MS[kind]) {
        h.cooldown_until = new Date(now + COOLDOWN_MS[kind]).toISOString();
      }
      health[name] = h;
      await saveHealth(health);

      attempts.push({ provider: name, error: h.last_error, classified: kind });
      console.log(`  [router] ${name} failed (${kind || 'unknown'}): ${h.last_error.slice(0, 120)}`);
    }
  }

  const summary = attempts.map(a => `${a.provider}:${a.skipped || a.error || 'unknown'}`).join(' | ');
  throw new Error(`All providers failed for task=${task}. ${summary}`);
}
