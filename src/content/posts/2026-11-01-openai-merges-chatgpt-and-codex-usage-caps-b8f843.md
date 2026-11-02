---
title: "OpenAI merges ChatGPT and Codex usage caps"
date: 2026-11-01T17:54:10.215Z
modified_date: 2026-11-02T19:57:21.992Z
tags: ["openai","api","llm","developer-tools"]
hero_image: "/hero/2026-11-01-openai-merges-chatgpt-and-codex-usage-caps-b8f843.jpg"
hero_image_credit_name: "Daniil Komov"
hero_image_credit_url: "https://www.pexels.com/@dkomov"
visual_keyword: "developer working on laptop with AI code assistant overlay"
description: "OpenAI combined ChatGPT and Codex API limits into a single quota, prompting developers to rethink token management and diversify their LLM stacks."
sources_count: 6
author: "ryan-tanaka"
---


## Merged limits reshape developer budgeting
OpenAI announced on its help site that the separate usage caps for ChatGPT and Codex APIs are now combined into a single quota. The change forces developers to treat both models as competitors for the same pool of tokens.
The help article explains that the new limit applies across all requests, regardless of which endpoint is called. Previously teams could allocate generous ChatGPT traffic and keep Codex usage low, or vice‑versa. Now a burst of ChatGPT completions can starve a background code‑generation pipeline. The move sparked a lively discussion on Hacker News, where the post earned over 200 points and more than 140 comments.

## Why the change matters for API‑heavy apps
Token budgeting was already a daily headache for SaaS products that stitch together multiple OpenAI calls. With a unified cap, a single misbehaving feature can throttle the entire service. Teams that built separate monitoring dashboards now have to merge them.
The shift also affects pricing calculations. OpenAI’s billing still counts tokens, but the shared limit means that the marginal cost of an extra ChatGPT call rises when Codex traffic is high. Companies that ran nightly code‑review bots must now schedule those jobs more carefully or risk hitting the ceiling during peak user hours.

## Community workarounds: multi‑model clients and fallback kits
Developers responded by building tools that spread traffic across providers. One open‑source client called **Walle** lets users route prompts to Anthropic Claude, OpenAI ChatGPT, or Google Gemini from a single Mac interface. By mixing models, users can keep any one provider’s quota under the radar.
Another project, **StartKit.ai**, ships a boilerplate that includes automatic retries and fallback logic. If OpenAI returns a rate‑limit error, the kit can switch to an alternative API key or even a different vendor without dropping the user request. The kit’s documentation highlights its “advanced retries and fallbacks” as a safeguard against exactly the kind of limit merging OpenAI just introduced.

## Local memory as a token‑saving strategy
A more technical response comes from **SuperLocalMemory**, a local‑first memory layer for Claude, Codex, Cursor and dozens of other agents. The tool stores recent context on the developer’s machine and only sends a query to the cloud when a relevant snippet is missing. By avoiding unnecessary round‑trips, it trims token consumption dramatically.
SuperLocalMemory also refuses to hallucinate when it has no answer, returning a clear “That isn’t in SuperLocalMemory” instead of fabricating a response. This honesty reduces the need for follow‑up prompts that would otherwise waste tokens on corrective dialogue.

## What to watch: policy tweaks and provider diversification
OpenAI has not disclosed a timeline for adjusting the merged limit, but the help page notes that the quota may be revised as usage patterns evolve. Developers should monitor the OpenAI status page for any announcements about limit thresholds or pricing changes.
At the same time, the ecosystem of fallback kits, multi‑model clients and local memory layers is gaining traction. Watching adoption rates of tools like StartKit.ai and SuperLocalMemory will indicate whether the community can effectively mitigate OpenAI’s tighter caps. If fallback adoption spikes, the next wave of SaaS products may be built to be provider‑agnostic from day one.

## Updates

- **2026-11-02** — OpenAI is finally merging ChatGPT’s Chat and Work tabs ([source](https://techcrunch.com/2026/11/02/openai-is-finally-merging-chatgpts-chat-and-work-tabs/))
