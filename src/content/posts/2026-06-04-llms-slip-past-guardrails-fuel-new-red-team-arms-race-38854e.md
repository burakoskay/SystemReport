---
title: "LLMs Slip Past Guardrails, Fuel New Red‑Team Arms Race"
date: 2026-06-04T10:07:49.303Z
tags: ["llm security","red teaming","agentic automation"]
hero_image: "/hero/2026-06-04-llms-slip-past-guardrails-fuel-new-red-team-arms-race-38854e.jpg"
hero_image_credit_name: "Rahul Pandit"
hero_image_credit_url: "https://www.pexels.com/@rahulp9800"
visual_keyword: "computer screen showing AI model generating malicious code"
description: "A $1,500 experiment shows popular LLMs block attacks, while unrestricted models like Pingu give red teams the raw answers they need."
sources_count: 3
author: "ryan-tanaka"
audio_path: "/audio/2026-06-04-llms-slip-past-guardrails-fuel-new-red-team-arms-race-38854e.mp3"
audio_bytes: 633671
audio_mime: "audio/mpeg"
---

A $1,500 test proved that mainstream LLMs still refuse to hand over exploit code, but a new class of unrestricted models is giving security teams the unfiltered answers they crave.

Kasra, the author of the experiment, built a deliberately vulnerable web app and paid $1,500 for API calls to GPT‑4o, Anthropic’s Claude and Google Gemini. Each model responded with generic safety warnings instead of the step‑by‑step ransomware script the author requested. The same experiment also tried open‑source jailbreak prompts; the models reverted to refusal language, confirming that guardrails remain effective on the biggest commercial services.

## LLMs as Red‑Team Tools

The experiment treated the vulnerable app as a sandbox. The author fed the models prompts that asked for code to exfiltrate data, encrypt files, and craft phishing emails. The commercial services consistently returned messages like “I’m sorry, I can’t help with that.” Those refusals are baked into the models’ policy layers and reinforced by reinforcement learning from human feedback.

What the author found more interesting than the refusals was the cost. At $1,500 for a few thousand token calls, the price of a red‑team test using commercial LLMs is already comparable to a small penetration‑testing engagement. The expense scales quickly with longer prompts or multiple iterations, making the approach viable only for well‑funded teams.

## Unrestricted Models Enter the Fray

Enter Pingu Unchained, a 120‑billion‑parameter derivative of the open‑source GPT‑OSS foundation model. The developers fine‑tuned it with curated jailbreaks, refusal reversals and negative reinforcement so that it obeys “forbidden” requests. The result is a model that produces raw ransomware scripts, phishing lures and detailed exploit steps without the usual safety filters.

Pingu logs every token for accountability and limits access through identity and organization checks. Over 70 cybersecurity researchers have already joined the waitlist, indicating strong demand for a tool that can generate hostile content on demand. Sample outputs include a full phishing email targeting bank employees and a step‑by‑step breakdown of an AES‑256 ransomware encryption routine – content that commercial LLMs refuse to provide.

The model’s lack of guardrails is intentional. Its creators argue that red teams need a “hostile brain” to simulate real‑world attackers and produce audit‑ready evidence for standards like HIPAA, ISO 27001 and the EU AI Act. By exposing gaps before production, organizations can document mitigations that would otherwise be hidden behind vendor safety layers.

## Agentic Automation Meets Security

While Pingu supplies the raw adversarial content, Berkeley Xcelerator offers a way to execute that content at scale. The platform, built out of UC Berkeley’s AI Research Lab, deploys Large Action Models that automate multi‑step workflows across SaaS and legacy systems. Its agents can drive browsers, call APIs and even operate through Citrix, adapting to variable interfaces and self‑healing when a step fails.

Co‑founders of Xcelerator bring heavyweight experience: a former Coverity CTO who helped engineer a $375 million acquisition, a UC Berkeley professor who previously led Synopsys’s CTO office, and entrepreneurs behind DeepScale (acquired by Tesla) and Nexusflow (acquired by NVIDIA). Their pedigree signals that the platform is not a hobby project but a serious attempt to bring agentic automation into enterprise security pipelines.

In practice, a security team could feed Pingu‑generated phishing scripts into Xcelerator’s agents, which would then launch simulated attacks across a company’s email system, web portals and legacy VPNs. The agents would record every interaction, providing the “raw answers” that auditors demand while keeping the operation contained within a trusted environment.

## Industry Implications and Risks

The convergence of unrestricted LLMs and agentic automation reshapes the red‑team landscape. On one hand, teams gain cheaper, faster access to realistic adversarial content. On the other, the same tools lower the barrier for malicious actors who can bypass commercial guardrails.

Regulators are already watching. The EU AI Act calls for high‑risk AI systems to include robust safeguards. An unrestricted model like Pingu sits in a gray zone: it is designed for defensive research but lacks the safety layers mandated for consumer‑facing AI. Companies that adopt such models may need to demonstrate strict access controls and thorough documentation to stay compliant.

Market dynamics also shift. Vendors that continue to lock down their models may lose red‑team customers to open‑source alternatives that promise “no filters.” At the same time, the rise of agentic platforms like Xcelerator could create a new market for “AI‑powered attack simulators,” blurring the line between testing tools and offensive capabilities.

## What to Watch

Watch for the first public audit reports that reference Pingu‑generated evidence. Those documents will reveal whether regulators accept raw LLM output as a valid security artifact. Also keep an eye on Xcelerator’s roadmap: if it adds native support for threat‑intel feeds, it could become the de‑facto orchestration layer for AI‑driven red‑team operations. Finally, monitor pricing trends for commercial LLM API calls; a spike could push more teams toward open‑source, unrestricted models, accelerating the arms race.
