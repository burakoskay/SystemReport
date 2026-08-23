---
title: "MartyPC Hits Near‑Perfect Cycle Accuracy for IBM PC/XT Emulation"
date: 2026-08-23T18:29:45.354Z
tags: ["emulation","rust","retrocomputing"]
hero_image: "/hero/2026-08-23-martypc-hits-near-perfect-cycle-accuracy-for-ibm-pc-xt-emulation-103708.jpg"
hero_image_credit_name: "Viktorya  Sergeeva 🫂"
hero_image_credit_url: "https://www.pexels.com/@johndetochka"
visual_keyword: "retro computer emulator interface with CRT shader"
description: "MartyPC reaches 99.9997% cycle accuracy on the 8088, adds WebAssembly demos, and expands debugging tools for retro developers."
sources_count: 4
author: "lena-volkov"
---

## Near‑perfect cycle accuracy on the 8088
MartyPC now passes the 8088 V2 Test Suite with 99.9997% cycle accuracy. The milestone was recorded in June 2024 when the developer updated the test suite to exercise the 8088 prefetch queue and corrected lingering timing errors. The claim comes directly from the project’s GitHub release notes and the author’s blog, which detail the validation process against a real 8088 CPU mounted on an Arduino MEGA.[^1]

The validation rig runs each instruction simultaneously on the hardware CPU and on the emulator, then compares cycle‑by‑cycle results.[^1] Discrepancies trigger a regression that the author resolves through hardware‑level research, including logic‑analyzer bus sniffing and oscilloscope measurements of the 8253 timer and DMA timings.[^1][^2] The approach mirrors academic hardware verification but is executed by a single developer.[^1]

## Cross‑platform support and recent releases
MartyPC ships binaries for Windows, Linux, and macOS.[^1] The current stable release, version 0.4.0, is available on the GitHub releases page (https://github.com/dbalsom/martypc/releases/tag/0.4.0).[^3][^4] Earlier this year, version 0.1.2 introduced performance improvements and a suite of bug fixes, according to the same repository.[^5][^6]

The emulator also offers a WebAssembly build that runs the classic PC demos 8088 MPH and Area 5150 directly in a browser. The YouTube videos linked in the project’s README (Area 5150 at https://www.youtube.com/watch?v=zADeLm9g0Zg) demonstrate the demo playing without native installation. Users can download the WASM artifact from the GitHub Actions tab, provided they are logged in to GitHub.[^1]

## Debugging tools aimed at retro developers
MartyPC’s primary niche is “retro PC development,” a claim made in the project’s description on Hacker News.[^1] The emulator includes an extensive GUI debugger that shows disassembly, CPU registers, memory views, and peripheral states.[^1] Breakpoints can be set on both instructions and individual clock cycles, and the system logs each cycle for later analysis.[^1]

A configurable CRT shader simulates composite and RGB output, and the developer plans to add LibraShader support.[^1] While the UI requires editing configuration files for machine profiles, the flexibility allows users to assemble custom machines from base profiles plus “overlays” that emulate add‑on cards. The documentation, hosted in the project’s Wiki, lists required ROM images and explains how to assemble a faithful IBM 5150, XT, PCjr, or Tandy 1000 configuration.

## Technical methodology behind cycle‑accurate emulation
The author began the 8088 CPU core in April 2022 and moved to cycle‑accurate modeling in November 2022. The process started with a hardware reference board: an Arduino MEGA wired to a real 8088 chip.[^1] By feeding identical instruction streams to both the hardware and the Rust implementation, the developer could spot timing mismatches at the granularity of a single clock tick.[^1]

Peripheral accuracy received similar treatment. The 8253 programmable interval timer was probed with an Arduino, while DMA channel behavior was captured using a logic analyzer.[^1][^2] These measurements informed the emulator’s timing tables, reducing visual artifacts such as CGA snow in demos that rely on precise video memory access during vertical blank periods.

## Position within the broader emulation ecosystem
MartyPC differs from mainstream PC emulators like DOSBox‑X in two respects. First, it targets cycle‑level fidelity rather than broad compatibility. Second, it is built in Rust, a language chosen for its safety guarantees and zero‑cost abstractions. The Rust implementation eliminates many classes of memory‑corruption bugs that have plagued C‑based emulators.

The trade‑off is a steeper setup curve. Users must supply BIOS ROMs and floppy images manually, a point repeatedly raised in community comments on the Hacker News thread (see https://news.ycombinator.com/item?id=49405816).[^4][^5] The developer acknowledges the friction and is iterating on documentation, as evidenced by the Wiki page on ROM requirements.[^5]

Compared to DOSBox‑X, which includes a built‑in full‑screen mode, MartyPC currently lacks that feature.[^5] The author lists a full‑screen implementation as a “to‑do” item tied to a planned display system refactor that will also enable dual‑window support.[^3][^5] Machine‑configuration flexibility remains limited; the current system assumes 640 KB of RAM by default, and changing drive sizes requires separate configuration files.

## What to watch
The next milestone is the integration of a true full‑screen mode and a more granular machine‑configuration system, both slated for the upcoming 0.5.x series according to the project’s roadmap on GitHub. Observers should track the issue tracker for progress on these features and for any new cycle‑accuracy regressions that may arise as the codebase expands.


[^1]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgZhOqdncqH_MUrxId0VVlW58F-ccPmMGtccaDq8zIOEZI65DZ8IN-cprCl0tXwZlyZqv9Mp9PiyevfIkBip2-_0pPx9BPI21UA1e9FeZGyaFWNFE3j-DBWo6rJpI=)
[^2]: [hackster.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEcWE0q1_yHH8PoX7_a4x2uosGYdCIoQKb-h6-AuuruKjivpN7Z75Ge2P7kXCkk9CzMRiwwXe1hMUPNu78Hc0cx4iq5yLlDbwRxl27xdxrWqXIVsdOGUaDHQ0nscBpTWyzEAIN-ExzVc8VZVoR8AfAdtp58iV2SwTpF2NzZBfVSmu35gQ40EfBmTWjZgswW4WG6Qi5w1wjT3xKFyMoAp1im55eC1irVQOK-EBfIIQKDqicokPn-yw4EpH28ylS7)
[^3]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG8xoHGs1l9ddmpXZhrcuWsOyiasw7gzTEcVcJUse6UMiGKuDUI3ybkEUVkn81dxDjiwKRzon-UuFrz_nT1qO-PFGEu-3vXANb8fBKqcR0det-kzO40v7SD60N48jOVp-51AnMd8YQ=)
[^4]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFgeljHlY9pf-yj-bJe3gfdWcQAZuaQID8oWdhKPjyoQVT2z8pkb9Q7k400e79wXBsPaKLYMxfNkcKf2Q7f2_eDvTIBVtR-s_gfKuarMhpIdutR0TlCIoNz7LlGZuz6dctxGt01ZTyWV46-OKJUOrQJ6TQbhMc=)
[^5]: [vogons.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFG6AgzCd3n52PqghokxP4eJmcBMNb_qCC8v3KxxL-IC0qO7Gn1X45FA1IgmbV7fq3eIQMTKc0aLCRNWLxPEsXeSly1pX1MKYhzS3YgCzmme3XYnCmBjnSY4rcVI_iVZrAa7OX051GG)
[^6]: [int10h.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEfungha4w3PW9oD9HjsA37cwFbsH-d1L0ijFqKw9-eHnr5ONaC43cYRySxX-rPE77AgUXP3trFN1vfXsTCgHNe91fKjxRzWDs4QijnPh4IQau_Ia-_BkVqoJuKyBLDuFgSvLnNRsFld-pGPAzrA_4pAljfR31C5G9-OdsvfVYcxgj4)
[^7]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGH_9rjq_IvIirVDRejytJHBQmGq5ohBSi-_6vfjS8K5u8RyYpPWfFzqApfoOHVcaPLp5kXPAkVu_pCXOqF72U99CsyJzKSdJ02RHrG58ceretEKuXohyQqzZt32pE2zUss2SCzwUsS1A==)
[^8]: [oldskool.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwgxRg92dV8Cz9NHCGl9ZqJmErL5equD2nsZv1y8y4S-yyCh3xYfp12bIbnBH5lAlfWsQ_y-PpfItvVuRRg1UTeOtUe4qKIn-e1f9h5bMs4ItJoSItQug39H8LtVtc7YenLNcRwHvnf5LXbQyYmODN5bJC9ZnFwGL-xMZwnOPkv4lu5XZN7yUwFPiIFYgaMui440F_)
