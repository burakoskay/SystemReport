---
title: "AliExpress caught using inaudible audio to fingerprint browsers"
date: 2026-08-25T08:46:57.040Z
tags: ["privacy","browser-fingerprinting","cloud-security"]
hero_image: "/hero/2026-08-25-aliexpress-caught-using-inaudible-audio-to-fingerprint-browsers-4ff29a.jpg"
hero_image_credit_name: "Alexey Demidov"
hero_image_credit_url: "https://www.pexels.com/@alexeydemidov"
visual_keyword: "close-up of a computer speaker emitting invisible sound waves"
description: "AliExpress employed inaudible audio signals to uniquely identify browsers, reviving a dismissed tracking method and raising fresh privacy alarms."
sources_count: 4
author: "ryan-tanaka"
---

AliExpress slipped inaudible audio into web pages to tag browsers without user consent. The move resurrects a tracking method many thought dead, and it forces engineers to rethink the assumptions behind web privacy.

Ars Technica reported that the e‑commerce giant injected sound bursts that humans cannot hear but that browsers can capture and translate into a unique fingerprint. The technique is old, the report says, and it is still creepy. No other company has been publicly identified using the same approach, and the revelation comes as cloud‑centric services continue to concentrate personal data in a few hands.

## How inaudible sound fingerprinting works

The method relies on the speaker‑microphone loop that every modern device possesses. A web page plays a tone at a frequency beyond the audible range, typically above 18 kHz. The browser records the echo that bounces off the device’s hardware and software stack. Small variations in driver versions, hardware tolerances, and even the shape of the speaker create a pattern that can be extracted into a hash.

Because the signal never reaches the user’s ears, the process is invisible. The hash can be sent back to a server and linked to other identifiers such as cookies or IP addresses. The result is a persistent identifier that survives cookie deletion and private‑mode browsing. Researchers have demonstrated the technique in academic papers, but the Ars Technica investigation is the first public case of commercial deployment.

## Why the technique still scares

Privacy advocates label the practice as a violation of the principle of least privilege. The user’s device is forced to reveal hardware details that were never intended for remote consumption. The data points are not inherently sensitive, yet they enable cross‑site tracking at a scale that browsers have tried to curb.

The creep factor rises when the fingerprint is paired with other data streams. Cloud providers already host the browsers that run the audio code, and they can see the resulting hashes if they choose to log network traffic. The Ars Technica piece notes that the approach is “still creepy,” underscoring the discomfort engineers feel when a benign‑looking site silently harvests hardware signatures.

## Broader privacy erosion in the cloud era

The AliExpress case fits a larger pattern of privacy erosion described in a recent Hacker News essay on “decoupling” user identity from data. The essay argues that cloud services act as single points of failure, aggregating copies of personal files, emails, and photos across multiple servers. Even encrypted data must be decrypted at the edge to be useful, exposing it to the same kind of opportunistic harvesting that audio fingerprinting demonstrates.

When a cloud provider processes a request, it inevitably learns something about the requester. In the same way that an inaudible tone reveals hardware quirks, a cloud API call can reveal usage patterns, geographic location, and even the type of device making the request. The essay warns that without a systematic “least privilege” approach, every service becomes a data‑rich target for advertisers, hackers, and state actors.

The AliExpress episode shows how a seemingly innocuous web feature can become a privacy leak. It also illustrates why the decoupling principle matters: if browsers and cloud services shared only the minimal data needed for a transaction, the audio fingerprint would have no place to hide.

## Industry reaction and technical countermeasures

Browser vendors have long fought fingerprinting by limiting access to high‑resolution timers and by randomizing canvas outputs. The Ars Technica report did not mention any immediate response from Chrome, Firefox, or Safari, but the community is likely to revisit audio APIs. Some extensions already block autoplay of media; extending that block to inaudible frequencies would be a logical next step.

Developers can also adopt defensive coding practices. By refusing to grant microphone permissions to untrusted origins, a site prevents the audio loop from completing. On platforms that support it, users can disable the Web Audio API in the browser settings, though that may break legitimate applications.

From a server perspective, logging audio hashes without a clear purpose breaches most privacy policies. Companies that continue to collect such identifiers risk regulatory scrutiny under emerging data‑protection laws that treat hardware fingerprints as personal data.

## What to watch

Regulators in the EU and several US states are drafting rules that could classify audio‑based fingerprints as biometric data. Watch for any formal complaint filed against AliExpress under the GDPR or the California Consumer Privacy Act. Also monitor browser release notes for changes to the Web Audio API permissions model. If major browsers start throttling or sandboxing inaudible audio, the technique may lose its commercial appeal. Until then, engineers should assume that any web‑delivered sound, audible or not, can be weaponized for tracking.