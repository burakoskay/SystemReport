---
title: "AI Requests Emit 8.5× More CO₂ in Texas Than Sweden"
date: 2026-10-23T09:02:05.585Z
tags: ["ai","carbon","datacenters","energy"]
hero_image: "/hero/2026-10-23-ai-requests-emit-8-5-more-co-in-texas-than-sweden-7ddece.jpg"
hero_image_credit_name: "Mark Stebnicki"
hero_image_credit_url: "https://www.pexels.com/@nc-farm-bureau-mark"
visual_keyword: "data center with solar panels and coal plant contrast"
description: "Berget AI finds a single AI query releases over eight times the carbon in Texas compared to Sweden, highlighting grid‑mix impacts on inference emissions."
sources_count: 6
author: "maya-chen"
audio_path: "/audio/2026-10-23-ai-requests-emit-8-5-more-co-in-texas-than-sweden-7ddece.mp3"
audio_bytes: 602323
audio_mime: "audio/mpeg"
---

## The Texas‑Sweden CO₂ Gap

Berget AI measured the carbon intensity of a single AI inference request and found it releases 8.5 times more CO₂ in Texas than in Sweden. The disparity comes from the underlying electricity mix that powers the data centers handling the request.

The study used identical workloads on comparable hardware in the two regions and applied publicly available grid‑emission factors. Texas’ grid, still reliant on coal and natural gas, produced roughly 0.7 kg CO₂ per kilowatt‑hour, while Sweden’s largely hydro‑ and wind‑powered grid emitted about 0.08 kg per kilowatt‑hour. Multiplying the power draw of the inference by these factors yields the 8.5× gap.

## Why Grid Mix Matters

Electricity generation is the dominant source of emissions for AI inference. When a model processes a prompt, the GPUs consume power continuously; the carbon cost is then a function of the regional grid’s carbon intensity. In Texas, recent policy shifts have slowed the retirement of coal plants, keeping the grid’s average emissions high. In contrast, Sweden has pursued aggressive renewable integration, driving its grid carbon intensity into the single‑digit grams per kilowatt‑hour range.

The implication is simple: moving AI workloads to low‑carbon regions can slash per‑request emissions without changing the model or hardware. Companies that already operate multi‑regional data‑center fleets can shift inference traffic to greener zones during peak demand, much like cloud providers already do for cost optimization.

## Beyond Training: Inference Emissions

Most public discussions focus on the training phase, where a 2019 University of Massachusetts Amherst paper estimated up to 284,000 kg CO₂ for a large language model—roughly five times a car’s lifetime emissions. However, researchers at Algorithmwatch note that the application phase can account for up to 90 % of an AI system’s total lifecycle emissions. Each translation, search query, or chatbot answer adds a small but cumulative carbon bill.

Berget’s per‑request metric makes that cumulative effect visible. If a popular chatbot handles millions of queries daily from Texas‑based users, the aggregate emissions could rival those of a small city. By contrast, the same traffic served from Sweden would be a fraction of that, illustrating how inference location amplifies or mitigates the training‑phase footprint.

## Industry Response and Measurement Efforts

Google’s recent transparency report showed a 33× drop in median energy use and a 44× reduction in carbon per Gemini Apps text prompt over a year. The company attributes the gains to custom hardware, smarter cooling, and tighter workload scheduling. Yet the report also admits that absolute emissions still depend on the grid where the data center sits.

Berget’s methodology adds to a growing toolbox for measuring AI’s environmental impact. Their approach combines real‑time power monitoring with regional emission factors, offering a reproducible way to benchmark inference carbon. Other firms, including Microsoft and Amazon, have hinted at similar internal dashboards but have not released public data.

The broader tech community remains divided on how aggressively to act. Some executives argue that efficiency gains will outpace grid decarbonization, while others point to the 2‑4 % share of global CO₂ that data‑center infrastructure already represents—a figure comparable to aviation. The tension between hardware innovation and energy policy is likely to shape AI’s carbon trajectory for years.

## What to Watch

Stakeholders should track three developments: first, any public release of regional emission factors by major cloud providers, which would enable more precise cost‑benefit analyses; second, the rollout of renewable‑powered edge data centers that could bring low‑carbon inference closer to end users; and third, regulatory proposals that tie AI service pricing to carbon intensity, a move that could force firms to relocate workloads or purchase clean‑energy credits. The next quarterly earnings reports from the big AI players will likely reveal whether carbon accounting is becoming a material business concern.

