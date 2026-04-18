import fs from 'fs/promises';
import path from 'path';
import { GoogleGenAI } from '@google/genai';

const HEALTH_FILE = path.join(process.cwd(), 'ops/provider-health.json');
const TELEMETRY_DIR = path.join(process.cwd(), 'ops/telemetry');

// Append one JSONL record per call attempt. Non-fatal on disk errors.
async function logTelemetry(record) {
  try {
    await fs.mkdir(TELEMETRY_DIR, { recursive: true });
    const day = new Date().toISOString().slice(0, 10);
    const file = path.join(TELEMETRY_DIR, `${day}.jsonl`);
    await fs.appendFile(file, JSON.stringify(record) + '\n');
  } catch {
    // Telemetry must never block a pipeline run.
  }
}

// Rankings per task class. Each entry is [provider, model] or just 'provider' (uses default model).
// Ordered by preference; first available wins. Model choices match Groq/Gemini free-tier quotas as of 2026-04.
//
// Groq quotas cheat sheet (RPM / RPD / TPD):
//   llama-3.1-8b-instant          30 / 14.4K / 500K   — highest volume, headlines, dedup
//   llama-3.3-70b-versatile       30 / 1K    / 100K   — quality drafts (scarce)
//   openai/gpt-oss-120b           30 / 1K    / 200K   — critique (different family than Llama)
//   openai/gpt-oss-20b            30 / 1K    / 200K   — cheaper critique
//   qwen/qwen3-32b                60 / 1K    / 500K   — best for structured JSON, highest RPM
//   meta-llama/llama-4-scout-17b  30 / 1K    / 500K   — large-context drafting fallback
// Gemini 2.5 Flash: 500 RPD, 1M TPD. Currently cap-hit; router cools down 30d on spending_cap 429.
const RANKINGS = {
  // Structured JSON tasks on a LARGE input (clustering a full feed batch). Needs high TPM.
  // Scout 17B has 30K TPM (vs 6K for qwen/llama-8b). Gemini has high TPM too, currently cap-hit.
  cluster:  [['groq', 'meta-llama/llama-4-scout-17b-16e-instruct'], ['cloudflare', '@cf/meta/llama-3.3-70b-instruct-fp8-fast'], ['gemini', 'gemini-2.5-flash'], ['groq', 'qwen/qwen3-32b'], ['groq', 'llama-3.1-8b-instant']],
  // Long-form drafting — Llama 70B first (quality), then Scout 17B (cheaper tokens), Gemini, 8B fallback.
  draft:    [['groq', 'llama-3.3-70b-versatile'], ['groq', 'meta-llama/llama-4-scout-17b-16e-instruct'], ['cloudflare', '@cf/meta/llama-3.3-70b-instruct-fp8-fast'], ['gemini', 'gemini-2.5-flash'], ['groq', 'llama-3.1-8b-instant']],
  // Alt draft (parallel B-lane) — different-family primary so two drafts sound genuinely different.
  'draft-b': [['groq', 'openai/gpt-oss-120b'], ['cloudflare', '@cf/qwen/qwen2.5-coder-32b-instruct'], ['groq', 'meta-llama/llama-4-scout-17b-16e-instruct'], ['groq', 'qwen/qwen3-32b'], ['gemini', 'gemini-2.5-flash']],
  // Judge — picks between two drafts. Uses a different family than either drafter when possible.
  judge:    [['groq', 'qwen/qwen3-32b'], ['cloudflare', '@cf/meta/llama-3.1-8b-instruct'], ['groq', 'openai/gpt-oss-20b'], ['gemini', 'gemini-2.5-flash']],
  // Critique should use a different model family than the draft to catch same-family blind spots.
  critique: [['groq', 'openai/gpt-oss-120b'], ['cloudflare', '@cf/qwen/qwen2.5-coder-32b-instruct'], ['groq', 'openai/gpt-oss-20b'], ['gemini', 'gemini-2.5-flash']],
  // Headlines / short tasks — small & fast.
  headline: [['groq', 'llama-3.1-8b-instant'], ['cloudflare', '@cf/meta/llama-3.1-8b-instruct'], ['groq', 'qwen/qwen3-32b'], ['gemini', 'gemini-2.5-flash-lite']],
  // SEO metadata polish — rules-heavy, medium model.
  'seo-polish': [['groq', 'openai/gpt-oss-20b'], ['cloudflare', '@cf/meta/llama-3.1-8b-instruct'], ['gemini', 'gemini-2.5-flash'], ['groq', 'llama-3.1-8b-instant']],
};

// Cooldown durations keyed by error class
const COOLDOWN_MS = {
  spending_cap:    30 * 24 * 60 * 60 * 1000, // 30 days — Gemini monthly cap
  permission:       7 * 24 * 60 * 60 * 1000, // 7 days — model disabled at org level
  // Note: 'too_large' is a prompt-level failure, not a model health issue.
  // We intentionally do NOT cool down the model — just fail forward to a larger-context provider.
  rate_limit:          10 * 60 * 1000,        // 10 min — per-minute quota
  daily_quota:          6 * 60 * 60 * 1000,   // 6 h — RPD exhausted
  server_error:         5 * 60 * 1000,
  timeout:              2 * 60 * 1000,
};

function classifyError(err) {
  const msg = String(err?.message || err);
  if (/spending cap|RESOURCE_EXHAUSTED/i.test(msg)) return 'spending_cap';
  if (/permission_blocked|403/i.test(msg)) return 'permission';
  if (/\b413\b|request too large|context.*exceeded|too long/i.test(msg)) return 'too_large';
  if (/requests per day|rate_limit_exceeded.*day/i.test(msg)) return 'daily_quota';
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

// Build a unique key for health tracking: same provider but different model → tracked separately.
const healthKey = (provider, model) => `${provider}:${model}`;

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

  // Cloudflare Workers AI — same token as Flux Schnell. Adds 3 free LLMs to
  // the cartel: Llama-3.3 70B (Cloudflare-hosted), Qwen2.5-Coder 32B, and
  // a tiny Llama-3.1 8B for fallback. OpenAI-compatible chat endpoint.
  cloudflare: {
    available: () => Boolean(process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN),
    call: async ({ prompt, json, model }) => {
      const m = model || '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
      const url = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1/chat/completions`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: m,
          messages: [{ role: 'user', content: prompt }],
          ...(json ? { response_format: { type: 'json_object' } } : {}),
          temperature: 0.7,
        }),
      });
      if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Cloudflare ${res.status}: ${body.slice(0, 300)}`);
      }
      const j = await res.json();
      const text = j.choices?.[0]?.message?.content;
      if (!text) throw new Error('Cloudflare: empty response');
      return { text, model: m };
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

// Chaos injection — used by scripts/chaos-test.js to verify failover.
// CHAOS_FAIL_RATE in [0,1]: fraction of provider calls to fail synthetically.
// Failure class is rotated so cooldowns of varying length get exercised.
const CHAOS_CLASSES = ['rate_limit', 'server_error', 'timeout', 'daily_quota'];
let chaosCounter = 0;
function maybeChaosFail(provider, model) {
  const rate = parseFloat(process.env.CHAOS_FAIL_RATE || '0');
  if (!rate || Math.random() >= rate) return;
  const klass = CHAOS_CLASSES[chaosCounter++ % CHAOS_CLASSES.length];
  const message = ({
    rate_limit:   `429 chaos: rate_limit_exceeded for ${provider}/${model}`,
    server_error: `503 chaos: service unavailable from ${provider}/${model}`,
    timeout:      `chaos timeout from ${provider}/${model}`,
    daily_quota:  `429 chaos: requests per day exceeded for ${provider}/${model}`,
  })[klass];
  throw new Error(message);
}

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
export async function routeCall({ task, prompt, json = false, schema = undefined, timeoutMs = 45000, promptMeta = null }) {
  const rankedRaw = RANKINGS[task];
  if (!rankedRaw) throw new Error(`routeCall: unknown task class "${task}"`);
  // Normalize: each entry is [provider, model]
  const ranked = rankedRaw.map((entry) =>
    Array.isArray(entry) ? { provider: entry[0], model: entry[1] } : { provider: entry, model: undefined }
  );

  const health = await loadHealth();
  const now = Date.now();
  const attempts = [];

  for (const { provider: name, model } of ranked) {
    const p = providers[name];
    if (!p) continue;
    if (!p.available()) {
      attempts.push({ provider: name, model, skipped: 'no credentials' });
      continue;
    }

    const key = healthKey(name, model || 'default');
    const h = health[key] || {};
    if (h.cooldown_until && new Date(h.cooldown_until).getTime() > now) {
      attempts.push({ provider: name, model, skipped: `cooldown until ${h.cooldown_until}` });
      continue;
    }

    const started = Date.now();
    try {
      maybeChaosFail(name, model || 'default');
      // Gemini-native schema routing only works on Gemini; other providers get JSON mode.
      const useSchema = name === 'gemini' ? schema : undefined;
      const result = await withTimeout(
        p.call({ prompt, json: json || Boolean(schema), schema: useSchema, model }),
        timeoutMs
      );

      const latencyMs = Date.now() - started;
      h.last_success = new Date().toISOString();
      h.consecutive_failures = 0;
      delete h.cooldown_until;
      health[key] = h;
      await saveHealth(health);

      await logTelemetry({
        t: new Date().toISOString(),
        task,
        provider: name,
        model: result.model,
        ok: true,
        latency_ms: latencyMs,
        prompt_chars: prompt.length,
        response_chars: result.text.length,
        ...(promptMeta ? { prompt_id: promptMeta.id, prompt_variant: promptMeta.variant } : {}),
      });

      console.log(`  [router] ${task} via ${name}/${result.model} in ${latencyMs}ms`);
      return { text: result.text, provider: name, model: result.model };
    } catch (err) {
      const latencyMs = Date.now() - started;
      const kind = classifyError(err);
      h.consecutive_failures = (h.consecutive_failures || 0) + 1;
      h.last_error = String(err.message || err).slice(0, 300);
      h.last_failure = new Date().toISOString();
      if (kind && COOLDOWN_MS[kind]) {
        h.cooldown_until = new Date(now + COOLDOWN_MS[kind]).toISOString();
      }
      health[key] = h;
      await saveHealth(health);

      await logTelemetry({
        t: new Date().toISOString(),
        task,
        provider: name,
        model: model || 'default',
        ok: false,
        latency_ms: latencyMs,
        error_class: kind || 'unknown',
        error: h.last_error,
        ...(promptMeta ? { prompt_id: promptMeta.id, prompt_variant: promptMeta.variant } : {}),
      });

      attempts.push({ provider: name, model, error: h.last_error, classified: kind });
      console.log(`  [router] ${name}/${model || 'default'} failed (${kind || 'unknown'}): ${h.last_error.slice(0, 120)}`);
    }
  }

  const summary = attempts.map(a => `${a.provider}/${a.model || 'default'}:${a.skipped || a.error || 'unknown'}`).join(' | ');
  throw new Error(`All providers failed for task=${task}. ${summary}`);
}
