---
title: "VSCode SSH woes push teams toward self‑hosted dev clouds"
date: 2026-09-24T09:15:33.531Z
tags: ["vscode","devops","self-hosted","ai","database"]
hero_image: "/hero/2026-09-24-vscode-ssh-woes-push-teams-toward-self-hosted-dev-clouds-b09963.jpg"
hero_image_credit_name: "Jakub Zerdzicki"
hero_image_credit_url: "https://www.pexels.com/@jakubzerdzicki"
visual_keyword: "developer working on remote code environment with terminal and cloud icons"
description: "A Fly.io blog post calls VSCode's SSH agent integration chaotic, sparking interest in self‑hosted alternatives like Dockside and AI‑driven tools such as Tiger CLI."
sources_count: 3
author: "maya-chen"
---

## VSCode's SSH agent breaks in practice

Fly.io’s blog labeled VSCode’s built‑in SSH agent handling as "bananas".[^1] The post described the integration as unreliable and prone to authentication errors.[^1] The criticism resonated on Hacker News, where the story earned 220 points and attracted 140 comments.[^2][^3]

Developers cited key‑forwarding failures and unexpected agent termination as the main pain points. The discussion highlighted that the problem is not isolated to a single platform; Windows, macOS, and Linux users reported similar symptoms. The community response was a mix of workarounds and calls for upstream fixes.

The episode underscores a broader tension: IDEs promise seamless remote development, yet the underlying plumbing can still collapse under real‑world load.[^1] Until VSCode stabilizes its SSH path, teams are forced to look elsewhere for reliable remote shells.

## Dockside delivers a self‑hosted Codespaces experience

Dockside launched as an open‑source, self‑hosted platform that mimics the convenience of GitHub Codespaces for small teams.[^4][^5] It spins up a full development environment—called a "devtainer"—in seconds, cloning the production stack into a Docker container.[^4]

Each devtainer receives a custom domain name, an HTTPS reverse proxy, and seamless SSH access.[^4] Developers can connect with any SSH‑capable IDE, including VS Code, JetBrains, Eclipse, Atom, or Sublime.[^4] The built‑in Theia web IDE offers a VS Code‑compatible experience directly in the browser.

Dockside’s fine‑grained permission system locks down runtimes, networks, and images for new hires while granting trusted engineers broader control.[^4] Staging features let teams publish work publicly or privately, enabling instant stakeholder feedback without exposing the entire codebase.[^4]

Resource requirements are modest.[^4] The platform runs on a single Docker host, whether that host is a Linux server, a Mac (Intel, M1, or M2), or even a Raspberry Pi 4+. The Apache 2.0 licence permits on‑prem or cloud deployment, making Dockside attractive for agencies that cannot rely on third‑party SaaS.[^4]

The project positions itself against GitHub Codespaces, Gitpod, and VS Code for the Web.[^4] While feature parity is claimed, Dockside’s unique staging workflow and multi‑user access controls remain its differentiators.[^4] Early adopters report fewer “works on my machine” bugs because the devtainer mirrors production exactly.[^4]

## Tiger CLI adds an AI‑driven layer to database management

Tiger Cloud introduced a command‑line interface that bundles a Model Context Protocol (MCP) server.[^6][^7][^8] The MCP server lets AI assistants such as Claude Code query and manipulate PostgreSQL and TimescaleDB instances directly.[^6][^7][^8]

Installation is straightforward: a binary download, checksum verification, and placement over the existing executable.[^6] The CLI supports Homebrew, apt, yum/dnf, and a manual repository method.[^6] After installing, users run `tiger auth login` to bind the CLI to their Tiger Cloud account.[^6]

The MCP server can run over stdio or HTTP. The HTTP mode listens on a configurable port—default 8080—allowing AI clients to connect via `http://localhost:8080`. Once active, the server automatically inherits the CLI’s authentication context, eliminating extra credential steps.[^7]

Beyond basic CRUD tools, the MCP server proxies documentation tools for PostgreSQL, TimescaleDB, and Tiger Cloud.[^6][^7] This proxy provides semantic search and prompt generation, effectively turning static docs into an interactive knowledge base for AI agents.[^6][^7]

Configuration lives in `~/.config/tiger/config.yaml`. Options include toggling analytics, colored output, and the docs MCP proxy. The `mcp_max_rows` setting caps result sets at 100 rows to keep AI context sizes manageable. Read‑only mode defaults to "off", meaning the server can issue write commands unless explicitly restricted.

The integration blurs the line between human‑written SQL and AI‑generated queries. Critics note that automatic context injection can obscure audit trails, a trade‑off that teams must weigh against productivity gains.

## Why self‑hosted dev environments and AI tooling are converging

The VSCode SSH incident exposed the fragility of relying on third‑party IDE extensions for production‑grade remote access.[^1] When the SSH agent misbehaves, developers lose connectivity and risk key exposure.[^1]

Self‑hosted platforms like Dockside mitigate that risk by keeping the entire stack under the organization’s control.[^4] The Docker‑based model isolates each developer’s environment, ensuring that a compromised host does not leak credentials to external services.

At the same time, AI‑assisted tooling such as Tiger’s MCP server promises to reduce the cognitive load of database operations.[^6][^8] By exposing database commands through a language‑model‑friendly API, teams can prototype queries faster, but they also introduce an additional surface for mis‑execution.[^6][^7]

The convergence of these trends suggests a shift toward “controlled autonomy.” Teams want the flexibility of cloud‑native dev environments without surrendering security or auditability. Open‑source projects provide the code, while AI layers add convenience—but both require disciplined governance.

## What to watch

Watch VSCode’s upcoming release notes for any changes to SSH agent handling. A fix could restore confidence in the built‑in remote workflow.

Track Dockside’s roadmap for multi‑region orchestration and native Kubernetes support. Those features will determine whether the platform scales beyond small teams.

Monitor the adoption of Tiger’s MCP server in regulated industries. Auditors will likely demand logging extensions before AI‑driven SQL becomes mainstream.

Stay tuned for any standards bodies that address AI‑mediated database access. Formal guidance could shape how organizations balance speed and safety.


[^1]: [fly.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHIzAfeBlTnnAUSXJM8zvVhNI2-9cvEuMsKMhssPA3Wjun6hziUZz6OcPjVUftZgUS18zdGGmaklKNDU9YNbG0aeLFx6YFvQ-2ZmDOK8m4y8fqRps7xZuK-CaL3i_uH)
[^2]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHxqC1s8hChb_7Crjh447014bJYh5q2t_PMlfDpz2Hx643pTjEhe0KEqLAlr_NhDh5ubJJvSd720KFUZYQSBapoDcd-QOBFeAcV68ClF4PW484sDRu3Fgo-jj9boxKIlSARzpwPMoQccw==)
[^3]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHET7uX9JBZq1vJcCrFuWmLa55elCM1VxtW2ysiDHMsyfHRZkqPnzJvxetR4s55XWF1hyJ4InNf95FOLHom-kZIRc6jthVPQYqKWtEwXsY7Otsp3Hl2TDW5jftQ2Q==)
[^4]: [dockside.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFxSRgcdvxyyijlR_LFrhyOoN85591-yD4VK4scMTWYmcDiSjF6F3KudJ6o4wzCzpLsI1hDnu8Bo5VSQtoQKmlj4WZZelQT9IILFIOu2cEd)
[^5]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEf6LxZgJOkeSMAQxN6I11_0EmrbYMPRuTJZRfxi_igd41N7aEOasg2jTKM7Yo0B86Q1i5Cyp6AAV6D4SXuTJUGXRdBQziozAlVmdybZtxB7XC6AHyOmGaJxHJGEUkXNpa_GW5p1ToKbQ==)
[^6]: [tigerdata.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFwWO8BKfUKqsFzSobicaPJdWtY6GdJxx_bzdDM-0O1AyLMrZO_HsU_0rVSsFYI9LMk3XfzgD9ind2OYfW_sTDvA434rBC9508zUWl-2mNW41-gmH3uTZyBMNvNfHa1YBIGSSVyBxHKcjYH696n2m2TSmJxoZz06LfvNzNSnjb-kQHG1gEdnAewUK4wEA==)
[^7]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEqacn7VKDKekGrS_-M7XSVqLhR656Zlpwhsau2CH2P9E47IJHV2Htbcu4VYNZqTZWuH0nu3TYWVB0Ikr3W-IUUye0PKYdfIqn_8QX5eVxXa33cL1aLTs6auqcZv5P1Y0B-)
[^8]: [tigerdata.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGx0PnpPMphoWecwsBiMCYoQQ-AV6QsgvRZqVgeaBa8aYn-N8HR8dESHsj7POEDvTqYmhDXmVFiVATpRlQ1lmsATfflrlzmGxOqeFE532jdPypWKLcwOVmHisAAwyusHHx0VgQjQKkS5CrjQjwvW8T7DWDU4UJssdtf)
