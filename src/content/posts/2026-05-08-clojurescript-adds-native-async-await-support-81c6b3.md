---
title: "ClojureScript Adds Native Async/Await Support"
date: 2026-05-08T14:16:34.187Z
modified_date: 2026-05-15T10:29:48.341Z
tags: ["clojurescript","async","javascript"]
hero_image: "/hero/2026-05-08-clojurescript-adds-native-async-await-support-81c6b3.jpg"
hero_image_credit_name: "Stanislav Kondratiev"
hero_image_credit_url: "https://www.pexels.com/@technobulka"
visual_keyword: "developer typing async await code in a modern code editor"
description: "ClojureScript's May 7 release brings async/await syntax, tightening JavaScript interop and reshaping async code for Clojure fans."
sources_count: 7
author: "ryan-tanaka"
---



ClojureScript finally speaks the language of modern JavaScript: async/await. The new release, posted on the official ClojureScript news page on May 7, 2026, adds native syntax for asynchronous functions. Developers can now write `async (fn [] …)` and `await` calls without dropping into raw promises, a change that feels immediate in day‑to‑day coding.

The announcement lives at https://clojurescript.org/news/2026-05-07-release and earned 149 points on Hacker News, with 41 comments sparking a lively debate. The core team framed the addition as a response to growing demand for smoother interop with JavaScript libraries that already rely on async/await. No version number is given in the post, but the URL makes the date clear, and the community has already started testing the feature in real projects.

## How Async/Await Changes ClojureScript Code

Before this change, ClojureScript developers wrapped asynchronous JavaScript calls in `js/Promise` objects and used `.then` chains or `core.async` channels to manage flow. Those patterns work, but they add boilerplate and obscure intent. With native async/await, a simple `await (js/fetch url)` replaces a multi‑step promise chain, making the code read like synchronous Clojure while preserving non‑blocking behavior.

The syntax integrates cleanly with existing Clojure macros. An `async` block is just another macro that expands to a JavaScript async function under the hood. Because ClojureScript already compiles to JavaScript, the transformation is straightforward: the compiler emits `async function` definitions and inserts `await` where the macro signals it. This means no new runtime is introduced; the feature leans on the JavaScript engine's built‑in support.

## Immediate Benefits for Day‑to‑Day Development

From a practical standpoint, the new syntax cuts the mental overhead of juggling callbacks. A typical data‑fetching component in a Reagent app can now look like a plain Clojure `defn` that declares `async` and uses `await` inside. The result is shorter files, clearer error handling with `try/catch`, and easier debugging because stack traces map directly to the original ClojureScript source.

Performance‑wise, there is no measurable penalty. The compiled code still runs as native JavaScript async functions, which modern V8 and SpiderMonkey engines optimize aggressively. Developers who care about latency can keep using `core.async` for fine‑grained control, but the default path for most HTTP calls becomes the leaner async/await route.

## Community Reaction and Points of Contention

The Hacker News thread reveals a split. Some commenters praise the move as “long overdue” and point out that the syntax aligns ClojureScript with the rest of the JavaScript ecosystem, reducing the learning curve for newcomers. Others worry about “semantic creep”: introducing another way to handle asynchrony could fragment codebases that already rely heavily on `core.async`.

A recurring concern is tooling. IDEs and linters that understand ClojureScript need updates to recognize the new macro forms. The community has already opened pull requests for the popular `clj-kondo` linter, but full support may lag behind the release. Until tooling catches up, developers might see false positives or miss out on auto‑completion, a friction point that the core team will need to address.

## How This Fits Into the Larger Language Landscape

Async/await is not new to the JavaScript world; it landed in ES2017 and has since become the de‑facto pattern for asynchronous code. Languages that compile to JavaScript, like TypeScript and ReasonML, adopted the syntax early. ClojureScript's addition brings it into line with those peers, eliminating a long‑standing interoperability gap.

Other languages have explored automatic dependency tracking, as discussed in a recent Stack Exchange thread about auto‑updating variables. While ClojureScript does not aim to become a data‑flow language, the async/await feature shares the spirit of reducing boilerplate and letting the runtime handle propagation. It also mirrors the trend toward declarative asynchronous patterns seen in Rust's `async/.await` and Python's `asyncio`, reinforcing the idea that modern programming languages converge on similar abstractions for concurrency.

## What to Watch Next

The next milestone is the adoption curve. Watch the upcoming releases of major ClojureScript tooling—Shadow‑CLJS, Figwheel, and the official compiler itself—for updated support of the async macro. Pay attention to the first real‑world libraries that publish async/await‑based APIs; their success will signal whether the community embraces the new pattern or sticks with `core.async`. Finally, keep an eye on the Hacker News comments as a barometer: if the debate settles into practical tips rather than objections, async/await may become the default async model for ClojureScript developers.

## Updates

- **2026-05-15** — Mira Murati Wants Her AI to ‘Keep Humans in the Loop’ ([source](https://www.wired.com/story/mira-murati-humans-in-the-loop-ai-models-thinking-machines/))
- **2026-05-10** — Get ready for the whisper-filled office of the future ([source](https://techcrunch.com/2026/05/10/get-ready-for-the-whisper-filled-office-of-the-future/))
