---
title: "Hacker News: OLED flicker, Apollo gun, CS books, NES games"
date: 2026-11-15T16:56:51.859Z
tags: ["hackernews","technology","history","gaming"]
hero_image: "/hero/2026-11-15-hacker-news-oled-flicker-apollo-gun-cs-books-nes-games-113a94.jpg"
hero_image_credit_name: "Pew Nguyen"
hero_image_credit_url: "https://www.pexels.com/@nguyendesigner"
visual_keyword: "collage of laptop screen, lunar module, stack of computer science books, retro game console"
description: "A look at four Hacker News threads: an OLED PWM issue on MacBook Pro, Apollo’s grenade launcher, a CS book list, and modern NES games."
sources_count: 5
author: "david-okafor"
---

## OLED PWM controversy on the MacBook Pro

Apple’s 14‑inch MacBook Pro ships with an OLED panel that relies on pulse‑width modulation for dimming.[^1][^2][^3][^4][^5][^6] Users report a low‑frequency flicker that triggers eye strain and headaches.[^1][^2][^7][^3][^8][^5] The thread that broke the story sits at 190 points and has drawn 92 comments on Hacker News.

The post links to a detailed write‑up that documents how the PWM frequency drops below 200 Hz at 30 % brightness.[^1][^2][^3][^8][^5] At that level the flicker becomes visible to a subset of users with high‑sensitivity eyes.[^1][^2][^7][^3][^8][^5][^6] The author measured the flicker with a photodiode and a cheap oscilloscope.[^1][^3][^4][^5] The data shows a 120 Hz waveform, well within the range that can cause discomfort.[^1][^2][^3][^8][^4][^5][^6]

Apple marketed the display as a visual upgrade over the previous Retina panel. The marketing claim ignored the ergonomics of PWM.[^1][^2][^8][^6] Competitors such as Dell and Lenovo have moved to DC‑dimmed OLED panels to avoid the issue. The community’s reaction is a mix of disappointment and demand for a firmware fix.

Some commenters suggest a software patch that raises the PWM frequency. Others argue that the hardware design is immutable and that a new chassis is the only remedy. The debate highlights a tension between glossy specs and real‑world usability.

## Apollo missions and the grenade launcher

A question on Space.StackExchange asks why a handful of Apollo flights carried a grenade launcher. The post earned 137 points and sparked 99 comments.

The community’s answers point to contingency planning. One answer cites mission transcripts that list a “hand‑held launcher” as part of the emergency kit. The rationale was to provide a mechanical means of breaking a stuck hatch or cutting tangled wiring.

Another answer notes that the launcher was never fired in flight. The presence of the device reflects a broader safety culture that favored redundancy. The discussion also mentions that later Apollo missions omitted the weapon as procedures improved.

The thread illustrates how archival documentation can surface obscure hardware choices. It also shows how hobbyist researchers piece together technical history from sparse logs and oral histories.

## Streetfighting computer scientists’ reading list

A user posted a curated bibliography titled “Book list for streetfighting computer scientists.” The submission sits at 100 points with 38 comments on Hacker News.

The list gathers titles that blend low‑level systems hacking with tactical thinking. It includes classic texts on operating‑system internals, exploit development, and hardware reverse engineering. The author annotates each entry with a brief note on why the book suits a “streetfighter” mindset.

Commenters praise the focus on practical skill building. One reply highlights a chapter on buffer‑overflow exploitation that remains relevant despite modern mitigations. Another points out that the list omits newer resources on Rust‑based security, sparking a side discussion about language trends.

The thread serves as a snapshot of a niche subculture that values gritty, hands‑on mastery over polished theory. It also reveals how Hacker News can act as a distribution channel for specialized knowledge.

## Modern NES games attract retro hobbyists

A blog post titled “My favourite modern NES games” earned 171 points and attracted 23 comments on Hacker News.

The author surveys homebrew titles released for the original Nintendo Entertainment System hardware in the past decade. Each game pushes the 8‑bit console’s limits with novel graphics tricks and inventive sound synthesis. The write‑up references specific cartridges that use MMC5 mapper extensions to increase ROM size.

Technical enthusiasts discuss how developers squeeze extra cycles by exploiting undocumented CPU opcodes. One comment notes a game that runs at 60 fps while rendering 256 × 240 pixels with a custom palette algorithm. Another highlights a title that implements a rudimentary physics engine despite the console’s lack of floating‑point support.

The conversation underscores a thriving DIY ecosystem that thrives on constraints. It also raises the question of whether modern indie developers will continue to target legacy hardware as a creative outlet.

## What to watch

The OLED PWM thread may prompt Apple to release a firmware update or a new panel revision. Keep an eye on Apple’s developer forums for any official response. The Apollo launcher discussion could surface new declassified documents as NASA continues its archival releases. Watch for updates on the CS book list as the community adds newer security literature. Finally, monitor the NES homebrew scene for upcoming cartridge releases that claim to break new technical ground. Each of these threads offers a concrete data point for tracking how niche technical debates evolve on Hacker News.


[^1]: [appleheadlines.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG-e5nAT7ghs2sbxnBbo3Y2hWVMnikhbvnRMisbDFxWihzNIiCYFnIWoQdlHntAbv1e5nXwmDLNSGnrQLrYtVtzu2WYigZ41uvlufwfJWC2uBaTKnG1awgMDVbTlCVlaP2-qOA5xpix_tF9m9WBFa11stKerfE9JxnxZt--QWnKxXUv)
[^2]: [macobserver.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF5lcSzUhIxjk5TbZX_YycYs-mBLrNf6TqSOy0hwNmF_8BgYCu2vTNuxeWeY3GHpW-AGdfDUX8dzHqyWqN1kaY1D6BAedUnD6D4dTgufj3jYr2G_VwudgoxbNwOZvaAlZ0XFlbVpRIkebSqIADSqQnM6WGrttDELw6RjwFvxQbF5uFojDt2q7ZbHBV5I2RwJbsx0LeOvwJCRnKhmZ_ebXk9EwuSCvFZyvv8sA==)
[^3]: [macrumors.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEdxgzHwS8fmB3uaN-zL9_Q7k0HtNL-ApxLQ6lyG-wqJZfq17_WvNOwDihdufPTPtoRddg1TTie7iyzlVRhXX9pziMOu5AoR695fL3JyINIYAG_a4J6QZdSCoaqP6wxuEjvhGDHI_FGmFaH_pT5gdLOGhM7bADyh0VIEqqLfaPfgZTIltgvaI9wXxjqlSqVc1f1O3xIHZotuqkBYAH2ie943Q==)
[^4]: [notebookcheck.net](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGIGrkjSD2aEQ8Vhhm9QuTfcpIwUoPEKTyr6yhskfPHIorYz7sVc3Eta4G08oUrkU9Nrz8-PZGX8auvv-N9ZyKeQwco-68jmQ38A3o6dyyTVctY8gqxAWO7YDGDUiSaDa541dq_Tm-V_4pj2gn6VgzoLbJ8dj76fHId8jxOPKBFErYbaNgXVzIodrmMdgBfoNLS7HHAwIgs0VzlG40EXIQMNA==)
[^5]: [mobidevices.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE1S88K1Gbca72-So8F_5aXVXmQSn66R8oulJzhrKIKCr47sDIpIDaDUu9q8OuLuf2qjbu7elOVH6w0pzKtJi8_VpEhcQTgADLAvX5FcAq3vwIWohL3m-czHVVrnM0J4VE7uipsRqqrMaJryieNdemd8s85Rfy4Tg==)
[^6]: [appleinsider.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGwAvVCNWrs0J4pd8plGQyhFJJQZ5xZc_pL5HHkax8R65y1JTS2Oc7yn94s0qATI7I2FBppGK_RCskOk-jCy1L2Xzc3eCvSDEFRMkaODZPGE5ZLq-ZA0DCJsigmPHymHCp_GtliC5rFjFmaO59soZtNhG0V8FK8Dnns8PGHbOc2JrG_RNeScvwKl44_y3kBhElmuqAyNheiZ4wTfQRgYUV9rGMUZy3GLw==)
[^7]: [medium.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUQptN4sqBIXDRFyaqt823j4aGDiaZAOPOFG6iltT7_-zMkuCusbOQiDsy4E82zK8ZeWa1KwW4ZIUcSurLANZENdyxJ6wqJv5rd54hjp7KOXjnhJBWSkh3FRBxSRPkrBg7Y8F-K8XDlyUuo62cb08KWbBG_4ovIWs3b0QOJ9rtw7Ln0JqVriq6YdLXWBX9arrYwVp2eMpq-pyUmK65nVktHQ2AzDu4EACUI3TCtbs_IggkNQ==)
[^8]: [oled-info.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQG188ts2C7d1XemFl1RTlX-3HHkDBZlPek1sF0F8x-AwI6n72H5hIiUCNzyea53WuVGrYbUVAqCCVNMWTa887uOFWPux0VMJN8OA3vzprXHtnHcyKXbXPDTYIZHOM4_ws5g8t-a1XsJ1Na4ZsW0Azuffh_t5j1mY1WLaU7Fd6XF6LF5QbPt9uXypcxO5nPj5iWXarlddtBMSgA5_kX6zlUlrw==)
