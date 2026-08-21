---
title: "AWS Codex billing bug, AI book raids, EU copyright shift"
date: 2026-08-21T08:46:52.442Z
tags: ["aws","ai","copyright","books","legal"]
hero_image: "/hero/2026-08-21-aws-codex-billing-bug-ai-book-raids-eu-copyright-shift-c94e56.jpg"
hero_image_credit_name: "Lee Campbell"
hero_image_credit_url: "https://www.pexels.com/@lee-campbell-18167"
visual_keyword: "tech newsroom desk with code and books"
description: "A bug on AWS Bedrock inflates Codex fees, AI firms threaten rare books, and EU courts rule AI output uncopyrightable."
sources_count: 6
author: "ryan-tanaka"
---

## AWS Bedrock bug inflates Codex charges

Developers noticed a sudden spike in their AWS bills after enabling OpenAI's Codex on Bedrock. The spike was not a pricing change; it was a bug that multiplied usage charges by ten.[^1][^2] The issue was logged in GitHub issue #37674 on the OpenAI Codex repository.[^3][^4] The issue thread quickly gathered 128 up‑votes on Hacker News and sparked a 40‑comment discussion about cost‑management and vendor accountability.[^1][^5][^3][^4]

AWS has not published a detailed post‑mortem, but the community observed that the bug only affected the "invoke" API endpoint.[^6][^7][^8] Users who called the endpoint once were billed for ten calls.[^1][^2] The error persisted for several days before a hot‑fix was deployed. The incident highlights the fragility of pay‑as‑you‑go models when hidden bugs distort consumption metrics.

## AI firms accelerate the digital erasure of physical books

A post on Anna's Archive warned that AI companies are systematically digitising and discarding physical volumes.[^4] The blog argued that the rush to train large language models is prompting firms to scan rare collections and then discard the originals. The article attracted 302 points on Hacker News and generated 220 comments, many of which debated the ethics of treating cultural heritage as data fodder.[^4]

The author cited recent collaborations between AI startups and university libraries that prioritize speed over preservation. Scanned copies are fed into proprietary corpora, while the physical books are left to deteriorate or are destroyed outright. Critics say the practice undermines centuries‑old preservation norms and creates a monopoly over knowledge that is difficult to audit.

## Amazon's fair‑use claim draws fire from the tech community

A blog post titled "It is a sign of the times that Amazon gets to call this fair use" sparked a heated thread on Hacker News.[^5] The piece argued that Amazon's recent litigation strategy stretches the doctrine of fair use to protect its own content‑aggregation services. The post earned 109 points and 81 comments, many of which called the argument "dangerous" and "self‑serving."[^5]

The author pointed to a recent district‑court ruling where Amazon claimed that embedding user‑generated reviews constituted fair use, even though the reviews were scraped from competitor sites. Legal analysts on the discussion noted that the ruling could set a precedent for other platforms to appropriate third‑party content with minimal compensation.

## EU courts refuse copyright protection for AI‑generated output

A Mathstodon thread announced that the European Union's top court ruled AI‑generated text is not eligible for copyright. The post, which gathered 169 points and 184 comments on Hacker News, quoted the court's language verbatim: "Works that lack a human author cannot enjoy the exclusive rights granted by copyright law."

The decision has immediate ramifications for startups that commercialise AI‑written articles, code snippets, and marketing copy. Without copyright, these firms cannot enforce licensing terms against downstream users. Commenters warned that the ruling could push AI developers toward alternative protection mechanisms, such as database rights or trade secret claims.

## Ox Alpha and the paradox of intelligence and happiness

A cryptic tweet from OpenRouter, referenced as "Ox Alpha," resurfaced in a discussion about why highly intelligent people often report lower life satisfaction.[^4] The tweet linked to an essay titled "Why aren't smart people happier? (2022)" published on Experimental History.[^4] The essay, which earned 161 points and 231 comments on Hacker News, surveyed psychological studies that connect high cognitive ability with increased rumination and social isolation.[^4]

The thread connected the essay's findings to the AI boom, suggesting that the very tools that amplify intelligence may also amplify the mental strain associated with it. Participants noted that developers working on large‑scale models often face burnout, echoing the essay's claim that intelligence alone does not guarantee well‑being.

## What to watch

Watch for AWS's next transparency report on the Bedrock billing bug. The company promised to reimburse affected customers, but the timeline remains unclear. Monitor the EU Intellectual Property Office for follow‑up guidance on protecting AI‑generated works through alternative legal frameworks. Finally, keep an eye on the emerging coalition of libraries and archivists pushing for a regulated scanning protocol that balances AI training needs with cultural preservation. The next months will reveal whether policy can keep pace with the rapid commodification of both data and knowledge.


[^1]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQE4K5wSKqwO9dLvDYLpgzJEu0_ofk0OVlOoP9ZW87WPzRsUf4SzS9ebZmRl9U6nUf_8wKYUqRlhSXF9NYNhbHf7ygA99BK1KffYuBIcaSRnTuA-nuY6YpznhaRG6M5EGI1DzPqS69xH)
[^2]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGz6XhFvWeK3XtJLNWO0qhDTAhIk539troXV3butUyevg9P7-7towP2ZrOqI_Z-mInkU7VT5ooV18DvJbF7iVqGSxk7l-uCNyffBzQLaGgb-JE9m572fin8UNGWs_JRYWeNZ88Uqz1y)
[^3]: [gab.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHEvLUADFZtBsjyq_Cz4BP-jCoG89oVN1NDYAsHP_lE5iwbDV7KWAG1L9TCKG1Rqqs2ieXHLPuc2pDqmXxbpVfZk9Sl5f3-LmzhVpTrQls_OYAX1nLUmE0Z8VSRWpm7Ze8aERsDTNZ5hvxsAvhI1482)
[^4]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEsHUv2gwhBQUEJg9_FUrPbga-HT6EZJIZn1BfDfmmWSQP3TRa22hFMLaTmKyHHQCds_YWHhZb9fnr2DzIvmQCq_it2kv0V8jeRDx915533K5ANxuHsSEs=)
[^5]: [gab.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQERbotVD-Orc63a63uEgdNooXgBXcPfcbuZDrul_o7RuBaGAU43sNoqmMJzxpxa7IKLMJTyDXlCc8Tr4xBkz_91eCG6eX0G4bHgc4ZvfEAUBI--ufN_yERT7s2PIRbfnfHgatgRc2kwS4xaMHMsBJH_)
[^6]: [amazon.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGzKEuyXMeKBvhhvJDHJ-rHZ7zTbigW5nfCIFUe0GSh6F_MT0gXZsvqAlPealaMM_zpxj3YRsgimmXh_33ymsXpQR2a-b_2upCwBINBvAHgyJFqZCxIKKyTJOpvy1WF9lBEqMKk3GhKTHml1LP3ozkuX1hUL-QKhSyFuYLuwyPsKkm-czeFB-vX6TADOaOrOKB8FY4=)
[^7]: [repost.aws](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEUYn6P323G2vgVeDWqfb0snkCEvVLuKxfzKeGgKPbFWLESJBFOTqebyvfQ0xytj72pIsGkWUyvDE4g2Xi6qrNAF-Z2qgDMxvlj_8SbGjSmHQaBdqHLcCnNuxFnpdQYf92ZZLcjiVWL9qhibfqZGDt_sgrvuAhITK3ZFqAliV7agQLNz7g2O1ujONGBao50M9vsnGVEgCBoyyGZjpqDz8_ju_jgjSkCdTfIBF0T4MLivc5ABecJLTTLOA==)
[^8]: [github.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGCu_Bj6c-FqKvfaJNFCM0hNEdReHUjirluUjBnnAElUNAEUmeIedaITlfFiLnzjtG6FDu5ZdsmLjIrfJjn_Ls0_3Lxc2aUeU4ayj7UbH7_uGetOOAb0Vec2HBBQhrGpGLWbBlUIR8=)
