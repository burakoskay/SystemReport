---
title: "Ghostty GitHub'den Ayrılıyor, Geliştiriciler Alternatifler Arıyor"
date: 2026-04-29T14:32:04.847Z
tags: ["github","alternatives","tooling","open-source","dev-ops"]
hero_image: "/hero/2026-04-29-ghostty-exits-github-developers-seek-alternatives-93bf5f.jpg"
hero_image_credit_name: "Markus Spiske"
hero_image_credit_url: "https://www.pexels.com/@markusspiske"
visual_keyword: "developers using terminal-based tools with minimal interface elements"
description: "Ghostty'nin GitHub'den ayrılması AgentKit ve Gottp gibi alternatiflere ilgiyi artırıyor"
sources_count: 5
locale: "tr"
canonical_slug: "2026-04-29-ghostty-exits-github-developers-seek-alternatives-93bf5f"
---

## Ghostty GitHub'den Etik Kaygılardan Ötürü Ayrılıyor

Sevilen terminal çoklayıcı Ghostty, GitHub'dan alternatif barındırma platformlarına geçişini duyurdu. Mitchell Hashimoto'nun blog gönderisinde detaylandırılan bu adım, projenin GitHub'ın recentelendirme stratejilerini reddetmesinden kaynaklanıyor. 2,935 Hacker News puanı ve 881 yorumla duyuru, geliştiricilerin özel platformlara bağımlılığı ve açık kaynaklı araçların etik trade-off'ları hakkında tartışmaları yeniden alevlendirdi.

Proje, katılımcılar tarafından yönetilen self-hosted bir Git sunucusuna geçecek. Hashimoto, özellikle GitHub'ın "veri çıkarma ürün" modelini eleştirdi, bu model kullanıcı aktivite metriclerini izleme ve kod kalıplarına erişimi satma dahil. Kullanıcılar için teknik olarak basit bir geçiş olan bu adımın, geliştiricilerin bağımsızlığı açısından daha geniş etkileri belirsiz.

## GitHub Öncesi İşbirliği Kısa Tarihi

GitHub kod deposu haline gelmeden önce, ekipler parçalı bir araç manzarasında geziniyordu. Smule'da 2010 yılında, geliştiriciler merkezi versiyon kontrol sistemleri olmadan Ruby on Rails ve Python/Django uygulamalarını yönettiler, bunun yerine manuel komut dosyaları ve Munin izleme kullanıyorlardı. Altyapının AWS örneklerinden self-hosted veri merkezlerine büyümesiyle, mühendisler günümüzün DevOps ekiplerinin göz ardı ettiği özel araçlar oluşturdular.

2011-2012'de AWS'den kendi altyapısına geçiş, bulut ekonomisi hakkında acı gerçekleri ortaya çıkardı. Başlangıçta bir maliyet tasarrufu deneyimi olarak başlayan bu girişim, AWS fiyatlarının engelleme haline gelmesiyle bir necessity haline geldi. Bu tarih, açık kaynaklı sürdürülebilirlik etrafındaki当前 tartışmaları yansıtıyor, burada platform bağımlılığı genellikle veri mülkiyeti ve satıcı kaldıracı şeklinde gizli maliyetleri gizliyor.

## AgentKit Açık Kaynaklı Alternatif Olarak Ortaya Çıkıyor

AgentKit çerçevesi, recently Hacker News'de sergilenen, deterministik routing modeliyle çoklu ajent AI geliştirmesine taze bir yaklaşım sunuyor. TypeScript geliştiricileri için oluşturulan bu framework, yerel MCP (Machine Control Protocol) desteği entegre ediypor ve Inngest ile birlikte hata toleranslı dağıtımlar için kullanılıyor. Sürüm 0.9.0, Inngest'i ayrı olarak kurmayı gerektiriyor, bu da tasarım tercihi olarak çalışma zamanı stabilitesini rahatlık üzerine önceliklendiriyor.

AgentKit'i farklı kılan, ajanların ağlar boyunca değiştirilebilir durumları paylaştığı durum tabanlı routing sistemidir. Belgeleme, somut örnekler sunuyor, örneğin Neon veritabanı entegrasyonu, ancak LangChain gibi kurulmuş çerçevelerle karşılaştığından benimseme karşı rüzgarla karşılaşıyor. Kod-merkezli yaklaşım, kontrol-odaklı geliştiricilere hitap ediyor, ancak öğrenme eğrisi, kutudan çıkan çözümler arayan ekipleri caydırabilir.

## Gottp Postman'ın Terminal Hakimiyetine Meydan Okuyor

API istemci alanında, Gottp terminal-yerel bir Postman ve Insomnia alternatifi olarak kabul görüyor. Go ile oluşturulan bu araç, TUI arayüzü aracılığıyla HTTP, GraphQL, WebSocket ve gRPC protokollerini destekliyor. .gottp.yaml formatı, koleksiyonlar ve ortam dosyaları için mevcut iş akışlarıyla uyumlu kalırken, istek mutasyonu ve yanıt doğrulaması için JavaScript ön/son komut dosyaları ekliyor.

Projenin, YAML dosyaları aracılığıyla tema özelleştirmesine verdiği önem, geliştirici ergonomisine vurgu yapıyor. Terminal iş akışlarına zaten yatırım yapmış takımlar için, bu, GUI araçlarıyla ilişkili bağlam değiştirme maliyetlerini ortadan kaldırıyor. Hacker News'de erken geri bildirimi (5 puan) ihtiyatlı iyimserlik gösteriyor, ancak Insomnia'ya karşı performans benchmark'ları henüz bekleniyor.

## Açık Kaynaklı Ekosistemler İçin Yol Haritası

Etik kaygılar ve teknik pragmatizm, geliştirici araçlarını yeniden şekillendiriyor. Ghostty'nin göçü, self-hosted altyapaya artan bir tercih olduğunu vurguluyor, AgentKit ve Gottp ise özel ekosistemlere karşı uygulanabilir alternatifler gösteriyor. Sonraki altı ay, bu projelerin momentumunu kurulu rakiplere karşı sürdürebileceklerini gösterecek.