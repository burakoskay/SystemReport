---
title: "Ultravox and Call4Me Show Why the Classic STT‑LLM‑TTS Stack"
date: 2026-10-30T01:44:57.464Z
tags: ["voice-ai","llm","multimodal"]
hero_image: "/hero/2026-10-30-ultravox-and-call4me-show-why-the-classic-stt-llm-tts-stack-3fa615.jpg"
hero_image_credit_name: "Alberto Lara"
hero_image_credit_url: "https://www.pexels.com/@alberto-lara-25433440"
visual_keyword: "engineer testing a speech-to-text free voice AI system with headphones and laptop"
description: "Direct‑audio LLMs and single‑model voice agents cut latency and complexity, forcing a rethink of voice‑AI architecture."
sources_count: 5
author: "maya-chen"
audio_path: "/audio/2026-10-30-ultravox-and-call4me-show-why-the-classic-stt-llm-tts-stack-3fa615.mp3"
audio_bytes: 622176
audio_mime: "audio/mpeg"
---

Ultravox streams spoken prompts into Llama 3.3 without a separate speech recognizer.

The open‑weight model runs on a 70‑billion‑parameter Llama 3.3 backbone, with an 8 billion‑parameter variant on Hugging Face. Training the adapter took 2‑3 hours on eight H100 GPUs for 14 k steps. The system accepts raw WAV audio and emits streaming text, bypassing the traditional ASR stage. The project builds on research such as AudioLM, SeamlessM4T, Gazelle, and SpeechGPT, and it can be attached to any open‑weight LLM.

## Ultravox’s Direct Audio Path

Ultravox replaces the three‑stage pipeline—speech‑to‑text, language model, text‑to‑speech—with a single projector that maps audio into the LLM’s high‑dimensional space. Because the audio encoder and the LLM remain frozen, only the adapter learns to translate acoustic features into token embeddings. This design trims latency dramatically compared with cascaded systems where each hop adds buffering and resampling.

The model currently outputs streaming text. The roadmap promises a speech‑token stream that a vocoder can turn into raw audio, completing a true voice‑to‑voice loop. By avoiding explicit transcription, Ultravox also preserves paralinguistic cues such as timing and emotion, which conventional pipelines discard.

## Call4Me Eliminates the Stack Entirely

Call4Me takes the single‑model approach a step further. It runs on Cloudflare Workers, with each live call hosted in a Durable Object. Telnyx Call Control opens a two‑way media stream over a WebSocket, and the GPT‑Live model consumes the raw G.711 µ‑law audio at 8 kHz—the exact format a phone line uses.

There is no speech‑to‑text conversion, no text‑to‑speech synthesis, and no resampling. The model hears the line directly, including hold music and background noise, and speaks back through the same stream. The only logic layer is a decision‑making LLM that decides when to dial, what information to collect, and how to respond to prompts from the business on the other end.

## Trade‑offs of a One‑Model Audio Path

Both Ultravox and Call4Me gain speed by eliminating hops, but they inherit new constraints. Ultravox’s current output is text only, so any downstream voice synthesis must be added later. The single‑model path also means that errors in audio perception cannot be corrected by a downstream module; the model must learn to disambiguate noisy inputs on its own.

Call4Me’s design forces the caller to pre‑specify every piece of information the call will need. If a required slot is missing, the system aborts the dial and returns a list of missing items. This protects against mid‑call confusion but adds friction to the user experience. Moreover, the reliance on a single GPT‑Live instance makes the system vulnerable to latency spikes if the model stalls, because there is no fallback transcription service.

Both projects expose a broader engineering question: how much complexity are we willing to trade for raw latency gains? The traditional stack offers modularity—swap a better ASR or a higher‑quality TTS without retraining the whole system. The new approach forces developers to re‑train adapters whenever the underlying LLM changes, as Ultravox’s documentation notes.

## Industry Context and Competitive Landscape

The move toward integrated audio‑LLM pipelines echoes earlier research like AudioLM, which demonstrated that language models can generate coherent speech without explicit phoneme modeling. SeamlessM4T and Gazelle showed that multilingual audio‑text alignment is feasible at scale. Ultravox packages these ideas into a reusable projector that can be attached to any open‑weight model, positioning it as a community‑driven alternative to proprietary services such as Whisper‑based pipelines.

At the same time, startups are building managed voice agents that still rely on the classic STT‑LLM‑TTS chain because it offers predictable quality and easier compliance. Call4Me’s open‑source‑ish stack proves that a single‑model path can be production‑ready, but it also highlights the need for robust monitoring and credit‑based usage accounting, which the platform implements with Cloudflare D1 and Stripe.

The broader market is watching whether developers will adopt these minimalist stacks for high‑throughput use cases—customer support bots, real‑time transcription‑free assistants, and low‑latency voice interfaces for IoT devices. If the performance gap widens, the classic stack may become a niche for legacy integrations rather than the default architecture.

## What to Watch

The next milestone for Ultravox is the release of a speech‑token output and a public benchmark comparing end‑to‑end latency against Whisper‑based pipelines. For Call4Me, the key indicator will be adoption metrics on the Cloudflare Workers marketplace and any third‑party integrations that expose the GPT‑Live model to external APIs. Track announcements from the Ultravox GitHub repo and Cloudflare’s developer blog for updates on scaling, pricing, and compliance features.
