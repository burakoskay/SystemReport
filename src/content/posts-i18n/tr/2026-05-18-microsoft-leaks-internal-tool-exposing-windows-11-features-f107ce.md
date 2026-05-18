---
title: "Microsoft, Windows 11 Özelliklerini Açıklayan İç Araç Sızdırıyor"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "Sızdırılan StagingTool ve Recall güvenlik açığı, güç kullanıcılarına ve saldırganlara Windows 11 iç işlerine yeni erişim imkanı veriyor."
sources_count: 5
locale: "tr"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

## Microsoft'un Windows 11 Özelliklerini Açıklayan İç Araç Sızdırıldı

Microsoft'un iç aracı StagingTool'un yanlışlıkla yayınlanması, Windows güç kullanıcılarına gizli Windows 11 özelliklerine doğrudan erişim imkanı sağlamıştır. Bu durum, şirketin geliştirme sürecindeki şeffaflığını ve daha geniş bir güvenlik açığını ortaya koymuştur.

StagingTool, bir komut satırı uygulamasıdır ve özellik IDs'lerini değiştirerek, herhangi bir kullanıcının Microsoft'un A/B testlerini bypass etmesini ve yayınlanmamış özellikleri Insider önizleme sürümlerinde etkinleştirmesini sağlar. Bu sızıntı, uzun süredir devam eden üçüncü taraf ViveTool ile benzerlik göstermektedir, ancak Microsoft'un kendi bayrak sistemini kullanır.

## Herhangi Bir Kullanıcının Ekran Görüntülerinizi Çekmesine İzin Veren Recall Güvenlik Açığı

Microsoft, Recall zaman çizelgesini VBS enklavları, AES-256-GCM şifreleme ve Windows Hello kimlik doğrulaması ile yeniden oluşturduğunda, amaç açıkça görülüyordu: yakalanan ekran görüntüleri, OCR metni ve meta verileri güvenli bir kasada saklamak. Ancak pratikte, kasanın ön uç işlemi, AIXHost.exe, Protected Process Light, AppContainer veya kod bütünlüğü uygulama kısıtlamaları olmadan çalışır. Bu eksiklik, herhangi bir standart kullanıcı işleminin AIXHost.exe'ye kod enjekte etmesine ve aynı COM API'lerini kullanmasına izin verir.

## Görev Çubuğu Sonunda Kullanıcıların İstediği Seçenekleri Alıyor

Windows 11'in piyasaya sürülmesinden beş yıl sonra, Microsoft daha küçük bir görev çubuğu ve daha özelleştirilebilir bir Başlat menüsü test ediyor. Bu değişiklikler, varsayılan görev çubuğunun hantal olduğu ve Başlat menüsünün sınırlı kişiselleştirme seçenekleri sunduğu yönündeki uzun süredir devam eden şikayetleri gideriyor.

## İzlenmesi Gerekenler: Eylül Güncellemesi, Topluluk Araçları ve Microsoft'un Yanıtı

Sonraki büyük Windows 11 güncellemesi, Eylül ayında planlanmaktadır ve yerel RAR ve 7-Zip dosya işleme özelliği getirmektedir. StagingTool zaten yayında olduğundan, meraklılar bu işlevselliği resmi sürümden haftalar önce test edeceklerdir.

## Açıklık ve Kontrol Arasındaki Daha Geniş Gerilim

Bu iki hikaye - StagingTool'un sızıntısı ve Recall enjeksiyonu - Microsoft'un geliştirme felsefesindeki bir paradoksu vurgulamaktadır. Bir yandan, şirket bir "sürekli inovasyon" modeli benimser ve özellik bayraklarının ardında küçük değişiklikler yapar. Diğer yandan, bu mekanizmaların ortaya çıkması, güvenlik açıkları oluşturur.