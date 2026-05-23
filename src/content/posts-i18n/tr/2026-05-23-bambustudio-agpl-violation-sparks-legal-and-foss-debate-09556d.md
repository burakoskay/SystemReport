---
title: "BambuStudio AGPL İhlali Yasal ve FOSS Tartışmasına Neden Oluyor"
date: 2026-05-23T13:56:41.536Z
tags: ["foss","agpl","software licensing","gpl","open source"]
hero_image: "/hero/2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d.jpg"
hero_image_credit_name: "Markus Winkler"
hero_image_credit_url: "https://www.pexels.com/@markus-winkler-1430818"
visual_keyword: "AGPL license agreement document next to a computer monitor showing code diffs"
description: "BambuStudio'nun PrusaSlicer'in bir çatalı AGPL şartlarını ihlal ediyor."
sources_count: 3
locale: "tr"
canonical_slug: "2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d"
---

## Açık Kaynaklı Hukuk Gerçek Dünyaya Giriyor

BambuStudio’nun PrusaSlicer’in bir çatalı, AGPL uyumuna ilişkin yasal bir fırtınaya neden oldu. İhlal sadece bir tekniklik değil, aynı zamanda kopyaleft lisanslarının katı karşılıklılık talepleri ile kurumsal araçların arasında bir çarpışmadır. Prusa topluluğu için bu, kod yeniden kullanımından değil, özel aktörlerin açık kaynaklı geliştirme faydalarını seçerek açık kaynaklı geliştirmenin yükümlülüklerini atlayıp atlayamayacakları konusunda değildir.

Uyuşmazlık, BambuStudio’nun PrusaSlicer’i nasıl değiştirdiği ve bu değişiklikleri kaynak kodunu paylaşmadan dağıtmaya devam ettiği etrafında döner. AGPL, herhangi bir ağ üzerinden dağıtılan türetilmiş eserlerin de açık kaynaklı olması gerektiğini gerektirir. Bambu’nun yaklaşımı - aracı çatal yapmak, özellikler eklemek ve bir SaaS sürümünü satmak - lisansın doğrudan hedefindedir. Prusa’nın lider geliştiricisi Josef Prusa, ihlali kod taahhütlerinde ve API farklılıklarında belgeledi, böylece mahkemenin göz ardı etmesi zor bir kağıt izi oluşturdu.

## Yasal Öncelikler Çarpışıyor

Açık kaynaklı lisanslama ticari çıkarlarla ilk kez karışmıyor. 2022’deki Versata vs. Ameriprise davası, şirketlerin GPL lisanslı kodla nasıl başa çıktığı konusunda daha derin bir hatayı ortaya çıkardı. Versata’nın Dağıtım Kanal Yönetimi yazılımları, GPL’deki VTD-XML’yi içeriyordu, ancak şirket bir özel lisansı tránhadı. Ameriprise bunu keşfettiğinde, GPL ihlalinin kendi yazılımlarının kullanımını geçersiz kıldığını iddia ederek karşı dava açtı. Dava, bir eyalet mahkemesinin GPL ihlali iddiasını dinleyip dinleyemeyeceğine bağlıydı - federal telif hakkı yasasının bunu önlediğine ilişkin mahkemenin kararıyla çözülen bir mesele.

Sonuç bir boşluk bıraktı. Mahkemeler şimdi bir prosedürel duvarla karşı karşıya: lisans uyumluluğuna karar verebilirler, ancak bir şirketin GPL altında bir ürünü açık kaynaklı olarak açmasını zorlayamazlar, aksi takdirde dava doğrudan telif hakkı ihlali olarak çerçevelemelidir. Bu tekniklik, ihlalcilerin lisansın tam gereksinimlerinden kaçınırken hala dağıtım üzerinden yasal risklerle karşı karşıya kalmalarına izin verir.

## AGPL Neden Proprietary Ekosistemler için Önemlidir

AGPL, GPL’deki bir açığı kapatmak için tasarlandı ve ağ hizmetleri için bile kaynak kodu açıklama gerektirir. GPL’nin aksine, yazılım dağıtımı odaklanırken, AGPL açıkça SaaS’ı bir dağıtım şekli olarak ele alır. BambuStudio’nun, değiştirilmiş PrusaSlicer kodunu bir barındırılan hizmete entegre eden SaaS modeli, AGPL ihlalinin yasal olarak uygulanabilir olmasını sağlar.

Prusa’nın savunuculuğu daha geniş bir gerilimi vurgulamaktadır: açık kaynaklı projelerin bütünlüklerini korumak için lisansları uygulamaları gerekir, ancak uygulama çoğu geliştiricinin sahip olmadığı kaynakları gerektirir. Bu dava, açık kaynaklı lisansların bulut öncelikli iş modelleriyle nasıl etkileşime girdiği konusunda bir hesaplaşma zorlayabilir. Eğer Prusa kazanır, SaaS’ın AGPL altında dağıtım olmadığına ilişkin bir öncü oluşturabilir - bu, endüstriyi etkileyebilecek bir değişimdir.

## İzlenecekler

BambuStudio davası muhtemelen bir mahkemenin SaaS’ın AGPL altında dağıtım olup olmadığına ilişkin Prusa’nın argümanını kabulüne bağlı olacaktır. Eğer Prusa kazanır, bu FOSS projelerinin bulut satıcılarına karşı lisanslarını uygulama için bir şablon olabilir. Tersi bir durumda, bir kayıp şirketleri AGPL’in hizmet modelleri etrafındaki belirsizliğini sömürmeye cesaretlendirebilir.

Paralel olarak, Versata davasının sonucu ticari yazılımlarda GPL ihlallerinin nasıl ele alındığını açıklığa kavuşturabilir. Bir mahkeme bir şirketin kodunu açık kaynaklı olarak açmasını zorlayamasa da,仍 de hasar veya yasaklama kararları verebilir. Her iki sonuç da açık kaynaklı bileşenler kullanan işletmeler için risk değerlendirmelerini yeniden şekillendirecektir. FOSS topluluğu - mahkemerden değil, davalardan değil - uyumluluk ile sömürü arasındaki çizginin nerede çekildiğine ilişkin net kurallara ihtiyaç duyar.