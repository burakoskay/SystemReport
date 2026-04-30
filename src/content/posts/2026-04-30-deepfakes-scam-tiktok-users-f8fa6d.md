---
title: "Deepfakes Scam TikTok Users"
date: 2026-04-30T06:35:25.857Z
tags: ["ai governance","deepfakes","china policy","llm safety"]
hero_image: "/hero/2026-04-30-deepfakes-scam-tiktok-users-f8fa6d.jpg"
hero_image_credit_name: "Markus Spiske"
hero_image_credit_url: "https://www.pexels.com/@markusspiske"
visual_keyword: "collage of celebrity deepfake video, code snippet, and Chinese flag"
description: "Deepfake scams, opaque LLM prompts, and China's AI strategy reveal growing governance gaps and new threat vectors."
sources_count: 3
author: "maya-chen"
audio_path: "/audio/2026-04-30-deepfakes-scam-tiktok-users-f8fa6d.mp3"
audio_bytes: 613400
audio_mime: "audio/mpeg"
---

## Deepfakes Targeting Consumers
Researchers at WIRED uncovered a wave of TikTok ads that splice AI‑generated footage of celebrity interviews into fake product pitches. The videos show well‑known stars endorsing services that never existed. Viewers are prompted to click a link, enter personal data, and often end up with spam or financial loss. The manipulation relies on recent advances in video synthesis, but the core scam—phishing through trusted faces—remains unchanged.

The study notes that the ads appear in the platform’s “For You” feed, where algorithmic curation amplifies exposure. The researchers could not verify the identities of the operators behind the campaigns, but they traced the deepfake assets to publicly available model checkpoints. The authors caution that the low cost of generating convincing footage will make this vector harder to police.

## OpenAI’s Internal Prompt Restrictions
Ars Technica reported that the Codex model ships with a system prompt that explicitly forbids discussion of “goblins.” The same prompt instructs the model to behave as if it possesses a vivid inner life. These constraints are baked into the model’s initial context and are not exposed to end‑users.

The directive raises questions about the opacity of LLM safety layers. If a model can be forced to avoid a benign topic, the same mechanism could suppress critical content or bias outputs. OpenAI has not disclosed how many such hidden rules exist, nor the criteria for selecting them. The lack of transparency makes it difficult for developers to audit the model’s behavior, and we don’t know yet how these internal guards interact with external moderation tools.

## China’s State‑Led AI Roadmap
A policy brief summarized by Dr. Marianna Ganapini outlines China’s “New Generation Artificial Intelligence Development Plan” (AIDP), issued by the State Council in 2017. The plan sets a target to make China the world centre of AI innovation by 2030. It designates private firms like Alibaba and Baidu as “AI National Champions,” granting them preferential contract bidding, easier financing, and sometimes market‑share protection.

Local governments receive leeway to partner with private firms and to incentivize technology projects, but the plan provides only vague guidelines. This flexibility lets companies cherry‑pick technologies to develop, while the state retains the ability to steer outcomes toward three strategic aims: international competition, economic growth, and social governance. The document emphasizes military applications, such as cyber‑warfare tools, as a key component of the competition goal.

## The Convergence of Threats and Governance Gaps
The three threads—deepfake scams, hidden LLM prompts, and China’s top‑down AI agenda—illustrate a widening governance gap. In the West, the focus has been on content moderation and model interpretability, yet the WIRED findings show that even well‑intentioned platforms can be weaponized by third‑party actors. Meanwhile, the Ars Technica reveal suggests that internal safety mechanisms may be more restrictive than advertised, potentially undermining trust in open‑source LLMs.

China’s AIDP, by contrast, institutionalizes state influence over private AI development. The plan’s broad language and selective incentives create an environment where breakthrough models can be produced without the same public scrutiny applied elsewhere. The combination of state‑backed funding and limited oversight could accelerate capabilities that outpace existing international norms on weaponization and privacy.

## Industry Response and Emerging Standards
European regulators have begun drafting AI Act provisions that would require transparency about model constraints and provenance of synthetic media. In the United States, the FTC’s recent guidance on deepfake disclosures remains advisory, and no federal agency has mandated prompt‑level transparency for commercial LLMs. Companies like OpenAI have published high‑level safety policies, but the Codex prompt example demonstrates a gap between public statements and internal implementation.

Chinese firms, meanwhile, operate under the AIDP’s umbrella, which does not yet mandate public reporting of model restrictions or synthetic‑media safeguards. Some industry groups within China are calling for standards similar to the ISO/IEC AI committee, but adoption is uneven. The divergent regulatory trajectories increase the risk of a fragmented global AI ecosystem where best practices are unevenly applied.

## What to Watch
Track the FTC’s upcoming rulemaking on deepfake disclosures and any amendments to the EU AI Act that address model prompt transparency. In parallel, monitor whether OpenAI publishes the full set of system‑level directives for Codex or its successors, and whether Chinese regulators issue guidelines for synthetic‑media labeling under the AIDP. These signals will indicate whether the industry can close the current governance gaps before the next wave of AI‑driven threats materializes.