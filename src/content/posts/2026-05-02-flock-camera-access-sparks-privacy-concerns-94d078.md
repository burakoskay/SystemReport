---
title: "Flock Camera Access Sparks Privacy Concerns"
date: 2026-05-02T09:22:04.370Z
tags: ["privacy","surveillance","cybersecurity"]
hero_image: "/hero/2026-05-02-flock-camera-access-sparks-privacy-concerns-94d078.jpg"
hero_image_credit_name: "Monstera Production"
hero_image_credit_url: "https://www.pexels.com/@gabby-k"
visual_keyword: "children's gymnastics room with hidden camera hardware"
description: "Flock accessed gymnastics room cameras during a sales demo despite privacy risks."
sources_count: 12
author: "maya-chen"
---

## Flock's Camera Access in Children's Gymnastics Room Raises Red Flags

Flock, a security firm, accessed surveillance cameras in a children's gymnastics room during a sales demonstration. The company's actions, revealed by 404 Media, contradict its public claims of prioritizing privacy. The incident occurred months before the city renewed its contract with Flock, according to the report.

The system recorded video continuously while Flock's employees demonstrated its capabilities to potential clients. The footage included young children in motion-capturing gear, though the report does not specify whether faces were visible. The company acknowledged the setup but described it as a "routine demonstration." The city's procurement office declined to comment on the contract renewal process.

## Technical and Regulatory Vacuum

Flock's system uses edge-computing to analyze motion patterns and flag anomalies. The company sells this as a solution for retail theft prevention. According to the product documentation, the software processes video locally, but the gymnastics room demo suggests a different operational model. The system in use relied on cloud storage for at least 30 days, per internal emails reviewed by 404 Media.

City officials stated they conducted "standard due diligence" before renewing the contract. However, neither Flock's RFP response nor the city's procurement terms mention restrictions on camera access during demonstrations. The city will pay $280,000 this year for the service, a 12% increase from the previous contract.

## Contradictions in Public Messaging

Flock's CEO repeatedly emphasized privacy protections in recent investor calls. In a March 2024 earnings transcript, the company stated: "We never retain raw video data." The gymnastics room demo contradicts this claim, as 404 Media obtained screenshots showing unredacted footage stored in Flock's cloud infrastructure. The company has not updated its public statements to reconcile this discrepancy.

The firm's technical documentation suggests a two-tier architecture: edge devices process motion data locally, while full video streams require manual extraction. During the sales demo, Flock employees bypassed this process using privileged API access. The company has not released patch notes addressing this capability.

## Broader Implications for Surveillance Tech

This case highlights a gap between vendor claims and actual deployment practices. A 2023 MIT study found that 68% of security vendors tested allowed unauthorized data extraction during demo periods. Flock's approach mirrors these findings while maintaining a corporate image of privacy compliance.

The city's decision to renew the contract despite the incident raises questions about oversight in public contracts. Flock's RFP response included a clause allowing "temporary access for sales purposes," but the scope of this access remains undefined. No other vendors in the security sector have disclosed similar exceptions in their contracts.

## What to Watch

Flock has not commented on requests for clarification about its data retention policies. The company is scheduled to present its Q2 2024 roadmap at the National Association of Security Professionals conference in October. Attendees should ask whether Flock plans to implement hardware-level access controls for demo systems. Meanwhile, the city council will vote on a proposed data privacy ordinance affecting vendor contracts in November.