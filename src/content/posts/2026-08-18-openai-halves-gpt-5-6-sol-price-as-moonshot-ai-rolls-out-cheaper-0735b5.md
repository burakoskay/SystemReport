---
title: "OpenAI halves GPT‑5.6 Sol price as Moonshot AI rolls out cheaper"
date: 2026-08-18T10:25:55.577Z
tags: ["ai","pricing","open-source","inference"]
hero_image: "/hero/2026-08-18-openai-halves-gpt-5-6-sol-price-as-moonshot-ai-rolls-out-cheaper-0735b5.jpg"
hero_image_credit_name: "panumas nikhomkhai"
hero_image_credit_url: "https://www.pexels.com/@cookiecutter"
visual_keyword: "data center with AI servers and price tags"
description: "OpenAI cuts GPT‑5.6 Sol fees by 50% while Moonshot AI launches Kimi K2.5 and K3, models that beat GPT‑5 on reasoning and bring trillion‑parameter open‑source to the market."
sources_count: 3
author: "ryan-tanaka"
---

OpenAI announced a 50 % price cut for its GPT‑5.6 Sol model, and Moonshot AI responded with two new releases that undercut the incumbent on both cost and capability. The moves tighten a pricing battle that could reshape where developers run their most demanding workloads.

The price reduction was posted on Hacker News under the headline “GPT‑5.6 Sol Pricing Cut by 50%”[^1]. The same forum also highlighted Moonshot AI’s Kimi K2.5, a model that “beats GPT‑5 on reasoning” and introduces an “Agent Swarm” orchestration layer[^2][^3][^4][^5][^6]. A separate Hacker News thread announced Kimi K3, a 2.8‑trillion‑parameter open‑source model now available through Telnyx’s inference API[^7][^8].

## OpenAI’s half‑price gamble

OpenAI’s decision to halve the cost of GPT‑5.6 Sol is a direct response to mounting pressure from cheaper alternatives. The cut brings the per‑token fee down to an undisclosed level, but the headline alone signals that the company is willing to sacrifice margin to keep volume high. For developers who already pay per‑token, a 50 % reduction can turn a marginally profitable use case into a break‑even or profitable one.

The move also forces competitors to justify higher fees with tangible performance gains. OpenAI has not published new benchmark numbers alongside the price change, leaving the community to wonder whether the cut reflects a genuine efficiency gain or a defensive tactic. Either way, the pricing shift will likely accelerate migration experiments, especially among startups that can’t afford runaway API bills.

## Kimi K2.5’s agent swarm and price advantage

Moonshot AI’s Kimi K2.5 arrives with a claim of beating GPT‑5 on reasoning while costing five times less[^2][^4]. According to the Hacker News post, the model can orchestrate up to 100 parallel agents, allowing a single request to spawn dozens of sub‑tasks[^2][^3][^4][^5][^6]. The post gives the example of asking the model to “analyze 50 competitors” and having it launch 50 research agents simultaneously[^2].

Pricing for K2.5 is laid out in concrete terms: direct usage costs $0.60 per 1 M input tokens[^2][^3], but a Gold Plan priced at $30 delivers $90 worth of compute. That works out to an effective $0.20 per 1 M tokens, a rate the post describes as “unparalleled in the industry”. The plan also includes a “Credit Multiplier” that inflates API credits, making the model attractive for heavy‑weight workloads that would otherwise generate costly token loops.

The model’s OpenAI‑compatible endpoint means migration is a simple key swap. Users can upload a screenshot and receive pixel‑perfect React / Tailwind code, a feature highlighted in the announcement[^2][^3][^4][^5]. The post emphasizes that the switch from OpenAI to RouterLab + K2.5 is “trivial”, positioning the offering as a low‑friction, high‑value alternative for teams already familiar with OpenAI’s API shape.

## K3 pushes open‑source into the trillion‑parameter arena

Moonshot AI’s flagship Kimi K3 is billed as the world’s first open‑source model in the 3‑trillion‑parameter class[^7][^8]. The model packs 2.8 trillion parameters, runs on a 1 M‑token context window, and includes native vision capabilities[^7][^8]. Its architecture builds on “Kimi Delta Attention” and “Attention Residuals”, technical details that differentiate it from earlier open‑source releases[^8].

Benchmark claims place K3 on par with closed‑source frontier models from Anthropic and OpenAI for coding, reasoning, and agentic knowledge work[^7][^8]. The post frames the achievement as evidence that “the model side of the AI competition is solving itself”, suggesting that open‑source projects can now match proprietary offerings without sacrificing performance[^7].

K3 is hosted on Telnyx‑owned GPU infrastructure and accessed via an OpenAI‑compatible API[^7][^8]. The availability through Telnyx’s Inference API means developers can tap into the model without building their own hardware stack, echoing the broader industry trend of abstracting compute behind managed services.

## Industry implications and what to watch

The simultaneous price cut from OpenAI and the launch of two Moonshot AI models create a three‑way tension: cost, capability, and infrastructure control. OpenAI’s lower fees may retain price‑sensitive customers, but K2.5’s agent swarm and K3’s trillion‑parameter scale offer functional advantages that could lure workloads requiring parallelism or vision.

Developers will now weigh token economics against features like parallel agent orchestration and native image handling. The ease of swapping API keys—thanks to OpenAI compatibility—lowers the barrier for rapid experimentation, meaning we may see a wave of proof‑of‑concept projects that benchmark K2.5 and K3 against GPT‑5.6 Sol in real‑world pipelines.

What to watch next is OpenAI’s response beyond pricing. Will the company release a new model tier, adjust token limits, or introduce its own parallel‑agent framework? On the Moonshot side, the adoption metrics for K2.5’s Gold Plan and the volume of K3 requests through Telnyx will indicate whether the market is ready to shift from proprietary to open‑source giants. The next quarter’s usage reports from RouterLab and Telnyx will be the barometer for this emerging pricing‑performance equilibrium.

**What to watch:** OpenAI’s upcoming token‑pricing updates, Moonshot AI’s adoption numbers for K2.5’s Gold Plan, and Telnyx’s reported traffic to the K3 inference endpoint. These data points will reveal whether cost alone can tip the balance or if the functional edge of agent swarms and trillion‑parameter vision models will drive the next wave of AI infrastructure choices.

[^1]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHCxxfSkFy60ReohLDpVFvW1QtHrh83M_lYbfWRxUvFG0u8PM38eGr0oOzyYiyMNtZesCZYVb9mSVer8jbnLjerK-6joDc8QBFM-As6X5zTyh6Irt5c3lt8e-njS3Tr7kxOQLOaoIV8)
[^2]: [nxcode.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEFrHcWbKhjj8Gpw-PDEgozWgz6onZRNU5bP6hyt94iFR-jRDgDCXQd3g5K2WbIBbOkBIlXEPn02FyLqKJdChgjQ0B0bHLMv31vdI-MJWWA5IrJ1JC6sPmgLhroCLFY1GvRvyloT1qGLJGkixI6EMGsTG8u4T-UTX4Md7ugfg==)
[^3]: [codecademy.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGC56ldXNc_2ebLZwT7mlN7iRXOWWimiRU_HMjqI3uPWDQfg6Gdtb_iTPtlRv20VEPz19cUym6O3EfGU_WTXQAmMj01OokHA5oUJoc-MhS6MY7kxcXEHfvbB1vupU2AuLVvPM3G4YNWNpn2MLH6c7Mr04SHB0A0n_QNZXBzd8W_l5tr624SXDIuTHbbvQ==)
[^4]: [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEkjewOyx4XWbU7CpMnFWoUbZxynm54GQzRXX54qOuf0wxeVYwWrJxF0xaT23lANONVTRf_IxbYdkcAw5X-Zsb9bdB5qxXJxE3Npgswyex3nsbU__hDfcgUjIFt36ynKJ2ADaigSalfUgzd2rUgj8qSaa4qsLrM4_15SW0aCEZEQTrfSl5UBYgfN05Rd_8rmt1BpR-UXKHBQQ14L8URSMk=)
[^5]: [sqmagazine.co.uk](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFBD19aNk0ocbcDmTVGN1Z9CM9A0REI-XYqoszX-6LuNdkyXKYPTtzSjYOiiGVtaEnJtvsILmAkdcA_a9BzU0kaRrbnPeQxgol0TfSzzf_JNnC_5rCKn33Iw_WbDBuHr8op_EUff8wcLcrc3RJwqRHW5eJ1Dn45ULcONDXrl2fhMw==)
[^6]: [constellationr.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGkOsQIgbKvcArHuMJNxcSMSN7G7Kdweu4qloWdivZUaOsWZwZf4HZblIGuRENopVwasHO07xKRhqvfNrTx9Si1KOpBKEEXaKg12snZWBfwS5S_DyrDpItvu-RrTzBmskXcVpkVvI3lszhaI-qimTs0fgZaQvwf2xnpvCS6FHM9_Mnm5fpJMwMYAAx8X3ceJXPA7By4KkpCaibzXWcFbheKO3vAzrJVTLJDo4dIliAglJ9uaxq5-A==)
[^7]: [telnyx.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFTvU-kblkPR9vKUa-iWJXA0nwrWJoUv0Ns31LfAHgAkZbjFBcNicHAJda1NR82DWEkDh9YOH-lcsDBvyMMoCMtyfAgatrZhe2vnw50XBvmiU1S0sVpJccW7PwTvNQAITSf5_lYLEe0xuAxkFBvD87ahaW_NIJAcM5duQ==)
[^8]: [firecrawl.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEl7OrRCbMs-8d1rsaIdFCwq0wmYgbashzexTHoaZx282VXqRb7fHZ8gTp6fXR06T3fOwGjIseEwtZCQf149Fi7mSbERwCXTqcZzZ8dIBXWkNW-1uhZo085YREr-oHqvoY=)
