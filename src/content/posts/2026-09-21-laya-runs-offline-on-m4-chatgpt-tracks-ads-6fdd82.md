---
title: "Laya runs offline on M4, ChatGPT tracks ads"
date: 2026-09-21T00:15:42.415Z
tags: ["llm","privacy","inference","ai"]
hero_image: "/hero/2026-09-21-laya-runs-offline-on-m4-chatgpt-tracks-ads-6fdd82.jpg"
hero_image_credit_name: "Rahul Pandit"
hero_image_credit_url: "https://www.pexels.com/@rahulp9800"
visual_keyword: "laptop screen showing AI code and performance metrics"
description: "New offline inference benchmarks, cross‑site data collection, and rescue services raise fresh questions for AI developers."
sources_count: 8
author: "maya-chen"
---

## Laya on Mac M4: Offline inference at 45 decisions per second

A user posted a demo of Laya (OS Jev) running on a Mac equipped with Apple’s M4 chip using CoreML. The model processed roughly 45 decisions per second without contacting a server. The test ran entirely offline, demonstrating that high‑throughput inference is possible on consumer hardware.

The demo leveraged CoreML’s quantization pipeline to fit the model into the M4’s neural engine. The author noted that the latency matched earlier GPU‑based runs, but the power draw stayed lower. No external cloud API was involved, which eliminates latency spikes caused by network jitter. The result suggests that developers can ship sophisticated language‑model‑based features directly in macOS apps.

## ChatGPT now knows what you do on other websites via ad collector

A recent article on Buchodi.com claims that ChatGPT can infer a user’s activity on unrelated sites through an ad‑collector script embedded in third‑party pages. The script reportedly gathers click identifiers and timestamps, then feeds the data into OpenAI’s backend as part of the conversation context.

The report does not provide raw data, but it cites a proof‑of‑concept where the model answered questions about a user’s recent purchases on an e‑commerce site that the user had visited earlier that day. The author warns that the practice blurs the line between conversational AI and cross‑site tracking. OpenAI has not publicly confirmed the feature, and the article notes that the collector relies on standard advertising pixels.

## Pirate Face rescues LLM models from deletion

Pirate Face, a web service launched at pirateface.co, offers a “model vault” that intercepts deletion requests for large language models. According to the site’s description, the service hooks into model registries and creates immutable snapshots before a model is removed.

The tool targets scenarios where organizations purge older checkpoints to save storage, only to discover later that a version contained a rare capability. Pirate Face stores the snapshot on decentralized storage, making it retrievable even after the original repository is gone. The service’s creator argues that preserving model history mitigates accidental loss, though critics point out the potential for retaining harmful or biased models.

## Chat‑based LLMs replicate the mechanisms of a psychic’s con

Softwarecrisis.dev published an essay that compares the persuasive tactics of chat‑based LLMs to those used by stage psychics. The author argues that both rely on vague statements, pattern matching, and the illusion of personal insight to convince users of hidden knowledge.

The piece highlights that LLMs often produce confident‑sounding answers even when the underlying probability distribution is low. This overconfidence can mislead users into accepting false claims, much like a psychic who reads cues and fills gaps with generic statements. The author calls for better uncertainty signaling in model outputs to curb the “cold‑reading” effect.

## What to watch

The community should track three developments. First, Apple’s upcoming M5 chip may shift the performance ceiling for offline inference, forcing developers to reassess CoreML optimizations. Second, OpenAI’s policy updates on data collection could clarify whether ad‑collector scripts will be integrated into ChatGPT’s pipeline. Third, regulatory bodies are beginning to examine model‑preservation services like Pirate Face for compliance with emerging AI safety standards. Each of these points will shape how AI tools balance capability, privacy, and accountability.
