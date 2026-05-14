---
title: "Chrome ships a 4 GB Gemini model and new mute controls"
date: 2026-05-07T23:10:47.802Z
modified_date: 2026-05-14T18:02:33.390Z
tags: ["chrome","ai","privacy","extensions"]
hero_image: "/hero/2026-05-07-chrome-ships-a-4-gb-gemini-model-and-new-mute-controls-cc4e0e.jpg"
hero_image_credit_name: "Matheus Bertelli"
hero_image_credit_url: "https://www.pexels.com/@bertellifotografia"
visual_keyword: "browser settings window showing AI model toggle and mute site option"
description: "Google embeds a 4‑GB Gemini AI in Chrome, offers a way to uninstall it, and rolls out mute and link‑blocking features in version 64."
sources_count: 4
author: "maya-chen"
---


Chrome 64 arrives with a 4‑GB Gemini AI model baked into the browser and a set of privacy‑focused UI tweaks. The changes force engineers and power users to decide whether the on‑device model is worth the memory hit.

The update ships the Gemini model, a 4‑GB language model that runs locally, a permanent mute option for autoplay videos, and link‑mask protection. OpenAI released a Codex plugin for Chrome that lets the code‑assistant work beyond the editor. Google also announced an ad‑blocker rollout on 15 February that targets ads violating the Coalition for Better Ads standards.

## Chrome embeds a 4‑GB Gemini model

Google bundled its Gemini model directly into the Chrome binary. The model occupies roughly 4 GB of disk space and runs on the client without contacting Google servers. The move follows a broader industry push to put large language models on the edge.

Embedding the model sidesteps latency concerns but raises a privacy question. Users can now run Gemini without sending prompts to the cloud, but the model still has access to everything the browser can read. The trade‑off between speed and data exposure sits at the core of the controversy.

## Users can strip the AI model

Google provides a simple uninstall command in Chrome’s Settings → Advanced → Privacy. Executing the command removes the Gemini binaries and reclaims the 4 GB of storage. The process does not affect other Chrome features.

The uninstall path is hidden behind several clicks, a design choice that suggests Google expects most users to keep the model active. Power users who monitor disk usage can verify the removal by checking the Chrome installation folder for the absence of the "gemini" directory.

## Chrome 64 adds mute and link protection

Version 64 introduces a permanent mute toggle for sites that autoplay video with sound. Users click the site‑information icon—often a green padlock—next to the omnibar, select “Mute site,” and the browser suppresses future audio‑enabled video playback on that domain.

The same release also blocks cleverly disguised links and pop‑ups. Chrome now rewrites links that masquerade as play buttons or close symbols, preventing them from opening new windows without user intent. Google reports that 20 % of desktop feedback mentions unwanted content, a metric that likely drove this change.

An ad‑blocking feature will go live on 15 February. It targets ads that violate the Coalition for Better Ads rules, automatically filtering them out of the browsing experience.

## OpenAI pushes Codex into the browser

OpenAI launched a Codex plugin for Chrome that expands the code‑assistant beyond integrated development environments. The plugin injects Codex suggestions into any text field, turning the browser into a lightweight coding helper.

The announcement frames the plugin as “more than a coding aid,” but the practical impact depends on how developers adopt it. Early adopters report faster prototyping, while others note that the assistant still requires careful review of generated snippets.

## What to watch

Chrome users should track the adoption rate of the Gemini uninstall toggle and the performance impact of the 4‑GB model on low‑end devices. The next Chrome release will reveal whether the ad‑blocker meets user expectations and how the Codex plugin competes with native IDE extensions. The interaction between on‑device AI and Chrome’s privacy controls will shape browser strategy for the coming year.

## Updates

- **2026-05-14** — Subnautica 2 is having a huge launch on Steam ([source](https://www.theverge.com/games/930562/subnautica-2-early-access-launch-steam-pc-epic-games-store-xbox))
