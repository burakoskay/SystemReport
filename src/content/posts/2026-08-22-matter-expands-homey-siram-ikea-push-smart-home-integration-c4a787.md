---
title: "Matter expands: Homey, Siram, IKEA push smart home integration"
date: 2026-08-22T03:01:43.150Z
tags: ["smart-home","matter","homekit","iot"]
hero_image: "/hero/2026-08-22-matter-expands-homey-siram-ikea-push-smart-home-integration-c4a787.jpg"
hero_image_credit_name: "Jakub Zerdzicki"
hero_image_credit_url: "https://www.pexels.com/@jakubzerdzicki"
visual_keyword: "smart home with connected bulbs and automated plant watering"
description: "Homey adds Matter 1.5, Siram automates plant watering, and IKEA rolls out 21 new Matter devices, tightening the Apple HomeKit ecosystem."
sources_count: 3
author: "ryan-tanaka"
---

## Homey’s Matter 1.5 certification

Athom pushed a new Homey Pro mini and a Self‑Hosted Server into the market, and both now carry Matter 1.5 certification. The move lets Homey speak the same language as Apple’s Home app without a translation layer.

The Homey Pro mini packs the same processor as the full‑size hub but in a compact case. The Self‑Hosted Server runs on a Raspberry‑Pi‑class board and lets power users host automations locally. Both updates improve native device integration and cross‑platform bridging. Matter 1.5 adds support for energy‑reporting devices and a richer set of data points. Homey can now expose power consumption to the Home app, a feature that mattered to early adopters who track electricity use.

For developers, the certification removes a previous pain point. They no longer need to write separate code paths for HomeKit and other ecosystems. The Homey SDK now generates a single Matter‑compliant descriptor. That reduces maintenance overhead and speeds up time‑to‑market for new device handlers.

## Siram automates houseplant watering

Siram turns a forgetful watering schedule into a set‑and‑forget routine. You plug the kit into a water source, attach the drippers, and the app asks for a daily start time. The device then delivers the exact amount of water you programmed.

The kit includes multiple adjustable drippers, tee connectors, and two independent pumps. The pumps let you run separate schedules for succulents and tropicals. Wi‑Fi connectivity lets the app push updates without leaving the house. A history log shows how much water each plant received. The interface uses sliders for duration and frequency, so you can fine‑tune without a spreadsheet.

In practice the system feels like a low‑maintenance sprinkler. You set it once and watch the soil stay moist. The biggest win is the reduction in daily reminders. Users report fewer wilted leaves and more time for other tasks. The price point is modest, but the real value is the peace of mind.

## IKEA adds 21 Matter devices

IKEA announced a lineup of 21 new smart home products that speak Matter and work with Apple HomeKit. The range covers bulbs, sensors, plugs, and remote controls, all priced for the mass market.

Eleven bulbs come in E27/26, E14/E12, and GU10 sizes. Each size offers white and color‑changing versions. Lumen output ranges from 470 to 1,521, enough for task lighting or ambient glow. The bulbs dim smoothly and report energy use via Matter. Sensors include motion, air quality, humidity, and water‑leak detection. Four smart plugs add Matter connectivity, and the BILRESA remote offers a dual‑button or scroll‑wheel layout for on‑off and dimming actions. The GRILLPLATS plug turns ordinary lamps into Matter‑enabled devices.

All IKEA devices use Matter‑over‑Thread. Thread runs on the 2.4 GHz band and creates a mesh that improves range and responsiveness. On Apple’s side, the Apple TV, HomePod, and HomePod mini act as Thread border routers and Home hubs. The devices will ship in January of next year, though pricing remains unannounced.

The launch matters because IKEA brings Matter to a broader audience. Its retail footprint means many households will encounter Matter for the first time. The move also pressures competing brands to adopt Thread, tightening the overall ecosystem.

## Matter’s expanding role in HomeKit

Matter started as an industry‑wide effort to unify smart‑home protocols. Apple, Google, Amazon, and the Connectivity Standards Alliance back the spec. The goal is simple: a device should work with any certified hub without extra code.

Thread provides the low‑power mesh that Matter relies on for local communication. Apple’s HomePod mini and HomePod act as border routers, translating Thread traffic to Wi‑Fi for the Home app. When a device gains Matter 1.5 certification, it can report energy data and support richer scenes. That pushes the Home app beyond simple on/off commands.

Adoption is still uneven. Some manufacturers ship Matter‑only devices, leaving older hubs behind. Others, like Homey, add Matter on top of existing platforms. The result is a patchwork where certification matters more than brand loyalty.

## What to watch

Track how quickly Homey users migrate to the Self‑Hosted Server. Early adoption rates will indicate whether local hosting beats cloud‑only solutions. Siram’s sales figures and user reviews will reveal if automated watering can scale beyond hobbyists.

Watch IKEA’s January launch. Pricing and stock levels will show whether the company can move Matter devices at scale. Finally, monitor Apple’s next HomePod firmware update for Thread improvements. Those three signals will shape the next wave of HomeKit‑centric smart homes.