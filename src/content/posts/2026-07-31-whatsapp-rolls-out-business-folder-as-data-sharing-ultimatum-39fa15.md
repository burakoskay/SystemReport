---
title: "WhatsApp rolls out business folder as data‑sharing ultimatum"
date: 2026-07-31T16:07:53.303Z
tags: ["whatsapp","privacy","messaging"]
hero_image: "/hero/2026-07-31-whatsapp-rolls-out-business-folder-as-data-sharing-ultimatum-39fa15.jpg"
hero_image_credit_name: "Anton"
hero_image_credit_url: "https://www.pexels.com/@anton-8100"
visual_keyword: "smartphone screen showing WhatsApp chat folder icon"
description: "WhatsApp tests a folder for large‑business chats while demanding users share data with Facebook, sparking privacy and security concerns."
sources_count: 7
author: "ryan-tanaka"
---

WhatsApp is moving large‑business messages into a separate folder and, at the same time, forcing its two‑billion‑plus users to agree to broader data sharing with Facebook. The twin moves tighten the platform’s grip on commerce while eroding the privacy shield that once defined it.

The new folder will appear a few hours after a user receives a message from a "large business" and will automatically house those chats. The change arrives alongside an in‑app alert that gives users until February 8 to accept a revised privacy policy that lets Facebook share WhatsApp data across its family of companies. Users who reject the terms will lose access to the app.

## A Separate Inbox for Business Chats

WhatsApp’s test puts messages from large enterprises into a dedicated folder, isolating them from personal conversations. The feature is triggered automatically; users do not need to enable anything. After a message lands in the inbox, WhatsApp waits a few hours before relocating it. The move mirrors how email clients segregate newsletters, but the timing and automation are new for a messenger that has traditionally presented a single, flat chat list.

The rollout is limited to "large businesses"—a vague qualifier that the company has not quantified. By shuffling these chats, WhatsApp hopes to make it easier for users to manage promotional or support messages without cluttering personal threads. The folder also gives Facebook a clearer data boundary: business interactions can be processed on Facebook’s infrastructure, as the company has hinted in its policy briefings.

## The Data‑Sharing Ultimatum

In February, WhatsApp delivered an in‑app alert demanding that users consent to a sweeping revision of its terms of service. The revised policy states: "As part of the Facebook family of companies, WhatsApp receives information from, and shares information with, this family of companies. We may use the information we receive from them, and they may use the information we share with them, to help operate, provide, improve, understand, customize, support, and market our Services and their offerings."

The alert gives users until February 8 to click "Agree" or face a permanent lockout. The policy expands Facebook’s right to share collected data with its broader ecosystem, including third‑party businesses that users interact with via WhatsApp. The change follows a 2016 opt‑out option that let users prevent account data from flowing to Facebook; that option is now gone.

A WhatsApp spokeswoman declined to comment on the specifics of the new terms, offering only a conditional email response that cannot be quoted verbatim. The silence leaves developers and privacy advocates guessing about the exact data points that will be harvested and how they will be used in ad targeting or product development.

## A Hidden Security Trade‑off

While the folder and policy shift dominate headlines, a lesser‑known design choice in WhatsApp’s encryption stack also raises eyebrows. The app uses the Signal protocol for end‑to‑end encryption, but it implements a "non‑blocking" approach to key changes. When a recipient’s security key changes—say, after reinstalling the app or swapping phones—WhatsApp automatically re‑encrypts any undelivered messages and resends them without waiting for the sender to verify the new key.

The sender receives a notification only if they have enabled that setting. In contrast, the Signal app itself blocks delivery in this scenario, alerting the sender that the recipient’s keys have changed and leaving the original message undelivered.

Security researchers note that this convenience trade‑off could be abused. If an attacker steals a SIM card and inserts it into another device, the automatic re‑encryption could expose messages that were pending delivery. The risk, however, is described as remote: the attacker would need precise timing, and the volume of intercepted messages would likely be small. Experts argue that the feature improves everyday reliability for the majority of users, but it also undermines the absolute certainty that end‑to‑end encryption promises.

## Context: Regulation, Competition, and User Backlash

WhatsApp’s policy shift lands amid mounting regulatory pressure. A month before the February deadline, Apple began requiring iOS app developers to disclose the data they collect. The App Store now lists WhatsApp’s data collection practices, making the new policy more visible to users.

The messenger also faces competition from services that tout stricter privacy guarantees. Signal, for example, offers the same encryption engine with a leaner terms document—half the length of WhatsApp’s 8,000‑word legal text. Signal’s open‑source model and refusal to share data with a parent company have attracted users wary of Facebook’s track record.

User sentiment on platforms like Hacker News reflects growing frustration. Commenters criticize the lack of transparency and the forced consent model, urging users to migrate to alternatives. The backlash is not merely rhetorical; it translates into measurable churn as privacy‑focused users explore competing apps.

## What to Watch

The next few weeks will reveal whether WhatsApp’s business‑folder test graduates to a global rollout. Equally critical is the February 8 deadline: a spike in account deletions or a surge in alternative‑messenger downloads would signal a tipping point. Keep an eye on Apple’s App Store disclosures for any updates to WhatsApp’s data‑collection listing, and monitor regulatory filings that may force Facebook to clarify how business‑chat data is used across its ecosystem. The convergence of commerce, privacy, and security in a single messenger could reshape how billions of users communicate.
