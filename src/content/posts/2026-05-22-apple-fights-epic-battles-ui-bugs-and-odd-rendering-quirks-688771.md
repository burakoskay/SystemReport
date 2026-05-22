---
title: "Apple fights Epic, battles UI bugs, and odd rendering quirks"
date: 2026-05-22T16:37:32.834Z
tags: ["apple","app store","ui bugs","security"]
hero_image: "/hero/2026-05-22-apple-fights-epic-battles-ui-bugs-and-odd-rendering-quirks-688771.jpg"
hero_image_credit_name: "Кирилл Абрамов"
hero_image_credit_url: "https://www.pexels.com/@feel-and-live"
visual_keyword: "Apple laptop with notch and glitchy menu bar"
description: "Apple asks the Supreme Court to narrow Epic’s App Store injunction while users wrestle with notch menu bar glitches, PNG rendering bugs, and a quirky iOS calculator."
sources_count: 6
author: "ryan-tanaka"
audio_path: "/audio/2026-05-22-apple-fights-epic-battles-ui-bugs-and-odd-rendering-quirks-688771.mp3"
audio_bytes: 612146
audio_mime: "audio/mpeg"
---

## Apple asks Supreme Court to trim Epic injunction
Apple filed a petition with the U.S. Supreme Court on Thursday. The petition asks the court to narrow the injunction that forced Apple to allow Epic Games to use alternative payment systems in its App Store.

The filing also seeks to overturn a lower‑court contempt ruling that penalized Apple for continuing to charge external payment fees. Epic won the original injunction after its 2020 lawsuit challenged Apple’s 30 percent commission and the requirement that all iOS payments flow through Apple’s billing system. Apple’s appeal signals that the company hopes to limit the precedent the case sets for other developers.

If the Supreme Court grants the petition, the App Store rules could stay largely intact for the majority of apps. The move would preserve Apple’s control over in‑app purchases, a revenue stream that topped $80 billion last year. The legal fight also forces developers to watch the court’s language for clues about future compliance requirements.

## Notch‑induced menu bar chaos on MacBook Pro
MacBook Pro owners still report menu bar icons disappearing behind the camera notch. The issue persists across macOS releases, despite Apple’s public focus on user experience.

A 9to5Mac column highlighted how the notch can obscure system icons, forcing users to rearrange menus or live with hidden controls. The problem appears in both Intel‑based and Apple‑silicon models, meaning the hardware design alone does not explain the glitch.

Apple has not issued a software fix, and the workaround—dragging items away from the notch—adds friction to a workflow that should be seamless. The continued oversight suggests that Apple prioritizes visual design over functional consistency in its macOS updates.

## Parallel‑decodable PNGs reveal divergent rendering
A cryptographer named David Buchanan posted a PNG that reads "HELLO WORLD" in most browsers but shows "HELLO APPLE" in Safari and macOS Preview. The discrepancy stems from Apple’s implementation of parallel PNG decoding.

Bunch of tests by BleepingComputer confirmed the behavior on macOS Big Sur 11.6 with Chrome 96, which displayed the intended text, while Safari swapped it. On iPhone, both Chrome for iOS and Safari rendered the Apple version, indicating the issue is baked into Apple’s image libraries rather than the browser.

The PNG exploits a bug where the decoder can split a zlib stream mid‑block, allowing two valid interpretations. Buchanan’s 84‑line proof‑of‑concept demonstrates how the flaw can embed hidden messages or even malicious payloads. He released an "Ambiguous PNG Packer" tool that lets anyone craft such images.

Security researchers warn that ambiguous PNGs could become an attack vector. If two systems interpret the same file differently, integrity checks that rely on visual confirmation may fail. Apple has not publicly addressed the bug, leaving enterprise users to decide whether to patch their rendering pipelines.

## iOS 11 calculator animation slows arithmetic
Apple’s calculator app introduced a long‑lasting button animation with iOS 11. The animation delays the next input, causing users to miss taps and produce incorrect results.

The bug appears when a user presses a second operand before the animation finishes. The app registers the first operand and the operator, then discards the second press. The screen shows a result that matches a different calculation, such as "1 + 23" instead of "1 + 2 + 3".

Independent testers filed a bug report in Apple’s internal system. The issue persists in later iOS versions, although workarounds exist: wait for the animation to fade before pressing the next button. Alternative calculator apps like PCalc avoid the problem entirely.

## What to watch next
Watch the Supreme Court docket for a decision on Apple’s petition. A narrow ruling could keep the App Store monopoly largely intact; a broad one might force Apple to open its payment ecosystem to all developers.

Monitor macOS updates for a fix to the notch menu bar clipping. A software patch would restore hidden icons without forcing hardware redesigns.

Track security advisories for parallel‑decodable PNGs. If Apple releases a decoder update, developers should verify that their image pipelines reject ambiguous streams.

Finally, keep an eye on iOS releases that address the calculator animation latency. A swift fix would improve reliability for users who rely on the built‑in app for quick calculations.
