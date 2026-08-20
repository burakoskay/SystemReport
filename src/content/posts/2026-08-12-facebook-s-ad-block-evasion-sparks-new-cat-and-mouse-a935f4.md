---
title: "Facebook’s ad‑block evasion sparks new cat‑and‑mouse"
date: 2026-08-12T15:21:15.446Z
modified_date: 2026-08-20T16:27:23.458Z
tags: ["facebook","adblocking","privacy","browsers"]
hero_image: "/hero/2026-08-12-facebook-s-ad-block-evasion-sparks-new-cat-and-mouse-a935f4.jpg"
hero_image_credit_name: "icon0 com"
hero_image_credit_url: "https://www.pexels.com/@icon0"
visual_keyword: "browser window with ad blocker icon and Facebook feed"
description: "Facebook tried to hide ads from blockers, but uBlock and AdBlock Plus quickly restored protection, exposing a fresh round in the ad‑blocking arms race."
sources_count: 5
author: "ryan-tanaka"
---


## The unblockable ads that weren’t

Facebook deployed a behind‑the‑scenes change on Tuesday that stripped the HTML markers that identify sponsored posts. The result was ads that blended into the News Feed, looking like ordinary updates. Users reported a flood of sponsored content even with vigilant blockers enabled.

uBlock Origin’s maintainers announced that the new format was “so hard to block that we stopped filtering them.” The statement appeared on Hacker News, where the post earned 119 points and sparked 102 comments. The blocker’s code simply gave up on the new signatures, leaving users exposed to the ads.

The move was a gamble. Facebook’s revenue model depends on impressions, and the company claimed the change gave users “more control” over what they see. In practice, it forced a large segment of the browser‑extension community to rewrite their filters from scratch.

## How the blockers fought back

Within 48 hours the open‑source ad‑blocking community released an update that restored protection. AdBlock Plus pushed a new filter to Easylist, the shared list that powers uBlock, AdGuard, and dozens of other extensions. The update re‑identified the non‑standard indicators Facebook introduced and stripped the ads again.

Ben Williams of AdBlock Plus wrote in a blog post, “This sort of back‑and‑forth battle … has been going on since ad blocking was invented.” He added that the fix “was just a matter of finding the non‑standard indicators they began using.” The community’s speed surprised Facebook’s own engineers, who noted the cat‑and‑mouse nature of the fight.

Facebook responded with a brief statement: “We’re disappointed that ad‑blocking companies are punishing people on Facebook as these new attempts don’t just block ads but also posts from friends and Pages. This isn’t a good experience for people and we plan to address the issue.” The acknowledgement that legitimate content was being removed showed the unintended side effects of the quick filter rewrite.

## The hidden blacklist of competitor names

While the ad‑format war made headlines, Facebook has long enforced a blacklist of terms in its ad‑creation tool. Four‑letter profanity is automatically rejected, and the names of rival social networks—MySpace, Friendster, Hi5, Orkut—are blocked outright. A hacker‑focused discussion on Hacker News noted that “Bebo” and “OpenSocial” slip through, as do “Microsoft,” “Yahoo,” “Google,” and “AOL.”

Startup founder Andy Jagoe discovered the rule when his attempt to promote the SMS‑bundling service 3Jam was denied. Jagoe told the forum, “It seems crazy to think that they consider us competitive. This is kind of weird. It is like censorship.” The block on 3Jam, a service that routes bulk texts through a Facebook app, suggests Facebook treats any platform that could siphon user engagement as a threat.

The blacklist reveals a broader strategy: Facebook protects its ad inventory by preventing competitors from buying space on its own platform. The policy is opaque, and the lack of a public list forces developers to discover the restrictions through trial and error.

## The broader ad‑blocking battle

Ad blocking is not a new phenomenon. Since the early 2000s, extensions have targeted intrusive banners, pop‑ups, and tracking scripts. Facebook’s recent maneuver shows how even a platform that once resisted blockers can try to outmaneuver them when revenue is at stake.

The technical arms race hinges on pattern matching. Blockers rely on known CSS classes, URL patterns, and DOM attributes. When a publisher changes those identifiers, the filter list must be updated. Communities like Easylist maintain a rapid response pipeline, but each update can inadvertently catch legitimate content, as Facebook’s “posts from friends” incident demonstrated.

From a user‑privacy perspective, the fight matters. Facebook ads can track interests across the web, and many users install blockers to prevent that profiling. When blockers fail, the user’s data becomes exposed again, undermining the privacy promise of the extension. Conversely, publishers argue that ad revenue funds free services; the tension remains unresolved.

## What to watch

The next flashpoint will be Facebook’s next code push. If the company introduces a new indicator set, we can expect another quick filter release from the Easylist maintainers. Monitoring the Easylist changelog and the AdBlock Plus blog will give the earliest clue. A second round of collateral damage—legitimate posts being hidden—could force Facebook to redesign its ad‑delivery pipeline rather than continue the cat‑and‑mouse game.

## Updates

- **2026-08-20** — The 2026 Startup Battlefield 200 is here — see who made the cut ([source](https://techcrunch.com/2026/08/20/the-2026-startup-battlefield-200-is-here-see-who-made-the-cut/))
