---
title: "Oppo's 8,000 mAh Find X10 and VESA DP 2.0 Over USB‑C"
date: 2026-09-01T19:14:25.840Z
tags: ["opp","displayport","usb-c","vector-graphics","facebook"]
hero_image: "/hero/2026-09-01-oppo-s-8-000-mah-find-x10-and-vesa-dp-2-0-over-usb-c-2a98ef.jpg"
hero_image_credit_name: "ready made"
hero_image_credit_url: "https://www.pexels.com/@readymade"
visual_keyword: "smartphone with large battery and USB‑C connector displaying vector graphics"
description: "Oppo's upcoming Find X10 packs an 8,000 mAh cell, VESA finalizes DP 2.0 Alt Mode for USB‑C, ThorVG 1.0 hits production, and Facebook hints at a new mobile feature."
sources_count: 4
author: "david-okafor"
---

## Oppo pushes battery capacity to 8,000 mAh with the Find X10

The upcoming Find X10 will ship with an 8,000 mAh battery, according to a 9to5Google report.[^1][^2] The same source says the phone will also carry "top‑tier flagship specs," though it does not list the processor or camera modules.[^1][^2]

An 8,000 mAh cell is roughly 30 % larger than the 6,500 mAh batteries that dominate the 2023 flagship market. The increase translates to roughly two extra days of mixed‑use screen time, assuming a 2,500 mAh‑hour average draw. Oppo has not disclosed whether the larger pack will affect the phone's thickness or weight, but past flagship iterations have kept dimensions under 9 mm. The report does not mention a fast‑charging standard, leaving the charging speed an open question.

The battery size matters because flagship manufacturers have been trading off endurance for thinner glass and higher refresh rates. Samsung's Galaxy S24 series, for example, tops out at 5,000 mAh. Apple’s iPhone 16 Pro Max uses a 4,800 mAh cell. Oppo’s move could force rivals to reconsider their power budgets, especially in markets where daily charging is inconvenient.

If the Find X10 reaches market in late 2024, it will arrive after VESA’s DisplayPort Alt Mode 2.0 has already entered the USB‑C ecosystem. The convergence of a massive battery and a high‑bandwidth video link could make the device a strong candidate for mobile VR or high‑resolution streaming.

## VESA finalizes DisplayPort Alt Mode 2.0 for USB‑C

VESA released version 2.0 of the DisplayPort Alternate Mode specification on April 29 2020.[^3][^4] The spec enables the full feature set of DisplayPort 2.0 through a USB‑C connector, including beyond‑8K resolution and higher refresh rates.[^5][^3][^4][^6][^7]

The new Alt Mode can push up to 80 Gbps of video data across all four high‑speed lanes, or 40 Gbps when simultaneous SuperSpeed USB data is required.[^5][^3][^4][^6][^7] VESA cites a maximum payload of 77.37 Gbps after 128b/132b channel coding.[^7] That bandwidth supports an uncompressed 8K (7680×4320) display at 60 Hz with 30 bpp 4:4:4 HDR, and a compressed 16K (15360×8460) display at 60 Hz with the same color depth.[^7]

Craig Wiley, senior director of marketing at Parade Technologies and VESA board member, said the update required "several years in the making" and aligns the USB ecosystem with the latest DisplayPort capabilities.[^5][^3][^4] Syed Athar Hussa added that the spec makes USB‑C the "connector of choice" for docking, gaming, AR/VR head‑sets, and professional HDR displays.[^6]

The first products implementing Alt Mode 2.0 were expected in 2021.[^3][^4] Early adopters include high‑end laptops that bundle a single USB‑C port for video, data, and power delivery. The spec’s power‑management tweaks also improve battery life on portable devices that drive external monitors.

For developers, the Alt Mode removes the need to support separate DisplayPort and USB‑C pathways. A single cable can now carry a full‑bandwidth DP 2.0 stream while still delivering up to 100 W of power. That simplification could accelerate the rollout of USB‑C docking stations in enterprise environments.

## ThorVG 1.0 reaches production‑ready status

After 18 months of development, ThorVG announced version 1.0, a complete rewrite of its 2D vector graphics engine.[^8] The release upgrades the library from v0.15 to a stable, cross‑platform API suitable for embedded and desktop use.[^8]

ThorVG’s new text subsystem adds horizontal and vertical alignment, automatic line breaking with four selectable modes, manual line‑break support via "\\n," customizable character spacing, and outlined text.[^8] Those features address long‑standing gaps in UI rendering where precise typography matters.

The engine also overhauls its blend‑mode system. It now implements Hue, Saturation, Color, and Luminosity modes using the HSL color space, matching the definitions in Lottie, SVG, and the W3C Compositing and Blending specification. The change improves visual consistency across browsers and animation tools.

Adoption metrics show ThorVG already powers the vector canvas in LottieCreator and serves as a rendering backend for Espressif’s IoT platforms.[^8] Those integrations demonstrate the engine’s suitability for resource‑constrained devices, where a lightweight binary and minimal heap usage are critical.

The refactor merged previously separate modules into a unified library, simplifying initialization and rendering calls. Developers can now link a single .so or .dll and obtain both raster and GPU‑accelerated backends. The GPU path leverages OpenGL ES on mobile and Vulkan on desktop, offering hardware‑accelerated anti‑aliasing without extra code.

ThorVG’s roadmap mentions support for animated SVG filters in the next minor release. If delivered, that capability could replace proprietary raster pipelines in many embedded UI frameworks.

## Facebook teases an unnamed mobile feature from Seattle

Mark Zuckerberg told reporters at Facebook’s Seattle office that the company will "launch something awesome" next week. The announcement came during a Wednesday briefing and referenced a 40‑person engineering team based in Seattle, the only major Facebook engineering hub outside Palo Alto.

The Seattle team previously delivered the unified mobile site unveiled in March, a responsive web app that consolidates the desktop and mobile experiences. Zuckerberg’s tease follows months of speculation about a dedicated iPad app and a photo‑sharing iPhone client, but no concrete details were provided.

A Facebook spokesperson declined to elaborate, leaving the feature’s platform and functionality ambiguous. The company reported more than 500 million users on mobile, and internal data suggests mobile users are twice as active as PC users. That activity gap fuels Facebook’s drive to expand its mobile ecosystem.

Analysts note that a Seattle‑originated launch could indicate a hardware‑adjacent product, given the office’s history of working on AR/VR prototypes. However, the lack of a hardware hint keeps the speculation open.

## What to watch next

The Find X10’s battery claim will be verified when Oppo releases official specifications, likely in the fourth quarter. VESA’s Alt Mode 2.0 products should appear in consumer laptops throughout 2025, and early‑adopter reviews will reveal real‑world latency and power‑draw figures. ThorVG 1.0’s adoption will be measurable through updates to LottieCreator and Espressif SDK releases. Finally, Facebook’s "something awesome" will be confirmed by the next‑week announcement; tracking the feature’s rollout and its impact on mobile engagement metrics will be essential for understanding the company’s strategic focus.

---


[^1]: [9to5google.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEZz5Yc4ceiQCBNCMpl_-DJTZwb6hmQ-aDqETrBfh36GJ_vaAwG6ZdWXjlIrHzL6emWgnCu6r_aeecF7wxdXnOTMngPkt0xjZIRBNVFr7nNjVIS)
[^2]: [9to5google.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4nGaWp_d_6Dz9VM7iIAb-88Cyvqfi2r7GLhyexhMQISlONWZPkr4eybGnkHz7kSQtAGi6sx2PM3962T3fNHorfeRMfZ3IS-VugKQE5ZfLarOAkAdAdUb3QIjqIwYh8K_COAGbl4UxiRtVRQkykpY4a58YtbsihTjzNN1Kjjg=)
[^3]: [vesa.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHvpsvAnOIvrt6QyWrF5gHw5K685GT2edpctzd6x_PCdke2yCxW_cYW8IHoxLxo2_m5OotoKepoYMlb0l1KRr_9FcADAvgCn8SDHFLTKii-Xro0dIRGpheSE4zhkyfHuXMHjtFEmTxB3AlVmGKWc4K6p6H0Eal1sOxhymf-y4eUFDuw_arMxiEFxELupnUUEVLkes83pUhW-At3HKj1m-Q3uoywFwd-8CpOKeKs4SH3PahmnPprGp_6v0v_QfYKFmb_HqNHHVG-AbCjxh2hIIJXoatwHzO1rA==)
[^4]: [prnewswire.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQErYLpBtoVTUOjMNvo_lLvRaTKYoMV83xhVAwNwtjor51eikJ0N4Nw4prKyllgd19xHzCcam2i6HWVhAIsj0k7yrQ5TogRwmb9yeL4Qh2RqPMG-3Ge3UO2DIBbMMPV7dGqMbgv7fy5KeOlSRX3Ni3frqHnFp_p1QjziEtmgfOdG--KOnPbzsTbjno2a3mKl5RYu8mUYy00d2dVvzebuOEiSxx8L_l4NqZXXAiuwMn0bgFT1JRl__PLirKHw4NgvSzs2Y6T5NiTNjH57f9t2qcC6pI5TbiSuNMJ5e5okVKHhJv9fOnL_cBftEEmhiQ==)
[^5]: [wccftech.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHqi06pouLUhMvzLHjJbSRKmODOQ9ALn6VN4zA7m40XPKfqJ7RaTt7VoH65_595NyRhk4vsZJP8ZtPBc5ez0plw8UG76fneodVzwb580JFoxksw_rvYJNCLutDLnv7KALI4l59esll2fdnUr1NBbGPbLPNV9s0AGHMYa_lZKh0ANYUZHr5aJ7FrLGz9GRTMZVh_vg==)
[^6]: [uniaccessories.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGYkdC0UuR1yf9VW5VLI7Rmp4I5pncTNwCZ39TKnqcjweJTJdaopnc7zSx0zyQ37a50pBFdC-dEw1gXK4RyvuAep26luG9ZxPU-DtPs7_jIoNfX5YDmRmYSa-olcf6QG6QmefgItTXXMOctScWbyBS3ZTdBi3D4ySMJLxwvYqIDYGRf5tUlP9OtyvaR5Kp7kZc0mreznD_bX5Efeopy)
[^7]: [9to5mac.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEvfa0G21hhJYVfECDfYjolus9njJ9Te-jPFnRHxhKHN3nxJfvqKOqgPWhcX6_0eZFPLif4x7DgoQqqySg6SK1FWEGtkRkDbr7XbU8dTjNAPqknn6WDh3TanNqLVtPVa3iCnzrhJHZfDzBGmbyayp5XOAWAf98cvLBTGyW1kFrdsxAguAvMp4MfNZ4a28t5IZPqeb2zgnvPyxgtTtmCgSyRPZwx-hy5GIDyuF-MZFzGdUmlXlYyBjA=)
[^8]: [thorvg.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGyUfF_8TtUAwQF_KvpG0eBnj4jPyXF9Zkyha_3AO27S2tS-ArESMQHdfDGVP8xbWJchM2AsXC1m6hVILWEM9SbIvIm644VAuEeR58d_vIpJZ5GzN01qYpCFvWfBN6eiglYBgNm05cpjqCldaMdq5wmSp_p1gOX-A6mSZzx)
