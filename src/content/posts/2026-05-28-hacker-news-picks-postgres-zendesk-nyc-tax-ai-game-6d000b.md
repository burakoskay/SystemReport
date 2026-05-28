---
title: "Hacker News Picks: Postgres, Zendesk, NYC Tax, AI Game"
date: 2026-05-28T20:45:00.941Z
tags: ["hackernews","postgres","zendesk","nyc tax","ai"]
hero_image: "/hero/2026-05-28-hacker-news-picks-postgres-zendesk-nyc-tax-ai-game-6d000b.jpg"
hero_image_credit_name: "cottonbro studio"
hero_image_credit_url: "https://www.pexels.com/@cottonbro"
visual_keyword: "engineer reviewing multiple laptop screens with code and headlines"
description: "A look at four high‑scoring Hacker News posts—Postgres durability, a rapid Zendesk replacement, a cryptic art piece, NYC’s new pied‑a‑terre tax, and an AI permission‑fatigue game."
sources_count: 6
author: "maya-chen"
audio_path: "/audio/2026-05-28-hacker-news-picks-postgres-zendesk-nyc-tax-ai-game-6d000b.mp3"
audio_bytes: 689468
audio_mime: "audio/mpeg"
---

Hacker News users voted three infrastructure posts, a municipal tax proposal, and an AI‑focused game into the top spots on the front page today. The votes signal where engineers and founders are spending mental bandwidth: data durability, support tooling, regulatory risk, and human‑in‑the‑loop AI.

The "Just Use Postgres for Durable Workflows" post earned 126 points and attracted 44 comments. "We replaced Zendesk in 48 hours" pulled 103 points with 78 comments. A cryptic entry titled "The Permanent Upper Crow" logged 107 points and 34 comments. Meanwhile, a CNBC story about New York's new pied‑a‑terre tax gathered 227 points and 367 comments, and a Show HN demo called "Continue? Y/N" earned 167 points and 84 comments. All five appeared on the same Hacker News front page on May 28, 2026.

## Postgres as a Durable Execution Engine

The post titled "Just Use Postgres for Durable Workflows" argues that a single PostgreSQL instance can replace a complex orchestration stack. The author points to built‑in transaction guarantees, row‑level locking, and advisory locks as primitives for reliable job scheduling. No external broker is required, the claim says.

Critics on the thread note that scaling advisory‑lock‑based queues beyond a few hundred concurrent workers can hit contention. The discussion references the need for explicit dead‑letter handling, something most dedicated workflow services bake in. The trade‑off is clear: fewer moving parts versus potentially higher latency under load.

## A 48‑Hour Zendesk Migration

"We replaced Zendesk in 48 hours" details a migration from the SaaS ticketing giant to a self‑hosted stack. The author lists open‑source components—Rocket.Chat for messaging, Redmine for issue tracking, and a custom webhook bridge—to replicate core Zendesk features. The post notes a 30‑day cost reduction estimate but warns of lost out‑of‑the‑box reporting.

Commenters question the long‑term maintenance burden. One contributor cites a 2023 case where a similar migration required a full‑time devops engineer to keep the pipeline stable. The open question is whether the short‑term speed win outweighs the ongoing operational overhead.

## The Permanent Upper Crow

The cryptic "Permanent Upper Crow" site (permanent‑upper‑crow.jasonwu.ink) showcases a generative‑art experiment that updates a crow silhouette in real time based on live Twitter sentiment. The project earned 107 points, drawing a mix of admiration and confusion.

Technical readers note the use of server‑sent events to push updates without refreshing the page. The author does not disclose the sentiment‑analysis model, prompting speculation about bias and latency. The broader implication is that lightweight, continuously updating visualizations can be built without heavy front‑end frameworks, but the post stops short of providing performance metrics.

## New York's Pied‑a‑Terre Tax

A CNBC article titled "New York passes pied‑a‑terre tax" reports that the state enacted a 2 % levy on secondary residences owned by non‑residents. The tax aims to increase housing supply by discouraging speculative ownership. The legislation took effect on July 1, 2026, with penalties for non‑compliance.

Hacker News commenters flag two concerns. First, the tax could push high‑net‑worth owners to offshore structures, complicating enforcement. Second, the revenue earmarked for affordable‑housing projects may be insufficient given New York’s chronic shortage. The discussion highlights the tension between market‑based deterrents and the administrative capacity to enforce them.

## AI Permission‑Fatigue Game

The Show HN entry "Continue? Y/N: A 60‑second game about AI agent permission fatigue" offers a browser‑based game that simulates an AI asking for user consent repeatedly. Players must decide whether to grant or deny each request within a time limit. The demo earned 167 points and sparked 84 comments.

Reviewers appreciate the concrete illustration of consent overload, a problem that research papers often discuss abstractly. However, some point out that the game’s binary choices oversimplify real‑world policy decisions, where partial permissions and contextual factors matter. The open question is whether such micro‑simulations can inform the design of future AI governance tools.

## What to Watch

The mix of posts suggests three near‑term signals for the tech community. First, any claim that PostgreSQL alone can handle high‑throughput workflows will be tested against real‑world load benchmarks in the coming months. Second, enterprises eyeing cost cuts may pilot rapid migrations away from SaaS ticketing, but they should monitor the emerging maintenance cost data. Third, regulators in other states are already citing New York’s pied‑a‑terre tax as a template; watch for similar measures in California and Illinois. Finally, as AI agents proliferate, expect more interactive demos that surface consent fatigue, potentially feeding into policy debates at the FTC and EU.
