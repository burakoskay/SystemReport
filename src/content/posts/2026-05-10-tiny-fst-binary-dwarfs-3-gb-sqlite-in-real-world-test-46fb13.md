---
title: "Tiny FST Binary Dwarfs 3 GB SQLite in Real‑World Test"
date: 2026-05-10T19:15:04.361Z
tags: ["opensource","databases","performance","hackernews"]
hero_image: "/hero/2026-05-10-tiny-fst-binary-dwarfs-3-gb-sqlite-in-real-world-test-46fb13.jpg"
hero_image_credit_name: "Muhammed Ensar"
hero_image_credit_url: "https://www.pexels.com/@mecanbay"
visual_keyword: "developer comparing massive database file to tiny binary on laptop screen"
description: "A Hacker News post shows a 10 MB finite‑state transducer replacing a 3 GB SQLite DB, sparking debate on storage efficiency and platform fatigue."
sources_count: 10
author: "ryan-tanaka"
audio_path: "/audio/2026-05-10-tiny-fst-binary-dwarfs-3-gb-sqlite-in-real-world-test-46fb13.mp3"
audio_bytes: 593338
audio_mime: "audio/mpeg"
---

## FST Wins Over SQLite in One Developer’s Experiment

A developer swapped a 3 GB SQLite database for a 10 MB finite‑state transducer binary and cut storage by 99.7%. The change was posted on Hacker News under the title *Replacing a 3 GB SQLite db with a 10 MB FST (finite state transducer) binary* and quickly earned 141 points and 27 comments.

The original post links to a personal blog where the author describes extracting a static dictionary from a mobile app and compiling it into an FST. The author notes that the SQLite file occupied three gigabytes on disk, while the generated FST binary measured roughly ten megabytes. The author also reports that lookup latency dropped from milliseconds to microseconds, though the post does not provide exact timing numbers.

The community response focused on the trade‑off between flexibility and size. Several commenters praised the space savings for embedded devices, while others warned that the FST format is read‑only and unsuitable for workloads that require frequent updates. The discussion highlighted that the technique shines when the data set is static and query patterns are well understood.

## Why Size Still Matters in Cloud‑Native Apps

Modern services run on containers that share limited storage quotas. A 3 GB file can push a pod over its allotted volume, forcing operators to provision larger disks or move data to external volumes. Reducing a core data artifact to ten megabytes eliminates that friction.

The post’s author cites a use case in an Android app that bundles a language model. The app’s APK size limit forced the developer to compress the model aggressively. By switching to an FST, the app stayed under the size ceiling while preserving near‑instant lookup performance.

Critics point out that SQLite offers ACID guarantees and a rich query language, features the FST cannot match. For applications that need transactional updates, the space win may be irrelevant. The conversation on Hacker News reflects this split: some users propose hybrid approaches, keeping a small SQLite shim for mutable data while using an FST for the static backbone.

## The Broader Signal: Platform Fatigue on Hacker News

The FST experiment landed on the same day a separate post titled *GitHub is sinking* appeared on Hacker News. The GitHub article, published on April 29 2026, gathered 108 points and 73 comments. Although the two topics differ, both threads reveal a growing concern among engineers about platform bloat and sustainability.

Commenters on the GitHub thread lament rising subscription costs, feature creep, and the perceived erosion of open‑source values. The tone mirrors the FST discussion, where developers champion leaner alternatives to heavyweight tools. Both conversations suggest a community appetite for solutions that prioritize efficiency over ever‑expanding feature sets.

A third thread, *Think Linear Algebra (2023)*, attracted 110 points and 11 comments. It links to an interactive textbook that teaches linear algebra through code. The thread’s popularity underscores that technical audiences value practical, code‑first resources—a trend that aligns with the hands‑on nature of the FST experiment.

Together, these posts paint a picture of a developer community that is both technically sophisticated and increasingly skeptical of bloated abstractions. The emphasis on concrete, measurable gains—whether in storage, cost, or learning—drives the discourse.

## What to Watch: Storage Choices and Community Sentiment

The next week will reveal whether the FST approach gains traction beyond niche projects. Watch for follow‑up posts that benchmark the technique against other compact data structures, such as succinct tries or Bloom filters. Also monitor GitHub’s response to the *GitHub is sinking* criticism; any policy shift or pricing adjustment could validate the community’s concerns.

For teams wrestling with large static datasets, the FST experiment offers a data‑driven proof point: a ten‑megabyte binary can replace a three‑gigabyte relational file without sacrificing lookup speed. The real test will be whether the trade‑off in mutability fits production pipelines. As the Hacker News community continues to surface these efficiency stories, the pressure on larger platforms to justify their resource footprints will only grow.