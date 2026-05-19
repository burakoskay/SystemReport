---
title: "OpenBSD 7.9 Arrives as BSD Community Mourns Peter Neumann"
date: 2026-05-19T15:47:16.900Z
tags: ["openbsd","security","graphics"]
hero_image: "/hero/2026-05-19-openbsd-7-9-arrives-as-bsd-community-mourns-peter-neumann-33fd22.jpg"
hero_image_credit_name: "Markus Spiske"
hero_image_credit_url: "https://www.pexels.com/@markusspiske"
visual_keyword: "openbsd terminal with code overlay"
description: "OpenBSD 7.9 ships with fresh updates while the BSD world reflects on Peter Neumann's legacy and the rise of novel graphics demos."
sources_count: 6
author: "ryan-tanaka"
---

## OpenBSD 7.9 lands on the front line of security
OpenBSD 7.9 hit the mirrors this week, and the first thing users notice is the same relentless focus on hardening that defines the project. The release page (https://www.openbsd.org/79.html) lists the usual checksum files, a changelog, and a terse list of platform updates. The Hacker News post that announced it earned 187 points and sparked 95 comments, a modest buzz that reflects the project's niche but passionate audience.

The new version does not come with a glossy press kit. Instead, it offers incremental driver revisions, a refreshed cryptographic library, and a handful of kernel tweaks that tighten the default sandbox. For a system that ships with a default install that can survive a hostile network, those tweaks matter more than any headline feature. The community’s reaction on the HN thread is a mix of praise for the clean build process and complaints about a lingering bug in the Wi‑Fi driver that some users flagged.

## Peter Neumann’s passing marks the end of an era
Peter Neumann, a founding figure of the BSD movement, died earlier this month. The announcement appeared on the TUHS mailing list (https://www.tuhs.org/pipermail/tuhs/2026-May/033748.html) and quickly gathered 244 points and 19 comments on Hacker News. Neumann’s contributions to the security architecture of BSD systems are legendary; he authored the trusted path model that still informs OpenBSD’s design.

His death is more than an obituary for a single engineer. It is a reminder that the open‑source security ethos he championed is now carried by a new generation of maintainers. The OpenBSD team, in particular, has often cited Neumann’s work as a guiding principle for their “secure by default” philosophy. The community’s response on the HN thread mixes reverence with a sober acknowledgment that the torch is now burning brighter than ever.

## The security‑first mindset in a crowded OS market
OpenBSD’s incremental releases sit against a backdrop of operating systems that increasingly market security as a feature flag. Linux distributions roll out SELinux policies, Windows pushes Defender, and macOS leans on Gatekeeper. Yet none of those platforms embed security into the kernel’s default configuration the way OpenBSD does.

The practical impact of that approach shows up in production environments where a single misconfiguration can expose a whole network. OpenBSD’s default install disables unnecessary services, runs with privilege separation, and ships with strong cryptography out of the box. Those choices keep the attack surface low, but they also demand that administrators accept a steeper learning curve. The trade‑off is evident in the HN discussion: some users praise the “no‑surprises” model, while others lament the lack of plug‑and‑play convenience.

## Gaussian splatting pushes graphics realism forward
While the BSD world mourns and upgrades, a separate thread on Hacker News celebrated a visual experiment titled “Gaussian Splat of a Strawberry” (https://superspl.at/scene/84df8849). The demo earned 284 points and 122 comments, indicating strong interest from the graphics community. Gaussian splatting replaces traditional polygon meshes with a cloud of overlapping Gaussian functions, allowing smooth, high‑frequency detail without the heavy geometry cost.

The strawberry rendered in the demo looks almost tactile; light scatters through the glossy surface, and the tiny seeds are hinted at by subtle density variations. The technique is not new, but the public release of a polished example signals that the method is reaching a level of usability that could affect real‑time rendering pipelines. For developers who have long wrestled with the trade‑off between visual fidelity and performance, Gaussian splatting offers a fresh angle that may reshape how game engines and visual effects tools approach texture detail.

## What to watch next
OpenBSD 7.9 will be the baseline for the next round of security audits, and the project’s roadmap hints at a major overhaul of the packet filter in the coming months. Keep an eye on the OpenBSD mailing list for the upcoming release candidate that will introduce the new PF rewrite. On the graphics side, the Gaussian splatting community is preparing a benchmark suite that will compare the technique against traditional rasterization on modern GPUs. The suite’s first results are expected at the SIGGRAPH conference in August. Finally, watch how the BSD community honors Peter Neumann’s legacy—particularly any formal tributes or code contributions that embed his security models into future releases.
