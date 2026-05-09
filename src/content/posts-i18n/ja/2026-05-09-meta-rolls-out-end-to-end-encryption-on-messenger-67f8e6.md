---
title: "Meta、Messengerでエンドツーエンド暗号化を展開"
date: 2026-05-09T09:26:43.388Z
tags: ["Meta","End-to-End Encryption","Messenger","Facebook"]
hero_image: "/hero/2026-05-09-meta-rolls-out-end-to-end-encryption-on-messenger-67f8e6.jpg"
hero_image_credit_name: "Jessica Lewis 🦋 thepaintedsquare"
hero_image_credit_url: "https://www.pexels.com/@thepaintedsquare"
visual_keyword: "lock"
description: "Metaは、MessengerとFacebookでエンドツーエンド暗号化を開始、インスタグラムのメッセージは現時点では暗号化されていない。"
sources_count: 2
locale: "ja"
canonical_slug: "2026-05-09-meta-rolls-out-end-to-end-encryption-on-messenger-67f8e6"
audio_path: "/audio/2026-05-09-meta-rolls-out-end-to-end-encryption-on-messenger-67f8e6.mp3"
audio_bytes: 585396
audio_mime: "audio/mpeg"
---

## Messengerに暗号化がやってくる

Metaは、MessengerとFacebookでエンドツーエンド暗号化を開始しました。これにより、ユーザーのメッセージ内容に同社がアクセスすることはできなくなりました。この変更は、SignalプロトコルとMetaのLabyrinthプロトコルに基づいており、数年をかけて開発され、アプリの全面的な再構築を必要としました。新しい機能には、メッセージの編集（最大15分）、24時間有効の消えるメッセージ、受信確認の制御などがあります。

## 仕組み

ユーザーがMessengerでメッセージを送信すると、メッセージは送信者のデバイスで暗号化され、Metaのサーバーに送信されます。つまり、Metaのサーバーが侵害されたとしても、暗号化されたメッセージは復号鍵なしには誰にも読めないようになっています。復号鍵は受信者のデバイスに保存され、送信者と受信者のみがメッセージを読むことができるようになっています。