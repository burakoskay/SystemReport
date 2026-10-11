---
title: "WallHop launches as free paywall bypass after 12ft.io shutdown"
date: 2026-10-11T08:25:47.029Z
tags: ["paywall","open-source","web-tools","privacy"]
hero_image: "/hero/2026-10-11-wallhop-launches-as-free-paywall-bypass-after-12ft-io-shutdown-4e4a60.jpg"
hero_image_credit_name: "Erik Mclean"
hero_image_credit_url: "https://www.pexels.com/@introspectivedsgn"
visual_keyword: "hand holding smartphone displaying stripped-down news article"
description: "WallHop offers a free, multi‑method paywall bypass after 12ft.io’s removal, supporting iOS shortcuts and API endpoints, but it still hits some server‑side blocks."
sources_count: 6
author: "maya-chen"
---

WallHop went live as a free paywall bypass on Tuesday. The tool fills the gap left by 12ft.io, which the News Media Alliance took down in July 2025.

Josh, the developer behind WallHop, announced the service on Hacker News. He built it after 12ft.io vanished, citing the need for a mobile‑first bypass that works without extensions. WallHop runs at wallhop.io and accepts a URL or a prefixed path (e.g., `wallhop.io/` + article). The service strips paywalls, ads, and clutter, returning a clean readable page. It offers an iOS Shortcut that appears in the Share sheet, a desktop bookmarklet, and raw and API endpoints for scripting. The project started as a fork of the GPL‑3.0 licensed everywall/ladder repository and has been heavily modified since.

The core of WallHop is a chain of bypass techniques. When a request arrives, the server tries each method in turn, falling back to the Internet Archive’s `archive.is` snapshot if all else fails. This layered approach prevents a single site from breaking the whole pipeline. The codebase is open‑source, allowing anyone to audit the methods or contribute new tricks. However, the developer warns that some server‑side paywalls remain out of reach; he invites users to report failures for potential fixes.

WallHop’s iOS Shortcut is the most used entry point, according to the creator. Users tap Share → WallHop in Safari or any app that supports the share sheet, and the shortcut sends the URL to the service. The shortcut returns the stripped article directly to the phone, bypassing the need for a browser extension. For power users, the `/raw/` endpoint streams the unstyled HTML, while `/api/` delivers JSON metadata alongside the content. The bookmarklet works similarly on desktop browsers, injecting the bypass script without leaving the page.

Testing shows WallHop works on most major news outlets and many local papers. It also handles Medium member‑only posts, a scenario 12ft.io never supported. The developer notes that the service fails on a handful of sites that enforce aggressive, server‑side checks. Those sites often require a logged‑in session or use dynamic JavaScript challenges that WallHop’s static methods cannot solve. The developer’s open invitation for bug reports suggests the tool will evolve, but the current coverage is already broader than its predecessor.

WallHop joins a growing ecosystem of open‑source bypass tools. Projects like `everywall`, `ladder`, and `archive.is` have long offered ways to circumvent paywalls, but they typically require manual configuration or command‑line usage. WallHop’s emphasis on mobile convenience and API accessibility lowers the barrier for non‑technical users. At the same time, the tool raises ethical questions about content monetization. Publishers argue that paywalls fund journalism; bypass tools threaten that revenue model. The developer sidesteps the debate, focusing on user access and transparency about limitations.

The broader context includes recent legal scrutiny of paywall circumvention. In the United States, the DMCA’s anti‑circumvention provisions have been applied to DRM, but paywalls sit in a gray area. European regulators have begun to examine whether forced paywalls constitute unfair practice. WallHop’s open‑source nature could attract attention from both advocates of open information and from publishers defending subscription models. So far, no takedown notices have appeared, but the service’s visibility may prompt legal challenges.

What to watch next is the response from the publishing industry. If major outlets begin issuing DMCA takedown requests or updating their server‑side defenses, WallHop’s effectiveness could drop sharply. Conversely, the community may fork the project to stay ahead of new barriers. Tracking the service’s uptime, the rate of reported failures, and any legal filings will indicate whether WallHop remains a viable alternative to paid subscriptions. Developers and power users should monitor the GitHub repository for updates and watch Hacker News threads for emerging bypass techniques.