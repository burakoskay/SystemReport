---
title: "Microsoft Opens Earliest DOS Code; FastGraphRAG, Tracecat Debut"
date: 2026-04-30T19:50:35.980Z
tags: ["open-source","dos","retrieval-augmented-generation","security-automation"]
hero_image: "/hero/2026-04-30-microsoft-opens-earliest-dos-code-fastgraphrag-tracecat-debut-1af97c.jpg"
hero_image_credit_name: "Daniil Komov"
hero_image_credit_url: "https://www.pexels.com/@dkomov"
visual_keyword: "vintage computer code scroll beside modern AI graph visualization"
description: "Microsoft releases the oldest known DOS source code as open source, while FastGraphRAG and Tracecat bring new open‑source tools for retrieval‑augmented generation and security automation."
sources_count: 3
author: "maya-chen"
---

Microsoft published the oldest known DOS source code on GitHub, making a piece of computing history freely available. The release gives researchers a rare look at the code that predated Microsoft's acquisition of 86‑DOS.

Ars Technica reported that the archive contains 86‑DOS files from the early 1980s, a version Microsoft bought in 1981 before rebranding it as MS‑DOS. The code predates the purchase, showing the original structure of the operating system. No build scripts accompany the dump, so developers must reconstruct the environment themselves. The open‑source license permits unrestricted study and modification.

## FastGraphRAG cuts RAG costs with PageRank

FastGraphRAG is a Python library that implements retrieval‑augmented generation using a personalized PageRank algorithm. The project description says the framework can be installed from source for peak performance or from PyPI for stability.

A cost comparison posted by the developers shows FastGraphRAG runs at $0.08 per request, while the reference Graphrag implementation costs $0.48. The six‑fold savings grow as data size and insertion count increase. The library stores knowledge automatically across runs, eliminating manual re‑indexing.

FastGraphRAG is released under the MIT License, and the repository includes an examples folder. A managed service offers the first 100 requests free each month, after which usage is billed. The service promises to handle scaling without the overhead of custom agentic pipelines.

## Tracecat offers sandboxed security automation

Tracecat provides an open‑source security orchestration, automation, and response (SOAR) platform built for teams and AI agents. The code runs inside nsjail sandboxes by default, limiting the attack surface of user‑provided scripts.

The platform leverages Temporal for workflow reliability and horizontal scaling. The repository is licensed under AGPL‑3.0 with specific exceptions that bar redistribution or commercial sale of the exempt code without permission. Enterprises can purchase an alternate license or a managed cloud offering.

Tracecat’s developers maintain a community Discord and a contribution guide. They credit contributors for code, integrations, and documentation. The project remains in active development, and the changelog warns users to review updates before upgrading.

## Open‑source momentum in legacy and AI tooling

Microsoft’s decision to publish early DOS code reflects a growing willingness to share historic artifacts. The move mirrors the open‑source ethos of the AI community, where projects like FastGraphRAG and Tracecat expose core infrastructure to public scrutiny.

Legacy code releases enable academic analysis of software evolution, but they also raise maintenance questions. Without official build instructions, the DOS sources may see limited practical use beyond curiosity. In contrast, FastGraphRAG and Tracecat ship with clear installation paths and active issue trackers, encouraging rapid adoption.

The contrast highlights a trade‑off between preserving history and delivering production‑ready tools. Open‑source licenses lower entry barriers, yet they shift responsibility for security and compliance onto downstream users. Both Microsoft and the AI tool authors rely on community contributions to keep the codebases viable.

## What to watch

Watch for Microsoft’s next archival release; additional pre‑acquisition software could appear on the same repository. Monitor FastGraphRAG adoption metrics as developers compare its cost profile against competing RAG stacks. Track Tracecat’s enterprise licensing rollout and any security audits prompted by its sandboxed design. These signals will indicate how open‑source strategies shape both legacy preservation and the emerging AI tooling market.