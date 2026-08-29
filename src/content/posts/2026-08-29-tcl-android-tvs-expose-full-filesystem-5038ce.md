---
title: "TCL Android TVs Expose Full Filesystem"
date: 2026-08-29T08:32:59.864Z
tags: ["smart-tv","security","iot"]
hero_image: "/hero/2026-08-29-tcl-android-tvs-expose-full-filesystem-5038ce.jpg"
hero_image_credit_name: "cottonbro studio"
hero_image_credit_url: "https://www.pexels.com/@cottonbro"
visual_keyword: "a modern smart TV displaying a warning overlay on a dark living room wall"
description: "TCL smart TVs let anyone browse their internals over Wi‑Fi while Samsung introduces a three‑layer GAIA shield for its Tizen TVs, raising the stakes for home hubs."
sources_count: 4
author: "ryan-tanaka"
audio_path: "/audio/2026-08-29-tcl-android-tvs-expose-full-filesystem-5038ce.mp3"
audio_bytes: 652688
audio_mime: "audio/mpeg"
---

## A hidden port turned TCL's Android TV into an open file cabinet

Security researchers Sick Codes and John Jackson proved that a TCL Android TV could be accessed without a password. They connected to an undocumented TCP/IP port on the device and listed every file on the system. The same port let them overwrite files at will. The breach required only a Wi‑Fi connection; no credentials were needed.

The pair reported the flaws to US‑CERT, which assigned CVE‑2020‑27403 and CVE‑2020‑28055. TCL patched the model the researchers examined, but the company admitted that updates would roll out to all affected Android TV models in the coming days. The statement emphasized the role of independent researchers and promised "effective solutions" for the devices.

## Why a TV matters more than a screen

Modern smart TVs sit at the center of many households. Samsung's 2016 Tizen lineup already doubles as a hub for SmartThings devices, from cameras to lighting. When a TV can control door locks or alarms, any compromise spreads to every connected gadget.

The risk is not theoretical. In a test, Sick Codes accessed a TV in Zambia by browsing its file system through Chrome on an Android phone. The TV was the only one of about a dozen worldwide that was directly reachable on the internet; most devices require a local Wi‑Fi network. Even a single exposed TV can become a foothold for an attacker targeting a whole smart‑home ecosystem.

## Samsung answers with GAIA, but the details stay vague

Samsung unveiled GAIA, a three‑layer security suite for its Tizen‑based smart TVs. The solution claims to protect stored credentials, credit‑card numbers, and data exchanged with IoT service servers. GAIA arrives just as Samsung plans to let its premium SUHD TVs act as universal controllers for any SmartThings‑compatible device released after 2016.

Samsung's track record includes the NSA‑approved Knox platform for phones, which later revealed a flaw that stored PINs in plaintext. GAIA inherits the same legacy of strong cryptography mixed with occasional bugs. The company has not disclosed how GAIA isolates the TV from other IoT devices, leaving the community to wonder whether the new layers truly raise the bar or simply add another surface for attackers.

## A bedroom experiment shows how easy remote code can slip in

One hobbyist documented a command‑injection exploit on a generic smart TV. By entering back‑ticked shell commands into a hidden "Hotel Mode" menu, the author renamed the device to "television `sleep 5`". The TV froze for three times the injected delay, confirming that the input was passed to a shell.

The attacker then chained the injection with a Netcat payload, opening a remote shell on the TV. The exploit worked because the TV's web interface exposed a vulnerable parameter without sanitization. The author could read /etc/passwd and run arbitrary commands, demonstrating that even a simple UI bug can yield full system control.

## The broader battle for smart‑home trust

TCL's exposed port and the DIY injection both illustrate a common theme: smart TVs are no longer passive displays. They run full Linux stacks, host web servers, and store sensitive tokens for streaming services. When manufacturers treat them as low‑risk peripherals, they ignore the fact that a compromised TV can pivot to cameras, microphones, and door locks.

Samsung's GAIA is a step toward hardening the most popular hub, but the lack of transparent testing leaves security experts skeptical. The industry needs a baseline of mandatory secure‑boot, signed firmware updates, and network segmentation for TV‑based hubs. Without those fundamentals, any vendor‑specific shield will be a temporary fix.

## What to watch

Track whether TCL releases a full‑device firmware update that closes CVE‑2020‑27403 and CVE‑2020‑28055 on all Android TV models. Monitor Samsung's GAIA rollout and look for independent penetration tests that validate its three‑layer design. Finally, keep an eye on regulator statements about IoT hub security, as a formal standard could force manufacturers to treat smart TVs as critical entry points rather than optional extras.
