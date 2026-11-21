---
title: "Zero‑click iPhone hack forces Apple to patch Pegasus chain"
date: 2026-11-21T22:58:03.249Z
tags: ["ios","security","ns0","pegasus"]
hero_image: "/hero/2026-11-21-zero-click-iphone-hack-forces-apple-to-patch-pegasus-chain-28c950.jpg"
hero_image_credit_name: "Andrey Matveev"
hero_image_credit_url: "https://www.pexels.com/@zeleboba"
visual_keyword: "iPhone screen showing a malicious iMessage attachment with code overlay"
description: "Citizen Lab captured a live iOS 16.6 zero‑click exploit used by NSO’s Pegasus, prompting Apple to issue CVEs and confirm Lockdown Mode blocks the attack."
sources_count: 7
author: "priya-raman"
---

## The BLASTPASS chain hits iOS 16.6
Citizen Lab uncovered an active zero‑click exploit that delivers NSO Group’s Pegasus spyware to iPhones running the latest iOS 16.6.[^1][^2][^3][^4] The chain, dubbed **BLASTPASS**, injects malicious images via PassKit attachments sent from an attacker‑controlled iMessage account.[^1][^5][^2][^3][^4] The victim never touched the phone.[^1][^5][^2][^6] Apple responded with two CVE entries—CVE‑2023‑41064 and CVE‑2023‑41061—and a patch that ships to all iOS, macOS, and watchOS devices.[^1][^5][^7][^4][^8]

The discovery came while examining the device of a staffer at a Washington‑DC‑based civil‑society organization.[^1][^5][^2] The researcher reported the findings to Apple’s Security Engineering and Architecture (SEAR) team, who confirmed the vulnerability and collaborated on the fix.[^1] Apple’s rapid patch cycle and the confirmation that Lockdown Mode blocks the exploit were highlighted in the lab’s public statement.[^1]

## How BLASTPASS bypasses iMessage defenses
BLASTPASS exploits a flaw in Apple’s image‑rendering pipeline.[^6] A crafted image payload triggers an integer overflow inside the CoreGraphics library, allowing arbitrary code execution without any user interaction.[^7][^6][^4] The payload is delivered inside a PassKit attachment, a format that iMessage processes automatically for Apple Pay and ticketing use cases. Because the image is parsed before any sandbox checks, the overflow runs in the context of the Messages app, which has access to system resources.

The chain does not require a link or a button press.[^5][^6] Once the malicious iMessage lands in the inbox, the system parses the attachment, the overflow fires, and Pegasus installs its persistence modules.[^5] The exploit works on iOS 16.6, the most recent public release, showing that Apple’s mitigations—such as BlastDoor introduced in iOS 14—are no longer sufficient against NSO’s evolving toolkit.[^1][^2][^3]

## Apple’s patch and the role of Lockdown Mode
Apple issued CVE‑2023‑41064 and CVE‑2023‑41061 to cover the two variants of the image‑processing bug.[^1][^5][^7][^4][^8] The patches replace the vulnerable CoreGraphics code path with bounds‑checked logic.[^4] In parallel, Apple’s SEAR team verified that Lockdown Mode, a hardening feature introduced for high‑risk users, blocks the BLASTPASS chain by disabling the processing of PassKit attachments from unknown senders.[^1][^5][^2][^6]

Citizen Lab urged all users, especially those in high‑risk positions, to enable Lockdown Mode immediately.[^1][^5][^2][^6] The advisory also stressed that the update protects regular users, enterprises, and governments alike.[^1] Apple’s quick issuance of two CVEs and the public confirmation of the mitigation demonstrates a rare alignment between a vendor and an independent watchdog.[^1]

## The wider fallout for NSO and civil‑society defenders
BLASTPASS is the latest in a series of zero‑click exploits linked to NSO’s Pegasus platform.[^1][^5][^2] Earlier chains—FORCEDENTRY (CVE‑2021‑30860) and KISMET—targeted iMessage and WhatsApp without user interaction. The pattern shows NSO’s capacity to develop exploits that sidestep Apple’s hardened sandboxing.

The United States added NSO Group to the Entity List last month, barring US companies from selling to the firm. The move followed years of reports tying Pegasus to the hacking of journalists, activists, and NGOs. Citizen Lab’s capture of an in‑the‑wild exploit underscores how civil‑society groups remain prime targets despite diplomatic pressure on NSO.[^1]

The discovery also raises questions about the economics of “access‑as‑a‑service.” By selling zero‑click capabilities to governments, NSO expands the attack surface for state‑backed repression. Each successful capture fuels further research, forcing vendors like Apple into a reactive patch cycle that can never fully close the gap.

## What to watch next
Track Apple’s next security update cycle for any follow‑up CVEs that address related image‑processing paths. Monitor whether Lockdown Mode adoption climbs among NGOs and journalists, as usage data could signal heightened threat awareness. Finally, watch for any legal or regulatory action against NSO following the Entity List addition, especially any export‑control cases that could limit the distribution of zero‑click exploits worldwide.

[^1]: [citizenlab.ca](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_H6hSC3PBHnoECNJ7QFwOd1u7cOk4kFhbGRCypMMyUoBOz710LvWz70IZwQNnw1rFaCAkxL4NSjr-eABVhI49892g4rTqT6Y3Sfe4h3kzXQDV5PuqR7xUD9No6rWsQrwYr96El4NbpBr0BxzLWX1qpuwJ6LrHtHxsxYBVr3FgMKnjAxLmHrLET6aiBHlIViubDdh7cdGSoDwu3vTH)
[^2]: [gizmodo.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHna8Q-Ay5bpuGSFg8lEtup2uBt-K9DwRzBI3ALiQ9jrpiNhYJXdhcA7vXA5XcugNf3__wuBUAr330uMNCPz8Zvf9LbHWgi_QQiMXeryTpMgjQIIs0CFU9W5BWZjGr-0nR0h1kEbxFAhBzkAldHJpk25PeQEjF_2wpSo2ZU5rt2ObWNOBXG2A82DHA=)
[^3]: [schneier.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQETcvfiZ4VyXYaXhXJuLdrDdQq_6r3CwP522GcQsb9y_qyrHnESQnBiow0pYoRqp15hWr9v7LaDaVeq5aaAXscazQtw2P5-sZfu5KV5SNQ3-f2L0KE9v7bXZMpGiBRglCuaDFcqbYZUiULxWYK1y03pV_b6NMwWVB8Rljq5c9x-PKH7JmV2A8LFTT6nuA==)
[^4]: [europa.eu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQExN__sR8e8kcAJ_ra9fC6UI88iLZA_oLLlsS-8QHM-YBsh0rei3x1SFZ-JeNIlTVIusRHh89-gnpUZUyd4wn-vlKnZPQotTEy00evz-pVCRxk3emQ42LzVJHa80Xe_Xfr1Yhi_dYfQj5rcD3u7-VmL231M8xsdkcDoYAAl)
[^5]: [digitalstakeout.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEdW1pKzZHTq1wAs62qlfCbjn8N7_F-lH7TpePqKE8C4xOKHgAlzmy7ytex42yYyFyeoyggz43PaAC5KaNVuKu40I6Fi9Fcrz-N2-Cv-es7xWj7NytQFmYsaOsV0Apia9u5qImsX265GiLX4TYQbfLLiTGHvbbYUjK0mw==)
[^6]: [tripwire.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHDXbXtt4yWxroAm_F6USKm5JZk9SxYpm3zWJSSktyEvKBj0KJVhBvcRXW4a3KpwgTHaWP6A0QCfIlG8bXMyRIlxwKDNdH9ryWZZT8-fSVCs2mqxYRfhvj0g3Tovojb-55lgnn16giFTaYlsCIOg3A9BUoGziwWrHDuVrmcGKcmG5zZZvotJ8_SWgB_9Md-j0rcL8yURXLDYz2r90raotPq-IqQCKM=)
[^7]: [helpnetsecurity.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF38KPTwneaYsNOmMrig6XBeJtJFoikJRUsDavnVRuPdCjGUdwoW5KbNuMYDL5egoGT6Xrftn_uLMHnHhMKmzlkAYz03GGiXwtckG0SViquP5oTQUJjUESz7SXj0vpdoFPmCXwZQbdeX5Yyt_h9rJEcYGVQx7eEUQCsWXoyNKdTGtln0uI=)
[^8]: [ucla.edu](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCAroNynzReq_QcHims3PaFz9Vhp86b4BNFdN8wiv1GEeyhszeSSTwpRdu16MtNW07SmnNJlrslmLIs5VRYLqAyAOXVZpWfR4z4cBh5YTVJPac0hhm-avDzQ5OOyeu4kThafbPb42mpU4pmI2ChXLyuJzqZ7pyEnzaHp0B4PP4a1j7EUhSCAJdGvhQ7JOLOVRGFlLj9yeIR8Opsj_kM4P-LKe5-eWOqFbqdsVd7BTLX-KAbHTmzQ==)
