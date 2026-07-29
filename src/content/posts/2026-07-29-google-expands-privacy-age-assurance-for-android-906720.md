---
title: "Google expands privacy age assurance for Android"
date: 2026-07-29T20:55:27.873Z
modified_date: 2026-07-29T22:56:53.903Z
tags: ["google","privacy","age-assurance","android","zkp"]
hero_image: "/hero/2026-07-29-google-expands-privacy-age-assurance-for-android-906720.jpg"
hero_image_credit_name: "Andrea Piacquadio"
hero_image_credit_url: "https://www.pexels.com/@olly"
visual_keyword: "developer using Android phone with age verification overlay"
description: "Google opens its Play Age Signals API, pilots U.S. age assurance, and releases zero‑knowledge proof tools to help developers protect under‑18 users."
sources_count: 5
author: "ryan-tanaka"
---


## Play Age Signals API goes global
Google rolled out the Play Age Signals API to every Android developer on the Play Store.[^1][^2][^3][^4][^5] The API lets apps request a user’s age range without collecting raw birth data.[^1][^2][^3][^4][^5][^6] Google positioned the rollout as a privacy‑preserving alternative to ad‑hoc age checks that developers have been stitching together for years.[^6]

The TechCrunch brief notes that the API is now available worldwide, not just in pilot markets.[^5][^7][^8] Developers can integrate the signal with a single SDK call and receive a coarse bucket—under 13, 13‑17, or 18+.[^2][^3][^6] Google promises that the signal never reveals exact dates, and it is derived from signals already present in the Play ecosystem.[^2][^3][^4][^5][^6] The move forces developers to choose between building their own fragile age heuristics and using a Google‑backed, auditable channel.

## U.S. pilot adds automatic safeguards
In February, Google announced a limited roll‑out of age assurance to a small set of U.S. users. The rollout targets accounts that Google can confidently flag as under 18. For those accounts, Google automatically flips on enhanced protections across its suite: YouTube Kids, Family Link, and default content filters.

The HN post explains that users identified as under 18 receive an email explaining the changed settings and a prompt for adults to verify the age if they wish to adjust them. The system blends age estimation with optional verification, so a user can prove they are over 18 without handing over a birth certificate. Google says the approach “does not involve collecting additional data or sharing granular user information with all apps and websites,” underscoring the privacy‑first angle.

## Open‑source zero‑knowledge proofs power EU compliance
Google also open‑sourced its Zero‑Knowledge Proof (ZKP) libraries under the name longfellow‑zk on GitHub. The release fulfills a promise made in partnership with Sparkasse, a German bank that helped shape the tooling for European age assurance.

According to the HN announcement, ZKP lets a user prove a statement—such as “I am over 18”—without revealing any other data. The codebase is intended for both private and public sector developers building digital ID solutions. Google frames the move as a response to the EU’s eIDAS Regulation, which takes effect in 2026 and encourages Member States to embed privacy‑enhancing technologies like ZKP into the forthcoming European Digital Identity Wallet (EUDI Wallet). By making the libraries public, Google hopes to accelerate that integration.

## Why the push matters now
The three strands—global API, U.S. pilot, and open‑source ZKP—signal a coordinated shift toward systemic age protection rather than isolated feature flags. Developers who previously relied on third‑party age checks now face a choice: adopt Google’s signal or risk non‑compliance with emerging regulations.[^6] The U.S. pilot shows Google is willing to test enforcement at scale before a broader rollout, which could set a de‑facto standard for how platforms treat under‑18 users.

Critics have warned that a single company controlling age signals could create a new data monopoly. Google counters that the signal is derived from existing data and never exposes raw birth dates.[^2][^3][^4][^5][^6] The open‑source ZKP libraries, however, give rivals a tool to build independent age‑verification flows, potentially diluting Google’s grip. The real test will be whether regulators accept the signal as sufficient proof of compliance or demand more transparent audits.

## What to watch
Watch for the next wave of Play Age Signals adoption reports from major app publishers. Google has said it will monitor the U.S. pilot closely before expanding, so any public metrics on false positives or user pushback will be telling. In Europe, the 2026 eIDAS deadline will drive Member States to embed ZKP into national digital wallets; the speed of those integrations will indicate how influential Google’s open‑source contribution becomes. Finally, keep an eye on antitrust filings that may question whether a single age‑verification pipeline gives Google undue market power.

## Updates

- **2026-07-29** — Google Play is expanding age confirmation tools for app developers ([source](https://www.engadget.com/2226632/google-play-is-expanding-age-confirmation-tools-for-app-developers/))

[^1]: [androidheadlines.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFi4F4zvj5GpDqYevLWty6RhuqgAXzEfbU9-vWHyvB0tsVWlQ5v11qIMBsOlYm5zYHfFwrLdS5Lz4PfA3zrQRmfaqLJVH7sjlxVJyBnQQH11IWjf6xOXPxwm5LLqsLgtT_Hp8GGq9wKCj16PrJ9folYVOPcA4BHc0s1uLJDpWnOTsNPjOQ8nvb42wOZ0aZWUapRXA3asAnWRJTeEQ==)
[^2]: [androidauthority.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHVbg2MO0QblW1V6MMKV-WwFhEErvIJWS-xXYld0DruRb0aqzL3JmVs4dZ0OYpiFcPn6XB_pnX8HqNxHzYv7A5WsYCbSyiSVNydwBz6ux3GSLYbXS-RV5BE1xUaX-yQOMLd_kEfiVNAxA6N0NwMQ-CM4BtF7094JqS7QvYw)
[^3]: [softonic.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFQu9Y0xFw0Oep4l5fHkYDy6G8ExUZx9OHOAcGfNGtciq-216Wl8o7zhTP9l8KvS-yb9NR-vEx9ulHCg1fNqUwXEgpNyUicW-_9tgiLSENvmksUeI5TE0_S8ZaY8CZLFMHm80diz4O2pwAavmT9kMBc7P2VCzyIGlJsVJiO-l1TlO5RWgFEYqh0ne9s0RGkS2nMSyc=)
[^4]: [whalesbook.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGy6iXYuMLMBz7kwHQ4Bf-L5ctMq02rmLnpLFIU5wuuv4fkVmXWQ2rWPorihEngWzb5NDacNLowvmoXOyS0hHP4gEn6YMUOTSoaXZUeXlklTmebFnp61SmYy1lhfKxDOBWboWGr4SZo49mMbnCNJI_DoT5DTeNoviE3vGAJKFtUCA6WM14ze9m-GaTx1ULQyF39BwmjHaztvfOgQU4phNtQTVoIDhUt7xFrAu3agcScAJMwLJYSNg==)
[^5]: [zamin.uz](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHIDP4YrGTXCpJmhB_AJjtrZExb7NLvDS-zkQh0PEjVNQs4_SfMxVs5RKQ5Oudnf3sp6KtcYGZG7f71phcU2kxT7wLPV9uyIy6np7HWWqevZbrxRZjWpuQ-UpgWxzc7ChnihoeZemvh4SHUjP3EtJwpcdc-a7hFeI_-cRUgBeggi8pwRxngoh8XcgGYqBmVhJ6PcplclsYwhEsGyEXbgD_yBlU=)
[^6]: [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGi6-SW8PEmzv1vS7rT348Zyb-L0VxdUyhGrnr97xJw-Q42ZXTgBusU0J27OktgKkAUITmMAEkoPqqsGsMpCZYAT2a8ACwg_qR1hEMyceQ0P3fL8ReXmPUE_qoypUBb_98WMaGd5ytBZMiJwjn9PRtdFm6efZwkMrNuWQuoq21HsupKfSQFNdYbzYieSpXyyiDUVtEcgiN1XCfktzxB-XorGLX2)
[^7]: [pressbee.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFHY5syRg-d11YCceA3dyTmWWtFB7h9tgIBmcQjIDENPqPQziEiaUYt6Zk79souMf5DGC6gDxurVjfz0WAWAxNfUyfpcUBNSUsLmlqWoapvZTkrhMxh9a4TLTP5IUzryk7bZVXZN43l3UBOztZxlaN0ITWnztrcCeJZVKaZnHyvfBYpCwLwvnPi0nnJJIk14To53R9gabq2cnTHjiZqfvsAKKUkKvTTLpfPqkFH)
[^8]: [pluang.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGxTRcD4BFgZqaAGs_CmA5Vjim1wNxyZTPAnQWwbgtH7G7thjywD9AD9y7-IXE1l75kDZ5U47Tiq8_c--4aEt6oc4-GxDAwb3e4MPUf2ImDjQg5lDnuUABW_zypHQ08lScTKHKs9HkyObey5-L1eTTJSvElvc89De1SmDlB3XNMe7L52a5RPD2kBW5rzfWOGHl2-rbpzF7wwIWII7U=)
