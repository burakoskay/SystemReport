---
title: "ClojureScript'e Doğal Async/Await Desteği Eklendi"
date: 2026-05-08T14:16:34.187Z
tags: ["clojurescript","async","javascript"]
hero_image: "/hero/2026-05-08-clojurescript-adds-native-async-await-support-81c6b3.jpg"
hero_image_credit_name: "Stanislav Kondratiev"
hero_image_credit_url: "https://www.pexels.com/@technobulka"
visual_keyword: "developer typing async await code in a modern code editor"
description: "ClojureScript'in 7 Mayıs sürümü, async/await sözdizimini ekleyerek JavaScript uyumluluğunu sıkılaştırır ve Clojure hayranları için async kodu yeniden şekillendi"
sources_count: 5
locale: "tr"
canonical_slug: "2026-05-08-clojurescript-adds-native-async-await-support-81c6b3"
---

ClojureScript nihayet modern JavaScript'in dilini konuşuyor: async/await. Resmi ClojureScript haber sayfasında 7 Mayıs 2026'da yayınlanan yeni sürüm, asenkron işlevler için yerel sözdizimi ekler. Geliştiriciler artık `async (fn [] …)` ve `await` çağrılarını ham vaatlere düşmeden yazabilirler, bu da günlük kodlamada hemen hissedilen bir değişikliktir.

Duyuru https://clojurescript.org/news/2026-05-07-release adresinde yaşıyor ve Hacker News'de 149 puan aldı, 41 yorum canlı bir tartışma başlattı. Çekirdek ekip, JavaScript kitaplıklarıyla daha düzgün bir şekilde çalışmak için artan talebe bir yanıt olarak bu eklemeyi çerçeveledi. Postada hiçbir sürüm numarası verilmedi, ancak URL tarihi açıkça belirtti ve topluluk zaten bu özelliği gerçek projelerde test etmeye başladı.

## Async/Await ClojureScript Kodunu Nasıl Değiştirir

Bu değişiklikten önce, ClojureScript geliştiricileri asenkron JavaScript çağrılarını `js/Promise` nesnelerine sarar ve akışı yönetmek için `.then` zincirleri veya `core.async` kanalları kullanırdı. Bu kalıplar işe yarar, ancak ek boilerplate kodu ekler ve niyeti gizler. Yerel async/await ile basit bir `await (js/fetch url)` birden fazla adımdan oluşan vaat zincirinin yerini alır, böylece kod senkron Clojure gibi okunurken engelleyici olmayan davranışı korur.

Sözdizimi, mevcut Clojure makroları ile temiz bir şekilde entegre olur. Bir `async` bloğu, sadece bir makro daha `async function` tanımlar ve derleyici `await` işaret ettiği yerlere ekler. Bu, yeni bir çalışma zamanı tanıtılmaz; özellik, JavaScript motorunun yerleşik desteğine dayanır.

## Günlük Geliştirme İçin Hemen Faydalar

Pratik bir açıdan, yeni sözdizimi, geri çağrıları yönetmenin zihinsel yükünü azaltır. Bir Reagent uygulamasında tipik bir veri-getirme bileşeni şimdi düz bir Clojure `defn` gibi görünebilir ki `async` beyan eder ve içinde `await` kullanır. Sonuç daha kısa dosyalardır, `try/catch` ile daha net hata işleme ve stack izleri doğrudan orijinal ClojureScript kaynağına eşler.

Performans açısından, ölçülebilir bir ceza yoktur. Derlenen kod hala yerel JavaScript async işlevleri olarak çalışır, hangi modern V8 ve SpiderMonkey motorları agresif bir şekilde optimize eder. Gecikme konusunda endişe duyan geliştiriciler, `core.async` kullanarak ince taneli kontrolü sürdürebilirler, ancak çoğu HTTP çağrısı için varsayılan yol daha yalın async/await rotası olur.

## Topluluk Tepkisi ve Anlaşmazlık Noktaları

Hacker News iş parçacığı bir bölünmeyi ortaya koyar. Bazı yorumcular bu hamleyi “uzun süredir beklenen” olarak över ve sözdiziminin ClojureScript'i JavaScript ekosisteminin geri kalanıyla uyumlu hale getirdiğini, yeni gelenler için öğrenme eğrisini azalttığını belirtir. Diğerleri “semantik yayılma” konusunda endişe duyar: asenkronluğu işleyen başka bir yolun tanıtılması, zaten `core.async` a güvenen kod tabanlarını bölebilir.

Tekrar eden bir endişe, araçlardır. ClojureScript'i anlayan IDE'ler ve linter'ler, yeni makro formları tanımak için güncellemelere ihtiyaç duyar. Topluluk zaten popüler `clj-kondo` linter için çekme istekleri açtı, ancak tam destek sürümden sonra gelebilir. Araçlar yetişene kadar, geliştiriciler yanlış pozitifler görebilir veya otomatik tamamlama fırsatlarını kaçırabilir, bu da çekirdek ekibinin ele alması gereken bir sürtünme noktasıdır.

## Bu Daha Büyük Dil Peyzajına Nasıl Uyuyor

Async/await, JavaScript dünyasında yeni değil; ES2017'de indi ve o zamandan beri asenkron kodun fiili deseni haline geldi. TypeScript ve ReasonML gibi JavaScript'e derlenen diller, sözdizimini erkenden benimsedi. ClojureScript'in eklemesi, bu akranlarla birlikte getirir, uzun süredir devam eden bir iş birliği boşluğunu ortadan kaldırır.

Diğer diller, yakın zamanda Stack Exchange tartışmasında tartışıldığı gibi otomatik bağımlılık izleme keşfettiler. ClojureScript'in amaçları veri akışı dili olmayacak olsa da, async/await özelliği, boilerplate kodunu azaltma ve çalışma zamanının yayılmasını bırakma ruhunu paylaşır. Ayrıca Rust'ın `async/.await` ve Python'ın `asyncio` gibi modern programlama dillerinin benzer soyutlamalar için bir araya geldiği eğilimi yansıtıyor.

## İzlenmesi Gerekenler

Sonraki kilometre taşı benimseme eğridir. Gelecekteki Shadow-CLJS, Figwheel ve resmi derleyicinin kendisi gibi büyük ClojureScript araçlarının yayınlarını izleyin; async makrosunun güncellenmiş desteğini izleyin. Async/await tabanlı API'ler yayınlayan ilk gerçek dünya kütüphanelerine dikkat edin; bunların başarısı, topluluğun yeni deseni kabul edeceğini veya `core.async` ile bağlı kalacağını gösterir. Son olarak, Hacker News yorumlarını bir barometre olarak izleyin: eğer tartışma pratik ipuçları yerine itirazlar üzerine yerleşirse, async/await ClojureScript geliştiricileri için varsayılan async modeli haline gelebilir.