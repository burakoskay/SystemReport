---
title: "RTX 4090 runs 125B AI model as old AMD cards get Linux boost"
date: 2026-10-04T18:11:51.638Z
tags: ["ai","hardware","open-source","cloud","linux"]
hero_image: "/hero/2026-10-04-rtx-4090-runs-125b-ai-model-as-old-amd-cards-get-linux-boost-c6c423.jpg"
hero_image_credit_name: "Nana  Dua"
hero_image_credit_url: "https://www.pexels.com/@nanadua11"
visual_keyword: "high‑tech data center with RTX 4090 GPUs and vintage AMD graphics cards"
description: "A 125‑billion‑parameter model now runs on a consumer RTX 4090, while Valve revives legacy AMD GPUs and industry debates hard budget caps."
sources_count: 10
author: "elena-marchetti"
---

## AI at the edge: 125‑billion parameters on a RTX 4090

Niko1221 posted a build that pushes the Qwen 3.8 Flash Next 125‑billion‑parameter model to 100 trillion operations per second on a single RTX 4090. The benchmark proves that consumer‑grade graphics hardware can host models once reserved for multi‑node clusters. The code runs on the Strata framework and uses the GPU’s tensor cores without custom silicon. The result is a full‑scale LLM that fits on a desktop workstation.

The achievement matters because inference cost has been the primary barrier for startups that cannot afford dozens of A100s. Hitting 100 T/s on a $1,600 card slashes per‑query electricity bills and opens the door to on‑prem deployment for edge use cases. It also forces cloud providers to rethink pricing tiers that charge premium rates for “large‑model” access.

## Old silicon, new tricks: Valve's driver work for legacy AMD GPUs

Valve engineer Timur Kristóf released a set of Linux driver patches that extract an extra 15 percent performance from AMD GPUs launched before 2020. The patches target the open‑source AMDGPU driver and re‑enable hidden power‑states that the vendor driver disabled after the hardware reached end‑of‑life. By exposing these states, older cards can sustain higher clock speeds during compute bursts.

Valve’s motivation is practical: many Steam users still run games on decade‑old rigs. Extending the usable life of those GPUs reduces electronic waste and keeps the PC market fluid. The work also demonstrates how community‑driven driver development can outpace official vendor roadmaps when there is a clear user demand.

## The budget ceiling: why hard caps matter for AI and gaming

Simon Willison argued that default hard budget caps should become a standard safety valve across cloud services. He points out that the cost of running a 125B model on a single RTX 4090 is still measurable—hundreds of dollars per month for continuous inference. Without a hard cap, developers can accidentally trigger runaway spend when scaling experiments.

Willison’s proposal mirrors the budgeting discipline that game studios applied after the “GPU‑driven inflation” of the past two years. By enforcing a ceiling at the API level, providers can protect customers from hidden fees and encourage more predictable pricing models. The idea also aligns with regulatory pressure on large AI operators to disclose compute usage.

## Cloudflare’s Git ambition and the platform dilemma

Cloudflare published a call for developers to build the next Git platform on its edge network. The company promises low‑latency storage, automatic TLS, and global distribution, but it also expects developers to adopt Cloudflare’s proprietary APIs. Nolan Lawson’s recent essay on why developers “don’t use the platform” highlights the friction that arises when a service bundles too many abstractions.

Lawson notes that engineers gravitate toward tools that expose the underlying primitives rather than hide them behind opaque layers. Cloudflare’s proposal therefore faces a cultural hurdle: convincing seasoned developers that the edge‑first model will not lock them into a single vendor. The success of the initiative will hinge on transparent pricing and the ability to run existing Git workflows without major rewrites.

## What to watch

The next quarter will reveal whether the Qwen 3.8 benchmark spawns a wave of consumer‑level LLM deployments or remains a niche proof‑of‑concept. Valve’s driver patches will be merged into the mainline Linux kernel only if the community validates the performance gains on a broad set of cards. Meanwhile, cloud providers are expected to roll out default hard budget caps in their public APIs, a move that could reshape how startups budget AI experiments. Finally, Cloudflare’s edge‑Git platform will launch a beta in early 2027; adoption rates and developer feedback will indicate whether the edge‑first approach can overcome the platform‑use resistance highlighted by Lawson.