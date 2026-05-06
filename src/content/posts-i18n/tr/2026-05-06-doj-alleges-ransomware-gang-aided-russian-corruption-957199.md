---
title: "Adalet Bakanlığı, Ransomware Çetesi Rus Yolsuzluğuna Yardım Ettiği Yönünde İddia Sürdüyor"
date: 2026-05-06T21:25:08.167Z
tags: ["cybersecurity","ransomware","api-breach","supply-chain-attack","braintrust"]
hero_image: "/hero/2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199.jpg"
hero_image_credit_name: "Christina Morillo"
hero_image_credit_url: "https://www.pexels.com/@divinetechygirl"
visual_keyword: "cybersecurity breach investigation in a dimly lit server room"
description: "ABD'de bir ransomware grubuna Rus hükümet yolsuzluğuna yardım ettiği iddiasıyla dava açıldı."
sources_count: 3
locale: "tr"
canonical_slug: "2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199"
---

## Adalet Bakanlığı, Rus Devletine Bağlı Ransomware Grubuna Karşı İddianame Sunuyor

ABD'deki savcılar, bir ransomware grubunun Rus hükümet yolsuzluğunu, Rus devlet altyapısında açıkları kullanarak fonları devlete bağlı aktörlere yönlendiren siber saldırılarla mümkün kıldığını iddia ediyor. Bu hafta açıklanan iddianame, grubun vergi kaçırdığını ve askerlik hizmetini atlattığını, Rus devlet altyapısındaki açıkları kullanarak saldırılar düzenleyerek kar elde ettiğiniClaim ediyor. Bu dava, Batı hükümetlerinin siber suç ağlarını ulusal güvenlik tehditlerine nasıl bağladığı konusunda bir değişiklik işaret ediyor.

Grup, iddianamede adı gizli tutulan bir takma ad kullanarak faaliyet gösteriyor ve Dubai ve Britanya Virjin Adaları'ndaki şirketler aracılığıyla fidye parasını aklamaya yönelik "gelişmiş bir para aklama şeması" işletmekle suçlanıyor. Savcılar, grubun daha önce Rus devletine bağlı birimlere atfedilen zero-day açıklarını kullandığını belirtiyorlar, bu da iade çabalarını karmaşık hale getiren bir yasal gri alanı oluşturuyor.

## Braintrust, Bulut Aracında Güvenlik Açığını Takip Etti

Adalet Bakanlığı'nın açıklamasından saatler önce, AI altyapısı şirketi Braintrust, Amazon Web Services ortamının ihlal edildiğini açıkladı. Müşteri danışmanlığında, şirket tüm kullanıcıların saldırganların müşteri verilerini işleyen bir dahili sisteme eriştikten sonra API anahtarlarını hemen döndürmelerini tavsiye etti. Güvenlik ihlali, AI modeli eğitim.pipeline'leri hakkında meta verilere erişim sağladı, ancak doğrudan özel modellere veya veri kümelerine erişim içermedi.

Braintrust güvenlik ekibi, girişi 17 gün açık kalan yanlış yapılandırılmış bir S3 bucket'ına kadar takip etti. Şirket bu açığı düzeltti ve tam bir adli inceleme başlattı. Braintrust'un "AI mühendislik OS"ünü kullanan şirketler, üretim iş akışları boyunca kimlik bilgilerini yeniden oluşturmak için acil operasyonel ek yüklerle karşı karşıya kalıyor.

## Ay Süren Tedarik Zinciri Saldırısı Daemon Tools'u Vurdu

Bu olaylara paralel olarak, güvenlik araştırmacıları, 15 milyondan fazla geliştiricinin kullandığı bir disk imajı uygulaması olan Daemon Tools'a karşı bir tedarik zinciri saldırısını doğruladı. Kaspersky tarafından yapılan analize göre, malware bir yazılım güncellemesinde 15 Mart - 15 Nisan 2024 tarihleri arasında gömülüldü. Arka kapı oluşturan yükleyici, bir özel rootkit aracılığıyla kurbanların sistemlerinde kalıcı bir ayak izi oluşturdu ve Windows Defender'i atladı.

Saldırı vektörü, derleme işlem hattındaki bir üçüncü taraf bağımlılığına zarar vererek standart kod imzalama protokollerini atladı. Araştırmacılar, malware'nin SolarWinds ihlalinin kullanıldığı mesmafrastrüktür ile bağlantılı olduğuna dair kanıtlar buldular, ancak DOJ davasıyla doğrudan bir bağlantı kurulmadı. Kullanıcıların, güncellenmiş YARA kurallarıyla tam sistem taramaları çalıştırması tavsiye ediliyor.

## Siber Riskin Genişleyen Yüzeyi

Bu üç olay, modern siber tehditlerdeki derinleşen karmaşıklığı ortaya koyuyor. DOJ davası, suç gruplarının jeopolitik kör noktaları kullanarak devlet çıkarlarının fiili uzantıları haline gelebileceğini gösteriyor. Braintrust ve Daemon Tools ihlalleri ise tedarik zinciri açıklarının artık geleneksel entreprise yazılımla sınırlı olmadığını, AI altyapısı ve geliştirici araçlarını da etkilediğini vurguluyor.

İç Güvenlik Bakanlığı, AI iş akışlarındaki üçüncü taraf bağımlılıklarını denetlemek için yeni bir danışmanlık yayınladı. Rehber, özellikle model eğitim ortamlarındaki yama uygulanmamış bağımlılıkların risklerini vurguluyor, burada nawet meta veri ifşası düşmanca eğitim saldırılarına olanak tanıyabilir. Bu davalar birleşırken, teknik topluluk, modern saldırı vektörlerini ele alamayan eski güvenlik modelleriyle yüzleşmek zorunda kalıyor.

## İzlenecek Olaylar

DOJ, muhtemelen 45 gün içinde Moskova'da bir iade duruşması talep edecek, bu da Rusya'nın ABD siber suç iddialarına Budapest Sözleşmesi altında yanıt vermesini gerektirecek bir hareket olacak. Braintrust müşterileri, 1 Mayıs'a kadar bir formal güvenlik raporu beklemeli, bu rapor adli bulguları ve tazminat planlarını detaylandıracak. Daemon Tools kullanıcıları için kritik bir sonraki adım, bugünkü en son yapıyı (5.5.2+) güncellemek ve gelecekteki tüm güncellemeler için imza doğrulamasını içeriyor.