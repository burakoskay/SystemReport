# System Report

An autonomous tech news publication. A scheduled pipeline ingests public RSS
feeds, clusters related reports, drafts and quality-checks articles across a
pool of eleven language models, translates them into ten languages, generates
audio narration, and deploys a static site to the edge — every two hours,
unattended.

**Live:** [systemreport.net](https://www.systemreport.net) · **Disclosure:** [how it works](https://www.systemreport.net/ai-disclosure)

All content is AI-generated and labelled as such. There is no newsroom.

---

## The problem this solves

Running a content operation normally means paying for writers, editors,
translators and voice talent, and the cost scales linearly with output. The
question this project asks is whether an automated pipeline can hold an
acceptable quality bar at near-zero marginal cost — and, more usefully, what
engineering it takes to keep something like that *running* rather than just
demoing well.

Current state: **1,348 articles**, ~7,100 translated pages, 10 languages,
running continuously since April 2026 on free-tier API quotas.

## Architecture

```
RSS feeds ──▶ sanitize ──▶ semantic clustering ──▶ dedup / update-matching
                                                          │
                    ┌─────────────────────────────────────┘
                    ▼
      ┌── draft A ──┐
      │             ├──▶ LLM judge ──▶ critique ──▶ revision ──▶ stylometric gate
      └── draft B ──┘                                                   │
                    ┌───────────────────────────────────────────────────┘
                    ▼
     translation (10 locales) ──▶ TTS narration ──▶ hero image
                    │
                    ▼
      git commit ──▶ Astro static build ──▶ Cloudflare Pages ──▶ freshness healthcheck
```

Two independent models draft each story, a third judges between them, a fourth
critiques the winner against its sources, and a revision pass addresses that
critique. A stylometric gate rejects promotional filler. Claims the source
material doesn't support are required to stay general rather than be invented.

**Routing:** stories are assigned by tag and category to one of seven editorial
desks, each a named voice profile — a prompt fragment enforcing consistent
constraints per beat. The desks are AI personas, disclosed on every article.

## Reliability engineering

This is the part that took the real work. Free-tier LLM quotas fail constantly,
so the pipeline is designed around the assumption that any given provider is
unavailable.

| Concern | Approach |
|---|---|
| Provider outages / rate limits | Router fans out over 11 models across 4 providers, with per-model health tracking, cooldown windows and automatic failover |
| Failed generations | Dead-letter queue with replay (`ops/dlq.jsonl`, `scripts/dlq-replay.js`) |
| Silent quality drift | Daily eval harness scoring per-prompt-variant output, diffed against the prior report (`ops/eval/`) |
| Untested failover paths | Chaos injection (`CHAOS_FAIL_RATE`) synthesises rate-limit, timeout, server-error and quota failures to exercise the cooldown logic |
| Deploy succeeded but site is stale | Post-deploy freshness healthcheck compares the live RSS against `main` and fails the run loudly |
| Duplicate coverage | Semantic dedup plus an update-matcher that revises an existing article instead of publishing a near-duplicate |
| Oversized assets | Build-time guard against Cloudflare's 25 MiB per-file limit |

### Case study: a 10-week silent outage

Worth reading if you care about failure modes.

On 16 May the ingest pipeline published an article tagged `Google I/O`. The
slash made Astro's `/tags/[tag]` route resolve to two URL segments, which threw
`Missing parameter: tag` — and because that throws during static generation, it
failed **the entire build**, not just that page.

The consequences compounded quietly:

1. Every deploy from that commit onward failed, so the live site froze on 16 May.
2. The ingest pipeline kept running correctly, committing new articles into a
   repository that could no longer be built.
3. The freshness healthcheck detected it and turned the run red, exactly as
   designed — but the alert was switched off rather than acted on, and content
   generation stopped on 7 June.

Root cause was a single unescaped character in generated content. Diagnosis came
from bisecting Cloudflare deploy statuses against commit history: the last green
deploy was the commit immediately before the one introducing that tag.

Fixes: tag slugs now route through one shared helper used by both the route and
every link site, so they cannot drift; and the repeated whole-collection reads
that made builds scale as O(pages × posts) were replaced with build-scoped
memoised indexes, cutting per-page render from ~40ms to ~2ms.

The lesson worth keeping is the third point. The monitoring worked. The response
to it didn't — a red check with no escalation path is not an alert, it's
decoration.

## Cost control

Runs entirely on free tiers, which is a design constraint rather than an
accident:

- Provider fan-out spreads load across quota pools instead of exhausting one
- Per-run caps (25 clusters) bound the blast radius of a bad run
- Ops-only commits are tagged `[CI Skip]` so telemetry churn doesn't burn the
  Cloudflare Pages monthly build budget
- Edge caching on the markets API collapses upstream calls to one per minute

## Governance

- Every article carries a visible AI provenance notice, localised into all ten languages
- `schema.org` credits the publishing Organization — never a `Person`, since
  asserting a human author in machine-readable form would be deceptive
- Desk profiles state plainly that they are AI personas with synthetic portraits
- A public [AI disclosure page](https://www.systemreport.net/ai-disclosure)
  documents the pipeline, names what the checks *don't* catch, and gives a
  corrections route
- Aligned with EU AI Act Article 50 transparency expectations for AI-generated
  content intended to inform the public

## Privacy-preserving browser tools

Two client-side utilities — an EXIF metadata stripper and a VRAM calculator.
They process files entirely on-device: no uploads, no storage, no network calls,
and no third-party scripts on the tool pages. Verifiable in DevTools.

## Stack

| Layer | Choice |
|---|---|
| Site | Astro 6, static output, Tailwind 4 |
| Hosting | Cloudflare Pages + Pages Functions |
| Models | Groq, Cloudflare Workers AI, Google Gemini, GitHub Models (11 models) |
| Search | Pagefind (build-time index, no server) |
| Media | Flux Schnell (images), TTS + ffmpeg normalisation (audio) |
| CI | GitHub Actions — ingest every 2h, gitleaks secret scanning, Lighthouse CI |
| Syndication | RSS, JSON Feed, podcast RSS, IndexNow, WebSub, AMP stories |

## Repository map

```
scripts/ingest.js         orchestrator — feeds → clusters → articles → commit
src/pipeline/router.mjs   multi-provider LLM router, health tracking, failover
src/pipeline/             dedup, grounding, translation, TTS, DLQ, distribution
src/lib/authors.mjs       the seven desks: voice profiles + routing
src/pages/                Astro routes (articles, locales, tags, tools)
functions/api/            Cloudflare Pages Functions (markets, newsletter, auth)
ops/                      DLQ, provider health, eval reports, telemetry
```

## Running locally

```bash
npm install
npm run dev
```

Node 22+. The build is static:

```bash
npm run build
```

## How this was built

I am not a developer. I designed this system, specified its behaviour, and
directed AI coding tools to implement it — then operated it in production,
diagnosed its failures, and decided how to fix them. The architectural calls
here (multi-provider failover over a single-vendor dependency, disclosed AI
personas over fabricated journalists, static generation over a CMS) were mine.
The code was written by AI under that direction.

## License

MIT
