---
title: "Android Things 1.0 launches with three-year free updates"
date: 2026-05-22T04:22:35.509Z
tags: ["android","iot","updates"]
hero_image: "/hero/2026-05-22-android-things-1-0-launches-with-three-year-free-updates-6adc95.jpg"
hero_image_credit_name: "Tanha Tamanna  Syed"
hero_image_credit_url: "https://www.pexels.com/@tanhatamannasyed"
visual_keyword: "industrial IoT board with Google logo and modules"
description: "Google releases Android Things 1.0, a closed-source IoT OS with three years of free updates and certified System-on-Modules for manufacturers."
sources_count: 5
author: "ryan-tanaka"
---

## Android Things 1.0 hits the market

Google rolled out Android Things 1.0 this week, delivering a purpose‑built Android flavor for IoT devices and promising three years of OS updates at no charge. The move closes a six‑year gap between the platform’s 2016 announcement and a production‑ready release.

The release follows eight developer previews and a public debut at I/O week. Android Things sits alongside Android TV, Android Automotive and Wear OS, but unlike the open‑source phone stack it is a closed‑source, Google‑controlled OS. Device makers cannot modify the core system; they can only ship apps on top of it. Google will push monthly security patches and occasional major releases directly to every certified device, eliminating the “toxic hellstew” of unpatched IoT firmware that has plagued the market.

## Google’s update‑only model flips IoT security on its head

Most consumer‑grade Android phones already suffer from fragmented update schedules, but IoT devices are worse because vendors rarely release patches after launch. Google’s answer is to own the update pipeline entirely. Every Android Things product that ships with the “long‑term support version” will receive three years of OS updates, free of charge, with automatic rollout enabled by default.

The three‑year window is not a marketing gimmick; it is baked into the platform’s architecture. Because the OS is closed source, Google can certify a single binary and push it over the air without negotiating with OEMs. After the initial period, Google mentions “additional options for extended support,” hinting at paid or community‑driven pathways, but the baseline commitment is clear: three years of security patches, no vendor delays.

## Hardware constraints: the certified System‑on‑Modules

Android Things does not run on arbitrary silicon. Google has locked the platform to a short list of System‑on‑Modules (SoMs): NXP’s i.MX8M, Qualcomm’s SDA212 and SDA624, and MediaTek’s MT8516. These SoMs bundle CPU, RAM, storage, Wi‑Fi, Bluetooth and I/O on a single board, making them easier for manufacturers to embed in products ranging from smart speakers to industrial sensors.

The most concrete example is the Intrinsyc Open‑Q 212A, a Qualcomm SDA212‑based module. It ships with 1 GB of RAM, 4 GB of eMMC storage, integrated Wi‑Fi and Bluetooth, and a 50 mm × 46.5 mm form factor. For workloads that need more horsepower, the SDA624 module offers a Snapdragon 624 core, positioning Android Things for both low‑end appliances and higher‑end edge compute.

## How Android Things fits into Google’s broader Android ecosystem

Android Things joins a family of Android form factors that Google has been layering over the past decade. The May 2026 Google System Release Notes show the same Play services and Play Store plumbing spreading across phones, tablets, Wear OS, Android TV and Android Auto. Project Treble, introduced with Android 8.0 Oreo, re‑architected the HAL‑kernel interface to make system updates less fragmented. While Treble paved the way for faster OTA updates on phones, Android Things takes the concept a step further by locking down the entire stack.

The closed‑source stance also sidesteps the complexities introduced by Dynamic System Update (DSU), a tool that lets developers boot a Generic System Image without unlocking the bootloader. DSU is useful for testing upcoming Android releases, but it assumes an open‑source base that can be swapped at runtime. Android Things, by design, does not expose that flexibility; the trade‑off is a more predictable security posture for IoT manufacturers who cannot afford to maintain their own patch pipelines.

## What to watch

The first wave of Android Things devices will likely appear in smart home appliances and industrial edge gateways. Adoption hinges on whether OEMs trust a closed‑source OS that they cannot tweak. Keep an eye on the “extended support” options Google hints at after the three‑year window—if they become a paid service, smaller manufacturers may reconsider. Finally, watch how the certified SoM list evolves; a broader hardware portfolio could unlock new categories such as automotive telematics or medical wearables, and force competitors to rethink their own update strategies.
