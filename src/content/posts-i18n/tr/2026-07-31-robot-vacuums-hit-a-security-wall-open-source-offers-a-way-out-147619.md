---
title: "Robot vakumlar, güvenlik duvarına çarptı, açık kaynaklı çözümler bir geçiş yolu sunuyor"
date: 2026-07-31T16:11:13.271Z
tags: ["robotvacuum","security","open-source","diy","robotics"]
hero_image: "/hero/2026-07-31-robot-vacuums-hit-a-security-wall-open-source-offers-a-way-out-147619.jpg"
hero_image_credit_name: "cottonbro studio"
hero_image_credit_url: "https://www.pexels.com/@cottonbro"
visual_keyword: "robot vacuum navigating a modern living room with a glowing LiDAR sensor"
description: "Ecovacs' Deebot X2 hacki, gizlilik riskleri açığa çıkarken, makerler açık kaynaklı, bulut dışı alternatifler ve Dyson nihayet robotunu piyasaya sürüyor"
sources_count: 6
locale: "tr"
canonical_slug: "2026-07-31-robot-vacuums-hit-a-security-wall-open-source-offers-a-way-out-147619"
audio_path: "/audio/2026-07-31-robot-vacuums-hit-a-security-wall-open-source-offers-a-way-out-147619.mp3"
audio_bytes: 641403
audio_mime: "audio/mpeg"
---

## $2.500 bir robot vakum, uzaktan bir webcam'a dönüştürülebilir

Sean Kelly, Ecovacs Deebot X2'i, güvenlik konusunda en yüksek seviyeyi umarak satın aldı, ancak Aralık 2023'te bir uyarıdan sonra, güvenlik araştırmacısı Dennis Giese, Bluetooth üzerinden *140 metrekare* uzaklıkta cihazı komutaya geçirebildiğini kanıtladı. Ona tam erişim hakkı veren bir yüklem gönderdi, onboard bilgisayara, Wi-Fi kimlik bilgilerine, günlüğe ve—kritik olarak—kameralara ve mikrofonlara erişim hakkı verdi. Ekovacs uygulamasından bir uyarı sesi olmadan, Kelly'nin ofis mutfak salonunu canlı video ile streamledi.

Bu çerçevede, en yüksek seviyede robot vakumlar bile gizli web kameralar gibi davranabilir. Kelly, deneyimi "evde.family'nızın önünde dolaşan ve size bakacak bir webcam gibi" olarak tanımladı. Dünya'nın en büyük ev-robotik şirketi Ecovacs, kamu açıklamasından sonra da bir düzeltme yayınlamadı, bu nedenle binlerce Avustralya evi ve dünya çapında binlerce kullanıcı gizlilik riskine maruz kaldı.

## Açık kaynaklı projeler kontrolü yeniden ele geçirmeye çalışıyor

Kornerjçiler sallanırken, maker topluluğu lokal çalışmak için alternatifler inşa ediyor. **OOMWOO**, açık-hafta ve açık-software bir robot vakumdan oluşur ve bir **Raspberry Pi 5 (4 GB)**, bir 2D LiDAR, ve 3D-baskılı parçalardan oluşur. Creator, **$100-$200**'lık parçalara sahip bir prototipin oluşturabileceğini ve tam-özellikli bir bina **$500-$600**'lık bir hedef olarak belirledi. Projeler, GitHub'da her bir CAD dosyası, firmware, ve ROS 2 tabanlı navigasyon kümelerini yayınlıyor ve ayrıca bir konfor kitini, bireyler bireysel bileşenleri arayarak tercih etmemek için sunuyor.

Hareket paralelinde, **Valetudo**, binlerce mevcut robot vakum için bir bulut-dışı firmware katmanını sunuyor. **2018**'de başlayan bu Apache-2.0-licensed kod, üretici kilitli bulut servislerine yer yerine yerel çalışır bir modda değiştiriyor. Geliştiricisi Sören Beye, indirmelere ve topluluk forumlarına dayanan aktif kullanıcı sayısının birkaç bin olduğunu tahmin ediyor. Valetudo, fabrika telemetri kanalı yerine sahipleri robot davranışını inceleme ve düzenleme seçeneği sunuyor.

Her iki proje de ortak bir felsefeyi paylaşıyor: kullanıcıların tam erişime sahip olmasını ve güvenlik delikleri kendi kendine patch olmasını sağlarlar. Ekovacs, yazılım kotası açık ve güncellemeler kontrol eden uzak bir şirket takımınca kontrol ediliyor, OOMWOO ve Valetudo ise yazılım kümelerini açıklıyor, bağımsız güvenlik incelemeleri için bağımsız güvenlik incelemelerini sağlar.

## Dyson nihayet 16 yıllık bir odysseiden sonra bir robotu piyasaya sürüyor

Dyson'un robotu, 2001 prototipinden beri beklenen **DC06**, Tokyo'daki bir lansmanda piyasaya sürüldü. Şirket, **16 yıl** boyunca sensörler, motorlar ve batarya kimyası üzerinde deneyler yaptı ve nihayet bir tasarım ortaya çıktı. Bu tasarım, **Dyson stick vakumlarında kullanılan dijital motoru** ve 45 derece bir alanı kaplayan bir panoramik lensi içeriyor. Bu lens, verileri bir işleyicinin girdikçe odanın geometrisini **30** kere saniyede hesaplıyor. Bu sayede robot, dokunuşunu ve karmaşık düzenlemelerle navigation yapabiliyor.

Dyson, bir Roomba modelinin **100 kere** daha fazla çekim gücü sunduğunu iddia ediyor, çünkü yüksek hızlı motoru ve dar açıklıklara girip çıkabilen bir fırçası var. Robot, **85 sensör** ve hafif bir kasa ile kütle problemi olan daha önceki **DC06**'un dezavantajlarını çözmüş. Japonya'da ilk olarak piyasaya sürülmesi, Dyson'un premium ev otomasyon donanımlarına değer veren bu pazara güvenine işaret ediyor. İngiltere'de daha yavaş bir şekilde kabul edilen bu conceptü atlatmak için Japonya'ya öncelik veriyorlar.

## Pazardaki bir ayrışmanın yolculuğu: Premium kilitli-lock ve DIY özgürlüğü

Ecovacs hacki, OOMWOO'nun parça listesi, Valetudo'nun kod tabanı ve Dyson'un üst düzey lansmanı, robot vakum ekosisteminin giderek genişleyen bir ayrılaşmasını gösteriyor. Bir tarafında, üreticiler konforu ile kapalı bulutları bir araya getiriyor ve bu, Deebot X2 örneğinde olduğu gibi, bir siyah kutu haline geliyor. Diğeri, bir büyüyen grup mühendis ve hobistanın "lokal-ilk" vakumları inşa ettiği, açık standartlar gibi ROS 2 ve Home Assistant kullanıyor.

Home Assistant örneğine ve eklemeli bir değiştirici olan Valetudo, fabrika güncellemeleri yerine bağımsız telemetriyi ortadan kaldırıyor. Dijital ve 3B baskı yapmayı seven makerler, OOMWOO'yu bir deneme alan olarak kullanmak için bir sınırlı bina hedeflerine sahiptir. Her iki yaklaşım, güvenlik patch'lerinin gecikmesi veya yokluğu durumunda da üretici güncellemelerine bağımlılığı azaltıyor.

Dyson'un girişimi, hesabı karmaşıklaştırıyor. İyileştirilmiş performansı için bir pahalı fiyat noktası ve gelişmiş sensör kümesi, marka itibarından ödün vererek bir turnkey çözümü isteyen kullanıcıları çekebilir. Yine de aynı kullanıcılar, Ecovacs olayı sonrasında kapalı yazılım kümelerine karşı endişe duyabilirler. Pişman bir seçim yapmaları gerekiyor: gizlilik garantileri bilinmeyen ve kilitli bir, yüksek performanslı cihazı kabul edebilirler ya da teknik yeteneklerine ve paraya yatırım yaparak DIY bina geçişi yaparak açıklık garantisi sunabilirler.

## Gelecek için ne izlemeli

Gelecek birkaç ayın açıkları, Ecovacs'ın Bluetooth açığını kapatan bir düzeltme yayınlamasını ve diğer büyük markaların—iRobot, Roborock, ve yeni Çinli oyuncular—benzer güvenlik açıkları yayınlamalarını görmemiz gerektiğini bekliyoruz. Valetudo GitHub'da, yeni robot modellerine destek eklemek için bir artış görmeyi bekliyoruz ve OOMWOO topluluğu, ilk tam-fonksiyonel bir hardwarı 2026 yılının sonlarına kadar gerçekleştirecek. Japonya'da Dyson satış rakamlarını izlemeliyiz, çünkü erken alıcılık oranı, kullanıcıların premium performans için açıklık için ne kadar hazırlık gösterdüğünü gösterecektir. Güvenlik, açıklık ve konforun gerilimi, gelecekteki ev robotlarını şekillendirecektir.