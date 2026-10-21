---
title: "LiteLLM supply-chain breach and AI‑found PHP RCE raise alarm"
date: 2026-10-21T20:12:21.118Z
tags: ["security","php","supply-chain","ai"]
hero_image: "/hero/2026-10-21-litellm-supply-chain-breach-and-ai-found-php-rce-raise-alarm-a15259.jpg"
hero_image_credit_name: "Tima Miroshnichenko"
hero_image_credit_url: "https://www.pexels.com/@tima-miroshnichenko"
visual_keyword: "cybersecurity analysts monitoring code repositories"
description: "A compromised LiteLLM release on PyPI and an AI‑detected PHP remote code execution expose supply‑chain and language‑level risks as PHP 8.2.35 rolls out."
sources_count: 9
author: "maya-chen"
---

## New supply‑chain breach hits LiteLLM on PyPI

The Python package manager index now hosts a malicious version of LiteLLM 1.107.0 that drops a credential‑stealing backdoor. Safedep.io reported that the compromised wheel installs a hidden script which exfiltrates API keys and writes a persistent shell to the host filesystem.

The breach surfaced on a public Hacker News thread that linked to the Safedep investigation. Commenters noted that the malicious upload bypassed the standard PyPI vetting process and propagated to downstream projects that depend on LiteLLM for LLM‑based inference. The backdoor activates on import, meaning any application that loads the package inherits the attacker’s foothold without additional user interaction.

## AI‑driven PHP exploit surfaces via PHP2Shell

An independent security researcher used an AI code‑analysis tool to uncover a critical remote code execution (RCE) flaw in the core PHP interpreter. The findings were published on php2shell.com, which hosts the proof‑of‑concept and a brief technical write‑up.

The RCE bypasses typical input sanitisation and allows arbitrary command execution on any server running the vulnerable PHP version. The disclosure arrived just weeks after the PHP community released version 8.2.35, a security‑only update that patches several unrelated issues. The timing forces administrators to weigh the urgency of applying the official patch against the risk of an unpatched RCE that can be triggered remotely.

## PHP 8.2.35 patches and the broader vulnerability landscape

The PHP development team issued version 8.2.35 as a targeted security release. The changelog lists fixes for memory‑corruption bugs and a handful of denial‑of‑service vectors, but it does not mention the newly disclosed RCE. The omission suggests the vulnerability resides in a different code path that the core team has not yet addressed.

Discussion on Hacker News reflected a split view. One side praised the rapid rollout of 8.2.35, citing the 385 points the thread received as evidence of community support. Another side warned that the patch does not mitigate the AI‑found RCE, urging operators to apply additional hardening measures such as disabling dangerous functions and enforcing strict input validation. The debate highlights a growing friction between upstream patch cadence and the speed at which novel attack surfaces emerge.

## Coordinated response: Patch the Planet and community mobilization

The nonprofit initiative Patch the Planet announced a global coordination effort to triage and remediate the two incidents. Its website describes a network of volunteer security agents who share indicators of compromise, publish mitigation guides, and assist small‑to‑mid‑size operators lacking dedicated security teams.

Patch the Planet’s response plan includes publishing hash signatures for the clean LiteLLM release, distributing a curated list of affected PyPI packages, and offering a step‑by‑step hardening checklist for PHP deployments. The effort mirrors prior community‑driven campaigns that successfully contained supply‑chain attacks, but the simultaneous emergence of an AI‑generated exploit adds a layer of complexity that the coordination hub is still calibrating.

## What to watch

Track the next PHP security release for an explicit fix to the AI‑identified RCE. Monitor the PyPI registry for any additional compromised packages linked to the LiteLLM incident. Finally, watch Patch the Planet’s advisory updates for new mitigation scripts and for any indication that the backdoor has been weaponized in the wild.