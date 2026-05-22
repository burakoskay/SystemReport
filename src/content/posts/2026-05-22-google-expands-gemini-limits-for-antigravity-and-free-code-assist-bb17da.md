---
title: "Google expands Gemini limits for Antigravity and free Code Assist"
date: 2026-05-22T04:19:46.892Z
tags: ["google","gemini","ai"]
hero_image: "/hero/2026-05-22-google-expands-gemini-limits-for-antigravity-and-free-code-assist-bb17da.jpg"
hero_image_credit_name: "Daniil Komov"
hero_image_credit_url: "https://www.pexels.com/@dkomov"
visual_keyword: "developer using AI coding assistant in a modern IDE"
description: "Google triples Antigravity limits, clarifies Gemini tier caps, and opens Code Assist with 180k free completions, shaking up the AI coding market."
sources_count: 5
author: "maya-chen"
---

## Google triples Antigravity limits, twice in a row
Google responded to developer complaints by raising the Antigravity usage ceiling for Gemini models two times in quick succession. The exact multiplier is not disclosed, but the change is described as a three‑fold increase each time. The move follows a wave of feedback that the original caps throttled experimentation.
The adjustment applies only to the Antigravity feature set, which lets users run Gemini inside a browser‑based IDE. By expanding the limit, Google hopes to keep the tool usable for longer sessions without forcing users to upgrade.

## New tiered limits for Gemini across plans
Google finally published a Help Center table that spells out daily prompt caps. Free accounts receive five Gemini 2.5 Pro prompts per day. The AI Pro subscription raises that to 100 prompts, and AI Ultra pushes the ceiling to 500.
Free users also get five Deep Research reports and 100 generated images each day. Upgrading to Pro or Ultra expands image generation to 1,000 per day. The table replaces vague language like “limited access” with hard numbers.
The tiered structure mirrors Google’s broader AI subscription strategy. Prompt limits are the most visible constraint, but the image caps reveal a secondary revenue lever. Developers who need more than 100 images must move to a paid tier, a point Google emphasizes in the updated documentation.

## Gemini Code Assist goes free with massive limits
Google announced that Gemini Code Assist, the AI‑powered coding companion built on Gemini 2.0, is now free for individual developers. The free tier offers 180,000 code completions per month, a figure Google claims dwarfs Microsoft’s GitHub Copilot limit of 2,000 completions and 50 chat messages.
The service retains the enterprise‑grade model under the hood. It still uses Gemini 2.0 with a 128,000‑token context window, which should accommodate large codebases. The integration works with popular IDEs such as Visual Studio, Firebase, and GitHub.
Google notes that the free preview lacks some enterprise features, like productivity metrics and custom AI responses. Those remain behind the $45‑per‑month paid plan. The company frames the generous limits as a way to lock developers into its Gemini ecosystem, a move that could shift market share away from Microsoft and OpenAI.

## Community projects riff on Antigravity and Gemini
OpenGravity, a GitHub project, re‑creates the Antigravity UI in pure HTML, CSS, and JavaScript. It adds a Bring‑Your‑Own‑Key layer and runs a live terminal via the WebContainer API. The repo advertises zero‑install usage and basic autonomous agent capabilities that can run shell commands and edit files.
The project is labeled an “Alpha” version and openly invites contributions. Its author acknowledges missing “pro” features that would make it competitive with Google’s official offering. OpenGravity’s GPL‑3.0 license permits commercial use, but the codebase remains a work‑in‑progress.
Another community effort, Dracula‑AI, provides a lightweight Python wrapper around Gemini and other models. It stores every request and response in a SQLite database, preserving conversation history across program restarts. The library supports streaming responses, custom system prompts, and configurable temperature settings.
Dracula‑AI’s design focuses on developer ergonomics rather than raw performance. By persisting context, it avoids the memory bloat that can plague long‑running AI sessions. The project also abstracts provider details behind an enum, reducing typo‑related errors.

## What to watch
Google has not disclosed how long the expanded Antigravity caps will stay in place. A future pricing tier could re‑introduce stricter limits if usage spikes. The free Code Assist tier will be monitored for abuse; any throttling policy could reshape the competitive balance with Copilot. Finally, the adoption rate of OpenGravity and Dracula‑AI will signal whether the community can build viable alternatives to Google’s proprietary UI. Tracking GitHub stars, issue volume, and any official response from Google will reveal whether these forks become lasting parts of the Gemini ecosystem.