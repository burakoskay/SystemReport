---
title: "Android Auto Gets Work Accounts as Security and OEM Tensions Rise"
date: 2026-10-20T13:16:25.826Z
tags: ["android auto","infotainment","automotive security"]
hero_image: "/hero/2026-10-20-android-auto-gets-work-accounts-as-security-and-oem-tensions-rise-89bf47.jpg"
hero_image_credit_name: "Rachel Claire"
hero_image_credit_url: "https://www.pexels.com/@rachel-claire"
visual_keyword: "driver interacting with car touchscreen, split view of corporate and personal app icons"
description: "A hidden Android Auto work‑account feature surfaces amid autoplay complaints, hobbyist head‑unit hacks, malware findings, and GM’s move away from CarPlay and Android Auto."
sources_count: 7
author: "ryan-tanaka"
audio_path: "/audio/2026-10-20-android-auto-gets-work-accounts-as-security-and-oem-tensions-rise-89bf47.mp3"
audio_bytes: 524583
audio_mime: "audio/mpeg"
---

## Work accounts sneak into Android Auto

An unreleased build of Android Auto now lets users toggle a "work account" profile. 9to5Google spotted the flag while testing a pre‑beta image and confirmed the code path switches between personal and corporate app sets.  The hidden toggle could let fleet managers keep personal apps off a vehicle while still granting access to navigation, calendar, and messaging tools needed for a workday.

For a driver who spends eight hours a day in a company‑owned car, the feature promises a clean separation: personal music stays at home, corporate maps stay in the vehicle.  It also sidesteps the need for a separate infotainment system for each use case.  The discovery arrives as Android Auto’s user base expands beyond commuters to logistics firms and rideshare operators that have long complained about personal app bleed‑through.

## Autoplay annoyance and the need for control

Android Auto’s default behavior is to start the last‑used media source as soon as the car powers on.  Engadget published a step‑by‑step guide to disable that autoplay, showing users how to dive into the Android Auto settings, locate the "Autoplay" toggle, and turn it off.  The guide notes that the option lives under the "Audio" submenu and that the change persists across reboots.

Turning off autoplay feels like a small win, but it highlights a broader friction point: drivers often have to wrestle with default behaviors that assume a one‑size‑fits‑all usage pattern.  When the system forces a radio station or a podcast to start, it steals a few seconds of attention that could be better spent on the road.  The fact that disabling the feature requires a few taps in a nested menu underscores how Android Auto still treats the driver as a passive consumer rather than an active controller.

## Hobbyist head‑unit projects keep the platform alive

While Google pushes Android Auto toward corporate integration, a parallel community builds its own head‑unit solutions on the Raspberry Pi.  Crankshaft, a turnkey package released as NG Alpha‑7.5 on 2022‑06‑29, wraps OpenAuto to present Android Auto on a 7‑inch screen.  The project advertises a "just work" install that respects GPL‑v3 licensing and invites developers to tweak the code.

Crankshaft is explicitly labeled as a hobbyist effort, not an official Google product.  Its README warns that the software is alpha‑level and carries no certification.  Still, the ease of flashing a Pi, connecting a cheap display, and getting Android Auto to run makes it an attractive sandbox for engineers who want full control over the infotainment stack.  The project also serves as a testbed for custom voice commands, alternative UI layouts, and, crucially, security experiments that would be impossible on a locked‑down OEM head‑unit.

## Malware proves Android head units are vulnerable

A June 2026 Kaspersky‑backed analysis uncovered Android‑based head‑unit malware that installs silently as a regular app.  The malicious package, identified by the name `com.tw.core`, leverages the legitimate system app TWCore, which normally handles analytics and OTA updates.  TWCore receives an MQTT message from `cardoor.cn` containing an `installNotExists` flag.  When the flag is true, TWCore skips its usual existence check and pulls an APK into its external cache directory, then installs it without user interaction.

The infection chain shows how head‑unit firmware that allows third‑party system apps can be weaponized.  Because many vehicles expose a SIM slot and internet connectivity, a compromised head‑unit can become a botnet node or a conduit for further attacks.  The researchers notified the vendor, who patched the update mechanism.  The episode serves as a reminder that the same Android ecosystem that powers phones also powers cars, and the same vulnerabilities travel with it.

## GM abandons CarPlay and Android Auto, citing safety

General Motors announced it will drop Apple CarPlay and Android Auto in favor of its own Ultifi platform, debuting in the 2024 Chevy Blazer EV.  Tim Babbit, GM’s infotainment product lead, argued that the phone‑mirroring apps encourage drivers to reach for their phones when connections hiccup, leading to eyes‑off‑road incidents.  Babbit cited stability issues—dropped connections, slow rendering, and poor UI responsiveness—as evidence that the third‑party stacks can become distractions.

GM’s Ultifi bundles Google services like Maps and Assistant directly into the vehicle, aiming for voice‑first interactions that keep hands on the wheel.  The move also aligns with GM’s broader subscription push; chief digital officer Edward Kummer told Reuters the company targets $25 billion in annual subscription revenue by 2030.  While GM later issued a statement clarifying that its partnership with Apple and Google remains valued, the core rationale stays: tighter integration reduces reliance on external phone apps and opens new data and revenue streams.

## What to watch

The work‑account toggle suggests Android Auto may evolve into a more enterprise‑friendly platform, but the autoplay toggle, hobbyist forks, and recent malware all point to a fragmented ecosystem where control and security are still contested.  GM’s Ultifi rollout will be the first large‑scale test of a fully integrated, non‑mirrored infotainment stack.  Track how quickly OEMs adopt in‑car Google services, whether Android Auto’s hidden work‑profile makes it into a public release, and how head‑unit security patches respond to the TWCore‑based attack vector.  The next six months will reveal whether the industry can balance convenience, safety, and openness without sacrificing driver attention.

