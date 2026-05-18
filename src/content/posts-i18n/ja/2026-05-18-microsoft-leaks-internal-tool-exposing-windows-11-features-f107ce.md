---
title: "マイクロソフト、内部ツールを漏洩――Windows 11の新機能が明らかに"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "「StagingTool」や「Recall」脆弱性の漏洩により、Windows 11の内部的な機能が明らかになり、同時にセキュリティ上の懸念も浮上している。"
sources_count: 5
locale: "ja"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

## マイクロソフト、内部ツールを漏洩――Windows 11の新機能が明らかに

マイクロソフトが内部で使用している「StagingTool」が誤って公開され、Windows 11の隠れた機能が明らかになった。これにより、ユーザーは未公開の機能を有効にすることができるようになった。一方で、この漏洩はセキュリティ上の懸念も引き起こしている。

### StagingTool とは

StagingTool はコマンドラインアプリで、機能IDをトグルすることで、未公開の機能を有効にする。今回の漏洩により、ユーザーはこのツールを使って、Windows 11の新機能をいち早く試すことができるようになった。

## Recall の脆弱性――スクリーンショットの窃取が可能に

「Recall」機能に脆弱性が発見され、ユーザーのスクリーンショットが窃取される可能性がある。この脆弱性は、標準ユーザープロセスが AIXHost.exe にコードを注入し、COM API を乗っ取ることで悪用される。

### 脆弱性の詳細

脆弱性は、AIXHost.exe が Protected Process Light や AppContainer、コード整合性チェックを行っていないことに起因する。攻撃者は、2 ファイルのペイロード（totalrecall.exe と DLL）を使って、脆弱性を悪用することができる。

## タスクバーが刷新――ユーザーの要望に応える

Windows 11 のタスクバーが刷新され、よりカスタマイズ性が高くなった。今回の更新では、タスクバーのサイズが小さくなり、スタートメニューのカスタマイズも可能になった。

### 変更点

今回の更新では、タスクバーのアイコンがコンパクトになり、アイテムのピン留めやピン留め解除がより細かく制御できるようになった。これにより、ユーザーはより柔軟にタスクバーをカスタマイズすることができる。

## 今後の動向――9 月の更新とコミュニティのツール

マイクロソフトは、9 月に Windows 11 のメジャーアップデートを予定している。このアップデートでは、ネイティブの RAR や 7-Zip ファイルのサポートが追加される予定だ。一方で、コミュニティのツールや脆弱性の発見が、マイクロソフトの開発プロセスにどのような影響を与えるかは注目されるところだ。