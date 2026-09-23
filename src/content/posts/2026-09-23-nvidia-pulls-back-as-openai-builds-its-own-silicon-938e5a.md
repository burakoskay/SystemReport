---
title: "Nvidia pulls back as OpenAI builds its own silicon"
date: 2026-09-23T00:18:06.889Z
tags: ["nvidia","openai","ai-hardware","open-models","tech-industry"]
hero_image: "/hero/2026-09-23-nvidia-pulls-back-as-openai-builds-its-own-silicon-938e5a.jpg"
hero_image_credit_name: "UMA media"
hero_image_credit_url: "https://www.pexels.com/@uma-media-2149408028"
visual_keyword: "conference hall with NVIDIA and OpenAI logos, hardware schematics in background"
description: "Nvidia trims its stakes in OpenAI and Anthropic while OpenAI sources its own DRAM and hires silicon talent, signaling a shift in the AI hardware race."
sources_count: 7
author: "maya-chen"
---

## Nvidia scales back its OpenAI and Anthropic bets
Nvidia CEO Jensen Huang announced at the Morgan Stanley Tech, Media and Telecom conference that the company’s recent investments in OpenAI and Anthropic are likely to be its last. The comment follows a $30 billion injection into OpenAI’s $110 billion funding round, a fraction of the $100 billion pledge made last September.

Huang framed the pullback as a timing issue: once the two startups go public later this year, the window for fresh equity deals closes. The official Nvidia statement echoed the same line, saying the firm’s capital is "focused very squarely, strategically on expanding and deepening our ecosystem reach." Analysts note that Nvidia already sells the GPUs that power both firms, so the equity stakes may have been a financial shortcut rather than a strategic necessity.

## OpenAI’s hardware diversification
OpenAI is quietly building a supply chain that sidesteps Nvidia’s dominance. The company announced a bulk purchase of high‑bandwidth memory wafers from Samsung and SK Hynix, the two main HBM providers, effectively bypassing Nvidia‑owned silicon for its training clusters.

At the same time, OpenAI has hired a wave of silicon talent. Richard Ho, the former TPU lead at Google, joined in 2023, and roughly 40 engineers from Apple have migrated to OpenAI’s custom‑silicon team. The hires complement a Broadcom partnership that promises to blend Nvidia GPUs for training with OpenAI‑designed inference chips, a hybrid approach reminiscent of Google’s Edge TPU strategy.

OpenAI’s internal "Project Stargate" is reportedly a 10‑gigawatt data‑center effort to train GPT‑6. The project includes custom ASICs that could run inference on the edge, reducing reliance on Nvidia’s data‑center GPUs and cutting operating costs.

## The frenemy dynamic and financial underpinnings
Nvidia’s Q3 fiscal 2026 earnings painted a rosy picture: revenue jumped 62 percent to $57 billion, and the Data Center segment now accounts for nearly 90 percent of the company’s business. Yet a deeper dive into the balance sheet revealed three red flags, according to a Wall Street‑adjacent analysis that cross‑referenced Nvidia’s filings with OpenAI and Oracle news.

First, Nvidia’s $30 billion stake in OpenAI appears tied to a "circular financing" model where OpenAI agrees to buy an equivalent amount of Nvidia chips. Critics liken the arrangement to "round‑tripping" and warn that the revenue could be fragile if OpenAI’s cash flow dries up. Second, Nvidia’s recent inventory buildup suggests the firm is betting heavily on the upcoming Blackwell architecture, hoping to sell it out instantly in Q4. Third, the company’s historic partnership with Anthropic is unraveling: Anthropic was blacklisted by the Trump administration for refusing to weaponize its models, and its Claude model surged past ChatGPT in the U.S. App Store rankings.

## Open models versus closed models: a policy flashpoint
While Nvidia and OpenAI wrestle over hardware, a parallel debate rages over model openness. Jensen Huang’s first ever post on X defended open‑weight AI models, joining Google, Meta, and others in a letter that warns against "premature restrictions" on open models.

Open models expose their weights and code, allowing users to run them locally and modify them. Closed models remain behind cloud APIs, with weights hidden from end users. Chinese firms like DeepSeek have released free, locally runnable models, prompting the Trump administration to consider a ban on Chinese AI models over cybersecurity concerns.

The sign‑on letter, signed by AMD, Cloudflare, GitHub, IBM, Hugging Face, LM Studio, Meta, OpenAI, and Nvidia, argues that open weights boost safety, accelerate innovation, and enable national sovereignty. The letter concedes that open weights carry risks: once released, they are beyond the original developer’s control, and modified versions are hard to trace. The authors propose risk mitigation rather than prohibition.

## Community tools leaning on OpenAI APIs
The open‑model debate has practical consequences for developers. A new open‑source project, RAGTheDocs, lets anyone deploy retrieval‑augmented generation (RAG) on any ReadTheDocs site with a single click. The library scrapes Sphinx‑generated documentation, creates embeddings with OpenAI’s API, and serves a Gradio UI powered by a chatbot named Buster.

RAGTheDocs is explicitly experimental and calls OpenAI’s embedding and chat endpoints under the hood. Its rapid deployment model showcases how OpenAI’s services remain a backbone for third‑party tooling, even as OpenAI eyes custom silicon for its own workloads. The project underscores a broader trend: developers are building on top of OpenAI’s cloud APIs while the company prepares to run similar workloads on in‑house hardware.

## What to watch
Watch Nvidia’s next earnings call for clues on inventory levels and any further reduction in OpenAI‑related revenue. Track OpenAI’s upcoming hardware announcements, especially any silicon roadmaps that could replace Nvidia GPUs in inference. Monitor regulatory filings around the Trump administration’s potential ban on Chinese open models, as that could reshape the global AI supply chain. Finally, keep an eye on the adoption curve of community RAG tools; their growth will indicate whether OpenAI’s API revenue can survive a shift toward proprietary hardware.
