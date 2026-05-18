---
title: "Haiku OS boots on Apple Silicon M1 Macs"
date: 2026-05-18T21:19:52.250Z
tags: ["haiku","apple silicon","open source","operating systems"]
hero_image: "/hero/2026-05-18-haiku-os-boots-on-apple-silicon-m1-macs-69d35a.jpg"
hero_image_credit_name: "Abdullah Bin Mubarak"
hero_image_credit_url: "https://www.pexels.com/@abdullah-bin-mubarak-2067629"
visual_keyword: "Apple M1 Mac laptop displaying Haiku OS desktop"
description: "Open‑source Haiku OS finally runs on Apple’s M1 hardware, marking a rare ARM64 desktop OS on the platform."
sources_count: 13
author: "maya-chen"
audio_path: "/audio/2026-05-18-haiku-os-boots-on-apple-silicon-m1-macs-69d35a.mp3"
audio_bytes: 588949
audio_mime: "audio/mpeg"
---

Haiku OS now boots on Apple’s M1 Macs.

The open‑source BeOS‑inspired system compiled an ARM64 build that starts on the Apple Silicon hardware, according to a development thread on the Haiku forum that was highlighted on Hacker News. The post attracted 201 points and sparked a discussion about the feasibility of running niche desktop operating systems on Apple’s custom chips.

## Immediate impact

The first successful boot shows that Haiku’s kernel can initialize the M1’s boot ROM, hand over control to the OS, and load a basic graphical session. The build includes support for the Apple‑designed GPU and the unified memory architecture, enough to display the default Haiku desktop. No third‑party drivers were required for the initial launch, which suggests that the core hardware abstraction layer is functional.

The community response has been pragmatic. Developers praised the milestone but immediately flagged the lack of audio drivers and limited peripheral support. The Haiku team posted a roadmap that lists USB‑C, Wi‑Fi, and power‑management as next‑step targets. The early build is not a production release; it is a proof‑of‑concept that the OS can run at all on the M1 platform.

## Technical hurdles overcome

Porting a legacy BeOS codebase to ARM64 required rewriting low‑level assembly that originally targeted x86. Haiku developers replaced Intel‑specific routines with ARM equivalents and introduced a new bootloader that conforms to Apple’s Secure Boot requirements. The effort also involved reverse‑engineering the M1’s memory‑mapped I/O to expose framebuffer access without proprietary SDKs.

Another obstacle was the lack of official documentation from Apple. The team relied on open‑source projects that already run Linux on M1, borrowing insights about device tree blobs and power‑state management. By reusing these community‑derived descriptors, Haiku avoided building a full hardware abstraction layer from scratch.

## Context: open‑source OSes on Apple Silicon

Apple’s transition to its own silicon has left most Linux distributions scrambling to add support. Projects like Asahi Linux have made headlines by delivering a usable desktop environment on M1 and M2 Macs. Haiku’s entry adds a third, distinct OS to the mix, highlighting the growing interest in diversifying the software ecosystem for Apple hardware.

Historically, Haiku has lived on x86 laptops and desktops, with limited ARM exposure. The move to ARM64 aligns with the broader industry shift toward heterogeneous computing, where CPUs and GPUs share a unified memory pool. By targeting Apple Silicon, Haiku positions itself alongside niche platforms that value low‑latency media handling—a core strength of its BeOS heritage.

## Industry implications

The milestone challenges the perception that Apple’s ecosystem is closed to alternative operating systems. While macOS remains the default, the ability to boot a third‑party OS on the same silicon could encourage more experimentation in the developer community. It also puts pressure on Apple to maintain open documentation for hardware interfaces, lest the ecosystem fragment further.

For the open‑source world, the Haiku port demonstrates that even small projects can achieve cross‑architecture compatibility without corporate backing. The effort may inspire other hobbyist OSes to attempt similar ports, expanding the pool of software that can run on Apple Silicon.

## What to watch

The next Haiku release will need to address audio output, USB‑C peripherals, and Wi‑Fi support before the build can be considered usable on everyday hardware. Monitoring the Haiku forum for updates on driver development and the upcoming beta schedule will indicate how quickly the project moves from proof‑of‑concept to a practical desktop option. The broader community will also watch Apple’s response to third‑party OS boot attempts, as any policy changes could affect the viability of future ports.