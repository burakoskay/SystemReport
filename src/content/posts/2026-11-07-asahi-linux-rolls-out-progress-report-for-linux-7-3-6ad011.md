---
title: "Asahi Linux rolls out progress report for Linux 7.3"
date: 2026-11-07T08:10:13.244Z
tags: ["asahi-linux","linux","apple-silicon","installer","display"]
hero_image: "/hero/2026-11-07-asahi-linux-rolls-out-progress-report-for-linux-7-3-6ad011.jpg"
hero_image_credit_name: "Kevin Ku"
hero_image_credit_url: "https://www.pexels.com/@kevin-ku-92347"
visual_keyword: "Apple Silicon laptop running Linux terminal with code overlay"
description: "The latest Asahi Linux progress report details installer automation, USB‑C display work, and power‑management hurdles as the project targets Linux 7.3."
sources_count: 8
author: "ryan-tanaka"
audio_path: "/audio/2026-11-07-asahi-linux-rolls-out-progress-report-for-linux-7-3-6ad011.mp3"
audio_bytes: 585395
audio_mime: "audio/mpeg"
---

## The 7.3 progress report lands
Asahi Linux published its November 2026 progress report for the upcoming Linux 7.3 kernel. The short post on asahilinux.org is already pulling attention on Hacker News, where it earned 114 points and sparked 63 comments.[^1][^2] The report follows a familiar cadence: a brief recap of recent upstream wins, a status update on the Asahi Installer, and a candid note on the remaining technical debt.
The headline of the report is the same as previous entries – a terse "Progress Report: Linux 7.3" – but the sub‑text reveals a shift in tone. After the frantic two‑year gap between installer releases that left the last tag stuck at June 2024, the team finally automated the build pipeline.[^3] The new GitHub workflow now rebuilds the installer on every push to the main branch and publishes it at https://alx.sh/dev, a process first described in the 7.0 report.[^3][^4] This automation is the backbone that will keep future releases from stalling again.

## Installer automation finally catches up
The Asahi Installer has long been a Rube‑Goldberg of Bash, Python, and a stripped‑down interpreter bundled with the m1n1 stage‑1 binary.[^3] The installer’s UEFI‑only mode strips macOS down to the essentials – m1n1, devicetrees, and U‑Boot – and then boots a Linux kernel that matches the bundled devicetrees. When devicetree bindings diverge from the kernel, live‑media boots break, as they did with kernel 6.18.[^3]
In the 7.0 report the team explained how they moved the manifest of installable images into a separate asahi‑installer‑data repo, allowing independent updates.[^3][^5] The 7.3 post confirms that the workflow now runs on every tag, automatically uploading a fresh installer to https://alx.sh.[^3][^4] The latest public version, 0.8.0, already bumps m1n1 to 1.5.2 and adds support for the Mac Pro and a firmware‑update mode.[^3] No new installer version is announced for 7.3, but the pipeline’s existence means future patches can be shipped without the two‑year lag that frustrated distro maintainers.

## Display output via USB‑C inching forward
Getting a signal out of an Apple Silicon USB‑C port has been the project’s most publicized pain point. The fairydust branch, introduced alongside the Linux 6.19 release, finally exposed a working DisplayPort Alt Mode stack after years of reverse‑engineering four hardware blocks: DCP, DPXBAR, ATCPHY, and ACE.[^6][^7] Sven Bergström demonstrated the stack at 39C3 in December, using an M1 MacBook Air and a USB‑C‑to‑HDMI adapter to drive the conference screen.[^7][^8]
The 7.3 report does not claim a general‑purpose solution yet. It repeats the caveat that the branch "blesses" a single USB‑C port, meaning multiple external displays remain impossible, and that hot‑plug quirks still surface.[^7] Nonetheless, the project now ships the fairydust branch as‑is for developers willing to compile their own kernels.[^7] The transparency is a welcome change from earlier reports that hinted at an ETA for full DisplayPort support – an ETA the team has consistently refused to promise.[^7]

## Power‑management quirks remain
Apple’s power‑management architecture – SMC, PMGR, PMP – has forced Asahi developers to maintain a custom cpuidle driver. The upstream arm64 maintainers have mandated PSCI for all power‑state calls, but Apple Silicon lacks an EL3 firmware layer, leaving the kernel stuck at EL2 with no conduit for PSCI. The 7.2 report laid out the dilemma: either load the kernel in EL1 and host a PSCI shim in EL2 (which would break virtualization) or keep the fragile m1n1‑based solution.
As of the 7.3 update, the team has not announced a breakthrough. Instead, they reiterate the need for a proper firmware‑level implementation. The report notes ongoing collaboration with upstream kernel developers to clean up the cpuidle driver, but the core issue – Apple’s omission of an EL3 monitor – remains a blocker for upstreaming the driver. This technical dead‑end explains why battery‑life gains have been incremental despite the project's broader upstream successes.

## What to watch
The next milestone will be the first Linux 7.3 kernel that boots reliably from the automated installer without manual devicetree tweaks. Watch the alx.sh repository for a new installer tag that aligns with the 7.3 kernel source. Equally important is any upstream acceptance of the fairydust DisplayPort stack; a merge into mainline would turn the current developer‑only branch into a stable feature. Finally, keep an eye on the kernel mailing list for a PSCI‑compatible power‑management patch – if Apple ever exposes an EL3 monitor, Asahi could finally retire its custom cpuidle driver and hand over battery‑life optimization to the mainline kernel.


[^1]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzg8RWG1dmj7V34tDViMPBikCBfYhcTdXSH68z6de5iNfMwcqZ8WQsYR1-AOCKWbEN2YPuDPmHvZwi5nWMSrZ33460yz7Kpayls_cqcGqaif5z61Oj-YP6dhUlQwg9SL6YAZjq439_Mw==)
[^2]: [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHddKNMQOCeYZXkMcHgW9ev1vDU03ApJ5bY9pMqoyl_ZB_i_Uqmf0ByrmMwoT7CCFsCG1_LNChprCj-F--CBrzJd8uS7SNNSht7cdQJNvgufU3S1K3_M62ATkhve1q5Aob692ApVClKSpKQFVvpoptgLi1Tv6-Lg0j_Y0W_HF0iMGssQogDLaL-ABfeoCLE)
[^3]: [asahilinux.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkxoyOam4sqQlcegEdkKcf49SRRVw9ruwZfkypyOTkYOMakd-3s5wK8cmBSqHckPo2TmXmkaxQGsQXgCTmtikYjoGubDc7qp_EAtuaZKevKMDq3fJYEamdw-CdGoG4njQ7djgVGFDxnNJZR4wQ9Q==)
[^4]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHhiU5wnfuQPYOuwmx8eCNJxjc0a9buLwDT_mvUBF3_hAxG68WhOlq-I26F2XklURfoGfABqoPUcHeHd5FkvBtxx24BTuFgDPNu9aeXgFPZ7qZWpMS_ra59g5MW8PjQ2v3Jcr67aodH-A==)
[^5]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHTgeBa10oFko-z-ig8KBK48JXFVtCsqLnENwUCWYNakmExVHEXmYp-J2gAc_MRHmK3P28yezraxH3L-VHlTUsGIjZGA03g1MQrx_ZrBIQRUF01g4d5O9FgmC2QWW9u-O0wcfp-NsMZ6IK1NHI8)
[^6]: [techstacks.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEdLin9fLtfeE9j_yqDbdgbXc3P9oQixE4UQThWTKGD1IAYl5JjQ5w03SNC321CxuBsXhl_mw_tGYYCeJp97cuuymBOPO5HrhtaMx1r7Sog0IvL_2gnlxtAN2GfrpCS1261BckEctrKH8nTFAPnMin_R77WmxwpGDEcatAF3R8jveTQ)
[^7]: [asahilinux.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHFT71v07bhD7VFjMIca8Z8S2RiN_BUTOomXFaIfOB_0bDnzdq1x1cwAI8PSOpTJnLRtArcMhgaIX1MXlc5Yjsn6m53FIZTQoLkj11B9zLm76ZugYyTdO16RAThSUVJGzK-EIsI7Wvdw2fX_q2YcfA=)
[^8]: [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNFkwb7JWnaZPOzcN9raECxsilybnK4MiRyLmjsnfmzQeydA3dW2u2sA6DTeGrywLlvLn3DDBjs8c_GT_j0Ypqd5kOy86fi3H7vaJuMBn5vluM0gS3EMMbY3R5Z4J1CsLLrMIM7EwLR884fJ0sguccy-cqd-Kzn39njaP66Vf0XQzwkVdJWR79R6KhWYRSRoAYUuKLOFSu_aXbWirfwXUP6g==)
