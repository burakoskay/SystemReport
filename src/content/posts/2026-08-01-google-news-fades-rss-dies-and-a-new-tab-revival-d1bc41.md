---
title: "Google News fades, RSS dies, and a new tab revival"
date: 2026-08-01T22:51:38.120Z
tags: ["google","rss","news","extensions","hackernews"]
hero_image: "/hero/2026-08-01-google-news-fades-rss-dies-and-a-new-tab-revival-d1bc41.jpg"
hero_image_credit_name: "HONG SON"
hero_image_credit_url: "https://www.pexels.com/@hson"
visual_keyword: "a cluttered browser new tab with widgets and news feeds"
description: "A Hacker News thread flags Google News’s retreat, a 2023 blog blames Google for RSS decline, and a community‑built iGoogle clone offers a fresh start."
sources_count: 3
author: "ryan-tanaka"
audio_path: "/audio/2026-08-01-google-news-fades-rss-dies-and-a-new-tab-revival-d1bc41.mp3"
audio_bytes: 616116
audio_mime: "audio/mpeg"
---

## Google News under fire – the latest backlash

A Hacker News discussion opened with a blunt question: has Google abandoned Google News? The thread quickly gathered 228 points and 161 comments, indicating strong community concern. The post links to an article on elgan.com that frames the issue as a sudden loss of updates and the removal of legacy features.

The debate centers on the fact that Google News, once a default source for breaking headlines on Android and Chrome, now shows fewer regional sections and slower refresh cycles. Users report missing the curated "Top Stories" pane that used to surface local reporting alongside global wire. When a platform that powers millions of daily reads throttles its own product, the ripple reaches publishers, advertisers, and the downstream apps that scrape its feeds.

For engineers who built alert pipelines on Google News RSS endpoints, the change feels like a silent deprecation. The lack of an official statement forces developers to add fallback logic or abandon the integration altogether. The thread’s tone is unapologetic: if Google cannot sustain a news aggregator, it should announce an exit plan rather than let the ecosystem decay in the dark.

## The RSS fallout – how Google's moves eroded a once‑vital feed

RSS feeds once powered the personal news dashboards of developers, power users, and newsroom tools. In 2023, a blog post on openrss.org titled "How Google helped destroy adoption of RSS feeds" resurfaced that narrative, earning 265 points and 65 comments on Hacker News. The article argues that a series of Google decisions—most notably the 2013 shutdown of Google Reader and later algorithm tweaks that demoted RSS‑derived traffic—crippled the protocol's growth.

The openrss.org piece points out that after Google Reader’s closure, many users migrated to third‑party readers that lacked the same scale and polish. Google’s search ranking adjustments then favored direct site visits over feed‑based aggregators, reducing the incentive for publishers to maintain clean RSS outputs. The blog cites internal memos and public statements to illustrate how the search engine’s preference for HTML over XML nudged the ecosystem toward proprietary notification channels.

The consequence is a fragmented landscape where only a handful of niche readers survive, and most news apps now rely on proprietary APIs or push notifications. For engineers who once wrote simple cron jobs to pull XML, the new reality demands OAuth flows, rate‑limited endpoints, and constant monitoring of deprecation notices. The RSS decline also hurts open‑source projects that depend on open standards to stay independent of big‑tech gatekeepers.

## Re‑imagining the home tab – a community‑built iGoogle clone

A Show HN post titled "I built a modern iGoogle‑like new tab extension" introduced a Chrome extension called Tab Widgets. The submission attracted just 2 points on Hacker News, but its description offers a clear use case: track tasks, stay on top of email, see the next meeting, and jump straight to a toolbox of apps—all from a single new‑tab page.

Tab Widgets resurrects the spirit of the original iGoogle, which Google retired in 2013. The extension aggregates calendar events, email previews, and customizable shortcuts into a grid that updates in real time. Users can drag widgets into place, choose light or dark themes, and sync settings across devices via Chrome sync. The creator emphasizes that the tool is built for teams that span time zones, suggesting a focus on collaborative workflows rather than personal news consumption.

The timing feels deliberate. As Google News and RSS lose their foothold, power users search for a self‑hosted hub that does not depend on a single corporate feed. Tab Widgets fills that gap with an open‑source‑style architecture that lets developers add their own data sources. The community response, while modest in points, highlights a hunger for a modular, privacy‑first homepage that can replace the disappearing Google services.

## What this signals for the future of personal information streams

The three threads share a common thread: a retreat of Google‑controlled aggregation and a rise of community‑driven alternatives. When a tech giant stops nurturing a service, the vacuum invites niche developers to rebuild the experience on their own terms. Engineers now face a choice between patching legacy Google endpoints or adopting new, self‑hosted widgets that respect user data.

Watch for three signals in the coming months. First, any official Google blog post that clarifies the roadmap for Google News will set expectations for developers still reliant on its API. Second, the openrss.org author may publish a follow‑up detailing how publishers are adapting to the RSS decline, which could surface new standards or open‑source tools. Third, the Tab Widgets repository is likely to receive forks and feature requests on GitHub; tracking its star count and issue tracker will reveal whether the community can sustain a full‑scale replacement for iGoogle and its successors.

The next six months will test whether the ecosystem coalesces around open standards or settles for fragmented, proprietary solutions. For engineers building the next generation of personal dashboards, the answer will determine whether they write code for a single giant or for a mosaic of community projects.
