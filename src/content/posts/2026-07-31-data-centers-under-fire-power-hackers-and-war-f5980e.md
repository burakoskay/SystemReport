---
title: "Data Centers Under Fire: Power, Hackers, and War"
date: 2026-07-31T17:49:46.455Z
modified_date: 2026-08-18T10:22:30.130Z
tags: ["cloud","cybersecurity","geopolitics","data-centers"]
hero_image: "/hero/2026-07-31-data-centers-under-fire-power-hackers-and-war-f5980e.jpg"
hero_image_credit_name: "SpaceX"
hero_image_credit_url: "https://www.pexels.com/@spacex"
visual_keyword: "satellite view of burning data center roof with desert horizon"
description: "SpaceX’s new plant, a Kremlin‑backed Exchange hack, and Iranian strikes expose the fragile foundations of today’s cloud infrastructure."
sources_count: 5
audio_path: "/audio/2026-07-31-data-centers-under-fire-power-hackers-and-war-f5980e.mp3"
audio_bytes: 614027
author: "elena-marchetti"
audio_mime: "audio/mpeg"
---


## A Night of Flames Over the Desert

Satellite feeds this week showed a fresh plume of orange over a Saudi oil refinery and a second blaze licking the roof of an Amazon Web Services campus in the Middle East. The images arrived alongside a press release from SpaceX announcing a new power plant for xAI’s Colossus data centers. The same week, security researchers warned that a high‑severity flaw in Microsoft Exchange was being weaponised by Kremlin‑linked actors. Together, the events illustrate how physical, cyber and geopolitical forces converge on the same concrete slabs that host the world’s digital services.

The SpaceX plant is intended to power xAI’s Colossus clusters, yet the company disclosed that existing turbines—installed without permits—will remain for “many more months.” The delay means the data centre’s carbon footprint and regulatory exposure stay high while the new plant ramps up. At the same time, the Exchange vulnerability lets attackers retain access after password changes and even full disk re‑imaging, a persistence level that makes traditional remediation ineffective. Iran’s repeat strikes on AWS facilities underscore a new risk vector: state actors targeting the physical backbone of cloud services.

## The New Power Plant at Colossus

SpaceX’s involvement in data centre power is not new; the firm has long supplied launch‑site electricity. This time, the contractor is building a dedicated plant for xAI, the AI venture co‑founded by Elon Musk. The plant will replace a set of turbines that were erected without the required local approvals. According to the TechCrunch report, SpaceX will not dismantle those turbines for “many more months.” The delay keeps the centre reliant on equipment that may not meet emissions standards or safety inspections.

The decision to keep the turbines mirrors the 1973 oil shock, when governments kept outdated refineries online to avoid sudden supply gaps. In both cases, short‑term continuity trumped long‑term compliance, creating a liability that regulators can later enforce. For xAI, the liability is two‑fold: environmental scrutiny and potential fines for operating unpermitted hardware.

## A Server Flaw Exploited by the Kremlin

Ars Technica reported that a “max‑severity” flaw in Microsoft Exchange is being actively exploited by hackers linked to the Kremlin. The vulnerability grants persistent server access that survives credential rotation and even full disk re‑imaging. In practice, an attacker can embed a backdoor at the kernel level, re‑establishing control after any standard cleanup.

The persistence is reminiscent of Operation Ivy Bells, where the U.S. Navy installed a listening device that remained hidden for years despite routine maintenance. Here, the backdoor survives the very processes designed to wipe it, forcing organisations to rebuild servers from trusted images or replace hardware entirely. The exploitation underscores a shift from opportunistic ransomware to state‑backed espionage that targets the administrative layer of corporate IT.

## Geopolitical Strikes on Cloud Infrastructure

Iran’s latest attacks on AWS data centres, confirmed by satellite imagery, mark a departure from previous cyber‑only campaigns. The burn scars visible over the facilities suggest kinetic damage, likely from missile or drone strikes. The same imagery also captured fires at a Saudi oil refinery, indicating a broader strategy to disrupt both energy and digital supply chains.

Historically, the 1996 Telecom Act opened the U.S. market to competition but also exposed the network to new forms of sabotage, as deregulated carriers struggled to protect shared infrastructure. The current wave of physical attacks on cloud sites echoes that era: as the internet’s backbone becomes a strategic asset, it also becomes a battlefield. The attacks raise questions about the resilience of data centres that sit in politically volatile regions.

## Community Resistance to Data Centers

Engadget’s guide on “how to fight a data centre” outlines three common grievances: noise, utility costs, and pollution. Residents near a proposed site can lobby for stricter zoning, demand renewable‑energy offsets, or organise legal challenges against unpermitted equipment. The guide notes that community pushback can delay construction for years, a fact that aligns with SpaceX’s turbine delay.

The pattern mirrors the AT&T breakup of the 1980s, where local opposition to monopoly infrastructure forced regulators to impose divestiture and foster competition. Today, community groups wield similar leverage, especially when data centre projects threaten local air quality or strain power grids. Their tactics—public hearings, petitions, and media campaigns—add a layer of political risk that investors must factor into project timelines.

## What to Watch

Regulators in the jurisdictions hosting xAI’s Colossus plant will soon decide whether to enforce the removal of the unpermitted turbines. A ruling that mandates immediate dismantling could force SpaceX to accelerate the new plant’s commissioning or face penalties. Meanwhile, security teams must verify whether their Exchange servers have been compromised by the Kremlin‑linked exploit; detection tools that surface persistent kernel hooks will be essential. Finally, satellite monitoring of AWS facilities will likely become a standard intelligence feed for both insurers and nation‑state analysts, as physical strikes on cloud assets move from speculation to documented reality. The convergence of power‑grid compliance, cyber persistence, and geopolitical targeting will shape the next wave of risk assessments for any organisation that relies on cloud infrastructure.

## Updates

- **2026-08-18** — The Benchmarkpocalypse ([source](https://danluu.com/benchpocalypse/))
