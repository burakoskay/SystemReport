---
title: "Apple deprecates hdiutil as designers get Figmimic shortcut"
date: 2026-08-24T06:47:32.156Z
tags: ["apple","figma","netbsd","python"]
hero_image: "/hero/2026-08-24-apple-deprecates-hdiutil-as-designers-get-figmimic-shortcut-5eab70.jpg"
hero_image_credit_name: "Daniil Komov"
hero_image_credit_url: "https://www.pexels.com/@dkomov"
visual_keyword: "developer workstation with macOS terminal and Figma interface"
description: "Apple drops hdiutil in macOS 27 Golden Gate while Figmimic lets designers pull web pages into Figma, sparking debate over legacy tools and modern workflows."
sources_count: 9
author: "ryan-tanaka"
---

Apple stripped hdiutil from macOS 27 Golden Gate, and a new Figmimic bookmarklet now copies any webpage into Figma as editable layers. The moves expose a clash between aging system utilities and the push for frictionless design pipelines.

The deprecation notice appeared in a Hacker News thread titled “hdiutil is deprecated in macOS 27 Golden Gate,” which earned 185 points and sparked 83 comments. Figmimic’s launch was announced on Marcua’s site with a headline that reads “Figmimic – A bookmarklet to copy any webpage into Figma as editable layers,” and the post currently sits at 119 points with 20 comments. A nostalgic essay called “NetBSD and my life (2005)” resurfaced on Hacker News, gathering 139 points and 32 comments. Meanwhile, the Python learning site “Thinking in Python” continues to attract attention, reflected in its 251‑point Hacker News entry.

## NetBSD’s Enduring Appeal

The 2005 NetBSD post is a personal recount that reads like a love letter to a system most engineers only glimpse in passing. The author describes daily interactions with the OS, from cross‑compiling embedded firmware to tweaking kernel parameters for a home server. The piece reminded the Hacker News community that even three decades after its first release, NetBSD still delivers a clean, portable base for niche projects.

What the comments highlight is a recurring frustration: modern tooling often overlooks the simplicity NetBSD offers. Several commenters pointed out that the OS’s package manager, pkgsrc, still ships more than 20,000 ports without the bloat of commercial Linux distros. Others warned that the hobbyist focus can feel isolating when corporate support wanes. The thread underscores a broader tension: legacy Unix‑like systems retain technical merit but struggle for relevance in a cloud‑first world.

## macOS 27 Golden Gate Drops hdiutil

Apple’s decision to deprecate hdiutil—a command‑line tool that has long handled disk image creation and manipulation—marks a rare break with its own tooling history. The Hacker News article notes that the change is part of macOS 27 Golden Gate’s broader shift toward Swift‑based system utilities. Apple has not released a direct replacement, leaving power users to lean on third‑party scripts or the newer Disk Utility GUI.

For developers who automate CI pipelines, the loss is immediate. One commenter posted a snippet that previously used `hdiutil create -size 10g -fs APFS` to spin up test images; the snippet now fails on the latest beta. The community response is split: some argue that Apple’s move pushes the ecosystem toward more secure, sandboxed APIs, while others call the deprecation “short‑sighted” because it removes a reliable, scriptable interface that works across macOS versions.

## Figmimic Bridges Web Design to Figma

Figmimic arrives as a lightweight bookmarklet that scrapes a page’s DOM, converts CSS boxes into Figma frames, and drops the result directly into the open file. The tool’s creator describes it as “copy‑and‑paste for design,” and the Hacker News post’s 119 points suggest a strong appetite among front‑end engineers.

In practice, the bookmarklet eliminates a manual hand‑off that usually involves screenshots, SVG exports, or tedious recreation of layout grids. A designer in the comments confirmed that a three‑page marketing site was imported in under a minute, saving hours of pixel‑pushing. The trade‑off is fidelity: complex interactions, animations, and custom fonts often flatten into flat shapes. Still, the consensus is that Figmimic fills a gap that Figma’s native plugins have yet to address, especially for rapid prototyping.

## Thinking in Python Gains Traction

The “Thinking in Python” site, highlighted by a Hacker News entry with 251 points, offers a curated collection of tutorials, interview questions, and best‑practice essays aimed at developers transitioning from scripting to production‑grade Python. The site’s clean navigation and emphasis on real‑world examples have drawn a steady stream of comments praising its pragmatic tone.

What sets the resource apart is its focus on mental models rather than language trivia. One commenter noted that the “Thinking in Python” approach mirrors the way seasoned engineers internalize concepts like iterator protocols and async I/O, rather than memorizing syntax. The community’s endorsement suggests that, even as newer languages emerge, Python’s ecosystem still commands a substantial share of developer attention.

## What to Watch

Apple’s next beta of macOS 27 Golden Gate will likely reveal whether a Swift‑based replacement for hdiutil lands in the developer tools bundle. Keep an eye on the WWDC session recordings for any mention of disk‑image APIs. Figmimic’s author hinted at upcoming support for component libraries and SVG export; a beta release is expected in the next few weeks. Finally, the NetBSD thread may revive interest in portable Unix systems as the industry debates container‑native versus VM‑native workloads. Tracking the next round of comments on these Hacker News posts will give a pulse on how the community adapts to the shifting toolchain landscape.
