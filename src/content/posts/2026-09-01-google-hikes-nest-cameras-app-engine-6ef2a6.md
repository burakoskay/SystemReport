---
title: "Google hikes Nest cameras, App Engine"
date: 2026-09-01T09:06:18.575Z
tags: ["google","pricing","cloud"]
hero_image: "/hero/2026-09-01-google-hikes-nest-cameras-app-engine-6ef2a6.jpg"
hero_image_credit_name: "Digital Buggu"
hero_image_credit_url: "https://www.pexels.com/@digitalbuggu"
visual_keyword: "Google Nest cameras on a price tag, App Engine code on a server, .dev domain text on a computer screen"
description: "Google raises prices on Nest hardware, revamps App Engine billing, and faces backlash over a misreported .dev domain surge."
sources_count: 4
author: "david-okafor"
---

## Nest cameras and doorbells get a price bump

Google announced an immediate price increase across almost every Nest camera and doorbell currently sold. The adjustment follows a similar hike on the Google TV Streamer announced earlier this week.

The rollout touches the indoor and outdoor Nest Cam models, the battery‑powered Nest Doorbell, and the wired Nest Doorbell (battery). No specific percentages were disclosed, but the change applies to the entire lineup rather than a single SKU. Existing owners will see the new rates on the next billing cycle, while new buyers will face the higher sticker price at checkout.

Analysts note that hardware margins on consumer IoT devices have been squeezed by rising component costs. By nudging retail prices, Google can offset supply‑chain pressure without altering the underlying subscription services that bundle the devices.

## App Engine exits preview and reshapes its pricing model

On Wednesday Google confirmed that App Engine will shed its "preview" label in the second half of September. Simultaneously the company released a calculator for developers to estimate costs under the new scheme.

The revised model lowers the free‑tier quotas and shifts billing from pure CPU‑time to per‑instance runtime. An instance, Google explains, reserves a maximum amount of CPU and memory even when idle, so it incurs cost regardless of actual usage. Larger applications will now pay for the wall‑clock time an instance remains resident, a change meant to cover the platform’s operating expenses.

Developers reacted with a mix of resignation and irritation. One user warned that lock‑in has always been the biggest risk, noting that moving off App Engine would be "costly" because of its unique APIs and data model. Another lamented that any savings from switching platforms would be "wiped out by several orders of magnitude" in migration effort, leaving margins thinner for existing businesses.

## The .dev domain price myth debunked

A viral post claimed Google had raised the renewal price for a .dev domain from $12 to $850. The claim sparked a frenzy on Hacker News, but the numbers do not line up with the registrar’s records.

The domain in question, forum.dev, was originally registered on December 6, 2021 for 4,360 Turkish Lira—about $317 at the time. The renewal price of $850 reflects a standard renewal fee for a premium .dev name, not a sudden jump from the generic $12 rate that applies to most .dev registrations. A Google employee clarified that premium domains carry higher base prices, and the purchaser benefited from a favorable exchange rate in 2021.

The episode exposed widespread confusion about domain economics. Registries own TLDs, while registrars like Google, GoDaddy, and Namecheap act as brokers. The bulk of a registration fee goes to the registry, with a small markup to the registrar and a fixed ICANN fee. Because the same registry controls the price, switching registrars does not change the underlying cost, limiting competition to the availability of alternative TLDs.

## What the price moves mean for users and the market

Google’s hardware hike signals that the company is willing to pass component cost volatility onto consumers, even on products that rely on subscription revenue streams. For enterprise deployments that bundle Nest devices with Google Workspace, the incremental hardware spend may be absorbed, but small‑business users will feel the impact directly.

The App Engine pricing overhaul forces developers to reassess architecture decisions. Applications with high latency or long‑running background tasks will see their bills rise sharply under instance‑hour billing. Teams may explore alternative runtimes on Google Cloud that bill per‑use, or they might evaluate competitors such as AWS Fargate or Azure Functions, despite the migration overhead.

The .dev domain clarification reminds businesses that premium domain pricing is not a monopoly exercise by Google. While Google controls the .dev registry through its Charleston Road subsidiary, the market for domain registrars remains competitive. However, the monopoly on the registry side means price changes at that layer affect all registrars equally, limiting consumer leverage.

## What to watch next

Track the first quarterly earnings report after the Nest price change for any shift in hardware revenue growth. Monitor Google Cloud’s billing dashboards for App Engine usage trends as developers adapt to instance‑hour pricing. Finally, watch ICANN policy discussions for potential reforms to registry‑level pricing transparency, which could affect premium TLD costs like .dev.
