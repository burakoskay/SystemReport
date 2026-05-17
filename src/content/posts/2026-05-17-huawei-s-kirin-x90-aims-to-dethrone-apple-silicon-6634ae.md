---
title: "Huawei's Kirin X90 Aims to Dethrone Apple Silicon"
date: 2026-05-17T15:05:26.331Z
tags: ["huawei","kirin-x90","apple-silicon","harmonyos","chip-design"]
hero_image: "/hero/2026-05-17-huawei-s-kirin-x90-aims-to-dethrone-apple-silicon-6634ae.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "laptop with 7nm chip under microscope"
description: "Huawei's new Kirin X90 chip targets Apple Silicon's dominance in a self-reliant ecosystem push."
sources_count: 6
author: "ryan-tanaka"
---

## Huawei's Kirin X90 is no accident

Huawei's Kirin X90 represents a calculated push toward full system control, mirroring Apple's Silicon shift but with a distinctly Chinese origin story. The 10-core SoC in the Matebook Pro 2025 laptops isn't just another chip—it's a direct challenge to the dominance of AMD/Intel in Huawei's hardware and the broader Western tech stack. The chip's codename, Charlotte Pro, and its 4+4+2 core configuration (Taishan V121 prime, V120 performance, Cortex-A510 efficiency) signal a design strategy borrowed from the Pura 70 series. But with SMIC's 7nm process lagging behind TSMC's, Huawei's real test is whether this architecture will run Android, Linux, or its new HarmonyOS without crippling performance.

The timing is telling. Since the 2020 US sanctions, Huawei has had no choice but to build its own chip stack. Yet the Kirin X90's lineage—Taishan derivatives instead of in-house cores—reveals the limits of that self-reliance. While the chip integrates with HarmonyOS, its success hinges on app developers porting tools to a new OS. The company's past struggles with app availability in its smartphone ecosystem suggest this isn't a solved problem.

## A fragile ecosystem battle

HarmonyOS isn't just a rebranded Linux fork. Huawei's 2025 laptops show a deliberate move toward closed-loop integration, similar to Apple's M1/M2 laptops or Microsoft's Surface line. But the Kirin X90's architecture raises red flags. The Taishan V120 cores, borrowed from Kunpeng server chips, may match AMD Zen 3 in single-core performance, but 7nm manufacturing limits multithreaded gains. Early benchmarks of server-grade Taishan cores show 18% lower IPC than Zen 3 on identical workloads, and the Kirin X90's hybrid design lacks the core-per-Watt efficiency of Apple's M3. This isn't just about raw speed—it's about whether Huawei can power laptops without throttling under load.

The bigger question is compatibility. Developers porting apps to HarmonyOS face a Catch-22: without a critical mass of users, there's no incentive to invest. Microsoft's Android compatibility layer in the first HarmonyOS laptops helps, but it's a stopgap. Huawei's own app store lacks key services like Google Maps or WeChat (which uses Android APIs), and HarmonyOS's sandboxing model complicates third-party plugin development. Until 2026, the only way to run Android apps on these laptops is through an emulator—sluggish, memory-hungry, and a poor substitute for native code.

## Apple's Silicon isn't safe

Huawei's ambitions come as Apple's M1/M2/M3 line faces its own vulnerabilities. The 'GoFetch' flaw in Apple's prefetcher allows cryptographic key theft, a problem Apple can't fix through software alone. While M3 offers a software switch to disable the prefetcher, this costs 15-20% in encryption performance. Developers are already moving sensitive operations to Intel-based Macs or cloud providers with AMD processors, a trend Huawei could exploit by positioning its hardware as 'secure by default.'

But security isn't Huawei's strongest suit. The Kirin X90's SMIC-built 7nm process lacks TSMC's side-channel mitigation techniques, making it potentially more vulnerable to cache timing attacks. Huawei's HarmonyOS also lacks Apple's App Store-level sandboxing—third-party apps can access peripherals like USB ports without user prompts. For enterprise users, this means the Kirin X90 laptops might be good for code, but not for handling banking credentials.

## What to watch

Huawei's May 19 launch of the Matebook Pro 2025 will reveal whether the Kirin X90 can run daily workloads smoothly. Look for:

1. Real-world performance tests of the Kirin X90 under sustained load, particularly for video editing and 3D rendering.
2. Developer adoption metrics—how many HarmonyOS-native apps appear in the AppGallery by Q3 2025.
3. Security audits comparing the Kirin X90's side-channel resistance to Apple's M3.
4. Apple's response: Will the M4 chip redesign the prefetcher to address GoFetch, or will it rely on software mitigations?

The Kirin X90 isn't a magic bullet. But if Huawei can bridge the app gap and prove its chips work as well as they look, this could be the first real crack in Apple's Silicon hegemony.