---
title: "Zoom’s Linux client reads clipboard, Android adds SELinux"
date: 2026-09-13T14:06:28.235Z
tags: ["linux","security","android","containers"]
hero_image: "/hero/2026-09-13-zoom-s-linux-client-reads-clipboard-android-adds-selinux-25f5ef.jpg"
hero_image_credit_name: "Tara Winstead"
hero_image_credit_url: "https://www.pexels.com/@tara-winstead"
visual_keyword: "Linux desktop with clipboard overlay and security icons"
description: "Zoom’s Linux client was found to snoop on clipboard data, Android 4.2 ships SELinux and VPN lockdown, and Qualys joins Red Hat to harden containers."
sources_count: 3
author: "ryan-tanaka"
audio_path: "/audio/2026-09-13-zoom-s-linux-client-reads-clipboard-android-adds-selinux-25f5ef.mp3"
audio_bytes: 571604
audio_mime: "audio/mpeg"
---

Zoom’s Linux client was observed pulling every string written to the X11 clipboard.  The behavior raises immediate privacy concerns for developers and power users who rely on the clipboard for secret tokens, passwords, and code snippets.[^1][^2][^3]

A Hacker News thread posted a link to a report that the Zoom desktop client on Linux reads the clipboard proactively, without user interaction.  The finding sparked a flurry of comments about the lack of a permission model for clipboard access on X11.  Users who run Zoom alongside other sensitive tools now have to consider a new attack surface: any process that can see the clipboard can also see what Zoom sees.[^1][^2][^3][^4]

Android 4.2 is set to ship a suite of security upgrades that will please sysadmins.  The new build embeds Security‑Enhanced Linux (SELinux) into the kernel and adds a VPN lockdown toggle that forces all traffic through a VPN or cuts off the network entirely.[^5]

The SELinux integration appears as a status line on the About Phone screen, offering three modes: disabled, permissive (logging only) and enforcing.  According to the Android teardown, the feature is optional and aimed at enterprise or government deployments rather than the consumer market.  The VPN lockdown option, also discovered in the Settings APK, disables ordinary internet access unless a VPN tunnel is active, a change that could simplify compliance for organizations that require all data to travel over encrypted channels.[^5]

Qualys announced a partnership with Red Hat to embed its Cloud Agent directly into Red Hat Enterprise Linux CoreOS and OpenShift.  The integration brings continuous vulnerability discovery to the container stack without the need for privileged sidecar containers.[^6][^7][^8]

The Qualys Cloud Agent is described as a lightweight daemon that typically consumes about 2 % of CPU, spiking to 5 % under load.  It runs self‑updating and self‑healing code, taking a full configuration snapshot of the host and pushing it to the Qualys Cloud Platform.  When the agent is baked into a container image, it enables policy‑driven monitoring and runtime blocking of unwanted behavior, regardless of where the container is instantiated.

Aaron Levey, Red Hat’s Head of Security Partner Ecosystem, said, “Qualys’ Cloud Platform and Cloud Agent helps administrators gain deeper visibility into known vulnerabilities that may be present on their Red Hat Enterprise Linux CoreOS nodes with pointers to associated Red Hat Security Advisories.”  Sumedh Thakar, Qualys’s president and CEO, added, “By collaborating with Red Hat, we have built a unique approach to secure Red Hat Enterprise Linux CoreOS that provides complete control over containerized workloads enhancing Qualys’ ability to help customers discover, track, and continuously secure containers.”

These three developments illustrate a broader shift toward tighter default security on open‑source platforms.  The Zoom clipboard issue shows how legacy desktop protocols like X11 still lack granular permissions, exposing user data to any well‑behaved application.  Android’s SELinux enforcement and VPN lockdown reflect Google’s push to bring enterprise‑grade controls to a platform that historically prioritized openness over hardening.  Qualys and Red Hat’s joint effort demonstrates that cloud‑native workloads are finally receiving the same continuous assessment that traditional VMs have enjoyed for years.[^1][^2][^3][^4][^5]

Historically, Linux desktop environments have treated the clipboard as a global resource.  X11 provides no sandboxing, meaning any client can read or write the selection buffer at any time.  Some Wayland compositors have begun to enforce per‑application policies, but most users still run X11 on their workstations.  The Zoom case underscores why the community has been advocating for a permission‑based clipboard API for over a decade.[^1]

SELinux itself originated in the early 2000s as an NSA‑backed set of kernel extensions that enforce mandatory access controls.  Android adopted a permissive default for years, only enabling enforcing mode on a handful of devices.  The move to expose SELinux status in the UI and to ship it as a core component of Android 4.2 signals a maturation of the platform’s security posture, aligning mobile devices with the expectations of corporate IT departments.

Container security has long suffered from the “host‑sidecar” model, where agents run with elevated privileges to monitor workloads.  By embedding Qualys code directly into images, Red Hat and Qualys eliminate the need for such sidecars, reducing the attack surface and simplifying operations.  The approach also dovetails with the industry’s shift toward supply‑chain scanning, where vulnerabilities are caught before containers ever run in production.[^7]

What to watch:  The Zoom client is expected to release a patched version that respects user consent for clipboard access; tracking the release notes will reveal whether the change is permanent.  Android 4.2’s SELinux enforcement will be confirmed once the final OTA lands, and developers should test their apps against the new policy.  Finally, the Qualys‑Red Hat integration will roll out across OpenShift clusters in the next quarter; monitoring adoption rates and any reported performance impacts will indicate how quickly enterprises embrace continuous container hardening.

[^1]: [daily.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQGgb8z3a7PHaLkdKKokRoKCvbpk8KZllsR5o2D2Si5m1a_Udjv7kdAmUjefDflznSbRFphMve2NPqAfZ_o0pCtVoF_6yUDmqmYPOdQTjmq1abyguUyKWbhqW6gzfUFC6obHBWsd0eIH-0EklAwO2IGtU008XCmlRnPonPZeo9eXNaelgASFY_dgA1zvOObi)
[^2]: [hachyderm.io](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHAqWaHCsNR2Qf9ATXgmcYNp1y8MAhuGnLRi6-S0Czb7fy679VUfBSCc_bfnnvHKVSi4pK3BJ1lN7U0-lEbXaqzks_mYdxZ0xIXyyWWOq_nZMe05dA7liOOZthGi0MT6rPmwL3kqaHtxYsWZPJMOU8=)
[^3]: [daily.dev](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHgG72gk8gMFi9ksggoSrrJ5khRznMz-REQHahesQvdmUqtXSMdBzKkTi7QRABjkWk39AQmZYEoTqCInBTAdeGHo-5bBiJf5vQo4RcY3a2IkC8B0QAR8kHXznrk1jwRCbTWjzujDfS6hJj0oGVCN_PYtZ8KPtG2kRO3xM3bM9nZXapN8KFYErycP93FtRYgNiZH5Xplps2E8PLnpK6K4Lj1PUsOagOK1X2HWHLVTo_6aHukshs4_aU_Sp0iTcC8F92t)
[^4]: [ycombinator.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQHWYJLI_7uYJGGOf32rNNLY1zN2dp2DMYZTAlGiB4ohVYUtr4lBOo302kQbGyB78KN8SnAbF8WilP74Bg_SStOljBxrWJvHIe01v8-4BzOOZoot6zpjxBL9m4CyhErdqwOelZLQcSSokw==)
[^5]: [reddit.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQF0lJ_0Wpw0BOaWeARuXkRHmXq4Q-1MZDLBOztlZxWKuvDzkvsg5KiocuC6sBM0eyQ-upaH_-aSR0QUoafbWp48ZvCjr67XCPQB4ls-PdKWJEg18b91NlZYUa5wAsGmA4pSzmltLVgSQ_ri28wFcVHwMTaDlf9vqlod6uOyI4uqF3lwSgRPU91V6RfdH0A_z9GsyL7IYAJ5)
[^6]: [qualys.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQES-fSfUoSXsnFeJQY3P2c1IzBMYaDBg5Aqx1AdM3tUOT8f-FSvz4moN2P3MyJ-a6lhn1-XRpt-k2pDcbhzPHsaPuPIfN4SbJSS2aRRukEUrRcmWZSXLmIJDe-QrAn1JSFamPdfz8WsFs5Po-emMIq0C6URMr9RINE1_82EqXgP6qJi850bMq2c-QXLT1Q_TeTtAubf-G1puZd1IA==)
[^7]: [qualys.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQELrxBSaxi5CMrpXgZYFgSCtecmTfMqoQEz9Oewou3XhbXlaKFw9no_OYONjZIn2-Jj4DxvHBQiG5mpGG9rFuZmBIcHx2aZ4T0eAlke1a-u3MRXQnESdVdpQz5sI1GfO5zE8cvZZqMDUCb26aBlseAj27Axd3H7UevRxELFDYCqDtJNAU4lzmBJeM9MA5Sy1Wa8ZdvSZbe9PzPYE7kgCZYQYcl1uyqmxTSl84lPnDnPVw8xJKcJJxdbbA==)
[^8]: [linuxsecurity.com](https://vertexaisearch.cloud.google.com/grounding-api-redirect/AUZIYQEYD_JqrfGWf6VxmmRgUQ2IDJ37WTMxMWd9W7j3LfpzQlaZZz4CY3pwafiqopgmBMM9OOaCMdh7kQEzVy97UQFWM5SRtBIiS1K04o8-vwOvNYoaGHuVG53qjyBCe6-CgWy7AJI9hSpSDXr84_1pffBn_H6eFOEGnNbNbw7w3PeiD4NSZf9s4AI-RY99dfgzfMivbh-xyBwrB8uMTs_L1b9RB_y1HhFVv0YsSPbGVbVfVeiRHA2_8xCqoKUlXs-caHRLY0jzfJwVnWxXSbaeO9jEKaqtqAqvDVVncXY=)
