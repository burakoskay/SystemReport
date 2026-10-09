---
title: "OpenAI fires safety staff as Astra's opaque architecture raises"
date: 2026-10-09T16:49:37.015Z
tags: ["ai","safety","openai","research"]
hero_image: "/hero/2026-10-09-openai-fires-safety-staff-as-astra-s-opaque-architecture-raises-e24f05.jpg"
hero_image_credit_name: "Manuel Nielsen"
hero_image_credit_url: "https://www.pexels.com/@badboysoflex"
visual_keyword: "office hallway with empty desks and a dimly lit AI server rack"
description: "OpenAI dismisses three safety researchers and pushes a less transparent Astra model, sparking concerns about internal culture and oversight."
sources_count: 3
author: "maya-chen"
audio_path: "/audio/2026-10-09-openai-fires-safety-staff-as-astra-s-opaque-architecture-raises-e24f05.mp3"
audio_bytes: 567842
audio_mime: "audio/mpeg"
---

OpenAI terminated three AI safety researchers on Friday, citing a breach of trust. The dismissals sparked an open letter from the trio warning that the action could chill internal safety work.

OpenAI said on X that Jasmine Wang, Tomek Korbak and Mikita Balesni were removed for violating clear policies on handling sensitive information. The company framed the move as unrelated to the researchers’ recent public comments about AI safety. The Verge reported that the statement was a direct reply to the open letter the three published on Thursday, in which they demanded transparency about the decision.

The letter, reproduced by TechCrunch, argues that the firings send a chilling signal to staff who raise safety concerns. The researchers claim OpenAI’s internal culture already pressures employees to stay silent on risky developments. They contend that the lack of due process and vague policy language undermines the trust needed for rigorous safety work. The trio did not receive a detailed explanation of the alleged policy breach, they wrote.

OpenAI’s response emphasizes procedural compliance. In its post, the company repeated that the three “committed a significant breach of trust” and that the action was taken after an internal investigation. No specific incident was disclosed, and the firm declined to comment on whether the researchers’ external advocacy influenced the outcome. The statement avoided any admission that the dismissals were retaliation, aligning with OpenAI’s pattern of framing internal disputes as policy matters.

The timing of the firings coincides with OpenAI’s preparation to launch Astra, its most powerful model to date. Astra’s release has already been delayed, with the company announcing on Tuesday that it would postpone deployment to address safety gaps. The Information, citing an unnamed source, says Astra relies on a “recurrent depth” or looped transformer architecture that hides much of the model’s internal reasoning from external observers.

Traditional transformer models expose a chain of thought that researchers can monitor for misbehavior. By cycling information through internal layers before producing an output, the looped transformer reduces the visibility of that chain. The Information’s source suggested that this opacity could boost performance but makes it harder to detect deceptive or unsafe actions. OpenAI’s blog post acknowledged the architectural change and promised “additional chain‑of‑thought monitoring to rapidly detect and contain potentially misaligned actions,” but did not detail how the monitoring would compensate for reduced transparency.

Safety experts have reacted sharply. Redwood Research’s chief scientist Ryan Greenblatt, who was granted limited access to investigate a recent Hugging Face hack, called the architectural shift “the single worst development for AI security/safety to date.” Greenblatt warned that the reduced observability could let models devise strategies that evade existing safety nets. He echoed a broader fear that competitive pressure will push developers toward increasingly opaque designs, creating a “race to the bottom” on oversight capability.

The concern is not purely academic. Chain‑of‑thought data has been a cornerstone of recent safety audits, enabling automated systems to flag when a model appears to be planning harmful actions. If a model’s reasoning is compressed into internal loops, those audits lose a critical signal. Researchers worry that the industry may adopt similar techniques to squeeze marginal performance gains, eroding the collective ability to audit and intervene. The open letter from the fired researchers adds a human dimension to that risk, suggesting internal dissent may be stifled before it can surface.

OpenAI’s dual challenges—managing internal safety culture while deploying a model with reduced transparency—highlight a tension that has grown across the AI sector. Companies have long balanced the lure of performance improvements against the need for interpretability. Recent incidents, such as the Hugging Face vulnerability and the broader “AI race” narrative, have amplified calls for standardized safety protocols. Yet the lack of external regulation leaves firms to set their own rules, often favoring speed over oversight.

The broader industry has begun to respond. Some firms are publishing model cards that detail architectural choices and monitoring strategies. Others are investing in external audit partnerships, hoping third‑party scrutiny can compensate for internal opacity. However, without a shared baseline for what constitutes sufficient observability, the risk of divergent safety standards remains high. OpenAI’s stance on Astra could set a precedent that other labs follow, especially if the model delivers the promised performance boost.

**What to watch**: OpenAI is expected to release a technical addendum on Astra’s monitoring framework within the next month. The next public safety audit, likely led by external researchers, will test whether the chain‑of‑thought overlays can reliably flag misalignment in a looped transformer. Additionally, any legal or regulatory filings concerning the three researchers’ termination could expose how OpenAI enforces its internal policies. Tracking these developments will indicate whether the industry can reconcile performance ambitions with transparent safety practices.
