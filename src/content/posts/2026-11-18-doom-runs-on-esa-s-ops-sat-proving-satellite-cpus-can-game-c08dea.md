---
title: "Doom runs on ESA’s OPS‑SAT, proving satellite CPUs can game"
date: 2026-11-18T09:45:41.003Z
tags: ["doom","satellite","software","space","opensource"]
hero_image: "/hero/2026-11-18-doom-runs-on-esa-s-ops-sat-proving-satellite-cpus-can-game-c08dea.jpg"
hero_image_credit_name: "Dan Butler"
hero_image_credit_url: "https://www.pexels.com/@danbee"
visual_keyword: "satellite interior with retro game graphics overlay"
description: "Developer Ólafur Waage ports the classic FPS Doom to ESA’s OPS‑SAT, exposing the limits and possibilities of onboard satellite computing."
sources_count: 3
author: "ryan-tanaka"
audio_path: "/audio/2026-11-18-doom-runs-on-esa-s-ops-sat-proving-satellite-cpus-can-game-c08dea.mp3"
audio_bytes: 564079
audio_mime: "audio/mpeg"
---

## Doom in orbit

A first‑person shooter from 1993 booted up on a real satellite last December. Ólafur Waage, a senior software developer originally from Iceland and now based in Norway, got Doom running on the European Space Agency’s OPS‑SAT laboratory in orbit. The feat shows that a modest ARM dual‑core Cortex‑A9 can execute a classic game even when stripped of graphics hardware.

Waage demonstrated the game a few days after Christmas 2023, after testing the same binary on the ground. He credited fellow developer Georges Labrèche and the broader ESA team for making the port possible. OPS‑SAT, described as a “flying laboratory,” was decommissioned in 2024, but its brief life proved a point: onboard computers can handle more than telemetry and attitude control.

## The hardware behind OPS‑SAT

OPS‑SAT carried an experimental computer roughly ten times more powerful than the typical spacecraft processor of its era. The board ran an ARM dual‑core Cortex‑A9, a chip that, while common in consumer devices, is a rarity in radiation‑hardened space hardware. The satellite’s mission was to demonstrate “drastically improved mission control capabilities when satellites can fly more powerful onboard computers,” according to ESA officials.[^7][^5][^2][^6]

The computer ran Ubuntu 18.04 LTS, the last long‑term support release that could still be built for the platform. Waage chose Chocolate Doom 2.3 because its libraries matched Ubuntu 18.04’s package set. The operating system and the game together formed a lightweight stack that could survive the limited update bandwidth of an orbiting platform.

## Porting challenges and performance

Porting Doom to OPS‑SAT was a test of pure portability. The game’s source has been open‑sourced since 1997, and its C code is straightforward. Waage noted that “Doom is relatively straightforward C with a few external dependencies,” which made it a natural candidate for a spacecraft where uploading new binaries is costly.[^2]

The biggest obstacle was the lack of dedicated graphics hardware.[^3] All rendering had to be done in software on the ARM cores.[^3] Even after optimization, the frame rate was low by modern standards, but it was functional. The absence of a display meant the game ran headless; telemetry streamed the frame buffer back to ground stations for observation.[^3]

Waage also highlighted the difficulty of updating software in orbit.[^2] The satellite’s firmware could not be patched frequently, so the port had to be as self‑contained as possible. Chocolate Doom’s modest dependency tree helped keep the code footprint small, allowing the entire game to fit within the limited storage allocated for experiments.[^2]

## Why it matters for satellite computing

Running a classic PC game on a satellite is more than a novelty. It proves that a spacecraft can host a general‑purpose compute environment capable of handling non‑mission‑critical workloads. That flexibility could lower the barrier for on‑orbit data processing, machine‑learning inference, or autonomous decision‑making.

The OPS‑SAT experiment also challenges the industry’s risk‑averse culture. Multi‑million‑dollar spacecraft often ship with proven, low‑performance processors to avoid failure. Waage’s demo suggests that a modest performance boost—tenfold over the norm—does not automatically translate into higher risk if the software stack is well understood.[^7][^5][^3][^2][^6]

European regulators have long emphasized sovereign control of space infrastructure. Demonstrations like Doom in orbit give Europe concrete evidence that its own satellite platforms can run sophisticated software without relying on external vendors. The experiment aligns with the broader push for home‑grown space capabilities.

## What to watch

ESA plans to field the next generation of “flying laboratories” with even more capable CPUs.[^7] Track the upcoming ESA payload announcements for processors that exceed the Cortex‑A9’s performance, especially those that support hardware‑accelerated graphics. If future missions start running more demanding workloads—such as real‑time image classification or edge AI—the lessons from OPS‑SAT’s Doom port will become a reference point for software‑update strategies and risk assessments.

---

*Tags: doom, satellite, software, space, opensource*

[^1]: [tomshardware.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF1bF_U7ZSmAEh5FcNPahqHnS9Sor1YXZqG4y_r_enAawDAYn0ydxEdq3iDlBsnqD7UAawQKS4J9S7a0JhF3P9IHraEsRU8qtfz2no9KQt5ox-ay5P89PsnzMkGBB9XPFUd0lznArwgCUo-cQEb5BDpdPYCV4yEyUap6hjBpbdRO0qfpwUcaldoeKiIa7Xk50MGBtcVNymK1jZ4IzpHvyCdmOVQmq-3qqgYFZzCQ3Pbhw6LzdVU0QKee2LeLYMDqOSIfrkcTGEBi9x8Sl582ACKLq52G8IOQzCPwgNshkpO2IhkdhQN2gZvKTkCAFEQax4c9qs45ngGqbflpkNEujP380Vc6m2TZfzmye2OVVvgc7Y=)
[^2]: [zdnet.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFNbCGAgmBGNd_DeguPtXtpXGIy0BZldDGKg_NMt-rGqDltQeHMMwNIlpf3Zi5pdqPLHbc94U7gkpFBKdhi_-QkUN-20I47O1Cn3xwqmi-SfhFt9mhHczciToZI1WDqV6rFwfqxJ3ahxULD2Skmb5MciupK3NLt8LO_9ZGcynrVP7JJUEWzXEv8w5mR6iIZ_9_QVg50iiVqVxgXU5vo_b3L6zqsPMg=)
[^3]: [futurism.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHJ85zrkHONe3eme6_SU9pXacy4PUg9y2iUqhBY2vpJ5WwpgPGpwPhO0HYJNX4uQcvIxdekDGdp_HjWp2veEqONfqKAQPU4PvTEuSGe5JIA0BGmOPZz6Va2woghBHXq-0yKEoGZgjYxrTEH4cx8yg==)
[^4]: [eoportal.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFWPN_otP-EaphIXcFwy9jVopuVQKnzwmbjrdHA-iD3r03zkZQJejpCCItVvsx8K_q5PjXLtthe9GMnC-qMt4ziyIfRZhGvV0a8XmTOCOb_wkF6vqipZgl1rLHvqH-Ri82e6QP9N0IXr_d4Xlsu)
[^5]: [esa.int](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGfKqkaTgYUpM03PLP2ZGLZHp0xTU2T2Tardql6CLGHw0ClZ9y62bIvQBtHpePl6QbKCuJ77VQkQA9hcswj7ddBc--5gb3iz37_EfzWsXV0opQOzZ4DU-n_RPIIiMFixsjhtR_7UzScuCejuFmWE0lMEg==)
[^6]: [esa.int](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQET2FUHy0NCQHO_fOZ_j8WCC1a0qUHoGKLVl_Lu4ryfX6J9i6G9L1Y1Nl2d0MgArv3rNpMZNxqXylRSrEtyuO3auBv8vge0suIYQwsgvUQW7Lgeqe8jM0dqNVW9kZI-)
[^7]: [wikipedia.org](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFdvejiowoSZFEuhl403SC-wFZjYwajqBcKiYY0umAqZ5qaESTjIF2om63_0cZHZqSerkxZnvwFgSeGRyTyOXEQkRq6CDcqtOId4g8ACB-bbiBIIZ6PvU7Z982WTGSzgw==)
[^8]: [esa.int](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGvJD0t67leUv8EDnsGA2r6Xh7hZmCWiie4JvQJylY2Cztc7jlAsj0FUsKZgctld_c2B7kBAqVz76aNEL-R6DfJYELqVn3T50l8DRyYjCmS_pHXC9uBX-YP8-BaNwtW0wzwBznNhncUvj_0HkBP14PergND0cAIqSCs8EGUlrSudmHxlH_nrMN0qs72EDnwIl9hi5T22ClFL80M6i_UkvgxgsyFwGJLmUCras_yu7DQ)
