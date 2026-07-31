---
title: "Smallest.ai raises $13M as open‑source voice models shrink"
date: 2026-07-31T16:04:54.137Z
tags: ["voice-ai","open-source","startup","speech-processing"]
hero_image: "/hero/2026-07-31-smallest-ai-raises-13m-as-open-source-voice-models-shrink-ceea50.jpg"
hero_image_credit_name: "ThisIsEngineering"
hero_image_credit_url: "https://www.pexels.com/@thisisengineering"
visual_keyword: "engineer testing speech synthesis on laptop"
description: "Smallest.ai secures $13M to build ultra‑fast Turing‑test‑grade voice AI while open‑source projects deliver sub‑80 MB models and low‑resource VAD tools."
sources_count: 4
author: "maya-chen"
---

## Smallest.ai's $13M Bet on Real‑Time Human‑Like Phone Calls
Smallest.ai announced a $13 million Series A round on Monday, backing its plan to ship voice models that can pass a Turing‑test style phone call. The funding came from a mix of venture firms and strategic angels, according to TechCrunch.
The startup says its models run at "ultra‑fast" speeds and sound genuinely human. It positions the technology for outbound sales, support, and any scenario that still relies on phone calls. No technical paper was linked, so the exact latency numbers remain unknown. The claim that the models can fool a listener is bold, but the lack of public benchmarks makes verification difficult.
What matters is the timing. Voice‑based AI has been dominated by cloud‑heavy services that require GPUs. Smallest.ai’s pitch is that a lean, low‑latency engine can unlock use‑cases where a phone network’s round‑trip time is the bottleneck. If the model truly runs on commodity CPUs, it could undercut the cost structure of existing providers.

## Open‑Source Alternatives Shrink Voice Models to Fit on CPUs
Kitten TTS released version 0.8 this week, adding three new models that range from 15 million to 80 million parameters. The smallest model occupies roughly 25 MB on disk, the largest about 80 MB, and both run on CPU without a GPU, the project’s README notes.
The library is built on ONNX and returns a NumPy array of 24 kHz audio samples. It also normalizes text, handling dates, currencies, and URLs before synthesis. Voice names include Bella, Jasper, Luna, and five others, giving developers a ready‑made palette.
Developers are warned that the nano int8 variant has reported issues, and the repo is marked as a developer preview, meaning APIs may change. Commercial support and custom‑voice contracts are available via email to info@stellonlabs.com. The open‑source license is Apache 2.0, allowing unrestricted integration.
These releases show that high‑quality speech synthesis no longer demands multi‑gigabyte models. The trade‑off is reduced expressiveness compared to large‑scale systems, a point the maintainers acknowledge by offering paid custom‑voice services.

## TEN VAD Shows That Accuracy Need Not Cost Compute
The TEN VAD framework claims superior precision over WebRTC VAD and Silero VAD while using less CPU and memory. The project's evaluation, run on manually annotated test sets from LibriSpeech, GigaSpeech, and DNS Challenge, shows higher precision‑recall curves for TEN VAD.
Cross‑validation on internal real‑world datasets reproduced the findings, according to the repository’s documentation. The default 0.5 threshold can be tuned for domain‑specific tasks, but the out‑of‑box configuration already beats the competition on latency, detecting speech‑to‑non‑speech transitions in under ten milliseconds.
Customer quotes reinforce the technical claims: "We selected TEN VAD because it provides faster and more accurate sentence‑end detection in Japanese while still being lightweight and fast enough for live use," said a representative from LiveCap. Another user, Rustpbx, noted, "TEN VAD's overall performance is better than Silero VAD. Its high accuracy and low resource consumption helped us improve efficiency and significantly reduce costs."
TEN VAD runs on 16 kHz audio, supports five operating systems, and offers Python bindings optimized for Linux x64. Its small library size and low real‑time factor make it a practical drop‑in for edge devices and on‑premise deployments.

## Observability Tools Like Agnost AI Reveal Gaps in Deployed Agents
Agnost AI launched on Hacker News with a pitch to continuously analyze production conversations and surface failure patterns. The tool claims to detect where users get stuck, frustrated, or abandon a workflow, then open reviewed pull requests to fix the underlying agent logic.
The company advertises a two‑minute setup and OpenTelemetry native integration. Testimonials posted on the launch page claim measurable improvements: one user said their Voice BDRs booked more meetings after Agnost AI surfaced conversion‑blocking patterns; another reported that hidden feature requests emerged from raw conversation logs.
Agnost AI works with any LLM and any framework, according to the marketing copy. It categorizes failures into broken workflows, repeated retries, setup friction, churn risk, and similar signals. The platform does not replace traditional eval suites; instead, it surfaces real‑world bugs that synthetic tests miss.
The open question is how well the automated PR generation scales. Early adopters praise the speed of fixes, but the lack of public success metrics makes it hard to assess long‑term impact on model quality or developer productivity.

## What to Watch
Smallest.ai’s next milestone will be a live demo that measures latency on a standard telephone network. Keep an eye on whether the company publishes benchmark data that can be compared to the open‑source Kitten TTS models and TEN VAD’s latency numbers. A successful rollout could pressure larger cloud providers to offer comparable CPU‑only endpoints. Conversely, if the demos fall short, the market may double down on GPU‑heavy pipelines while still borrowing lightweight components from the open‑source ecosystem.
