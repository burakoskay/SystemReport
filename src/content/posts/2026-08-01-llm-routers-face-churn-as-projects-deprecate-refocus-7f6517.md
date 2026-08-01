---
title: "LLM routers face churn as projects deprecate, refocus"
date: 2026-08-01T17:16:56.686Z
tags: ["llm","router","open-source","cost","inference"]
hero_image: "/hero/2026-08-01-llm-routers-face-churn-as-projects-deprecate-refocus-7f6517.jpg"
hero_image_credit_name: "Google DeepMind"
hero_image_credit_url: "https://www.pexels.com/@googledeepmind"
visual_keyword: "diagram of multiple AI models connected through a routing proxy"
description: "Manifest shuts down its router while open‑source alternatives like RouteLLM, Any‑LLM, and ClawRouter vie for the cost‑saving niche."
sources_count: 5
author: "maya-chen"
---

Manifest announced the deprecation of its LLM router, joining a wave of projects that are either folding or pivoting. The move signals that the early hype around universal model dispatchers is giving way to more focused implementations.

The Manifest blog post titled *Everyone is building LLM routers, we deprecated ours* admits that the team will stop maintaining the service.[^1] No new code will be merged, and existing users are urged to migrate to other solutions.[^1] The announcement arrived alongside a lively Hacker News discussion that logged 127 points and dozens of comments, underscoring how many developers have already experimented with routing layers.

## Open‑source routers gain traction

RouteLLM provides a lightweight OpenAI‑compatible server that swaps between a strong model and a weaker, cheaper one.[^3] The repository shows a default pairing of `gpt-4-1106-preview` with `anyscale/mistralai/Mixtral-8x7B-Instruct-v0.1`.[^3] A cost threshold of **0.11593** routes roughly half the queries to GPT‑4, according to the project's calibration guide.[^4][^3][^5] The router relies on LiteLLM for provider abstraction and still requires an OpenAI API key to generate embeddings for its ranking strategies.[^4][^6][^7][^8]

The framework also supports local models and custom routing strategies via a simple CLI flag syntax.[^3] Users can launch the server, point any OpenAI client at it, and let the router decide which backend to call.[^3] The documentation emphasizes that the *mf* router delivers strong performance with low overhead, a claim backed by internal benchmarks but not independently verified.[^3]

Any‑LLM takes a different angle. It offers a unified SDK that maps provider‑specific model strings onto a single interface. By swapping a provider name in the import statement, developers can switch between OpenAI, Anthropic, Azure, Mistral, Ollama, and others without rewriting request code. The project pulls official SDKs when available and falls back to a framework‑agnostic shim otherwise. It ships under the Apache 2.0 license and includes optional modules for API‑key management, usage analytics, and multi‑tenant support via the Mozilla‑AI `otari` stack.

Both projects aim to hide the quirks of each vendor’s API. Neither claims to eliminate the underlying cost differences; instead, they give engineers the plumbing needed to build their own routing logic.

## Intent‑tuned and agent‑first routers

A smaller research effort introduced an intent‑tuned router that classifies queries before picking a model. The system trains a BAAI/bge‑base‑en‑v1.5 encoder on the GAIR‑NLP/Auto‑J scenario classification dataset, then merges the fine‑tuned weights at a 3:2 ratio. For each incoming prompt, the router generates intent categories, runs pairwise evaluations with GPT‑4‑turbo (April 2024), and computes Bradley‑Terry scores to rank candidate models. Scores are normalized to a 0‑1 range for downstream weighting.

The approach promises finer granularity than a simple cost‑threshold but adds latency from intent inference and pairwise scoring. The codebase does not include a production‑grade server; it remains a proof‑of‑concept for research labs that need per‑intent quality guarantees.

ClawRouter targets autonomous AI agents rather than human developers.[^4] Its README claims up to **87%** inference‑cost reduction and a baseline **78%** savings on typical workloads.[^4] The router evaluates each request across fifteen dimensions and selects the cheapest capable model in under 1 ms, all on the local machine. It supports 66 models from providers such as OpenAI, Anthropic, Google, xAI, and DeepSeek, and it integrates with the x402 protocol for USDC micropayments.[^4] The project is MIT‑licensed and ships with a one‑click install script that configures wallet authentication, model allowlists, and a local proxy on port 8402.

ClawRouter’s agent‑first design removes the need for API keys or credit‑card billing.[^4] Free tiers ship with eight open models, and developers can add paid providers by funding a wallet address with a few dollars of USDC.[^4] The router advertises zero‑knowledge routing: no request leaves the host before the local decision is made.[^4]

## Why the churn matters

The deprecation of Manifest’s router illustrates a broader market correction.[^1] Early routers promised a one‑size‑fits‑all gateway, but cost structures, latency requirements, and security models differ sharply across deployments. Projects that survive tend to specialize: RouteLLM focuses on cheap‑versus‑expensive pairings, Any‑LLM on provider‑agnostic SDKs, intent‑tuned routers on query classification, and ClawRouter on autonomous agents.

Cost remains the primary driver. A GPT‑4 request can cost several cents, while Mixtral‑8x7B runs for a fraction of a cent on cloud GPUs. Routing half the traffic to the cheaper model, as RouteLLM demonstrates, can halve a bill without obvious quality loss for many workloads.[^4][^3] However, the need for an OpenAI key to generate embeddings shows that even hybrid setups still depend on a dominant provider for certain primitives.[^4][^6][^7]

Latency is another pressure point. ClawRouter’s claim of sub‑millisecond routing hinges on local decision logic and pre‑loaded model metadata.[^4] Cloud‑based routers that proxy through external services inevitably add network hops, which can be unacceptable for real‑time agents. The trade‑off is that local routers must keep model binaries up to date, a maintenance burden that smaller teams may avoid by relying on a hosted service.

Security and compliance also shape the landscape. Agent‑first routers that accept wallet signatures avoid storing API keys, reducing attack surface.[^4] Conversely, unified SDKs like Any‑LLM still require developers to embed provider credentials, which can be a liability in multi‑tenant environments.

## Forward‑looking considerations

The next wave of routing tools will likely blend these concerns. Expect tighter integration with cost‑monitoring platforms, more granular quality‑of‑service controls, and open standards for intent classification. Keep an eye on the release cadence of RouteLLM’s `mf` router, any updates to ClawRouter’s x402 payment flow, and the emergence of benchmark suites that compare routing strategies at scale. The decisions teams make about routing will directly affect cloud spend, latency budgets, and the security posture of AI‑driven products.

**What to watch:** the first quarter of 2027 will see several cloud providers announce native routing primitives in their APIs. Monitoring those announcements will reveal whether third‑party routers can maintain a niche or will be subsumed by platform‑level features.

[^1]: [openrouter.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG3ry4OViEV-uxh_RYaqmKHVKhGxA9ZJ7Li1iOlI9dHrocoZlHuHFMgSDuy9HVmmS081H-rH8c4BHvKVvdO21YlpiHkFMysNCq5ervHpjekLCl70yWa7cNKxNIsQe2DQY0IeryC7XXhavXwyPJbU2fDr4yKajmYYIEUt9fef6ZYRQ==)
[^2]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHLx2kMrf7_VDmDB38cwGIx-ESrzz2Hue19jz-7-jwT-AdAyV9tC5qJDBs-xDIYJvvDF4ihDF0uODBrljmBW5eh4cf5kmAMGsEHXDAyOdYlt1qtya0vh48EEekj4A==)
[^3]: [pondhouse-data.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH74EtqIxdXD_PK8gY7NTXZ_vKG1QtrEYQ6xprETHmCNU853yW2bM6rr5iLWz1BRHMOTQ22f260RrxjcL5Fuq1nZ9UaCWjnY9Cti7Jj6FEx15429rOKk-jiuQCgkJYgpv9aoSNRAnOMgetcssKLg_GNeYPTJgITkWrfcXQ=)
[^4]: [substack.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfVS94at8N6mwDq2pN3IOaxiVmlKKnAWZmiuUstSicSVu0Gd3-gvPEwI1WLE3VQ-zGU2udc2fYIeYY1PmMqQwThSKOeHq1_gwkC8enHrLC30Mvz8mIrdPX42M_GZDuFIaiclZk00WEFh1-f1PMMhn9Jkai4OWj5wFPWQ==)
[^5]: [litellm.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHcWQxp5wRhUbDtOxptHrlaalCvC_tzYZBB_2rKdIQOABLphKKw5hUGK6g8aQHyenl-oerVpybLbzHV3nmZb0NpGW6P9tDXSY_0nmLClYWARqoBUi6aomWbVAQETKRoUtQhgfa6thEHZyIZdxYaA-BWpb8=)
[^6]: [litellm.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFn5DIbcsQ-J2Eme6X6lCw7tuylamgoU0HHgZTFAUWk_a8YOujqxHtH_y2SkOmxinB88LNbkvpba2fUHU7E9Xz_POjKUHW3npuF-Pw_nRENL5Oc6HVHvILbwrtC57Kvf9oDb_EK-EP70-DtFp-WVhqmGS7Jrg==)
[^7]: [developersdigest.tech](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwSghVUTcxrw6ZJYAEk8s2RAKEVjkvH51pDa_GBRpk-y-kg854cxoUIAJtTxlrtv9R-eFfLXlmdaUdTk7owFuWpCbm52HfX8gH9zV41VF2xbyU9gJy6B0yBpbuaams1XLnVXHTbOc2QEkg-C_UlJxfuljOZrwY7Ck-pMg=)
[^8]: [zylos.ai](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvye6QbQfLmvSlh001O0Ot-EqGqjXGMMNDxduP56zn-W9OITTjzbgesGLKloSWv0YRXDDVKa-Wa-JDhcFhUlXA1N7Q7elsJw1Szs-yTnzS8OIwrXqUx56ifydSCX8cyGm5RkRf2IyYjkk1G9-7RuUVXfKrcxZBzXggTUI5IhE5hX23_HJ9U0U=)
