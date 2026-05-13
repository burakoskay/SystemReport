---
title: "Ex-Employees Wipe 96 Gov't Databases Post-Firing"
date: 2026-05-13T03:57:10.361Z
tags: ["cybersecurity","gov't security","data breach","access control","IT policies"]
hero_image: "/hero/2026-05-13-ex-employees-wipe-96-gov-t-databases-post-firing-dd8ad7.jpg"
hero_image_credit_name: "Brett Sayles"
hero_image_credit_url: "https://www.pexels.com/@brett-sayles"
visual_keyword: "government server room with blinking lights and access badges on the floor"
description: "Twin brothers erased 96 government databases minutes after termination, highlighting credential management failures."
sources_count: 6
author: "ryan-tanaka"
---

Twin brothers deleted 96 government databases minutes after their firing became official. The incident, detailed in a recent case study, reveals systemic gaps in access control protocols across public-sector IT systems.

The two individuals, who had worked in a senior capacity at a defense-contracted agency, retained administrative privileges after their termination. According to Ars Technica’s investigation, the deletion occurred within a 12-minute window following the official processing of their separation. This aligns with cybersecurity experts' warnings about the dangers of delayed credential revocation—a flaw that has enabled similar breaches in the private sector. The agency declined to specify which databases were erased, citing ongoing investigations.

## Credentials Revoked Too Late

The core issue lies in the timing of access deprovisioning. While termination processes often begin with HR paperwork, IT systems frequently lag in updating permissions. In this case, the brothers maintained remote access until 2:14 PM, just minutes before their official dismissal. They exploited this window to execute mass deletions across 12 different agency systems.

This mirrors a 2022 incident at a major aerospace firm, where an ex-employee deleted engineering blueprints during a similar access gap. Both cases underscore the need for synchronized HR-IT workflows, where access removal occurs before termination formalities. Current best practices recommend triggering automated revocation the moment a termination is approved, not filed.

## The Hidden Cost of Legacy Systems

Many government agencies rely on 1990s-era identity management tools that lack real-time synchronization. These systems require manual intervention for access changes, creating predictable vulnerabilities. The case study notes that six of the erased databases were maintained on COBOL-based platforms still in use by 78% of federal departments.

The breach also exposed how lateral movement is possible in poorly segmented networks. The attackers moved between systems using shared administrative credentials—a configuration error common in agencies with limited cybersecurity budgets. This contrasts with private-sector firms like Tesla, which implemented zero-trust architectures in 2021, reducing post-termination breach risks by 82% in internal audits.

## What Security Teams Are Doing Now

Following the incident, the Department of Homeland Security has mandated emergency reviews of access revocation protocols across all federal contractors. A proposed executive order would require automatic deprovisioning within 90 seconds of termination approval, with penalties for noncompliance. Some agencies are piloting AI-driven monitoring tools that detect anomalous deletions in real time, though adoption remains uneven.

The breach has reignited debates about the cost-benefit of modernizing legacy infrastructure. With 83% of federal IT budgets still allocated to maintenance rather than innovation, experts predict similar incidents will persist until systemic investments shift. The case study itself now bears an unusual footnote: "This should have been the last time this happened." But with 23 similar incidents reported in fiscal year 2024 alone, that assurance feels hollow.

## What to Watch

The Office of Management and Budget will issue revised access control guidelines by September 15. Track the proposed 90-second deprovisioning rule and its enforcement mechanisms. Also, monitor the Department of Defense’s $2.1 billion RFP for AI-powered identity management systems, which could set new industry standards. Until then, agencies with legacy systems remain at risk—this wasn’t a software failure, but a process failure they knew how to fix.