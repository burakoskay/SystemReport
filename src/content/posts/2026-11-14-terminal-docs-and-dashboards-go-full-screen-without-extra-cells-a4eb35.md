---
title: "Terminal Docs and Dashboards Go Full‑Screen Without Extra Cells"
date: 2026-11-14T08:46:52.443Z
tags: ["terminal","tui","rust","go","open-source"]
hero_image: "/hero/2026-11-14-terminal-docs-and-dashboards-go-full-screen-without-extra-cells-a4eb35.jpg"
hero_image_credit_name: "Pixabay"
hero_image_credit_url: "https://www.pexels.com/@pixabay"
visual_keyword: "terminal window displaying a .docx file with colorful borders"
description: "New Rust and Go tools let developers view Word files and build TUI dashboards directly in the terminal, cutting UI overhead."
sources_count: 3
author: "ryan-tanaka"
---

Seeing a Word document render inside a terminal without a GUI is now a reality. Doxx, a Rust‑based .docx viewer, and Gotui, a Go dashboard library, both landed on Hacker News this week, and each promises to keep the terminal lean while adding rich interaction.[^1][^2][^3][^4][^5][^6]

Doxx drops the need for Microsoft Word entirely. The tool reads .docx files, lets you scroll, search, and even export tables as CSV.[^3][^7][^8][^6] It ships in Debian testing under the package name **rust-doxx** and appears in the Arch User Repository for the development branch.[^3] The AUR maintainer @mhegreberg and Nix flake author @bobberb are credited for keeping the builds alive. The viewer works out of the box with a default keymap, but you can swap to a vim‑style preset or hand‑edit the TOML config for custom bindings.[^3] If a key or action string fails to parse, Doxx warns on stderr and skips the entry, preserving the rest of the configuration.[^3]

The CSV export strips everything but tables, making it perfect for pulling structured data from business reports or research papers into Python or Excel.[^7] Equation placement can be off because Doxx relies on the docx‑rs parsing library; the maintainer has filed an upstream issue and promises a direct‑XML fix in version 0.[^3][^8]2.0. The project cites Charm's Glow package as inspiration, noting that Glow showed how a terminal can render Markdown beautifully.[^7] Doxx follows that ethos for Word files, delivering a fast, terminal‑native experience under an MIT license.[^3]

Gotui takes a similar philosophy to Go developers building TUIs. Carsen Klock released the library as a modernized fork of termui, built on tcell, with TrueColor support and flex‑layout rendering.[^1][^2][^4] The claim of “rounded borders” matters because a recent Hacker News post titled *Terminal borders that don't cost a cell* reminded the community that border drawing can waste screen real estate.[^1][^2] Gotui’s rendering engine claims to avoid that waste, delivering crisp borders without extra cells.[^1][^2] It also supports multiple border styles, title alignment, and a full suite of mouse events, including left, right, wheel up, and wheel down.[^1][^4]

Compatibility is a selling point. Gotui works as a drop‑in replacement for termui, so existing codebases can upgrade without a rewrite. The library ships with example dashboards that you can run via `go run _examples/dashboard/main.go` and individual widget demos.[^1] For remote workflows, Gotui can serve a TUI over SSH using `ui.InitWithConfig` together with gliderlabs/ssh, as demonstrated in the `_examples/ssh-dashboard` folder.[^1] The project invites contributions via pull requests, signaling an open development model.[^1]

Why do these tools matter beyond novelty? Developers who spend most of their day in a shell often juggle logs, config files, and occasional docs. Pulling a Word report into the same pane eliminates context switches, which can shave minutes off daily workflows. Likewise, a Go dashboard that respects cell budgets lets ops teams monitor metrics on low‑power servers or over slow SSH connections without sacrificing visual fidelity. Both projects also illustrate a broader trend: terminal applications are no longer limited to plain text; they now handle structured formats and rich UI elements.

The trade‑offs are clear. Doxx still struggles with precise equation placement, and its CSV export ignores surrounding text, which may force users to post‑process data.[^7][^8] Gotui’s reliance on tcell means it inherits any limitations of that backend, and developers must manage mouse event handling manually.[^1][^2] Neither project replaces a full‑featured IDE or office suite, but they fill a niche where speed and minimalism win.

Looking ahead, the next milestones will shape adoption. Doxx’s upcoming v0.2.0 promises a direct‑XML parser that could fix equation rendering and improve overall fidelity. Gotui’s roadmap mentions tighter integration with ratatui‑compatible widgets, which could broaden its ecosystem. Both projects sit on permissive MIT licenses, making them easy to embed in internal tooling.[^1][^3][^4]

What to watch: Doxx’s v0.2.0 release date, which the maintainer has hinted at in the issue tracker, and the first stable Gotui release that includes the promised TrueColor border optimizations.[^1][^2][^4] Keep an eye on the Hacker News discussions for community patches, especially around border rendering efficiency. Those updates will determine whether these tools move from hobby projects to staples of the terminal‑first workflow.

[^1]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF_a_u8EBVHCXF0GqJjDWAHVN_AWpSGJHxKshjHhZtvnysG04Fkl2pd0Y2VZeopdL7YX0qY2UAX9c8NChYmFzKS-M5fV7f_ZiJ2z9ZJpTOKti6OllTn84Y73xjmxGz9)
[^2]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGr_kW3FWxRVFJ-peFuBq0NqFdQvx2HbmJUkyYH_frMtuIRS1DslYuvaqXHm7-YL-Eqa3Run2tz5kVNKuFRXNYYPo3Rkq3kdpep7lFfbKGqgfhedDNWAGM_v0nQKYCe95xsTtLkz7Wz)
[^3]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGRZJZ9ZExl7BBs-CJExhrSDRwQBvUgHoaxyslubxolIZ0skriDJgHW7w77Vd4DAR-njPxl_ljXBKWNL7XtbbM5yjLccXHh6uTNy4jYU2mks4KKIhr9KILuizgH2Q==)
[^4]: [linuxlinks.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFSCHVduE0WZc7UaFsmk1m3yMpv1t95Ng4ALcm18x_qtCocGNabSAeX6SQLOU-YN0SL4_UEMeRuFp-UV5Xufq17cxdYrdTbEE7MdrkmJ1KDuRwiLztHn-IKkn8Q3G1IDWw8wlBB0puGIea7cyDcfeIdH4C8gAR18oMiEeuXtrhC2xUv5z0nrA==)
[^5]: [github.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGKi-8i7zNNfTuB4aP-YRrkZQmXie1UbyTxXTdGHScssLnBDPjUd_2X6yjC2wphyzK4S7BYMULvrwb5QzHqM4VJLCoZYNTXYhA15BTtZKNUxYrJw-UyosVjCJG3LQ==)
[^6]: [terminaltrove.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIeKSdT3p993238n2m9OyqZUlzsXc3Lx_sRWQESokZrv1KiWW9KvcD2Ua53LTnj2TdpQxqU8pd6P1EkD2E8wexl1F5RYxiSmJBDfIMzH5NUGI5JyVA0yBR4g==)
[^7]: [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQFiR_BTruY0Xf7gjcv9qv_Y61uPh1MDgvButpZK3jatU1O5jBjdWbLIssIAPXvXa44soc7n4ry93TZ3lKpsiYgHhReAOGL7txhiaABp1iRAtBB6KFrfwtrf-vWNvvPZu_kOVTpHiAEUw3KFAjXsUWzQxeflu3oZFNoab-VlxrAXbUo74Ro3iKRDN6teps0gfeq2I9U=)
[^8]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQH45EnylEu0cEqE8EFwASvPmbZ6YzgkUkf8gdS_heCptnWvMFoBoYgLVRFOHQHjkTGVbCWqW7vvtIV6pYti_T85rPFP78q2iarsPz6NuKrrFmC7xGr193Ey-Si73ZFgYigeB-fwQg==)
