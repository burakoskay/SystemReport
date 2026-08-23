---
title: "Microsoft Restores Windows Security Patches for AMD CPUs"
date: 2026-08-01T22:54:31.032Z
modified_date: 2026-08-23T14:18:06.149Z
tags: ["windows","amd","security","updates"]
hero_image: "/hero/2026-08-01-microsoft-restores-windows-security-patches-for-amd-cpus-7064c6.jpg"
hero_image_credit_name: "Erik G"
hero_image_credit_url: "https://www.pexels.com/@erik-g-12654570"
visual_keyword: "computer screen showing Windows update warning on AMD processor"
description: "Microsoft resumes Windows updates on older AMD chips after fixing a block that risked bricking devices, citing Spectre and Meltdown mitigations."
sources_count: 7
audio_path: "/audio/2026-08-01-microsoft-restores-windows-security-patches-for-amd-cpus-7064c6.mp3"
audio_bytes: 553422
author: "ryan-tanaka"
audio_mime: "audio/mpeg"
---



## The unblock: Microsoft restores AMD updates

Windows users with AMD processors can finally install the latest security patches. Microsoft announced that it has resumed updating all AMD‑based devices with the Windows operating system security update.

The move directly addresses the Spectre and Meltdown chipset vulnerabilities that have haunted the industry since 2018. By allowing the patches to run, Microsoft aims to seal the remaining gaps in the OS‑level mitigations for those CPUs.

## Why the block existed: old AMD chips and unbootable risk

Earlier this year Microsoft halted the rollout on a small subset of older AMD processors. The block was a defensive measure to avoid an "unbootable state" that could occur after installing recent Windows security updates.

Those legacy chips lack the microcode support required for the Spectre/Meltdown mitigations. Without the proper firmware, the OS patches could trigger a blue‑screen crash that leaves the machine unable to start. Microsoft and AMD collaborated to verify that the risk was eliminated before re‑enabling the updates.

## The patch rollout: KB numbers and what to install

The restored update series spans both security‑only releases and monthly rollups. The relevant Knowledge Base identifiers include:

- KB4056897 (security‑only, Jan 3 2018)
- KB4056894 (monthly rollup, Jan 9 2018)
- KB4056888 (OS Build 10586.1356, Jan 3 2018)
- KB4056892 (OS Build 16299.192, Jan 3 2018)
- KB4056891 (OS Build 15063.850, Jan 3 2018)
- KB4056890 (OS Build 14393.2007, Jan 3 2018)
- KB4056898 (security‑only, Jan 3 2018)
- KB4056893 (OS Build 10240.17735, Jan 3 2018)
- KB4056895 (monthly rollup, Jan 9 2018)

Users should apply the appropriate KB for their Windows version. The updates are listed on Microsoft’s support pages and can be installed via Windows Update or the Microsoft Update Catalog.

## What users need to watch: antivirus, blue‑screen troubleshooting, and lingering risks

Before applying any of the KBs, Microsoft requires a compatible antivirus solution to be present. The advisory notes that the antivirus must be active during the update process to prevent interference.

If a system still encounters a blue‑screen error after the patch, Microsoft has assembled resources for Windows 10, Windows 8.1, and Windows 7. The troubleshooting guides walk users through log analysis, safe‑mode boot, and driver rollback steps. While the block has been lifted, older AMD CPUs remain a marginally higher risk for future micro‑code‑driven issues.

## What’s next: future update cadence and broader CPU mitigation

Microsoft’s decision signals that the partnership with AMD has matured enough to trust the firmware updates. However, the episode underscores the fragility of retrofitting modern mitigations onto legacy silicon.

Enterprises should monitor upcoming Windows security releases for any repeat of the block pattern. Tracking AMD’s security advisory pages will reveal whether new processor families will need similar safeguards. In the longer term, the industry may see a shift toward deprecating support for chips that cannot receive timely micro‑code patches, forcing a faster hardware refresh cycle.

**What to watch**: the next Windows cumulative update (expected in February) will include a refreshed Spectre/Meltdown mitigation package. Verify that the KB identifiers match your OS build, and confirm that your antivirus remains up to date. Keep an eye on AMD’s advisory releases for any new processor‑specific guidance.

## Updates

- **2026-08-23** — The End of an Athlon ([source](http://www.os2museum.com/wp/the-end-of-an-athlon/))
- **2026-08-07** — The world's biggest solar telescope caught vortexes on the Sun's surface ([source](https://arstechnica.com/science/2026/08/the-worlds-biggest-solar-telescope-caught-vortexes-on-the-suns-surface/))
