---
title: "AI Agent Harness Makers Push for Outside-the-Sandbox Execution"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Developers of AI agent harnesses, like OmoiOS and Broccoli, argue that running agents outside the sandbox improves performance and reliability."
sources_count: 6
author: "maya-chen"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---


## The Case for Outside-the-Sandbox Execution

The makers of AI agent harnesses, such as OmoiOS and Broccoli, are pushing for execution outside the sandbox. This approach promises improved performance and reliability. OmoiOS, an open-source orchestration runtime, turns specs into PRs using parallel agent swarms in isolated sandboxes. 

The OmoiOS system includes a supervisor agent that handles merges and keeps everything on track. It generates specs grounded in the existing codebase, building a task DAG with real dependencies. The system runs agent swarms across isolated sandboxes until the work is done.

## Concrete Implementations

Broccoli, another AI agent harness, turns Linear tickets into shipped PRs powered by Claude and Codex, running on Google Cloud. The system runs as two Cloud Run workloads over a shared Postgres. 

To deploy Broccoli, users need a Google Cloud project, a GitHub App, and specific secrets from GitHub, Linear, OpenAI, and Anthropic accounts. The sequence of deployment starts from zero, explains where values come from, and calls out steps that must still happen manually for security reasons.

## Benefits and Tradeoffs

Running agents outside the sandbox provides several benefits, including better dependency awareness, parallel execution, and structured handoff between tasks. However, this approach also raises questions about security and control.

The OmoiOS and Broccoli systems address these concerns through isolated sandboxes and supervisor agents. However, users must still weigh the benefits and risks of outside-the-sandbox execution.

## A Deeper Look at OmoiOS

OmoiOS is designed to automate the process of turning specs into PRs. It uses a supervisor agent to manage the process and ensure that everything stays on track. The system is built to handle complex tasks and dependencies, making it a powerful tool for developers.

One of the key features of OmoiOS is its ability to generate specs grounded in the existing codebase. This allows developers to build on what they already have, rather than starting from scratch. The system also includes a task DAG with real dependencies, which helps to ensure that tasks are completed in the correct order.

## Broccoli's Architecture

Broccoli's architecture is designed to take advantage of the power of AI agents. The system uses two Cloud Run workloads over a shared Postgres, which allows it to scale and handle large workloads. 

The deployment process for Broccoli is designed to be straightforward, with clear instructions and a simple setup process. However, users must still be mindful of security concerns and ensure that they have the necessary permissions and access.

## Industry Context

The push for outside-the-sandbox execution reflects a broader trend in AI development. As AI agents become more powerful, developers are looking for ways to scale their use and improve their reliability.

The use of AI agents in software development, for example, is becoming increasingly popular. AI agents can automate tasks, such as coding and testing, freeing up developers to focus on higher-level work.

However, the use of AI agents also raises questions about job displacement and the need for new skills. As AI agents become more prevalent, developers will need to adapt to new ways of working.

## History of AI Agent Harnesses

The concept of AI agent harnesses has been around for several years. Early implementations were often limited by their ability to scale and handle complex tasks. However, recent advances in AI and machine learning have made it possible to build more powerful and sophisticated harnesses.

OmoiOS and Broccoli are just two examples of the many AI agent harnesses that are currently available. Each has its own strengths and weaknesses, and developers will need to carefully evaluate their options before choosing a harness.

## Technical Mechanics

The technical mechanics of AI agent harnesses are complex and multifaceted. At a high level, harnesses use AI agents to automate tasks and workflows. However, the specifics of how this works can vary widely depending on the implementation.

In the case of OmoiOS, the system uses a combination of parallel agent swarms and isolated sandboxes to get work done. This approach allows for greater scalability and flexibility, while also ensuring that tasks are completed securely and reliably.

## Downstream Implications

The development of AI agent harnesses has significant downstream implications. As these systems become more prevalent, they are likely to have a major impact on the way that software is developed and deployed.

One of the key implications is the potential for increased productivity. By automating tasks and workflows, developers can focus on higher-level work and deliver software more quickly.

However, there are also potential risks and challenges associated with AI agent harnesses. For example, there is a risk that these systems could displace human workers or exacerbate existing biases.

## What to Watch

The development of AI agent harnesses and their deployment outside the sandbox is an area to watch. Key decisions, such as the adoption of OmoiOS and Broccoli, and regulatory actions, such as guidelines for AI agent development, will shape the future of AI agent use.

The next data point to watch is how these systems perform in real-world deployments. Will they deliver on their promises of improved performance and reliability? Only time will tell.

As AI agents become more prevalent, it's essential to track their development and deployment. The decisions made now will shape the future of AI agent use and its impact on industries and society as a whole.

## Future Developments

The future of AI agent harnesses is likely to be shaped by a number of factors, including advances in AI and machine learning, changes in regulatory requirements, and shifts in market demand.

One thing is certain: AI agent harnesses are here to stay. As these systems become more prevalent, it's essential to understand their potential benefits and risks, and to track their development and deployment over time.

