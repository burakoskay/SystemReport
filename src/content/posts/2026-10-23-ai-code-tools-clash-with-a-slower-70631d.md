---
title: "AI code tools clash with a slower"
date: 2026-10-23T09:03:22.282Z
tags: ["ai","software-development","verification","hackernews","open-source"]
hero_image: "/hero/2026-10-23-ai-code-tools-clash-with-a-slower-70631d.jpg"
hero_image_credit_name: "Alberlan  Barros"
hero_image_credit_url: "https://www.pexels.com/@alberlan"
visual_keyword: "developer at desk surrounded by code and AI symbols"
description: "A look at recent calls for slower development, historic skepticism of natural‑language coding, and how LLMs are reshaping formal verification."
sources_count: 9
author: "maya-chen"
audio_path: "/audio/2026-10-23-ai-code-tools-clash-with-a-slower-70631d.mp3"
audio_bytes: 546107
audio_mime: "audio/mpeg"
---

## Move Slow and Fix Things: A timely reminder

Endler's "Move Slow and Fix Things" essay resurfaced on Hacker News this week, urging engineers to prioritize stability over rapid feature churn. The post, dated 2024, sparked a 139‑point discussion about the hidden costs of sprint‑driven roadmaps.

Endler argues that teams often sacrifice long‑term maintainability for short‑term headlines. He points to incidents where rushed releases introduced regressions that took weeks to untangle. The commentary thread highlights a pattern: developers burn out, codebases become brittle, and users lose trust. The article does not propose a new methodology; it simply asks teams to pause, audit, and allocate time for debt reduction.

The conversation mirrors a broader industry fatigue. Companies that built massive microservice ecosystems in the last decade now spend a noticeable portion of their engineering budget on reliability engineering. The move‑slow mantra is not a call for stagnation; it is a demand for measurable improvement before the next rollout.

## The foolishness of "natural language programming": a 1978 warning

An archived essay from 1978 titled "The foolishness of \"natural language programming\"" resurfaced on Hacker News alongside Endler's post. The piece, originally published by Edsger Dijkstra's group, warned that translating human prose into executable code was a pipe dream.

Dijkstra's team highlighted that natural language is ambiguous, context‑dependent, and resistant to formal analysis. They cited early attempts at command‑driven systems that collapsed under the weight of edge cases. The essay concluded that engineers should treat programming as a disciplined activity, not a casual conversation.

The relevance is stark. Modern large language models (LLMs) promise to turn plain English into working snippets, yet the core criticism remains unchanged: ambiguity breeds bugs. The 1978 perspective forces a check on the hype surrounding AI‑generated code, reminding us that without rigorous specification, the output is as fragile as the input.

## LLMs and formal verification: scaling rigor

Anthropic's recent research blog, "LLMs are making formal software verification feasible at a much larger scale," argues that generative models can assist in proving program properties that were previously out of reach. The post, posted on the company's site and discussed on Hacker News with 342 points, details a pipeline where an LLM suggests invariants, which a theorem prover then checks.

The authors report that the approach reduces the manual effort required to construct proof obligations. In their experiments, the LLM‑augmented workflow completed verification tasks on codebases ten times larger than prior benchmarks. The blog does not claim that LLMs replace human insight; instead, it frames them as a productivity multiplier for formal methods.

Critics in the comment thread note that the technique still depends on high‑quality training data and that false positives can mislead developers. Nevertheless, the research marks a shift: formal verification, once the domain of a few academic labs, is now being integrated into mainstream tooling pipelines.

## Hedra: A high‑schooler’s 3D open‑world engine proves what individuals can build

A separate Hacker News thread highlighted "Hedra is a 3D open world game I wrote from scratch while in highschool." The project, hosted on GitHub under the pre‑AI branch, showcases a complete engine built without external libraries for rendering, physics, or asset pipelines. The repository earned 192 points and sparked a discussion about the feasibility of solo development in a market dominated by large studios.

The creator, a high‑school student, documented the entire pipeline: a custom rasterizer, handcrafted collision detection, and a scripting language for game logic. The codebase is fully open source, allowing anyone to inspect the architectural decisions. Reviewers praised the project's educational value and its demonstration that core engine work does not require AI‑generated scaffolding.

At the same time, several commenters argued that modern indie teams increasingly rely on AI tools for asset generation and code templating. Hedra stands as a counterexample, suggesting that the move‑slow philosophy can still produce ambitious results when developers invest the necessary time.

## What to watch: AI‑assisted development versus disciplined engineering

The intersecting threads from Endler, Dijkstra, Anthropic, and the Hedra project illustrate a tension that will shape the next wave of software engineering. On one side, LLMs are lowering the barrier to formal verification, making rigorous proofs more accessible. On the other, the community is re‑examining the cost of speed‑first cultures that ignore debt.

Key signals to monitor include: adoption rates of LLM‑augmented verification tools in CI pipelines; corporate policies that mandate code‑freeze periods for debt remediation; and the emergence of open‑source projects that deliberately eschew AI assistance in favor of handcrafted solutions. The next major conference on software reliability will likely feature panels debating whether AI can ever replace the disciplined practices warned about in 1978.

Stakeholders should track Anthropic's upcoming release of a verification‑focused SDK, Endler's follow‑up essays on organizational change, and any shifts in hiring patterns that favor formal methods expertise over pure rapid‑prototype experience. The balance between speed and safety will determine whether the industry moves forward with confidence or retreats into brittle, fast‑paced churn.
