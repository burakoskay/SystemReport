---
title: "Satlyt's satellite data center test hits launch crunch"
date: 2026-10-31T14:17:45.066Z
tags: ["satlyt","satellite-computing","space-launch","doom","esa"]
hero_image: "/hero/2026-10-31-satlyt-s-satellite-data-center-test-hits-launch-crunch-5a0104.jpg"
hero_image_credit_name: "Chris Lyo"
hero_image_credit_url: "https://www.pexels.com/@kokovaah"
visual_keyword: "satellite with glowing data streams in orbit"
description: "Satlyt proved in‑orbit Linux containers this month, but a worsening launch bottleneck threatens the rollout of satellite‑based compute services."
sources_count: 3
author: "ryan-tanaka"
audio_path: "/audio/2026-10-31-satlyt-s-satellite-data-center-test-hits-launch-crunch-5a0104.mp3"
audio_bytes: 585186
audio_mime: "audio/mpeg"
---

## Satlyt's test brings satellite data centers closer
Satlyt got a piece of hardware to run a Linux container in orbit this month. The test proved that a satellite can host a virtual data center instead of just relaying packets.

TechCrunch reported the experiment moved the company a step closer to turning spacecraft, starting with satellites, into virtual data centers. The payload ran a standard Ubuntu image and streamed compute results back to ground stations. No new antenna or ground‑segment was needed; the satellite itself did the heavy lifting. The success shows that future missions could offload analytics, AI inference, or batch jobs to orbit, shaving latency for edge users.

## Launch bottlenecks threaten new space services
The launch market is choking, and the pressure is hitting new space services hard. Ars Technica wrote that analysts now see a looming launch crisis that is "more severe" than earlier forecasts.

The same analysis noted there is no evidence that SpaceX's Starship will carry traditional satellites anytime soon. That gap matters because Satlyt and other compute‑as‑a‑service firms rely on rideshare slots to get hardware aloft. If launch capacity stays constrained, the economics of satellite compute erode quickly. Customers will face higher prices or longer wait times, and the promise of on‑orbit processing loses its edge.

## Doom in orbit shows hardware limits and developer creativity
When a programmer boots Doom on a satellite, the limits of space hardware become crystal clear. Ólafur Waage, a senior software developer from Iceland now based in Norway, ported the 1993 shooter to ESA's OPS‑SAT laboratory satellite.

OPS‑SAT carried an experimental ARM dual‑core Cortex‑A9 processor that is roughly ten times more powerful than the norm for spacecraft. Waage chose Chocolate Doom 2.3 because it compiled cleanly on the Ubuntu 18.04 LTS distro already running on the bus. The satellite’s software stack could not be updated easily, so the port had to fit within a tiny code footprint.

The experiment ran on the ground first, then a few days after Christmas 2023 the game launched in orbit. There were no graphics; the frame buffer was rendered entirely in software, yielding a crawl‑slow framerate. Still, the game responded to the controller, proving that a classic C codebase can survive the radiation‑hardened, low‑power environment of a real satellite. OPS‑SAT was decommissioned in 2024, but the demo left a clear marker of what on‑board compute can achieve—and where it still falls short.

## What to watch: satellite compute rollout and launch capacity
The next metric to track is whether Satlyt can lock in launch slots before the bottleneck deepens. Upcoming rideshare manifests from Arianespace, Rocket Lab, and United Launch Alliance will reveal how much room remains for non‑traditional payloads. A sudden surge in demand could push prices up, forcing Satlyt to rethink its cost model.

Equally important is any update on Starship’s payload plans. If SpaceX finally certifies the vehicle for conventional satellites, the launch crunch could ease dramatically. Until then, developers like Waage will keep pushing the envelope on existing hardware, showing that even a 1990s game can serve as a stress test for future space‑based compute platforms.
