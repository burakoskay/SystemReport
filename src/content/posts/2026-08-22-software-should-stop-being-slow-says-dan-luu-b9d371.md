---
title: "Software should stop being slow, says Dan Luu"
date: 2026-08-22T06:33:00.400Z
tags: ["performance","software","optimization"]
hero_image: "/hero/2026-08-22-software-should-stop-being-slow-says-dan-luu-b9d371.jpg"
hero_image_credit_name: "Christina Morillo"
hero_image_credit_url: "https://www.pexels.com/@divinetechygirl"
visual_keyword: "developer reviewing code performance metrics on multiple monitors"
description: "Dan Luu’s essay argues that modern hardware makes software latency unnecessary, sparking a heated HN debate and prompting a look at real‑world optimization lessons."
sources_count: 4
author: "ryan-tanaka"
---

## The HN firestorm

Dan Luu posted an essay titled “There’s no reason for software to be slow anymore” on his personal blog. The piece hit Hacker News, earning 283 points and spawning 204 comments within hours.

Readers immediately latched onto the claim that today’s CPUs, SSDs, and networking stacks render most performance bottlenecks avoidable. Luu’s argument is not a vague wish‑list; he points to decades of micro‑architectural progress that have turned what used to be “fast enough” into a baseline that developers should exceed.

## Why the claim matters

If software runs slower than the hardware can support, users pay in time, electricity bills, and cloud spend. The cost of a single extra millisecond compounds across billions of requests, inflating latency budgets for services that promise sub‑second responses.

Luu cites the fact that modern servers can execute billions of instructions per second, yet many codebases still linger in the “O(n²)” or “lock‑heavy” regime. The gap is not a hardware shortage; it is a discipline gap. When developers treat performance as an afterthought, they leave money on the table and risk user churn.

## Lessons from Bitcoin’s long battle with latency

Bitcoin’s reference client illustrates how disciplined optimization can keep a decentralized network viable. Early versions verified ECDSA signatures twice—once before mempool entry and again during block validation—wasting CPU cycles. Developers introduced a signature cache that stores validated signatures, eliminating redundant work and closing a known DoS vector.

The Ultraprune upgrade rewrote the transaction‑output index to store only unspent outputs. By discarding spent entries, the client reduced its database footprint by an order of magnitude on typical hardware. The change coincided with a migration from Berkeley DB to LevelDB, further accelerating validation.

A subtler win came from parallelizing script verification. Original code interleaved script checks with UTXO fetches, creating a linear bottleneck. Refactoring placed script checks in a work queue processed by multiple threads, allowing I/O and computation to overlap. The result was noticeably faster block validation, especially on multi‑core machines.

These three moves—caching, pruning, and parallelism—show that even a mature, security‑critical system can reap massive speed gains by questioning assumptions and applying classic algorithmic thinking.

## Building better tools: ramure’s take on agent performance

Ramure, the Python library announced on Hacker News with 64 points, tackles performance at the level of distributed agent software. It replaces the older “druids” runtime and leans on Pi and tmux to manage agents across machines.

The core abstraction is the `@agent_process` decorator. An async function marked with this decorator defines agents, machines, and communication patterns. When the root process starts, ramure spins up a runtime that governs the lifecycle of every nested agent. Events flow through deterministic callbacks, and supervisors can observe child processes in real time via `bubble()`.

Ramure’s design forces developers to think about where code runs—on a local machine, a Docker container, or a remote SSH‑backed host. By exposing a clear contract for `Machine` objects (four async methods plus optional `fork` and `snapshot`), the library makes it straightforward to swap backends without rewriting business logic. This modularity reduces the hidden overhead that often plagues ad‑hoc agent frameworks.

In practice, ramure lets engineers compose agents like regular async functions, fan them out with `asyncio.gather`, or spawn them and monitor their event streams. The explicit separation of computation and transport mirrors the Bitcoin optimizations: cache results, prune unnecessary state, and parallelize work wherever possible.

## What to watch

Luu’s essay will likely inspire a wave of “performance‑first” retrospectives at startups and open‑source projects. Track whether major language runtimes (Go, Rust, Java) introduce default profiling hooks or aggressive in‑process caches in the next six months. In the Bitcoin world, monitor the upcoming “pruned‑node‑v2” proposal, which promises to combine Ultraprune’s storage savings with on‑the‑fly signature verification. Finally, watch the ramure repository for a stable 1.0 release and any integration with cloud‑native orchestration platforms—those signals will indicate whether the community is truly moving beyond “software can be slow.”