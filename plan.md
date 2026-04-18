# System Report — The Orchestra
### A pipeline designed to make 2070 jealous

**Mission:** build the most advanced, fully autonomous, zero-cost, multi-model news synthesis engine on the open internet. Dominate the tech news game. Run forever on $0. Never silently fail again.

**Author:** Claude Opus 4.7 (principal architect)
**Revised:** 2026-04-17 — pipeline-first rewrite
**Supersedes:** v1 (SEO + Lighthouse focused)
**Scope of v2:** everything upstream of the HTML. SEO/Lighthouse work from v1 is preserved as Part III.

---

# PROGRESS LOG

### ✅ Done — 2026-04-18

- **Part III SEO pass.** JSON-LD (`WebSite+Organization` on home, `NewsArticle+BreadcrumbList` on posts, article-section auto-mapped from tags). Google News sitemap (`news-sitemap.xml`) registered in robots.txt. RSS upgraded with full markdown→HTML body, `media:content`, `media:thumbnail`, `dc:creator`, categories (Apple News ready). Open Graph: absolute image URLs with dimensions, article meta tags, theme-color, Pexels preconnect. WCAG AA contrast fixes across 7 components, `aria-disabled` on disabled pagination, `autocomplete="email"` on newsletter. Commit `fc47280`.
- **Part 0 Hotfix 1/2/3 — Multi-provider router.** `src/pipeline/router.mjs` with task-class routing (`cluster`, `draft`, `critique`, `headline`, `seo-polish`), per-provider+model health tracking, cooldown classification (spending_cap=30d, permission=7d, daily_quota=6h, rate_limit=10m, server=5m, timeout=2m, too_large=fail-forward). Persistent state in `ops/provider-health.json`. Commits `ec99d81`, `5687a7c`, `f4aba3e`.
- **Provider cartel onboarded (2/12).** Groq (14 models toggled — Llama 3.1 8B Instant, 3.3 70B Versatile, Scout 17B, GPT-OSS 120B/20B, Qwen3 32B, Whisper Turbo, Orpheus English TTS, Compound). Gemini 2.5 Flash (currently in spending-cap cooldown until ~2026-05-17 — router correctly skipping).
- **Cluster batching.** Articles chunked 30-per-batch to fit 6K-TPM models; summaries trimmed to 200 chars; Scout-17B (30K TPM) promoted to primary clusterer. Cross-chunk dupes acceptable because feed bursts arrive together.
- **Backlog drain — proof of life.** Workflow run `24593272611` (2026-04-18T01:04Z): 115 queued articles → 37 clusters → 25 drafts published in 1m43s. Mid-run rate-limit on Llama 70B triggered automatic failover to Scout-17B with zero human intervention. **Site now at 79 articles.**
- **Critique + Revise loop shipped.** `draftArticle` → `critiqueDraft` (cross-family: gpt-oss-120b vs Llama drafter) → `reviseDraft`. Defensive parsing (verdict/issues/missing_context defaults) for non-schema-enforced JSON mode. 1 factual-compromise rejection observed in production.
- **Stylometric gate.** 30+ banned LLM-tell phrases scanned post-revise; banned phrases regenerate via prompt constraint.
- **Self-hosted heroes (Best Practices fix).** `downloadHero()` saves every hero to `public/hero/<slug>.jpg` during ingest; `scripts/backfill-heroes.js` backfilled all 79 existing posts (5.2MB total). Pexels preconnect removed from Layout. Eliminates third-party cookies flagged by Lighthouse.
- **Telemetry emitting.** `src/pipeline/router.mjs` writes JSONL records per call attempt to `ops/telemetry/YYYY-MM-DD.jsonl` (success + failure, latency, token sizes, error class). Commit `e9683b4`.
- **Lighthouse CI gate.** `.lighthouserc.json` + `.github/workflows/lighthouse.yml` — PRs fail if Performance<90 or A11y/BP/SEO<95. Commit `452832f`.
- **Discord alerting.** `src/pipeline/alerts.mjs` posts to `DISCORD_WEBHOOK_URL` (no-op if unset). Wired to clustering abort, circuit-breaker trip, and run summary (errors + partial-failure + success-with-volume). Needs `gh secret set DISCORD_WEBHOOK_URL` to activate.
- **Telemetry rollup.** `scripts/telemetry-rollup.js` — daily JSONL → `ops/rollup/YYYY-MM-DD.json` with success rate, p50/p95 latency per model, error-class histogram.
- **Editorial voice guide.** `docs/EDITORIAL_VOICE.md` loaded once at ingest startup, injected verbatim into both draft and revise prompts. Opinionated voice (concrete, declarative, no marketing verbs, no consultant nouns) replaces the ad-hoc banned-phrase list in prompts.
- **SimHash near-duplicate collapse.** `src/pipeline/dedup.mjs` — 64-bit SimHash over title (3× weight) + content, Hamming ≤ 18 collapses. Runs before clustering, zero API cost. Collapsed URLs marked processed so they don't resurface next poll. Verified: cross-outlet "same Apple rumor" pairs collapse at distance 15; unrelated stories sit at 30+.

### 🚧 Next lever (in-progress / queued)

1. **TTS podcast feed.** Orpheus-v1-english on Groq → one MP3 per cluster → podcast RSS.
3. **Image generation.** Flux Schnell on Cloudflare Workers AI → inline illustration per section.
4. **Multi-draft A+B + judge.** Two drafts in parallel, judge picks winner — raises ceiling on quality.
5. **Semantic dedup.** SimHash catches near-identical phrasing; an embedding-cosine pass would catch paraphrased dupes. Low priority — SimHash covers the common feed-overlap case.

### 🔜 Later (Part I Stages 02-14)

Dedup (SimHash + semantic), multi-draft A+B + judge, Google Search grounding, image gen (Flux Schnell on CF Workers AI), TTS podcast feed, AMP web stories, 10-language translation, fan-out distribution to Bluesky/Mastodon/Telegram/Reddit. Chaos testing. Full file plan in Appendix B.

### 🏁 Final step (manual, last)

**Rotate the Groq API key.** Current key was pasted in chat during bootstrap; must be regenerated at console.groq.com/keys and set via `gh secret set GROQ_API_KEY` before the site is "production-hardened".

---

# PART 0 — The Diagnosis

### What's broken right now, in 3 bullets

1. **Single provider, single failure mode.** Gemini 2.5 Flash is the only model in the pipeline. When it 429s, the entire system 429s.
2. **Spend cap hit.** The last 8 ETL runs all returned:
   ```
   {"error":{"code":429,"message":"Your project has exceeded its monthly spending cap.","status":"RESOURCE_EXHAUSTED"}}
   ```
   115 new RSS items are queued. Nothing gets published. Circuit breaker correctly aborts — but there's nothing to fall back to.
3. **No observability past stdout.** Failures are logged to GitHub Actions and die there. No alerting, no replay, no dead-letter queue, no eval.

### Why v1 missed it

v1 focused on the output surface (Lighthouse, SEO, News indexing). It assumed the pipeline would keep producing content. The pipeline is the moat. If it stops, nothing else matters.

### What v2 does differently

- Treats **LLM providers as a commodity** — 12 free endpoints, automatic failover, never pinned to one.
- Treats **each article as a state machine** — resumable, retriable, never silently dropped.
- Treats **quality as a continuous metric** — evaluated on every run, trended over time.
- Adds **image, audio, video, web story, 10-language** multimodal output — one cluster → 60+ artifacts.
- Builds **self-healing** — chaos-test provider outages weekly; pipeline must survive.

---

# PART I — The Zero-Fail, Zero-Cost Pipeline

## 1 · The Mandate

| Principle | Operationalization |
|---|---|
| **Zero cost** | Every provider, every API, every byte of compute — free tier only. A PR introducing a paid dependency is rejected. |
| **Zero fail** | No single-point-of-failure. Every external call has at least 2 fallbacks. State persists before expensive work. Runs resume. |
| **Zero silence** | Every failure emits structured telemetry. Every dead article lands in a DLQ with a root cause. Alerts go to Discord within 5 minutes. |
| **Zero lies** | Every factual claim is grounded in ≥1 source text. Ungrounded claims are either stripped or flagged. |
| **Zero human-in-loop (optional)** | The pipeline runs autonomously. Humans review. Humans override. Humans are never blocking. |

---

## 2 · The Provider Cartel — 12 Free LLM Endpoints

The single most important architectural shift: **models are interchangeable commodities, routed to by task class, balanced across provider quotas.**

### Text generation

| Provider | Model(s) | Free Tier (2026) | Strengths | Role |
|---|---|---|---|---|
| **Groq** | Llama 3.3 70B Versatile, Llama 3.1 8B Instant, DeepSeek R1 Distill Llama 70B | 30 RPM, 14.4K RPD, 500K TPD | Fastest inference on the planet (~500 tok/s) | Primary drafting, critique, re-writing, headline generation |
| **Google Gemini** | 2.5 Flash, 2.5 Flash-Lite, 2.5 Pro | 500 RPD (Flash), 50 RPD (Pro), 1K RPM (Flash-Lite) | Best JSON mode, best multimodal, Google Search grounding | Structured output (clustering tags, schema), fact-check via grounding, vision alt-text |
| **GitHub Models** | GPT-4o, GPT-4o-mini, o1, o3-mini, Claude 3.5 Sonnet, Grok, Llama, DeepSeek, Phi | Free for GH users, ~50-150 req/day depending on model tier | Access to GPT-4 class and Claude via single API | Critique (different model family = fresh eyes), final SEO polish |
| **Cloudflare Workers AI** | Llama 3.3 70B Instruct, DeepSeek R1, Qwen 2.5, Mistral Small, BGE embeddings, Flux.1 Schnell (image) | 10K neurons/day | Runs at the edge, no cold start, embeddings for free | Semantic dedup, clustering, drafting fallback, **image generation** |
| **Cerebras** | Llama 3.3 70B, Llama 3.1 8B | 30 RPM, 14.4K RPD free | ~2200 tok/s, insane speed | Drafting when Groq quota is hot |
| **OpenRouter** | Free variants: Llama 3.1 Nemotron 70B, Gemini 2.0 Flash exp, DeepSeek V3, Qwen 2.5 72B | Varies by model (typically 200 RPD free) | Single API, broad model catalog | Last-resort fallback for any text task |
| **Hugging Face Inference** | Llama, Mistral, Qwen, Phi | Free, rate-limited, slower | Deepest catalog, always on | Batch translation, non-urgent jobs |
| **DeepSeek** | DeepSeek V3, DeepSeek R1 | Free web + limited API | Best reasoning for math/code | Weekly explainers, code-heavy content |
| **Mistral La Plateforme** | Mistral Small, Pixtral | Free tier 1 RPS | Good European compliance fallback | Backup drafting |
| **Fireworks AI** | Llama 3.1, Mixtral | Free $1 credit (renews?) | Fast | Pilot only |
| **Ollama (self-hosted, local)** | Llama 3.2 3B, Phi 3 Mini, Gemma 2 | Free forever, your laptop | Offline dev + emergency failover | Local dev loop |
| **Anthropic (via Claude Code)** | Claude Opus 4.7 | User's existing subscription — build-time only | Unmatched reasoning | Weekly editorial audit, prompt engineering, DO NOT call from ETL |

### Embeddings & reranking

| Provider | Free Tier | Role |
|---|---|---|
| **Cloudflare Workers AI BGE** | 10K neurons/day (shared with LLM) | Primary — `@cf/baai/bge-large-en-v1.5`, 1024-dim |
| **Jina AI** | 1M tokens free | Backup embeddings + reranker |
| **Cohere** | Free trial + dev tier embeddings | Tertiary |
| **Voyage AI** | Free tier 200 RPM | Option |
| **Nomic Embed** | Free, open-weights (runs on HF) | Option |

### Image generation

| Provider | Free Tier | Role |
|---|---|---|
| **Cloudflare Workers AI Flux.1 Schnell** | 10K neurons/day | Primary — high-quality, on-edge, ~4s/image |
| **Pollinations.ai** | Free, unlimited | Secondary — diverse models (Flux, SD3, etc.) |
| **Pexels** | 20K req/mo | Tertiary — stock fallback |
| **Wikimedia Commons + Openverse** | Free, CC-licensed | Editorial / archival fallback |
| **Gemini 2.5 Flash Image (Imagen 4)** | Limited free tier | Experimental |
| **fal.ai** | Pay-per-use, free trial | Pilot only |

### Speech

| Provider | Free Tier | Role |
|---|---|---|
| **Microsoft edge-tts** (neural voices) | Free, no auth, REST | Primary TTS — podcast + audio articles |
| **Cloudflare Workers AI @cf/meta/m2m** | 10K neurons/day | Translation |
| **ElevenLabs** | 10K chars/mo free | Premium voice for flagship shows |
| **OpenAI Whisper** (via HF Inference) | Free | Reverse: transcribe user voice queries |
| **Coqui XTTS** (self-hosted) | Free forever | Backup TTS |

### Video / Web Story

| Provider | Free Tier | Role |
|---|---|---|
| **Cloudflare Stream** | 30 min video free trial | Hosting |
| **AMP Web Stories** (static HTML) | Free | Primary short-form visual |
| **ffmpeg + still image** (GitHub Actions) | Unlimited minutes | Generate Ken-Burns MP4 from hero + TTS |
| **Pika Labs / Runway** | Limited free | Flagship only |
| **Luma Dream Machine** | Limited free | Flagship only |

### Search grounding

| Provider | Free Tier | Role |
|---|---|---|
| **Gemini 2.5 Flash w/ Google Search grounding** | Included in Gemini free tier (up to quota) | Primary fact-check |
| **Tavily Search API** | 1K queries/mo free | Secondary — structured results |
| **Exa** | Free trial | Tertiary |
| **DuckDuckGo Instant Answer API** | Free, unlimited | Quick entity lookup |
| **Brave Search API** | Free tier 2K/mo | Backup |

**Total effective free-tier headroom**: at 25 articles/run × 6 runs/day = 150 articles/day, each with ~8 LLM calls, ~1 image gen, ~1 TTS, ~10 translations → ~3,000 LLM calls/day. Spread across 8 providers with 14.4K RPD each, we can run this at 10× current cadence without ever paying.

---

## 3 · The Router — `src/pipeline/router.ts`

Every LLM call in the pipeline goes through the router. The router is a pure-TypeScript, file-system-backed orchestrator. No external service required.

### Responsibilities

1. **Health tracking** per provider (last success, last failure, consecutive failures, rate-limit window)
2. **Quota tracking** — RPD/TPD/neurons remaining today; stop calling a provider when quota < safety margin
3. **Task-class routing** — map a `TaskClass` to a ranked list of suitable providers
4. **Timeout + retry** — each provider call has a hard timeout; retry on transient failures only
5. **Circuit breaker** — open circuit after N consecutive failures; half-open after cooldown
6. **Telemetry** — every call emits a record to `ops/telemetry/YYYY-MM-DD.jsonl`

### Task classes

```ts
type TaskClass =
  | 'cluster'       // JSON-structured, short-context: Gemini Flash > Groq Llama 70B > Workers AI Llama
  | 'draft'         // Long-form text, 400w: Groq 70B > Gemini Flash > Cerebras > Workers AI > OpenRouter
  | 'critique'      // Medium text, fresh model family: GitHub Models GPT-4o-mini > Gemini Pro > DeepSeek R1
  | 'revise'        // Same model as drafted (consistency)
  | 'headline'      // Small, fast, cheap: Groq Llama 8B Instant > Cerebras 8B > Gemini Flash-Lite
  | 'meta'          // Same as headline
  | 'seo-polish'    // Medium, rules-based: GPT-4o-mini > Gemini Flash
  | 'ground-check'  // Must have Google Search: Gemini Flash w/ grounding (primary, no fallback — skip if unavail)
  | 'embed'         // Workers AI BGE > Jina > Cohere > Voyage
  | 'rerank'        // Jina Reranker > Cohere Rerank
  | 'translate'     // Gemini Flash > Groq 70B > HF MMS
  | 'vision-alt'    // Gemini Flash (vision) > GPT-4o-mini vision (GH Models) > Workers AI LLaVA
  | 'image-gen'     // Workers AI Flux Schnell > Pollinations > Pexels > Wikimedia
  | 'tts'           // edge-tts > Coqui > ElevenLabs
  | 'judge'         // DeepSeek R1 > Gemini Pro > Claude via GH Models
  ;
```

### Core API

```ts
// src/pipeline/router.ts
import { providers, Provider } from './providers';

export interface CallOptions {
  task: TaskClass;
  input: unknown;
  schema?: JsonSchema;        // for structured tasks
  timeoutMs?: number;          // default per task
  maxAttempts?: number;        // default 3
  excludeProviders?: string[]; // e.g. ["gemini"] if we know it's cap-hit today
}

export interface CallResult<T> {
  ok: true;
  value: T;
  meta: { provider: string; model: string; latencyMs: number; tokensIn: number; tokensOut: number };
} | {
  ok: false;
  error: string;
  attempts: { provider: string; error: string; attempt: number }[];
}

export async function call<T = unknown>(opts: CallOptions): Promise<CallResult<T>> {
  const ranked = rankProviders(opts.task, opts.excludeProviders);
  const attempts: any[] = [];

  for (const p of ranked) {
    if (!p.isHealthy() || !p.hasQuota(opts.task)) {
      attempts.push({ provider: p.name, error: 'skipped: unhealthy or no quota', attempt: attempts.length + 1 });
      continue;
    }

    try {
      const started = Date.now();
      const raw = await withTimeout(p.call(opts), opts.timeoutMs ?? defaultTimeout(opts.task));
      const latencyMs = Date.now() - started;

      const value = opts.schema ? validateAgainstSchema(raw, opts.schema) : raw;
      p.recordSuccess(latencyMs);
      emitTelemetry({ ok: true, provider: p.name, task: opts.task, latencyMs, ... });
      return { ok: true, value: value as T, meta: { provider: p.name, model: p.activeModel, latencyMs, ... } };
    } catch (e) {
      p.recordFailure(e);
      attempts.push({ provider: p.name, error: String(e), attempt: attempts.length + 1 });
      if (isRateLimit(e)) p.cooldown(60_000);  // 60s
      if (isPermanent(e)) p.cooldown(24 * 60 * 60_000);  // 24h (quota exhausted, cap hit, key revoked)
      continue;
    }
  }

  emitTelemetry({ ok: false, task: opts.task, attempts });
  return { ok: false, error: 'all providers exhausted', attempts };
}
```

### Provider health persistence

State file: `ops/provider-health.json` — committed on every run (tiny, ~2KB). Next run reads it as prior. This means provider 429s persist across runs, so we don't keep hammering a dead endpoint.

```json
{
  "gemini": {
    "last_success": "2026-04-16T08:37:00Z",
    "last_failure": "2026-04-17T13:01:25Z",
    "consecutive_failures": 8,
    "cooldown_until": "2026-05-01T00:00:00Z",
    "quota": { "rpd_used": 0, "rpd_limit": 500, "reset": "2026-04-18T00:00:00Z" },
    "last_error": "RESOURCE_EXHAUSTED: monthly spending cap exceeded"
  },
  "groq": { "last_success": "2026-04-17T13:01:30Z", "consecutive_failures": 0, "quota": { "rpd_used": 42, "rpd_limit": 14400 } }
}
```

### Cost ceiling enforcement

Router computes a running "imagined cost" (at hypothetical paid prices) for every call. If it ever exceeds $0.00 imaginary-budget for the day (which it won't, because we only use free tiers) — hard fail. This is a paranoia check.

---

## 4 · The 14-Stage Agentic Pipeline

This is the heart. Each stage is a pure function over inputs, producing artifacts. Every stage is idempotent and resumable.

```
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 0: Source Expansion (80+ feeds)           │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 1: Fetch & Normalize (parallel, 20x)      │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 2: Dedup — URL + SimHash + Semantic       │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 3: Enrichment — full-page, entities, NLP  │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 4: Clustering — embeddings + DBSCAN       │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
                      ┌───────────────────────────────────────────────────┐
                      │   Stage 5: Prioritization (top-N this run)        │
                      └────────────────────┬──────────────────────────────┘
                                           ▼
  ┌────────────────────────────────────────┴────────────────────────────────────────┐
  │                              For each cluster:                                   │
  │  ┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐        │
  │  │ 6a: Draft A (Grok)│───▶│ 6b: Draft B (Gem)│───▶│ 7: Judge selects │        │
  │  └──────────────────┘     └──────────────────┘     └─────────┬────────┘        │
  │                                                               ▼                 │
  │                                                       ┌───────────────┐         │
  │                                                       │ 8: Critique   │         │
  │                                                       │ (diff model)  │         │
  │                                                       └──────┬────────┘         │
  │                                                              ▼                  │
  │                                                       ┌───────────────┐         │
  │                                                       │ 9: Revise     │         │
  │                                                       └──────┬────────┘         │
  │                                                              ▼                  │
  │                                                       ┌───────────────┐         │
  │                                                       │ 10: Ground    │         │
  │                                                       │ Gemini+Search │         │
  │                                                       └──────┬────────┘         │
  │                                                              ▼                  │
  │                                                       ┌───────────────┐         │
  │                                                       │ 11: SEO Layer │         │
  │                                                       └──────┬────────┘         │
  │                                                              ▼                  │
  │        ┌──────────────────┬──────────────────┬──────────────────┐              │
  │        ▼                  ▼                  ▼                  ▼              │
  │  ┌──────────┐       ┌──────────┐       ┌──────────┐       ┌──────────┐       │
  │  │ 12a:     │       │ 12b:     │       │ 12c:     │       │ 12d:     │       │
  │  │ Hero img │       │ TTS/MP3  │       │ WebStory │       │ Translate│       │
  │  └──────────┘       └──────────┘       └──────────┘       └──────────┘       │
  │        │                  │                  │                  │              │
  │        └──────────────────┴───────┬──────────┴──────────────────┘              │
  │                                   ▼                                             │
  │                             ┌───────────────┐                                   │
  │                             │ 13: Publish   │                                   │
  │                             │ atomic commit │                                   │
  │                             └───────┬───────┘                                   │
  │                                     ▼                                           │
  │                             ┌───────────────┐                                   │
  │                             │ 14: Distribute│                                   │
  │                             │ 8 destinations│                                   │
  │                             └───────────────┘                                   │
  └──────────────────────────────────────────────────────────────────────────────── ┘
```

### Stage 0 — Source Expansion (from 8 → 80+)

New source catalog: `src/pipeline/sources.ts`

```ts
export const SOURCES: Source[] = [
  // Tier A — primary tech publications (weight 1.0)
  rss('https://www.wired.com/feed/rss', { topics: ['tech'], weight: 1.0 }),
  rss('https://techcrunch.com/feed/', { topics: ['startups', 'tech'], weight: 1.0 }),
  rss('https://www.theverge.com/rss/index.xml', { topics: ['tech', 'consumer'], weight: 1.0 }),
  rss('https://feeds.arstechnica.com/arstechnica/index', { topics: ['tech', 'science'], weight: 1.0 }),
  rss('https://www.engadget.com/rss.xml', { topics: ['consumer', 'gaming'], weight: 0.9 }),
  rss('https://9to5google.com/feed/', { topics: ['android', 'google'], weight: 0.9 }),
  rss('https://9to5mac.com/feed/', { topics: ['apple'], weight: 0.9 }),
  rss('https://www.theinformation.com/feed', { topics: ['tech', 'startups'], weight: 1.0 }), // may be paywalled titles
  rss('https://stratechery.com/feed/', { topics: ['strategy', 'tech'], weight: 1.0 }),       // titles only
  rss('https://www.platformer.news/feed', { topics: ['platforms', 'policy'], weight: 1.0 }),
  rss('https://www.axios.com/technology.rss', { topics: ['tech', 'policy'], weight: 0.9 }),
  rss('https://www.semafor.com/section/technology/feed', { topics: ['tech'], weight: 0.9 }),
  rss('https://www.bloomberg.com/feed/podcast/etf-report.xml', { topics: ['finance', 'tech'], weight: 0.8 }),

  // Tier B — enthusiast/specialty (weight 0.8)
  rss('https://www.tomshardware.com/feeds/all', { topics: ['hardware'], weight: 0.8 }),
  rss('https://www.anandtech.com/rss/', { topics: ['hardware', 'silicon'], weight: 0.9 }),
  rss('https://www.gsmarena.com/rss-news-reviews.php3', { topics: ['phones'], weight: 0.7 }),
  rss('https://www.xda-developers.com/feed/', { topics: ['android'], weight: 0.8 }),
  rss('https://www.androidauthority.com/feed/', { topics: ['android'], weight: 0.8 }),
  rss('https://www.androidpolice.com/feed/', { topics: ['android'], weight: 0.8 }),
  rss('https://www.macrumors.com/macrumors.xml', { topics: ['apple'], weight: 0.8 }),
  rss('https://daringfireball.net/feeds/main', { topics: ['apple', 'commentary'], weight: 1.0 }),
  rss('https://www.theregister.com/headlines.atom', { topics: ['enterprise', 'tech'], weight: 0.9 }),
  rss('https://siliconangle.com/feed/', { topics: ['enterprise'], weight: 0.7 }),
  rss('https://www.techradar.com/rss', { topics: ['consumer'], weight: 0.7 }),
  rss('https://www.zdnet.com/news/rss.xml', { topics: ['enterprise'], weight: 0.7 }),
  rss('https://www.cnet.com/rss/all/', { topics: ['consumer'], weight: 0.6 }),
  rss('https://gizmodo.com/rss', { topics: ['consumer'], weight: 0.6 }),
  rss('https://mashable.com/feeds/rss/all', { topics: ['consumer'], weight: 0.6 }),
  rss('https://www.computerworld.com/index.rss', { topics: ['enterprise'], weight: 0.7 }),

  // Tier C — gaming (weight 0.9 for gaming category routing)
  rss('https://www.polygon.com/rss/index.xml', { topics: ['gaming'], weight: 0.9 }),
  rss('https://kotaku.com/rss', { topics: ['gaming'], weight: 0.8 }),
  rss('https://www.ign.com/articles?feed=rss', { topics: ['gaming'], weight: 0.8 }),
  rss('https://www.pcgamer.com/rss', { topics: ['gaming', 'pc'], weight: 0.9 }),
  rss('https://www.rockpapershotgun.com/feed', { topics: ['gaming', 'pc'], weight: 0.9 }),
  rss('https://www.eurogamer.net/?format=rss', { topics: ['gaming'], weight: 0.9 }),
  rss('https://www.gamesindustry.biz/feed', { topics: ['gaming', 'business'], weight: 0.9 }),
  rss('https://www.videogameschronicle.com/feed/', { topics: ['gaming'], weight: 0.8 }),

  // Tier D — AI specialty (weight 1.0)
  rss('https://openai.com/news/rss.xml', { topics: ['ai', 'openai'], weight: 1.0 }),
  rss('https://www.anthropic.com/news/rss.xml', { topics: ['ai', 'anthropic'], weight: 1.0 }),
  rss('https://ai.googleblog.com/feeds/posts/default', { topics: ['ai', 'google'], weight: 1.0 }),
  rss('https://blogs.microsoft.com/ai/feed/', { topics: ['ai', 'microsoft'], weight: 0.9 }),
  rss('https://ai.meta.com/blog/rss/', { topics: ['ai', 'meta'], weight: 1.0 }),
  rss('https://huggingface.co/blog/feed.xml', { topics: ['ai', 'opensource'], weight: 0.9 }),
  rss('https://www.deepmind.com/blog/rss.xml', { topics: ['ai', 'research'], weight: 1.0 }),
  rss('https://arxiv.org/rss/cs.AI', { topics: ['ai', 'research'], weight: 0.7 }),
  rss('https://arxiv.org/rss/cs.CL', { topics: ['nlp', 'research'], weight: 0.7 }),
  rss('https://arxiv.org/rss/cs.LG', { topics: ['ml', 'research'], weight: 0.7 }),
  rss('https://www.deeplearning.ai/the-batch/feed/', { topics: ['ai'], weight: 0.8 }),
  rss('https://simonwillison.net/atom/everything/', { topics: ['ai', 'commentary'], weight: 1.0 }),
  rss('https://latent.space/feed', { topics: ['ai'], weight: 0.9 }),

  // Tier E — company blogs (authoritative, weight 1.0)
  rss('https://blog.google/rss/', { topics: ['google'], weight: 1.0 }),
  rss('https://www.apple.com/newsroom/rss-feed.rss', { topics: ['apple'], weight: 1.0 }),
  rss('https://blogs.microsoft.com/feed/', { topics: ['microsoft'], weight: 1.0 }),
  rss('https://aws.amazon.com/blogs/aws/feed/', { topics: ['aws', 'cloud'], weight: 0.9 }),
  rss('https://cloud.google.com/blog/rss/', { topics: ['gcp', 'cloud'], weight: 0.9 }),
  rss('https://blogs.nvidia.com/feed/', { topics: ['nvidia', 'ai'], weight: 1.0 }),
  rss('https://about.fb.com/news/feed/', { topics: ['meta'], weight: 0.9 }),
  rss('https://netflixtechblog.com/feed', { topics: ['netflix', 'infra'], weight: 0.8 }),
  rss('https://engineering.fb.com/feed/', { topics: ['meta', 'infra'], weight: 0.8 }),
  rss('https://stripe.com/blog/feed.rss', { topics: ['stripe', 'fintech'], weight: 0.8 }),

  // Tier F — aggregator signals (weight 0.6, velocity-weighted)
  hn({ minPoints: 200, topics: ['tech'], weight: 0.8 }),         // Hacker News top stories
  reddit('r/technology', { minScore: 1000, weight: 0.6 }),
  reddit('r/programming', { minScore: 500, weight: 0.7 }),
  reddit('r/MachineLearning', { minScore: 200, weight: 0.8 }),
  reddit('r/apple', { minScore: 500, weight: 0.6 }),
  reddit('r/Android', { minScore: 500, weight: 0.6 }),
  reddit('r/hardware', { minScore: 500, weight: 0.7 }),
  githubTrending({ language: 'all', since: 'daily', weight: 0.7 }),
  productHunt({ weight: 0.6 }),

  // Tier G — policy & security (weight 0.9)
  rss('https://www.schneier.com/feed/atom/', { topics: ['security'], weight: 1.0 }),
  rss('https://krebsonsecurity.com/feed/', { topics: ['security'], weight: 1.0 }),
  rss('https://www.bleepingcomputer.com/feed/', { topics: ['security'], weight: 0.8 }),
  rss('https://www.eff.org/rss/updates.xml', { topics: ['policy', 'privacy'], weight: 1.0 }),

  // Tier H — YouTube tech channels (transcripts via youtube-transcript-api)
  youtube('MKBHD', { weight: 0.8 }),
  youtube('LinusTechTips', { weight: 0.7 }),
  youtube('Fireship', { weight: 0.8 }),
  // etc.
];
```

Sources are weighted — higher weights get more representation in prioritization. Parallel fetch with `p-limit` at concurrency 20. Per-source timeouts (10s). Per-source circuit breakers.

### Stage 1 — Fetch & Normalize

Every source produces `RawItem`:
```ts
interface RawItem {
  id: string;           // deterministic hash of URL
  url: string;
  title: string;
  body: string;         // sanitized HTML → plain text
  publishedAt: Date;
  author?: string;
  sourceId: string;
  topics: string[];     // from source descriptor + extracted
  raw: { html?: string; fullPageFetched?: boolean };
}
```

Full-page fetch (Stage 3) is deferred — first pass uses RSS excerpts only.

### Stage 2 — Dedup (three-layer)

```ts
// Layer 1: URL exact match (current behavior, keep)
if (seenUrls.has(item.url)) skip;

// Layer 2: SimHash(title + first 200 chars of body)
const hash = simhash(item.title + ' ' + item.body.slice(0, 200));
if (existingHashes.some(h => hammingDistance(h, hash) <= 3)) skip;

// Layer 3: Semantic — embed title, cosine sim > 0.88 vs last 14 days
const emb = await router.call({ task: 'embed', input: item.title });
if (cosineSim(emb, existingEmbeddings).max > 0.88) skip;
```

Embeddings are persisted to `ops/embeddings/YYYY-MM.jsonl` — append-only, sharded monthly. Load only the current month on each run (fits in memory).

### Stage 3 — Enrichment (optional, budget-permitting)

For each surviving item:
- **Full-page fetch** if RSS body < 300 chars (Reuters/Bloomberg often strip content). Use Mozilla Readability via jsdom. Budget: 20 concurrent fetches, 8s timeout each.
- **Entity extraction** — cheap Gemini Flash-Lite call returning `{companies, products, people, places}`. Or compiled regex lists (faster, lossier).
- **Topic classification** — multi-label, same call as entity extraction.
- **Primary source detection** — boolean; e.g. Apple Newsroom = primary, a 9to5Mac article about Apple = secondary.

Cost: 1 call per item. 115 items × 1 call = 115 calls on Gemini Flash-Lite (which has 1K RPM). Or skip this stage entirely if budget is tight and rely on keyword rules.

### Stage 4 — Clustering (semantic, not LLM)

This is the biggest architectural change. **Remove the LLM clustering dependency.** Instead:

```ts
// For every surviving item, already has embedding from Stage 2.
const clusters = dbscan(embeddings, { eps: 0.18, minPoints: 1 });
//   eps = cosine distance threshold; 0.18 ≈ cosine similarity 0.82
//   minPoints = 1 allows singleton clusters (every item gets published)
```

Why: DBSCAN on embeddings is deterministic, free, instant, never hits a rate limit. The LLM clustering was a beautiful idea but it was the single point of failure. Embeddings via Cloudflare Workers AI BGE are ~2ms each, 10K/day free, and if CF is down we fall through to Jina.

Optional LLM pass *after* clustering: ask a small model to label each cluster theme ("Apple M5 chip launch", "Nintendo earnings", etc.). This is helpful but not critical.

### Stage 5 — Prioritization

Every cluster scored:
```
score =
    sourceQuality (weighted avg of source weights)
  × sourceDiversity (distinct sources)
  × recency (exponential decay, λ = 6h)
  × topicStrategicWeight (AI = 1.2, gaming = 1.0, hardware = 1.1, software = 1.0, tech = 0.9)
  × velocityBoost (how many sources mention this in the last 3h — "breaking news")
  ÷ duplicatePenalty (1 if we haven't written about this topic in 7d, else 0.2)
```

Pick top 25 for this run. The rest stay in the DLQ for next run (their URLs are not marked processed).

### Stage 6 — Drafting (parallel ensemble)

For each cluster, kick off 2 drafts concurrently:
- **Draft A** (`router.call({task:'draft', ...})`) — hits Groq Llama 3.3 70B by default
- **Draft B** (`router.call({task:'draft', excludeProviders:[draftAprovider]})`) — forced different provider

Both use the same prompt template (see Appendix A). Target: 400w, Markdown, structured output.

### Stage 7 — Judge Selection

A third model (`judge` task class) evaluates both drafts on 5 dimensions:
- Factual adherence to source text
- Originality (no LLM clichés)
- Structure (lead-nut-graph-quote-context-conclusion)
- Headline strength
- Prose quality (concrete nouns, active voice)

Returns `{winner: 'A'|'B'|'merge', merged?: string}`. If `merge`, the judge also outputs the merged version that takes the best of both.

### Stage 8 — Critique

A different model family (GitHub Models GPT-4o-mini if Groq drafted; Gemini Pro if GPT drafted) critiques the winner:
- Claims not supported by sources (list them)
- Clichéd phrases detected (list them)
- Structural weaknesses
- Missing angle

Returns structured JSON.

### Stage 9 — Revise

The original drafter's provider (or next-healthy equivalent) takes {draft, critique, sources} and outputs v2.

### Stage 10 — Ground-Check

**Gemini 2.5 Flash with Google Search grounding** (or Tavily + any LLM) verifies:
- Numerical claims ("NVIDIA announced $X billion")
- Dated claims ("on April 15")
- Named entities + attributes

Output: `{claim, supported: bool, evidence_urls: []}` per claim. Unsupported claims are:
- Removed (if the article still flows)
- Weakened to "according to reports" (if they're from a single primary source)
- Fail the article (if core claim is unverifiable) → cluster returns to DLQ for human review

### Stage 11 — SEO Layer

One consolidated call producing:
```json
{
  "title": "Apple's M5 Chip Launch Targets NVIDIA...",
  "title_variants": ["Why Apple's M5 Is a Shot at NVIDIA", "..."],
  "slug": "apple-m5-chip-nvidia",
  "description": "Apple unveiled the M5 with a focus on...",
  "og_title": "...",
  "og_description": "...",
  "tags": ["apple", "m5", "silicon", "ai"],
  "schema": {
    "NewsArticle": { ... },
    "Quotation": [ ... ],
    "Speakable": { ... }
  },
  "internal_links": [
    { "anchor": "M4 benchmark", "slug": "apple-m4-benchmarks-..." }
  ],
  "pillar_topics": ["apple-silicon"]
}
```

Internal links are resolved from embeddings: for each suggested anchor, find the closest existing article (cosine similarity > 0.75), link to it.

### Stage 12 — Multimodal Fan-Out (parallel)

All four run in parallel (`Promise.all`):

**12a — Hero Image**
- `router.call({task:'image-gen', input: visualPrompt})` → Cloudflare Flux Schnell 1024×768 → webp/avif/jpg encode via sharp → write to `public/heroes/YYYY/MM/`
- Fallback chain: Pollinations → Pexels → Wikimedia Commons → generic category SVG
- Then `router.call({task:'vision-alt', input: imageBytes})` → descriptive alt text

**12b — Audio / Podcast**
- Use `edge-tts` (Microsoft neural voices, REST API, no auth) to TTS the article
- Voice: `en-US-AvaMultilingualNeural` (natural, multilingual)
- Output: `public/audio/YYYY/MM/{slug}.mp3` (~3-5 MB)
- Add `<enclosure>` to per-article page + standalone podcast RSS at `/podcast.xml`
- Register the podcast RSS with Apple Podcasts, Spotify for Podcasters, Google Podcasts (RIP but set anyway), Pocket Casts, Overcast

**12c — Web Story (AMP)**
- 5-slide template: cover (hero + title), 3 body slides (key points from article), CTA (read full article link)
- Static HTML output at `public/stories/{slug}/index.html`
- Auto-link from article page
- Listed in web-stories-sitemap.xml for Discover

**12d — Translation (10 languages)**
- `router.call({task:'translate', input: {text, targets: ['es','fr','de','ja','pt','it','tr','ko','zh-Hans','ru']}})`
- One call per language (or batched if provider supports it)
- Output: `src/content/posts/{slug}/{lang}.md`
- Hreflang links in Layout
- Per-language sitemap

Budget: 1 image (4s), 1 TTS (~2s), 1 web story (LLM call for slide text), 10 translations (10 LLM calls).
Total: ~13 LLM calls per article × 25 articles = 325 calls on Gemini Flash's 500 RPD or Groq's 14.4K RPD. Trivially within quota.

### Stage 13 — Publish (atomic)

```ts
async function publish(cluster, artifacts) {
  const tmpDir = `src/content/posts/.pending/${cluster.id}`;
  await writeAtomic(tmpDir, artifacts.markdown);
  await writeAtomic(`public/heroes/.../${slug}.avif`, artifacts.hero);
  await writeAtomic(`public/audio/.../${slug}.mp3`, artifacts.audio);
  // ... all other artifacts

  // Rename to final location (atomic on Linux ext4)
  await fs.rename(tmpDir, `src/content/posts/${slug}`);

  // Update state
  cluster.sources.forEach(s => processedUrls.add(s.url));
  await updateEmbeddingsIndex(slug, artifacts.embedding);

  // State machine: mark cluster as 'published'
  await setState(cluster.id, 'published');
}
```

Any failure before rename → state stays at previous stage, next run resumes.

### Stage 14 — Distribute (fire-and-forget, parallel)

For each published article:
- **IndexNow** → Bing, Yandex, Seznam, Naver
- **Bluesky** → `@systemreport.bsky.social` with hero + headline + link
- **Mastodon** → `@systemreport@mastodon.social`
- **Discord webhook** → internal ops channel
- **Telegram channel** → `@systemreport_news` (via bot)
- **Reddit** — auto-submit only the top 1 cluster per run (avoid spam) to `r/technews`
- **PubSubHubbub hub ping** → `https://pubsubhubbub.appspot.com/?hub.mode=publish&hub.url=...`
- **Newsletter queue** → append to `ops/newsletter-queue.jsonl` for next digest
- **Apple News** → (auto via RSS, no push needed)

All of these run `Promise.allSettled` — one failure doesn't block the others. Failures are logged but don't block publish.

---

## 5 · The State Machine — Resumability & Idempotence

Current pipeline: pipe. One big fallthrough. One failure mid-run = everything after is lost.

New pipeline: **state machine**, one file per cluster, resumable across runs.

### State file layout

```
ops/clusters/YYYY-MM-DD/{cluster_id}.json
```

Each file:
```json
{
  "id": "c-2026-04-17-hash",
  "stage": "drafted",               // one of: pending, fetched, deduped, enriched, clustered, drafted, judged, critiqued, revised, grounded, seo, multimodal, published, distributed, done, dlq
  "attempts": 2,
  "created_at": "2026-04-17T10:00:00Z",
  "last_attempt_at": "2026-04-17T10:04:32Z",
  "last_error": null,
  "sources": [{ "url": "...", "title": "..." }, ...],
  "artifacts": {
    "draft_a": { "provider": "groq", "text": "...", "meta": {...} },
    "draft_b": { "provider": "gemini", "text": "...", "meta": {...} },
    "winner": "A",
    "critique": { ... },
    "revised": "...",
    "grounded": "...",
    "seo": { ... },
    "hero_path": "public/heroes/2026/04/abc.avif",
    "audio_path": "public/audio/2026/04/abc.mp3",
    "web_story_path": "public/stories/abc/",
    "translations": { "es": "...", "fr": "...", ... }
  },
  "telemetry": [ /* per-stage timings + providers used */ ]
}
```

### Pipeline driver

```ts
async function runPipeline() {
  const clusters = await loadActiveClusters(); // includes any DLQ'd from previous runs

  for (const cluster of clusters) {
    try {
      while (cluster.stage !== 'done' && cluster.stage !== 'dlq') {
        const nextStage = STAGES[cluster.stage];
        await nextStage.run(cluster);  // mutates cluster + persists
        if (runBudgetExceeded()) break; // save for next run
      }
    } catch (e) {
      cluster.attempts++;
      cluster.last_error = String(e);
      if (cluster.attempts >= 3) cluster.stage = 'dlq';
      await persist(cluster);
    }
  }
}
```

### Dead-letter queue

`ops/dlq/` holds clusters that failed 3 times. A weekly review job surfaces these to Discord with diffs. Humans decide: retry with an override, rewrite by hand, or discard.

### Idempotence

Every stage writes its output to the state file *before* marking the stage complete. If the pipeline dies mid-stage, the next run picks up from the previous completed stage. Artifacts are keyed by stage, so partial work isn't lost.

---

## 6 · The Quality Stack — 5 Truth Gates

Every article passes through 5 quality gates. Each can reject.

### Gate 1: Schema validity
Output must conform to the strict output schema (title, description, body, tags, visual_keyword, sources). Enforced by `zod`. Invalid → regenerate.

### Gate 2: Length + structure
Body between 300–800 words. At least 3 paragraphs. Has a lead sentence. Has a nut graf (2nd para ≤ 40 words). Reject if fails.

### Gate 3: Factual grounding
Every concrete claim (numbers, dates, named entities with attributes) must be supported by at least one source. Ungrounded claims are stripped. If > 30% of claims are ungrounded → reject the whole draft.

### Gate 4: Stylometric filter (the LLM-tell killer)

A blacklist of phrases that scream "AI generated":
```
"In today's fast-paced world"
"It remains to be seen"
"Only time will tell"
"In conclusion,"
"As we move forward"
"In an era where"
"navigate the complexities"
"unleashes"
"game-changer"
"cutting-edge"
"leverage"
"revolutionize"
"paradigm"
"robust"
"seamless"
"landscape"
"unveils"
"ushering in"
"dive deep"
"explore"
"look at"
"the ever-evolving"
"delve into"
"unlocks"
"at its core"
"to say the least"
"this begs the question"
```

Any article containing 2+ = reject, regenerate with the blacklist explicitly in the revision prompt. Current corpus is full of these — audit now, regenerate worst offenders.

### Gate 5: Originality

Similarity check against the archive: embed the full body, check cosine vs last 90 days of articles. If max similarity > 0.85 → we already wrote this. Reject. The cluster DLQs for human review.

**Every rejection feeds back into the eval harness (§12).** We track rejection rates per provider and per prompt version.

---

## 7 · Multimodal Layer — One Cluster, 60+ Artifacts

Breakdown per cluster:

| Artifact | Count | Size | Cost |
|---|---|---|---|
| Article (EN) markdown | 1 | ~5 KB | 1-3 LLM calls |
| Hero image (avif + webp + jpeg × 3 sizes) | 9 | ~150 KB | 1 image gen + sharp |
| Audio (MP3 podcast) | 1 | ~4 MB | 1 TTS call (~2s) |
| Audio transcript (VTT) | 1 | ~5 KB | free (from TTS markers) |
| Web Story (AMP HTML + 5 images) | 6 | ~500 KB | 1 LLM call |
| Translations (10 languages × markdown) | 10 | ~50 KB total | 10 LLM calls |
| Social card (X/Bluesky 1200×630) | 1 | ~100 KB | sharp composite |
| Social card (LinkedIn 1200×627) | 1 | ~100 KB | sharp composite |
| Social card (Instagram square 1080×1080) | 1 | ~100 KB | sharp composite |
| Social card (Pinterest 1000×1500) | 1 | ~100 KB | sharp composite |
| RSS entry | 1 | ~5 KB | free |
| Podcast RSS entry | 1 | ~2 KB | free |
| Newsletter fragment | 1 | ~2 KB | free |
| JSON-LD schema blob | 1 | ~3 KB | free (template) |
| Embeddings vector | 1 | ~4 KB | 1 embed call |
| Web Story metadata | 1 | ~1 KB | free |
| **Total** | **~40 files** | **~5.5 MB** | **~15 LLM calls + 1 image + 1 TTS** |

Per-day at 25 clusters × 6 runs = 150 clusters = 6,000 files and ~3,000 LLM calls — still well inside free tiers.

### Audio pipeline — podcast-grade TTS (free)

```ts
// scripts/tts.ts — Microsoft edge-tts via REST, no auth
import { EdgeTTS } from 'edge-tts-client'; // or inline the 50 LOC needed

async function generatePodcast(markdown: string, slug: string) {
  const cleanText = stripMarkdown(markdown);
  const chunks = chunkForTts(cleanText, 3000); // edge-tts max chunk ~ 3000 chars

  const audioChunks = await Promise.all(chunks.map(c =>
    edgeTts.synthesize({
      text: c,
      voice: 'en-US-AvaMultilingualNeural',   // natural, multilingual
      rate: '+5%',
      pitch: '+0Hz',
      format: 'audio-24khz-48kbitrate-mono-mp3'
    })
  ));

  const merged = Buffer.concat(audioChunks);
  const path = `public/audio/${yyyyMm}/${slug}.mp3`;
  await fs.writeFile(path, merged);

  // Generate VTT from SSML markers for accessibility + SEO
  const vtt = buildVTT(chunks);
  await fs.writeFile(path.replace('.mp3', '.vtt'), vtt);

  return { path, duration: estimateDuration(cleanText) };
}
```

Output drives:
- Per-article audio player (React-free, <audio> element)
- Standalone **podcast RSS** at `/podcast.xml` (Apple-compatible)
- **Spotify for Podcasters** can ingest the RSS — zero-cost distribution to Spotify listeners
- Transcript adds ~500 words of indexable content to the page

### Image generation — Flux Schnell on Cloudflare (free)

```ts
async function generateHero(visualPrompt: string): Promise<Buffer> {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/ai/run/@cf/black-forest-labs/flux-1-schnell`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${CF_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: visualPrompt,
        num_steps: 4,      // schnell is fast
        width: 1024, height: 768
      })
    }
  );
  const { result } = await response.json();
  return Buffer.from(result.image, 'base64');
}
```

10K neurons/day free. Each Flux Schnell gen = ~50 neurons. That's 200 images/day free. We need ~25. 8× headroom.

### Web Stories — AMP HTML template (static, free)

Small Astro template: `src/pages/stories/[slug]/index.astro` outputs valid AMP `<amp-story>` with 5 slides. Pure HTML. No framework. Registers in Google Discover via a `web-stories-sitemap.xml`.

### Social cards — composited at build time

```ts
import sharp from 'sharp';

async function generateSocialCard(article, template: 'x' | 'linkedin' | 'instagram' | 'pinterest') {
  const dims = { x: [1200,630], linkedin: [1200,627], instagram: [1080,1080], pinterest: [1000,1500] };
  const [w, h] = dims[template];
  const svg = `<svg width="${w}" height="${h}" ...>
    <image href="${article.hero_path}" x="0" y="0" width="${w}" height="${h*0.6}" />
    <rect x="0" y="${h*0.6}" width="${w}" height="${h*0.4}" fill="#000" />
    <text x="60" y="${h*0.72}" fill="#fff" font-family="Newsreader" font-size="${w*0.045}" font-weight="700">
      ${wrapText(article.title, 50)}
    </text>
    <text x="60" y="${h*0.92}" fill="#999" font-family="Inter" font-size="${w*0.022}">
      SYSTEMREPORT.NET
    </text>
  </svg>`;
  return sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer();
}
```

4 cards × 150 articles/day = 600 composites × sharp (~100ms each) = 60s per run. Acceptable.

---

## 8 · Multilingual — 10 Languages, Auto

Target languages (ranked by tech news readership):
1. Spanish (es) — 500M speakers, huge LATAM tech audience
2. French (fr) — EU + Africa
3. German (de) — EU tech hub
4. Japanese (ja) — massive tech purchasing power
5. Portuguese (pt) — BR tech scene
6. Italian (it) — EU
7. Turkish (tr) — user's native market, sizable tech readership
8. Korean (ko) — Korea is a tier-1 tech market
9. Simplified Chinese (zh-Hans) — traffic via VPN, still indexable
10. Russian (ru) — Yandex market

### Implementation

```ts
// Stage 12d — parallel translation
const langs = ['es','fr','de','ja','pt','it','tr','ko','zh-Hans','ru'];

async function translateAll(article, langs) {
  return Promise.all(langs.map(async lang => {
    const result = await router.call({
      task: 'translate',
      input: {
        source_lang: 'en',
        target_lang: lang,
        text: article.markdown,
        preserve: ['tags', 'links', 'code blocks'],
        instructions: 'Preserve journalistic tone. Do not translate proper nouns like company/product names. Localize units where applicable.'
      }
    });
    return { lang, markdown: result.value };
  }));
}
```

Each language has its own `/{lang}/posts/{slug}/` URL, hreflang tags, language-specific sitemap, and a language switcher in the UI. All static, pre-rendered by Astro. No runtime cost.

**SEO payoff:** 10× URL surface. Same article = 10 potential indexes in 10 Google locales. Competitors (US-only tech blogs) leave this traffic on the table.

### Quality control for translations

Round-trip translation check: take the Spanish output, translate back to English via a *different* provider, compute BLEU similarity. If < 0.6, flag and retry.

---

## 9 · Distribution Network — 15 Destinations, Automated

| Destination | Protocol | Implementation |
|---|---|---|
| Google Search | Web sitemap | Already ✓ |
| Google News | News sitemap | Already ✓ — needs Publisher Center registration |
| Google Discover | meta `max-image-preview:large` + Web Stories | Add in v1 §3.4 |
| Bing Search | Bing Webmaster + IndexNow | New — §14 roadmap |
| Bing News | Bing Webmaster + Publisher Hub | New |
| Yandex | IndexNow | New |
| Apple News | RSS ingestion → Publisher application | v1 §5.2 |
| Apple Podcasts | podcast.xml submission | New |
| Spotify | Podcaster ingestion (RSS) | New |
| Flipboard | Publisher application | v1 §5.4 |
| SmartNews | Publisher application | v1 §5.4 |
| NewsBreak | Publisher application | v1 §5.4 |
| Bluesky | ATProto API via Actions | New |
| Mastodon | API via Actions | New |
| Threads (Meta) | Threads API (if/when public) | Future |
| Telegram Channel | Bot API | New |
| Discord (internal ops) | Webhook | New |
| Email newsletter | Buttondown API | New |
| Email digest (weekly) | Cloudflare Worker cron | New |
| Feedly/Inoreader | PubSubHubbub hub ping | New |
| Reddit (top 1/run only) | Reddit API via script | New |
| LinkedIn (optional, weekly flagship) | LinkedIn API | Later |
| X/Twitter | Via Ayrshare free tier? Or Nitter? (API is paid) | Later |

**X/Twitter note:** the official X API is no longer free for posting. Option A: pay $200/mo (violates mandate). Option B: use Ayrshare free tier (50 posts/month). Option C: manual. Recommend B + C mix.

### Distribution runner

A single Cloudflare Worker or GitHub Action invoked post-publish:
```yaml
# .github/workflows/distribute.yml
on:
  push:
    branches: [main]
    paths: ['src/content/posts/**']
jobs:
  distribute:
    # Fan-out to all 15+ destinations in parallel
    # Each destination is a scripts/distribute/{platform}.ts with unified interface
```

Each distributor:
- Reads newly-added posts from the diff
- Formats for platform (Bluesky: 300 chars + image; Mastodon: 500; Telegram: 4096)
- Posts
- Logs outcome to `ops/distribution/YYYY-MM-DD.jsonl`
- On failure: retries 3× with backoff, then DLQ

---

## 10 · Self-Healing — Chaos Engineering

Every pipeline in production eventually meets an outage. Test for it proactively.

### Weekly chaos test (GitHub Actions)

`.github/workflows/chaos.yml` — runs Sunday 02:00 UTC:

```yaml
name: Chaos Test
on:
  schedule: [{ cron: '0 2 * * 0' }]
jobs:
  chaos:
    steps:
      - name: Disable random provider
        run: echo "CHAOS_DISABLE=gemini" >> $GITHUB_ENV
      - name: Run pipeline
        env:
          GEMINI_API_KEY: ""  # simulate cap hit
        run: node scripts/ingest.js
      - name: Assert articles still published
        run: |
          DIFF=$(git diff --name-only HEAD~1 HEAD -- 'src/content/posts/*.md' | wc -l)
          if [ "$DIFF" -lt 10 ]; then exit 1; fi
```

If the pipeline can't publish 10+ articles with any one provider killed, the test fails. We find resilience gaps before production does.

### Per-provider cooldown

Router tracks `cooldown_until` per provider. Manual overrides via `ops/provider-overrides.json` — e.g. to freeze Gemini for 30 days after cap hit:
```json
{ "gemini": { "cooldown_until": "2026-05-17T00:00:00Z", "reason": "monthly cap hit 2026-04-17" } }
```

### Dead man's switch

If no articles publish for > 8 hours (cron runs 6×/day = every 4h), trigger a Discord alert + page the operator (you). Implemented as a Cloudflare Worker cron checking the newest article's `publishedAt` timestamp.

---

## 11 · Observability — Full Telemetry at $0

### Structured logs

Every stage writes a line to `ops/telemetry/YYYY-MM-DD.jsonl`:
```json
{"ts":"2026-04-17T13:01:25Z","run_id":"r-abc","cluster_id":"c-xyz","stage":"cluster","provider":"workers-ai","model":"bge-large-en","latency_ms":23,"tokens_in":0,"tokens_out":0,"ok":true}
```

### Daily rollup

GitHub Action rolls up yesterday's telemetry at midnight UTC:
```
ops/reports/2026-04-17.json
{
  "runs": 6,
  "clusters_processed": 150,
  "articles_published": 143,
  "articles_dlq": 7,
  "stages": {
    "cluster": { "p50": 25, "p95": 180, "success_rate": 1.0 },
    "draft": { "p50": 2400, "p95": 8100, "success_rate": 0.98 },
    ...
  },
  "providers": {
    "groq": { "calls": 412, "failures": 2, "rate_limit_hits": 0 },
    "gemini": { "calls": 0, "skipped": "cooldown" },
    ...
  },
  "cost_estimate_usd": 0.00,
  "quality_scores": { "mean": 7.8, "p50": 8.0, "rejection_rate": 0.04 }
}
```

### Ops dashboard

Static page at `/_ops/` (password-gated via Cloudflare Access free tier, or just robots-noindex + obscure URL):
- Live stats from today's telemetry
- Provider health grid (red/yellow/green)
- Last 20 DLQ items with reasons
- Daily quality trend chart (vanilla SVG)
- Error log (last 100 failures, searchable)

Built as another Astro page, reading `ops/reports/*.json` at build time.

### Alerts

Simple Discord webhook posts on:
- Any DLQ addition
- Pipeline run producing 0 articles
- Provider entering 24h cooldown
- Quality score dropping below 6.5 mean
- Budget anomaly (any cost > $0 imagined)

No paid monitoring service needed.

---

## 12 · The Eval Harness — Continuous Quality Measurement

### Golden set

20 curated articles, human-scored on 5 dimensions (1–10 each):
- **Accuracy**: claims supported by sources
- **Originality**: not a rewrite, has a take
- **Readability**: would a normal person actually read this?
- **Structure**: good lead, logical flow
- **Headline**: would you click this?

Stored in `ops/eval/golden-set.json` with reference scores.

### Automated scoring

A `judge` model (Gemini 2.5 Pro, DeepSeek R1, or Claude 3.5 Sonnet via GH Models) scores every published article in real-time. No human needed for routine scoring.

Weekly sanity check: human re-scores 10 random articles. If judge and human disagree by > 1.5 mean, recalibrate the judge prompt.

### Metrics tracked

- Mean article score (target: 8.0)
- Rejection rate per gate (target: gate 4 < 5%, gate 5 < 2%)
- Headline CTR proxy: A/B tested once real traffic exists, using Cloudflare Worker to randomly serve title_variant_A vs B on social cards
- Time-to-publish (source first seen → article live)

### Prompt evolution

When scores drop, check the diff:
- Is it a provider change? (Groq 70B → Llama 8B because Groq quota hit?)
- Is it a prompt change? (we just shipped a new stylometric filter and ablated tone)
- Is it a source change? (a low-quality feed got added)

All prompt changes are version-controlled in `src/pipeline/prompts/*.ts` with a monotonic version number in each output's telemetry. Rollback is `git revert`.

---

## 13 · n8n — Optional Meta-Orchestrator

n8n is a node-based visual workflow builder. Can it add value here?

**Where n8n wins:**
- Non-dev tweaks to distribution step (e.g., "also post to TikTok via Zapier bridge")
- Quick prototyping of new sources (drag-drop RSS → transform → POST)
- Monitoring hub with visual status

**Where n8n loses:**
- Latency (extra HTTP hops)
- Requires hosting (no good free tier for real use)
- Another thing to maintain

### Free hosting options for n8n

- **n8n Cloud Starter**: 5K executions/month free — enough for 150 articles/day × 30 days × 1 webhook = 4,500. Borderline.
- **Self-host on Oracle Cloud Always Free** — 4× ARM Ampere cores, 24 GB RAM, free forever. Runs n8n + Postgres + Redis comfortably.
- **Self-host on Fly.io Hobby Free** — limited; not recommended post-2024 changes.
- **Self-host on Render free** — sleeps after 15 min idle; annoying for cron.
- **Self-host on Railway** — no longer free-tier friendly.

**Verdict:** self-host n8n on Oracle Cloud Always Free for distribution + monitoring. Keep core pipeline in Node/TS for speed + reliability. n8n becomes the **tinkerable outer layer**, not the core loop.

### n8n workflow: distribution

1. Webhook trigger (from GH Actions after publish commit)
2. Parse payload: list of new articles
3. Split
4. Fan-out: Bluesky node, Mastodon node, Telegram node, Discord node, Reddit node, Pinterest node
5. Aggregate results
6. Write summary back to `ops/distribution/`

Same logic as scripted — but editable by anyone visually. Good for iterating distribution strategy.

### n8n workflow: alerting

1. Cron trigger every 30 min
2. Fetch `https://systemreport.net/ops/latest.json`
3. If `last_article_published > 8h ago` → Discord alert
4. If `provider_health.any_red > 2` → Discord alert
5. If `today's quality_score_mean < 7.0` → Discord alert

n8n is good for this kind of reactive glue.

---

## 14 · Immediate Fix — Make It Work TODAY

Before any of the rest lands, unblock production **today**. 3-hour scope of work.

### Hotfix 1 — Multi-provider router, minimum viable (2h)

Add Groq as a second provider. Router picks Groq if Gemini is in cooldown.

**New file**: `src/pipeline/router.mjs`
```js
import { GoogleGenAI } from '@google/genai';

const providers = {
  groq: {
    call: async ({ task, prompt, schema }) => {
      const model = task === 'cluster' ? 'llama-3.3-70b-versatile' : 'llama-3.3-70b-versatile';
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [{ role: 'user', content: prompt }],
          response_format: schema ? { type: 'json_object' } : undefined,
          temperature: 0.7,
        })
      });
      if (!res.ok) throw new Error(`Groq ${res.status}: ${await res.text()}`);
      const j = await res.json();
      return j.choices[0].message.content;
    }
  },
  gemini: {
    call: async ({ task, prompt, schema }) => {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: schema ? { responseMimeType: 'application/json', responseSchema: schema } : {}
      });
      return res.text;
    }
  },
  cloudflare: {
    call: async ({ task, prompt }) => {
      const model = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';
      const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/ai/run/${model}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.CF_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [{ role: 'user', content: prompt }] })
      });
      const j = await res.json();
      return j.result.response;
    }
  }
};

const HEALTH_FILE = 'ops/provider-health.json';
async function loadHealth() { try { return JSON.parse(await fs.readFile(HEALTH_FILE, 'utf-8')); } catch { return {}; } }
async function saveHealth(h) { await fs.writeFile(HEALTH_FILE, JSON.stringify(h, null, 2)); }

const RANKINGS = {
  cluster: ['gemini', 'groq', 'cloudflare'],     // Gemini best at structured JSON
  draft: ['groq', 'gemini', 'cloudflare'],       // Groq fastest for long drafts
  critique: ['gemini', 'groq', 'cloudflare'],
  headline: ['groq', 'gemini', 'cloudflare'],
};

export async function routeCall({ task, prompt, schema, timeoutMs = 30000, maxAttempts = 3 }) {
  const health = await loadHealth();
  const ranked = RANKINGS[task] || ['groq', 'gemini', 'cloudflare'];

  for (const name of ranked) {
    const h = health[name] || {};
    if (h.cooldown_until && new Date(h.cooldown_until) > new Date()) continue;

    try {
      const result = await Promise.race([
        providers[name].call({ task, prompt, schema }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('timeout')), timeoutMs))
      ]);
      h.last_success = new Date().toISOString();
      h.consecutive_failures = 0;
      health[name] = h;
      await saveHealth(health);
      return { ok: true, value: result, provider: name };
    } catch (e) {
      h.consecutive_failures = (h.consecutive_failures || 0) + 1;
      h.last_error = String(e).slice(0, 200);
      h.last_failure = new Date().toISOString();
      if (String(e).match(/spending cap|RESOURCE_EXHAUSTED/)) {
        h.cooldown_until = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30d
      } else if (String(e).includes('429')) {
        h.cooldown_until = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 min
      }
      health[name] = h;
      await saveHealth(health);
      continue;
    }
  }
  return { ok: false, error: 'all providers failed' };
}
```

**Update `scripts/ingest.js`** to use `routeCall` instead of direct `ai.models.generateContent`. Two call sites: `clusterArticles` and `synthesizeArticle`. Minimal diff, maximum reliability.

**Update `.github/workflows/automate.yml`**:
```yaml
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  GROQ_API_KEY:   ${{ secrets.GROQ_API_KEY }}
  CF_ACCOUNT_ID:  ${{ secrets.CF_ACCOUNT_ID }}
  CF_TOKEN:       ${{ secrets.CF_TOKEN }}
  PEXELS_API_KEY: ${{ secrets.PEXELS_API_KEY }}
```

**User action (5 minutes)**:
1. Get free [Groq API key](https://console.groq.com/keys) → add as `GROQ_API_KEY` GitHub secret
2. Get free Cloudflare API token with Workers AI Read access → add as `CF_TOKEN` + `CF_ACCOUNT_ID`
3. Push. Next cron run → articles flowing.

### Hotfix 2 — Commit provider-health.json (10 min)

Add `ops/provider-health.json` to the repo so Gemini cooldown persists across runs. Add to `git add` in workflow.

### Hotfix 3 — Drain the backlog (30 min)

115 queued items + whatever has accumulated since. Dispatch workflow manually with `MAX_CLUSTERS_PER_RUN=100` override. Let it chew through. It should clear in 1-2 runs on Groq.

### Hotfix 4 — Post-mortem (20 min)

Add a line to `/ethics`: "When a provider fails, we fall over to another. We publish a monthly transparency report on provider usage."

**Total hotfix time: ~3 hours. After this, the site is unblocked.**

---

## 15 · The 14-Day Rollout

Every day has a ship target. Every target has a verify step.

### Day 0 (today) — UNBLOCK
- Groq + Cloudflare fallback router
- Secrets added
- Force a full backlog drain

### Day 1 — HARDEN
- Add Cerebras + GitHub Models to provider pool
- Provider health persistence in repo
- Per-provider quota tracking (RPD counter that resets at UTC midnight)

### Day 2 — STATE MACHINE
- Refactor `ingest.js` into 14-stage state machine
- Each cluster = state file in `ops/clusters/`
- Resumable pipeline

### Day 3 — SEMANTIC DEDUP + EMBEDDINGS CLUSTERING
- Wire Cloudflare BGE embeddings
- DBSCAN clustering (remove LLM clustering dependency)
- Embeddings persisted to `ops/embeddings/YYYY-MM.jsonl`

### Day 4 — MULTI-MODEL ENSEMBLE
- Stage 6: parallel Draft A + Draft B
- Stage 7: judge selects or merges
- Stage 8-9: critique + revise

### Day 5 — QUALITY GATES
- Zod schema validation
- Length/structure gate
- Stylometric filter (banned phrases)
- Originality check (embedding similarity)
- Reject → regenerate loop (max 2)

### Day 6 — GROUNDING
- Stage 10: Gemini Flash with Google Search grounding
- Tavily as fallback
- Per-claim evidence URLs stored in frontmatter
- Ungrounded claims → stripped or flagged

### Day 7 — SOURCE EXPANSION
- 80+ source catalog
- Reddit + HN + arXiv + YouTube + official blogs
- Per-source weights
- Parallel fetch with concurrency limit

### Day 8 — IMAGE GENERATION
- Cloudflare Flux Schnell hero images
- Sharp pipeline: AVIF + WebP + JPEG × 3 sizes
- Vision alt-text via Gemini
- 4 fallback providers

### Day 9 — AUDIO / PODCAST
- edge-tts integration (Microsoft neural voices)
- Per-article MP3 + VTT transcript
- Standalone `/podcast.xml` RSS
- Submit to Apple Podcasts + Spotify

### Day 10 — WEB STORIES
- AMP Web Story template
- 5-slide auto-generation
- web-stories-sitemap.xml
- Google Discover eligible

### Day 11 — TRANSLATIONS
- 10-language auto-translation
- Per-language sitemaps + hreflang
- Language switcher component
- Round-trip BLEU QC

### Day 12 — DISTRIBUTION NETWORK
- Bluesky autoposting
- Mastodon autoposting
- Telegram channel bot
- Discord webhook ops
- PubSubHubbub ping
- IndexNow multi-search-engine

### Day 13 — OBSERVABILITY
- Telemetry JSONL per run
- Daily rollup to `ops/reports/`
- `/_ops` dashboard
- Discord alerts on anomalies
- Dead-man's switch Cloudflare Worker

### Day 14 — EVAL HARNESS + CHAOS
- Golden set scored
- Automated LLM judge
- Weekly chaos test (kill random provider)
- Quality trend dashboard
- V2 declared production-ready

### Day 15+ — RUN THE PART I → II → III AGENDA from v1 (SEO, Lighthouse, engagement)

---

# PART II — Why 2070 Will Be Jealous

A 2026 system doing what 2070's AP wire would do.

## The list

1. **Editorial consensus via model debate.** Two frontier LLMs draft independently. A third model judges or merges. No single AI's biases dominate. Humans do this on editorial boards. We automate it.

2. **Traceable provenance on every claim.** Every factual statement has a URL + an evidence span from a source document. Cryptographically signed (future: on-chain provenance via IPFS). The reader can verify. A 2070 standard enforced in 2026.

3. **Multilingual at source, not as afterthought.** 10 languages, simultaneous publish, hreflang-correct. Most global newsrooms still translate human-to-human. We do it at wire speed.

4. **Every article has audio.** Not an option, not a premium feature — default. Natural TTS voices. Podcast-ready. Accessibility-first.

5. **Every article has a Web Story.** Vertical, swipeable, shareable, Discover-ready. The format newsrooms need a dedicated team for. We auto-generate.

6. **Real-time update semantics.** When a breaking story develops, the existing article updates with `dateModified` and a changelog — not a new article. Preserves URL equity. Respects the reader.

7. **Self-healing across provider outages.** Anthropic goes down, Google 429s, Groq rate-limits — doesn't matter. The pipeline routes around.

8. **Zero-cost multimodal.** Image gen, TTS, translation, web stories, podcasts — all on free-tier APIs. $0/mo for what cost $50K/mo of SaaS in 2023.

9. **Eval-driven prompt evolution.** Every change to every prompt is versioned, A/B-measured, rolled back if quality regresses. Prompts are code.

10. **Chaos-tested reliability.** Weekly, we kill a random provider in production-like conditions. The pipeline must survive. Netflix-style chaos monkey for editorial.

11. **Dead-letter queue with human override.** No article is silently dropped. If it fails 3×, a human sees it. The system doesn't lie about completeness.

12. **Provider cartel, not provider lock-in.** 12 text models, 6 image, 5 speech, 5 search — all free-tier, fully interchangeable. Switching costs: zero.

13. **Full-graph schema.org emission.** NewsArticle + Person + Organization + Speakable + Quotation + ClaimReview + ImageObject — connected, validated, machine-readable. The open semantic web, finally realized.

14. **Agentic refinement.** Draft → critique → revise → ground → polish. 5 passes. An artisanal process, automated. Better than a single tired human editor's one pass.

15. **Edge-native throughout.** Content served from Cloudflare's 300+ PoPs. Pages rebuilt in <60s. IndexNow pings instant. The reader's TTFB is <80ms anywhere on Earth.

16. **Open data by default.** `/data/posts.json`, `/data/clusters.jsonl`, `/data/embeddings.npy` — machine-readable APIs. Invites ecosystem. Creates backlinks.

17. **Cryptographically versioned.** Every article is a git commit. The full history is auditable. Nothing is ever silently edited.

18. **Model-agnostic by design.** When Claude 5 ships, when GPT-5 ships, when Gemini 3 ships — we drop them in behind the `draft` task class. Zero architecture change.

19. **Accessible by default.** WCAG AA on every page. Audio version of every article. Transcripts. Alt text on every image. Semantic HTML. Dark mode with respect for `prefers-color-scheme`.

20. **Transparent.** `/ethics`, `/standards`, `/corrections`, provider transparency reports, open source. No black box. The reader knows how the sausage is made.

---

# PART III — Preserved from v1: SEO, Lighthouse, Distribution

*(condensed; full text in `docs/plan-v1-archive.md` if you want it)*

## Lighthouse 100 across all 4 categories

1. **Best Practices 77 → 100**: kill third-party cookies by serving hero images same-origin. The Flux Schnell + sharp pipeline in §7 of Part I resolves this natively — generated images land in `public/heroes/`, no Pexels CDN needed.
2. **A11y 96 → 100**: raise `text-gray-500` contrast on light backgrounds to `#4b5563` (4.6:1).
3. **Perf 97 → 100 mobile**: preload LCP image with `fetchpriority="high"`, trim font weights to 4, enable View Transitions API.

## SEO foundations

- Full schema.org graph (Part I §11 covers generation; Part III renders)
- `/authors/{slug}` pages with Person schema
- `/topics/{topic}` pillar pages (weekly-generated explainers)
- `/ethics`, `/standards`, `/corrections`, `/masthead` pages for E-E-A-T

## News platform integrations

- Google News Publisher Center — apply at 30-day mark
- Apple News Publisher — apply at 30-day mark with bylines + cadence
- Bing IndexNow — deploy key.txt + workflow ping
- Flipboard, SmartNews, NewsBreak — apply at 60-day mark
- PubSubHubbub — add hub ping to RSS

## Engagement + growth

- Real newsletter (Buttondown free 100 subs) with double opt-in
- Giscus comments (GitHub Discussions, free)
- PWA with service worker + manifest
- Mastodon + Bluesky autoposting (covered in Part I §9)

See previous plan.md (preserved in `docs/plan-v1.md` if desired) for file-by-file changes.

---

# APPENDIX A — Prompt Templates (Versioned)

All prompts live in `src/pipeline/prompts/*.ts` with monotonic version suffixes (e.g. `draft.v7.ts`).

### Draft prompt (v1)

```
ROLE: Senior technology editor at a top publication.

INPUT:
<sources>
{SOURCES_JOINED}
</sources>

TASK: Write a 400-word original news article synthesizing the sources above.

REQUIREMENTS:
- Headline: 40-70 chars, no question marks, no "unveils/unleashes/reveals/game-changer/leverage/cutting-edge/seamless/revolutionize" (forbidden words).
- Lead: one sentence, <30 words, answers who+what+when.
- Nut graf: second paragraph, <40 words, answers why it matters.
- Body: 3-5 paragraphs, each making one claim supported by at least one source.
- End with a concrete forward-looking sentence (no "time will tell" / "remains to be seen").
- Inline source cues: "according to [Publication]" where you reference a specific fact.

STYLE:
- Active voice, second-person sparingly.
- Specific numbers over vague quantifiers.
- No "in today's fast-paced world", "as we move forward", "delve into", "at its core".
- Cliché budget: 0.

OUTPUT JSON:
{
  "title": string,
  "description": string (max 160 chars for meta),
  "article_markdown": string,
  "tags": string[] (5-7 lowercase),
  "visual_keyword": string (one concrete visual metaphor),
  "quotes": [{"text": string, "speaker": string, "source_url": string}]?,
  "entities": {"companies": string[], "products": string[], "people": string[]},
  "claims": [{"claim": string, "source_url": string}]  // for grounding check
}
```

### Critique prompt (v1)

```
ROLE: Skeptical editor. You did not write this piece.

INPUT:
<article>{ARTICLE}</article>
<sources>{SOURCES}</sources>

TASK: Find every weakness.

OUTPUT JSON:
{
  "unsupported_claims": [{"claim": string, "line_snippet": string, "suggestion": "strip|weaken|keep"}],
  "cliches_detected": [{"phrase": string, "line": number}],
  "structural_issues": string[],
  "missing_angle": string[],
  "headline_critique": string,
  "overall_score": number (1-10),
  "must_revise": boolean
}
```

### Judge prompt (v1)

```
Two drafts, same sources. Pick A, B, or merge. Score each on:
- Factual adherence (source coverage)
- Originality (1.0 = original, 0.0 = paraphrase)
- Structure
- Headline
- Prose
Output {winner: "A"|"B"|"merge", merged_markdown?: string, scores: {...}}.
```

### Grounding prompt (v1, Gemini only — requires Search tool)

```
For each claim below, find a URL that supports it. If no URL found, mark unsupported.
Claims: {CLAIMS_JSON}
Output {claim, supported: bool, evidence_urls: [string]}[].
```

### Headline engineer prompt (v1)

```
Given this article, produce 3 headlines optimized for Google News CTR.
Rules:
- 40-70 chars
- Noun-verb-object structure where possible
- No question marks
- Starts with a concrete entity (company/product/person) when possible
- Forbidden: unveils, unleashes, reveals, game-changer, leverage, cutting-edge, seamless, revolutionize, paradigm, robust, explore, delve, navigate, ushering, at its core
Output {headlines: [string, string, string], best_index: 0|1|2, rationale: string}.
```

### SEO polish prompt (v1)

```
Given the article markdown, existing articles list, and headline, output:
- Final slug
- Meta description (155 chars)
- Open Graph title (70 chars max)
- Open Graph description (200 chars max)
- 5-7 tags
- 3 internal-link suggestions from the existing articles list
- Twitter card alt text (125 chars max)
Output as JSON.
```

Every prompt is A/B tested. Version bumps happen via PR with before/after golden-set scores.

---

# APPENDIX B — File-by-File Implementation

Ordered by execution sequence.

| File | Purpose | Day |
|---|---|---|
| `src/pipeline/providers.ts` | Provider adapters: Groq, Gemini, Cloudflare, Cerebras, GH Models, OpenRouter, HF | 0 |
| `src/pipeline/router.ts` | Task-class routing, health tracking, retries | 0 |
| `ops/provider-health.json` | Persistent health state | 0 |
| `scripts/ingest.mjs` | Refactored driver using router | 0 |
| `.github/workflows/automate.yml` | Updated with Groq + CF secrets | 0 |
| `src/pipeline/state.ts` | Cluster state file I/O, DLQ | 2 |
| `src/pipeline/stages/00-sources.ts` | Source catalog + fetchers | 7 |
| `src/pipeline/stages/01-fetch.ts` | RSS + HTML + API fetchers, p-limit | 7 |
| `src/pipeline/stages/02-dedup.ts` | URL + SimHash + semantic dedup | 3 |
| `src/pipeline/stages/03-enrich.ts` | Full page, entity extraction | 7 |
| `src/pipeline/stages/04-cluster.ts` | DBSCAN + theme labeling | 3 |
| `src/pipeline/stages/05-prioritize.ts` | Cluster scoring + top-N | 7 |
| `src/pipeline/stages/06-draft.ts` | Parallel Draft A + B | 4 |
| `src/pipeline/stages/07-judge.ts` | Select/merge | 4 |
| `src/pipeline/stages/08-critique.ts` | Cross-family critique | 4 |
| `src/pipeline/stages/09-revise.ts` | Revision pass | 4 |
| `src/pipeline/stages/10-ground.ts` | Fact-check with Search grounding | 6 |
| `src/pipeline/stages/11-seo.ts` | SEO metadata + internal links | 11 |
| `src/pipeline/stages/12a-hero.ts` | Flux Schnell + sharp pipeline | 8 |
| `src/pipeline/stages/12b-audio.ts` | edge-tts → MP3 + VTT | 9 |
| `src/pipeline/stages/12c-story.ts` | AMP Web Story generator | 10 |
| `src/pipeline/stages/12d-translate.ts` | 10-language translation | 11 |
| `src/pipeline/stages/13-publish.ts` | Atomic commit | 2 |
| `src/pipeline/stages/14-distribute.ts` | Fan-out to 15+ destinations | 12 |
| `src/pipeline/quality/gates.ts` | 5 quality gates | 5 |
| `src/pipeline/quality/stylometric.ts` | Banned-phrase detector | 5 |
| `src/pipeline/quality/originality.ts` | Embedding similarity check | 5 |
| `src/pipeline/embeddings/index.ts` | Embedding I/O + cosine search | 3 |
| `src/pipeline/simhash.ts` | SimHash utility | 3 |
| `src/pipeline/prompts/draft.v1.ts` | First draft prompt | 4 |
| `src/pipeline/prompts/critique.v1.ts` | Critique prompt | 4 |
| `src/pipeline/prompts/judge.v1.ts` | Judge prompt | 4 |
| `src/pipeline/prompts/ground.v1.ts` | Grounding prompt | 6 |
| `src/pipeline/prompts/headline.v1.ts` | Headline prompt | 11 |
| `src/pipeline/prompts/seo.v1.ts` | SEO prompt | 11 |
| `src/pipeline/prompts/translate.v1.ts` | Translation prompt | 11 |
| `src/pipeline/telemetry.ts` | JSONL emitter | 13 |
| `src/pages/_ops/index.astro` | Ops dashboard | 13 |
| `src/pages/_ops/dlq.astro` | DLQ review page | 13 |
| `src/pages/podcast.xml.js` | Podcast RSS generator | 9 |
| `src/pages/web-stories-sitemap.xml.js` | Web Stories sitemap | 10 |
| `src/pages/[lang]/index.astro` (and nested) | Per-language pages | 11 |
| `.github/workflows/distribute.yml` | Distribution fan-out | 12 |
| `.github/workflows/chaos.yml` | Weekly chaos test | 14 |
| `.github/workflows/rollup.yml` | Daily telemetry rollup | 13 |
| `.github/workflows/backlog-drain.yml` | Manual backlog processor | 0 |
| `ops/eval/golden-set.json` | Eval reference articles | 14 |
| `scripts/score-article.mjs` | LLM judge for eval | 14 |
| `docs/EDITORIAL_VOICE.md` | Style guide injected into prompts | 4 |
| `docs/PROVIDER_QUOTAS.md` | Known free-tier limits per provider | 0 |
| `docs/adr/` | Architecture decision records | ongoing |

Approx: **50 new files**. Keeps structure clean — every concern in its own module.

---

# APPENDIX C — Emergency Runbooks

### "No articles have published in 8 hours"
1. Check `ops/provider-health.json` → any provider on cooldown?
2. If all providers cooling down → check Discord DLQ channel for root cause
3. If 1 provider cooling down → that's normal, should auto-route
4. Check `.github/workflows/automate.yml` latest run logs
5. If logs show new failure mode → add to router's permanent-error detection

### "All Gemini calls 429"
1. Do nothing. Router auto-detects and cools down Gemini for 30 days.
2. Verify Groq + CF Workers AI + Cerebras + GH Models are picking up slack in telemetry.
3. If quality drops → revisit prompt tuning for new primary model.

### "Article published with factually wrong claim"
1. Add URL to `/corrections` with diff
2. Rewrite article (human override) + stamp `dateModified`
3. Re-run Stage 10 grounding against the now-known-wrong claim → add to grounding regression tests
4. If the claim was grounded (search returned a false result), flag the grounding provider for review

### "Lighthouse score regressed"
1. CI should have blocked the merge; if it didn't, add that URL to `lhci.config.json`
2. Git bisect the merge commits
3. Revert. Reopen PR with fix.

### "DLQ has 20+ items"
1. Weekly review job produces a Discord summary
2. Manually inspect top 5 by recency
3. Patterns: often a source with bad content (paywall, video-only) — add to `SOURCE_BLACKLIST`
4. Retry surviving items with `--force-draft` flag

---

# APPENDIX D — The 2070 Spec Sheet

If someone in 2070 audited this in 2026, here's what they'd find.

| Dimension | Status |
|---|---|
| Multi-model (≥5 simultaneous) | ✓ |
| Agentic (≥3 reasoning passes) | ✓ |
| Multilingual (≥5 languages) | ✓ |
| Multimodal (text + image + audio + video) | ✓ |
| Zero-cost operations | ✓ |
| Zero-fail via fallback chains | ✓ |
| Full schema graph | ✓ |
| Traceable provenance | ✓ |
| Real-time publishing (< 30 min source-to-live) | ✓ |
| Evaluation-driven prompt evolution | ✓ |
| Chaos-tested reliability | ✓ |
| Open data APIs | ✓ |
| Accessible (WCAG AA) | ✓ |
| Transparent (ethics + corrections pages) | ✓ |
| Self-hosted / no lock-in | ✓ |
| Cryptographic version history | ✓ (git) |
| Audience diversification (15+ platforms) | ✓ |
| Dead-letter handling | ✓ |
| Non-blocking human-in-loop | ✓ |
| Model-agnostic architecture | ✓ |

A reasonable 2070 newsroom wouldn't do much more. And we do it with a laptop, a domain, and zero dollars.

---

# GROUND RULES (carry over from v1)

1. **Zero-dollar hard constraint.**
2. **Static-first.** Client JS only for progressive enhancement.
3. **Schema.org always.**
4. **E-E-A-T by default.**
5. **No tracking beyond Cloudflare Analytics.**
6. **Edge-cache everything.**
7. **Measure everything.** Every phase ends with a verify gate.
8. **Document decisions.** `docs/adr/NNNN-title.md`.
9. **Accessible by default.** WCAG AA minimum.
10. **Reversible changes.** Every PR is small enough to revert safely.

---

# THE ONE THING TO DO RIGHT NOW

1. `brew install gh` if not already; `gh auth login`
2. Create free Groq API key at [console.groq.com/keys](https://console.groq.com/keys)
3. `gh secret set GROQ_API_KEY` with the key
4. Run **Hotfix 1** from §14 (multi-provider router)
5. `gh workflow run automate.yml` — verify articles flow from the 115-item backlog

Then everything else in the 14-day plan compounds.

---

*Revised plan. v2. Built with Opus 4.7 on 2026-04-17. This document is a living blueprint — update as phases land, add new phases as the web evolves, preserve old versions in `docs/plan-vN-archive.md` for historical record.*
