---
title: "Microsoft security missteps clash with industry passwordless push"
date: 2026-05-29T18:42:19.418Z
tags: ["microsoft","security","passwordless","edge","researcher"]
hero_image: "/hero/2026-05-29-microsoft-security-missteps-clash-with-industry-passwordless-push-fd88d2.jpg"
hero_image_credit_name: "cottonbro studio"
hero_image_credit_url: "https://www.pexels.com/@cottonbro"
visual_keyword: "security researcher confronting a browser vulnerability on multiple screens"
description: "Microsoft faces backlash over a threatened criminal probe of a researcher, unpatched Edge bugs, and a CSP refusal, even as it joins Apple and Google on passwordless passkeys."
sources_count: 5
author: "priya-raman"
audio_path: "/audio/2026-05-29-microsoft-security-missteps-clash-with-industry-passwordless-push-fd88d2.mp3"
audio_bytes: 544436
audio_mime: "audio/mpeg"
---

## Microsoft’s latest security confrontations

Microsoft threatened an independent security researcher with a criminal investigation after the researcher disclosed vulnerabilities in the company’s software. The move reignited a long‑running debate about who should bear the burden of securing code that powers billions of devices.

At the same time, Google Project Zero revealed a type‑confusion flaw in Edge and Internet Explorer identified as CVE‑2017‑0037. The bug, discovered by researcher Ivan Fratric in late November, allows arbitrary code execution and remains unpatched because Microsoft canceled its February Patch Tuesday updates, citing a "last minute issue." The vulnerability sits alongside two other severe, unpatched flaws in the Windows GDI component and the SMB file‑sharing protocol. No incidents have been reported, but the lack of a fix keeps the attack surface wide open.

Microsoft later announced a limited set of updates, including a flash‑player patch for Windows 10, while promising to ship the delayed February updates on March 15. The patch schedule underscores a pattern: critical browser bugs linger while the company pushes other security initiatives.

## The passwordless push: passkeys across the big three

Microsoft, Apple, and Google announced joint support for the FIDO Alliance’s passkey standard, a WebAuthn‑based credential that replaces passwords with device‑bound PINs or biometrics. The three firms will roll out multi‑device passkeys across their platforms over the coming year.

Google’s Secure Authentication director Sampath Srinivas explained that a user will simply unlock their phone to approve a login, and the passkey will sync via cloud backup to a new device. Microsoft Identity Vice President Alex Simons called the move a "monumental step toward a world without passwords," while CISA Director Jen Easterly praised the private‑sector commitment to open standards.

Vasu Jakkal, Microsoft’s Corporate Vice President for Security, Compliance, Identity, and Management, quantified the threat: "there are 921 password attacks every second—nearly doubling in frequency over the past 12 months." In December 2020, Microsoft reported over 150 million users logging into Azure Active Directory and Microsoft accounts without passwords, and it began rolling out passwordless login support for all Microsoft accounts in September.

## Edge’s CSP bypass and the industry response

Cisco Talos researcher Nicolai Grødum disclosed a Content Security Policy (CSP) bypass in Edge that lets an attacker inject malicious JavaScript via a simple "_blank" window and document.write sequence. The flaw, found in November of the previous year, carries a CVSS score of 4.3 and enables classic XSS‑style attacks such as cookie theft and keylogging.

Apple and Google patched analogous CSP bypasses in Safari (CVE‑2017‑2419) and Chrome (CVE‑2017‑5033). Microsoft, however, declined to issue a fix, labeling the behavior "by design." As a result, Edge users remain exposed while Chrome 57.0.2987.98, iOS 10.3, and Safari 10.1+ are protected. Firefox is not affected.

The divergent handling highlights a tension between rapid remediation and product‑level design decisions. Edge’s refusal to patch a low‑severity CSP bypass contrasts sharply with the urgency shown for the type‑confusion bug in the same browser, which remains unpatched despite a higher CVSS rating.

## What this means for the security ecosystem

Microsoft’s simultaneous pursuit of a passwordless future and its reluctance to address certain browser flaws creates a mixed security signal. On one hand, the passkey alliance promises to cut the most common attack vector—password reuse—by moving authentication to hardware‑bound credentials. On the other hand, lingering browser vulnerabilities give attackers a foothold for session hijacking, code execution, and credential theft.

Enterprises that rely heavily on Edge for internal web apps must weigh the convenience of passkeys against the risk of an unpatched CSP bypass and the unresolved CVE‑2017‑0037 type confusion. The decision to adopt passkeys now may lock in a platform that still carries known, unmitigated flaws.

## What to watch

Track Microsoft’s March 15 Patch Tuesday for a definitive fix to CVE‑2017‑0037 and any statement on the Edge CSP bypass. Monitor the rollout schedule for passkey support across Windows, iOS, and Android, especially any telemetry on adoption rates and incident reports. Finally, keep an eye on the response from the security research community—further disclosures could pressure Microsoft to align its patch cadence with the broader industry’s rapid‑fix expectations.
