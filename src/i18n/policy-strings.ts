// Localized copy for the four public policy pages: About, Contact, Privacy, Terms.
// Pattern mirrors tool-strings.ts: one Record<Locale, T> per page.
// Address block is a constant — addresses don't translate.
import type { Locale } from './tool-strings';

export const ADDRESS_LINES = [
  'System Report',
  'Barbaros Mah. Begonya Sk.',
  'Nidakule Ataşehir Batı No: 1/2',
  '34758 Ataşehir, İstanbul',
  'Türkiye',
];

export const CONTACT_EMAIL = 'contact@systemreport.net';

export interface PolicyPage {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lastUpdated?: string; // privacy/terms only
  bodyHtml: string;
}

// Body HTML uses the same `prose` Tailwind classes as the existing English
// pages. Allowed tags: h2, p, ul, li, strong, em, a (with target/rel),
// address, br. No inline styles or scripts.

export const ABOUT: Record<Locale, PolicyPage> = {} as Record<Locale, PolicyPage>;
export const CONTACT: Record<Locale, PolicyPage> = {} as Record<Locale, PolicyPage>;
export const PRIVACY: Record<Locale, PolicyPage> = {} as Record<Locale, PolicyPage>;
export const TERMS: Record<Locale, PolicyPage> = {} as Record<Locale, PolicyPage>;

// ─── English ────────────────────────────────────────────────────────────────
ABOUT.en = {
  metaTitle: 'About — System Report',
  metaDescription: 'System Report delivers in-depth analysis and expert commentary on the tech stories that matter.',
  h1: 'About System Report',
  bodyHtml: `
<p class="lead">System Report is a tech news publication focused on delivering clear, well-researched analysis of the stories shaping the technology industry. We cut through the noise to surface what actually matters.</p>
<h2>What We Cover</h2>
<p>We cover the full spectrum of the tech landscape, including:</p>
<ul>
<li><strong>Silicon &amp; Hardware</strong> — Chip architecture, device launches, and the semiconductor supply chain.</li>
<li><strong>Artificial Intelligence</strong> — Model breakthroughs, enterprise adoption, and the societal impact of AI.</li>
<li><strong>Software &amp; Platforms</strong> — Developer tools, cloud infrastructure, and the evolving platform economy.</li>
<li><strong>Policy &amp; Regulation</strong> — Digital governance, antitrust, and the global regulatory landscape.</li>
<li><strong>Security &amp; Privacy</strong> — Threat intelligence, vulnerability disclosures, and data protection.</li>
<li><strong>Startups &amp; Venture</strong> — Funding rounds, market shifts, and emerging technology companies.</li>
</ul>
<h2>Our Approach</h2>
<p>Every article on System Report is original. We don't rehash press releases or rewrite headlines. Our editorial process involves reading multiple primary sources, distilling the key facts, and producing a comprehensive take that gives readers a complete picture in a single read.</p>
<h2>Our Standards</h2>
<p><strong>Accuracy first.</strong> Every claim is cross-referenced against multiple sources before publication. <strong>No clickbait.</strong> Headlines tell you what happened. <strong>No paywall.</strong> All content is free to read. <strong>Fast and private.</strong> Static architecture means instant page loads and no tracking cookies.</p>
<h2>Contact</h2>
<p>Have a tip or a correction? Email us at <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> or visit our <a href="__CONTACT__">contact page</a>.</p>
`,
};

CONTACT.en = {
  metaTitle: 'Contact — System Report',
  metaDescription: 'Get in touch with the System Report editorial team — story tips, corrections, advertising inquiries, and general questions.',
  h1: 'Contact',
  bodyHtml: `
<p class="lead">We read every message. The fastest way to reach the System Report editorial team is by email.</p>
<h2>Email</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>We aim to respond within two business days.</p>
<h2>Mailing Address</h2>
<address>__ADDRESS__</address>
<h2>What to write about</h2>
<ul>
<li><strong>Story tips</strong> — Send a brief summary and any relevant links. Confidentiality is respected on request.</li>
<li><strong>Corrections</strong> — Point us to the article and the specific claim. We post corrections promptly and transparently.</li>
<li><strong>Press &amp; product briefings</strong> — Embargoed announcements and pre-briefings welcome. Please include the embargo time in the subject.</li>
<li><strong>Advertising</strong> — Sponsorship and partnership inquiries should include your company, target audience, and proposed timing.</li>
<li><strong>Permissions</strong> — Republication, syndication, and translation requests are reviewed case by case.</li>
<li><strong>Privacy</strong> — Questions about how this site handles data are answered in our <a href="__PRIVACY__">Privacy Policy</a>.</li>
</ul>
<h2>What we don't do</h2>
<p>System Report does not provide tech support for products we cover, individual investment or legal advice, or paid placement disguised as editorial.</p>
<h2>Editorial independence</h2>
<p>Our editorial decisions are made independently of advertisers, sponsors, and the companies we cover. If a piece is sponsored, that relationship is disclosed clearly in the article itself.</p>
`,
};

PRIVACY.en = {
  metaTitle: 'Privacy Policy — System Report',
  metaDescription: 'System Report privacy policy — what data is collected, how it is used, and your rights.',
  h1: 'Privacy Policy',
  lastUpdated: 'Last updated: April 2026',
  bodyHtml: `
<h2>The Short Version</h2>
<p>System Report is a static website. We don't use cookies, we don't track you across the web, and we don't collect personal data from readers ourselves. Third-party services we embed (analytics, ads) may set their own cookies, as described below.</p>
<h2>Analytics</h2>
<p>We use <strong>Cloudflare Web Analytics</strong>, a privacy-first service that does not use cookies, does not track users across sites, does not collect personally identifiable information, and does not fingerprint browsers. Only aggregated, anonymous metrics such as page views, referrers, and countries are collected.</p>
<h2>Advertising</h2>
<p>This site may display ads served by <strong>Google AdSense</strong>. Google and its partners use cookies and similar technologies to serve ads based on your visits to this and other sites. You can opt out of personalized advertising via <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>. For more information, review <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google's advertising privacy policy</a>.</p>
<h2>Data Collection</h2>
<p>System Report does not collect, store, or process personal information directly. There is no user registration, no comment system, and no server-side processing of reader data on our infrastructure.</p>
<h2>Third-Party Services</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN hosting and privacy-respecting analytics.</li>
<li><strong>Google Fonts</strong> — Served via Google's CDN for typography.</li>
<li><strong>Google AdSense</strong> — Advertising (may use cookies; see above).</li>
<li><strong>Pexels</strong> — Stock photography loaded from Pexels CDN.</li>
</ul>
<h2>Your Rights</h2>
<p>Because System Report does not collect or store personal data, there is nothing for us to access, correct, export, or delete on your behalf. If you have used Google's services on or off this site, you can manage that data through Google's <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Data &amp; privacy</a> controls.</p>
<h2>Children's Privacy</h2>
<p>System Report is a general-audience publication and is not directed to children under 13. We do not knowingly collect any information from children.</p>
<h2>Changes to This Policy</h2>
<p>We may update this policy from time to time. The "Last updated" date at the top of this page reflects the most recent revision.</p>
<h2>Contact</h2>
<p>Questions about this privacy policy can be sent to <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> or by mail to:</p>
<address>__ADDRESS__</address>
`,
};

TERMS.en = {
  metaTitle: 'Terms of Use — System Report',
  metaDescription: 'The terms governing your use of System Report, including content licensing, disclaimers, and acceptable use.',
  h1: 'Terms of Use',
  lastUpdated: 'Last updated: April 2026',
  bodyHtml: `
<h2>Agreement</h2>
<p>By accessing or using System Report (the "Site"), you agree to these Terms of Use. If you do not agree, please do not use the Site.</p>
<h2>Editorial Content</h2>
<p>All articles, analysis, and commentary published on System Report are produced by our editorial team. Where a piece draws on external reporting, primary sources are referenced or linked. We strive for accuracy but make no warranty that every detail is free of error; readers should verify time-sensitive claims against primary sources before acting on them.</p>
<h2>Intellectual Property</h2>
<p>All original editorial content on this Site — including text, headlines, illustrations, and layout — is the property of System Report and is protected by copyright. You may share excerpts with proper attribution and a link back to the original article. Republication of full articles, commercial redistribution, or use of our content to train machine-learning models requires prior written permission. Email <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> for licensing inquiries.</p>
<h2>Hero Images</h2>
<p>Editorial hero images are sourced from <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> under the Pexels License or similar royalty-free terms. Photographer attribution is provided where required. Pexels imagery is not part of System Report's licensable content and is governed by its original license.</p>
<h2>Third-Party Links</h2>
<p>Articles routinely link to external sites for reference. We are not responsible for the content, accuracy, privacy practices, or availability of third-party sites. A link does not constitute endorsement.</p>
<h2>Advertising</h2>
<p>This Site may display advertisements served by Google AdSense and other ad networks. Ads are clearly distinguishable from editorial content. Information about how ad providers use cookies is available in our <a href="__PRIVACY__">Privacy Policy</a>.</p>
<h2>Acceptable Use</h2>
<p>You agree not to scrape, mirror, or systematically harvest the Site without permission; use the Site to train or fine-tune machine-learning models without a separate license; attempt to interfere with the Site's normal operation, security, or availability; or misrepresent System Report content as your own or as endorsed by us.</p>
<h2>Disclaimer of Warranties</h2>
<p>The Site is provided "as is" and "as available." To the maximum extent permitted by law, System Report disclaims all warranties, express or implied. Nothing on this Site constitutes financial, legal, medical, or professional advice.</p>
<h2>Limitation of Liability</h2>
<p>To the maximum extent permitted by law, System Report shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your access to or use of the Site.</p>
<h2>Governing Law</h2>
<p>These Terms are governed by the laws of the Republic of Türkiye, without regard to conflict-of-laws principles. Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Istanbul.</p>
<h2>Changes</h2>
<p>We may revise these Terms of Use at any time. Continued use of the Site after a revision constitutes acceptance of the updated terms.</p>
<h2>Contact</h2>
<p>Questions about these terms can be sent to <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> or by mail to:</p>
<address>__ADDRESS__</address>
`,
};

// ─── Türkçe ─────────────────────────────────────────────────────────────────
ABOUT.tr = {
  metaTitle: 'Hakkında — System Report',
  metaDescription: 'System Report, teknoloji dünyasında önemli olan haberlere derinlemesine analiz ve uzman yorumu sunar.',
  h1: 'System Report Hakkında',
  bodyHtml: `
<p class="lead">System Report, teknoloji endüstrisini şekillendiren haberleri net ve iyi araştırılmış analizlerle aktaran bir teknoloji yayınıdır. Gürültüyü kesip gerçekten önemli olanı öne çıkarıyoruz.</p>
<h2>Neleri Ele Alıyoruz</h2>
<p>Teknoloji manzarasının tüm yelpazesini kapsıyoruz:</p>
<ul>
<li><strong>Silikon ve Donanım</strong> — Çip mimarisi, cihaz lansmanları ve yarı iletken tedarik zinciri.</li>
<li><strong>Yapay Zekâ</strong> — Model atılımları, kurumsal benimseme ve YZ'nin toplumsal etkisi.</li>
<li><strong>Yazılım ve Platformlar</strong> — Geliştirici araçları, bulut altyapısı ve gelişen platform ekonomisi.</li>
<li><strong>Politika ve Düzenleme</strong> — Dijital yönetişim, antitröst ve küresel düzenleyici ortam.</li>
<li><strong>Güvenlik ve Gizlilik</strong> — Tehdit istihbaratı, güvenlik açığı bildirimleri ve veri koruma.</li>
<li><strong>Girişimler ve Risk Sermayesi</strong> — Finansman turları, pazar değişimleri ve yükselen teknoloji şirketleri.</li>
</ul>
<h2>Yaklaşımımız</h2>
<p>System Report'taki her makale özgündür. Basın bültenlerini tekrarlamıyor, başlıkları yeniden yazmıyoruz. Editoryal sürecimiz, birden fazla birincil kaynağı okumayı, temel gerçekleri damıtmayı ve okurlara tek bir okumada eksiksiz bir tablo sunan kapsamlı bir bakış üretmeyi içerir.</p>
<h2>Standartlarımız</h2>
<p><strong>Önce doğruluk.</strong> Her iddia, yayımlanmadan önce birden fazla kaynakla çapraz kontrol edilir. <strong>Tıklama tuzağı yok.</strong> Başlıklar size ne olduğunu söyler. <strong>Ödeme duvarı yok.</strong> Tüm içerik ücretsiz okunabilir. <strong>Hızlı ve özel.</strong> Statik mimari, anında sayfa yüklemesi ve takip çerezi olmaması anlamına gelir.</p>
<h2>İletişim</h2>
<p>Bir ipucu veya düzeltme önerisi mi var? Bize <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> adresinden e-posta gönderin veya <a href="__CONTACT__">iletişim sayfamızı</a> ziyaret edin.</p>
`,
};
CONTACT.tr = {
  metaTitle: 'İletişim — System Report',
  metaDescription: 'System Report editör ekibine ulaşın — haber ipuçları, düzeltmeler, reklam talepleri ve genel sorular.',
  h1: 'İletişim',
  bodyHtml: `
<p class="lead">Her mesajı okuyoruz. System Report editör ekibine en hızlı ulaşma yolu e-postadır.</p>
<h2>E-posta</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>İki iş günü içinde yanıt vermeyi hedefliyoruz.</p>
<h2>Posta Adresi</h2>
<address>__ADDRESS__</address>
<h2>Hangi konularda yazabilirsiniz</h2>
<ul>
<li><strong>Haber ipuçları</strong> — Kısa bir özet ve ilgili bağlantıları gönderin. Talep üzerine gizliliğe saygı gösterilir.</li>
<li><strong>Düzeltmeler</strong> — Makaleyi ve belirli iddiayı bize gösterin. Düzeltmeleri hızla ve şeffaf biçimde yayınlıyoruz.</li>
<li><strong>Basın ve ürün brifingleri</strong> — Ambargolu duyurular ve ön brifingler memnuniyetle karşılanır. Lütfen ambargo zamanını konu satırına ekleyin.</li>
<li><strong>Reklam</strong> — Sponsorluk ve ortaklık talepleri şirket adınızı, hedef kitlenizi ve önerilen zamanlamayı içermelidir.</li>
<li><strong>İzinler</strong> — Yeniden yayın, sendikasyon ve çeviri talepleri vaka bazında değerlendirilir.</li>
<li><strong>Gizlilik</strong> — Bu sitenin verileri nasıl ele aldığına ilişkin sorular <a href="__PRIVACY__">Gizlilik Politikamızda</a> yanıtlanır.</li>
</ul>
<h2>Yapmadıklarımız</h2>
<p>System Report; ele aldığı ürünler için teknik destek, bireysel yatırım veya hukuki tavsiye ya da editoryal kılığında ücretli yerleştirme sağlamaz.</p>
<h2>Editoryal bağımsızlık</h2>
<p>Editoryal kararlarımız reklamverenlerden, sponsorlardan ve haberini yaptığımız şirketlerden bağımsız olarak alınır. Bir içerik sponsorlu ise bu ilişki makalenin kendisinde açıkça belirtilir.</p>
`,
};
PRIVACY.tr = {
  metaTitle: 'Gizlilik Politikası — System Report',
  metaDescription: 'System Report gizlilik politikası — hangi verilerin toplandığı, nasıl kullanıldığı ve haklarınız.',
  h1: 'Gizlilik Politikası',
  lastUpdated: 'Son güncelleme: Nisan 2026',
  bodyHtml: `
<h2>Kısa Versiyonu</h2>
<p>System Report statik bir web sitesidir. Çerez kullanmıyor, sizi web'de takip etmiyor ve okurlardan kişisel veri toplamıyoruz. Yerleştirdiğimiz üçüncü taraf hizmetleri (analitik, reklam) aşağıda açıklandığı gibi kendi çerezlerini ayarlayabilir.</p>
<h2>Analitik</h2>
<p>Çerez kullanmayan, kullanıcıları siteler arası takip etmeyen, kişisel olarak tanımlanabilir bilgi toplamayan ve tarayıcı parmak izi çıkarmayan, gizliliği önceleyen <strong>Cloudflare Web Analytics</strong> hizmetini kullanıyoruz. Yalnızca sayfa görüntüleme, yönlendiren ve ülke gibi anonim, toplu metrikler toplanır.</p>
<h2>Reklam</h2>
<p>Bu sitede <strong>Google AdSense</strong> tarafından sunulan reklamlar görünebilir. Google ve iş ortakları, bu sitedeki ve diğer sitelerdeki ziyaretlerinize göre reklam göstermek için çerez ve benzeri teknolojiler kullanır. Kişiselleştirilmiş reklamcılığı <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Reklam Ayarları</a> üzerinden devre dışı bırakabilirsiniz. Daha fazla bilgi için <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google'ın reklam gizlilik politikasını</a> inceleyin.</p>
<h2>Veri Toplama</h2>
<p>System Report kişisel bilgileri doğrudan toplamaz, depolamaz veya işlemez. Kullanıcı kaydı, yorum sistemi ve okur verisinin altyapımızda sunucu tarafı işlenmesi yoktur.</p>
<h2>Üçüncü Taraf Hizmetler</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN barındırma ve gizliliğe saygılı analitik.</li>
<li><strong>Google Fonts</strong> — Google'ın CDN'i üzerinden tipografi.</li>
<li><strong>Google AdSense</strong> — Reklam (çerez kullanabilir; yukarıya bakın).</li>
<li><strong>Pexels</strong> — Pexels CDN'inden yüklenen stok fotoğraflar.</li>
</ul>
<h2>Haklarınız</h2>
<p>System Report kişisel veri toplamadığı veya depolamadığı için sizin adınıza erişmemiz, düzeltmemiz, dışa aktarmamız veya silmemiz gereken bir şey yoktur. Google'ın hizmetlerini bu sitede veya dışında kullandıysanız, bu verileri Google'ın <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Veri ve gizlilik</a> kontrolleri üzerinden yönetebilirsiniz.</p>
<h2>Çocukların Gizliliği</h2>
<p>System Report genel kitleye yönelik bir yayındır ve 13 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek bilgi toplamıyoruz.</p>
<h2>Bu Politikadaki Değişiklikler</h2>
<p>Bu politikayı zaman zaman güncelleyebiliriz. Sayfanın en üstündeki "Son güncelleme" tarihi en son revizyonu yansıtır.</p>
<h2>İletişim</h2>
<p>Bu gizlilik politikasıyla ilgili sorular <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> adresine veya posta ile aşağıdaki adrese gönderilebilir:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.tr = {
  metaTitle: 'Kullanım Koşulları — System Report',
  metaDescription: 'System Report kullanımınızı düzenleyen koşullar; içerik lisansı, sorumluluk reddi ve kabul edilebilir kullanım dahil.',
  h1: 'Kullanım Koşulları',
  lastUpdated: 'Son güncelleme: Nisan 2026',
  bodyHtml: `
<h2>Sözleşme</h2>
<p>System Report'a ("Site") erişerek veya kullanarak bu Kullanım Koşullarını kabul etmiş olursunuz. Kabul etmiyorsanız lütfen Siteyi kullanmayın.</p>
<h2>Editoryal İçerik</h2>
<p>System Report'ta yayımlanan tüm makaleler, analiz ve yorumlar editör ekibimiz tarafından üretilir. Bir içerik dış kaynaklara dayandığında, birincil kaynaklara atıfta bulunulur veya bağlantı verilir. Doğruluk için çabalıyoruz ancak her ayrıntının hatasız olduğunu garanti etmiyoruz; okurlar zamana duyarlı iddiaları harekete geçmeden önce birincil kaynaklarla doğrulamalıdır.</p>
<h2>Fikri Mülkiyet</h2>
<p>Bu Sitedeki tüm özgün editoryal içerik — metin, başlıklar, illüstrasyonlar ve düzen dahil — System Report'a aittir ve telif hakkıyla korunmaktadır. Uygun atıf ve özgün makaleye geri bağlantıyla alıntı paylaşabilirsiniz. Tam makalelerin yeniden yayınlanması, ticari yeniden dağıtım veya içeriğimizin makine öğrenimi modellerini eğitmek için kullanılması önceden yazılı izin gerektirir. Lisanslama soruları için <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>Kapak Görselleri</h2>
<p>Editoryal kapak görselleri, Pexels Lisansı veya benzeri telifsiz koşullar altında <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>'ten alınır. Gereken yerlerde fotoğrafçı atfı sağlanır. Pexels görselleri System Report'un lisanslanabilir içeriğinin parçası değildir ve özgün lisansına tabidir.</p>
<h2>Üçüncü Taraf Bağlantıları</h2>
<p>Makaleler referans için harici sitelere düzenli olarak bağlantı verir. Üçüncü taraf sitelerin içeriği, doğruluğu, gizlilik uygulamaları veya erişilebilirliğinden sorumlu değiliz. Bağlantı, onay anlamına gelmez.</p>
<h2>Reklam</h2>
<p>Bu Site, Google AdSense ve diğer reklam ağları tarafından sunulan reklamları görüntüleyebilir. Reklamlar editoryal içerikten açıkça ayırt edilebilir. Reklam sağlayıcıların çerezleri nasıl kullandığı hakkında bilgi <a href="__PRIVACY__">Gizlilik Politikamızda</a> mevcuttur.</p>
<h2>Kabul Edilebilir Kullanım</h2>
<p>Siteyi izin almadan kazımamayı, yansıtmamayı veya sistematik olarak hasat etmemeyi; ayrı bir lisans olmadan makine öğrenimi modellerini eğitmek veya ince ayar yapmak için kullanmamayı; Sitenin normal çalışmasına, güvenliğine veya kullanılabilirliğine müdahale etmeye çalışmamayı; System Report içeriğini kendi içeriğiniz veya bizim tarafımızdan onaylanmış olarak yanlış tanıtmamayı kabul edersiniz.</p>
<h2>Garanti Reddi</h2>
<p>Site "olduğu gibi" ve "mevcut olduğu gibi" sağlanır. Yasaların izin verdiği azami ölçüde, System Report açık veya zımni tüm garantileri reddeder. Bu Sitedeki hiçbir şey finansal, hukuki, tıbbi veya profesyonel tavsiye niteliği taşımaz.</p>
<h2>Sorumluluk Sınırlaması</h2>
<p>Yasaların izin verdiği azami ölçüde, System Report; Sitenin erişiminden veya kullanımından kaynaklanan dolaylı, arızi, özel, sonuç olarak ortaya çıkan veya cezai herhangi bir zarardan sorumlu olmayacaktır.</p>
<h2>Geçerli Hukuk</h2>
<p>Bu Koşullar, kanunlar ihtilafı ilkeleri dikkate alınmaksızın Türkiye Cumhuriyeti yasalarına tabidir. Bu Koşullardan kaynaklanan veya bunlarla bağlantılı her türlü uyuşmazlık, münhasıran İstanbul mahkemelerinin yetkisinde olacaktır.</p>
<h2>Değişiklikler</h2>
<p>Bu Kullanım Koşullarını dilediğimiz zaman revize edebiliriz. Revizyonun ardından Sitenin kullanılmaya devam edilmesi güncellenmiş koşulların kabul edildiği anlamına gelir.</p>
<h2>İletişim</h2>
<p>Bu koşullarla ilgili sorular <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> adresine veya posta ile aşağıdaki adrese gönderilebilir:</p>
<address>__ADDRESS__</address>
`,
};

// ─── Español ────────────────────────────────────────────────────────────────
ABOUT.es = {
  metaTitle: 'Acerca de — System Report',
  metaDescription: 'System Report ofrece análisis profundo y comentarios expertos sobre las historias tecnológicas que importan.',
  h1: 'Acerca de System Report',
  bodyHtml: `
<p class="lead">System Report es una publicación de noticias tecnológicas centrada en ofrecer análisis claro y bien documentado de las historias que dan forma a la industria. Filtramos el ruido para destacar lo que realmente importa.</p>
<h2>Qué cubrimos</h2>
<p>Cubrimos todo el espectro del panorama tecnológico:</p>
<ul>
<li><strong>Silicio y Hardware</strong> — Arquitectura de chips, lanzamientos y la cadena de suministro de semiconductores.</li>
<li><strong>Inteligencia Artificial</strong> — Avances en modelos, adopción empresarial e impacto social de la IA.</li>
<li><strong>Software y Plataformas</strong> — Herramientas para desarrolladores, infraestructura en la nube y la economía de plataformas.</li>
<li><strong>Política y Regulación</strong> — Gobernanza digital, antimonopolio y el panorama regulatorio global.</li>
<li><strong>Seguridad y Privacidad</strong> — Inteligencia de amenazas, divulgaciones de vulnerabilidades y protección de datos.</li>
<li><strong>Startups y Capital de Riesgo</strong> — Rondas de financiación, cambios de mercado y empresas tecnológicas emergentes.</li>
</ul>
<h2>Nuestro enfoque</h2>
<p>Cada artículo de System Report es original. No reescribimos comunicados de prensa ni titulares. Nuestro proceso editorial implica leer múltiples fuentes primarias, destilar los hechos clave y producir una visión integral que ofrezca a los lectores una imagen completa en una sola lectura.</p>
<h2>Nuestros estándares</h2>
<p><strong>Precisión ante todo.</strong> Cada afirmación se contrasta con múltiples fuentes antes de publicarse. <strong>Sin clickbait.</strong> Los titulares dicen lo que pasó. <strong>Sin muro de pago.</strong> Todo el contenido es de lectura gratuita. <strong>Rápido y privado.</strong> La arquitectura estática significa carga instantánea y sin cookies de seguimiento.</p>
<h2>Contacto</h2>
<p>¿Tienes una pista o corrección? Escríbenos a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o visita nuestra <a href="__CONTACT__">página de contacto</a>.</p>
`,
};
CONTACT.es = {
  metaTitle: 'Contacto — System Report',
  metaDescription: 'Ponte en contacto con el equipo editorial de System Report — pistas, correcciones, consultas publicitarias y preguntas generales.',
  h1: 'Contacto',
  bodyHtml: `
<p class="lead">Leemos cada mensaje. La forma más rápida de llegar al equipo editorial de System Report es por correo electrónico.</p>
<h2>Correo electrónico</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>Nuestro objetivo es responder en un plazo de dos días hábiles.</p>
<h2>Dirección postal</h2>
<address>__ADDRESS__</address>
<h2>Sobre qué escribir</h2>
<ul>
<li><strong>Pistas</strong> — Envía un breve resumen y los enlaces relevantes. Se respeta la confidencialidad si se solicita.</li>
<li><strong>Correcciones</strong> — Indícanos el artículo y la afirmación específica. Publicamos correcciones de forma rápida y transparente.</li>
<li><strong>Prensa y briefings</strong> — Anuncios bajo embargo y briefings previos son bienvenidos. Incluye la hora del embargo en el asunto.</li>
<li><strong>Publicidad</strong> — Las consultas de patrocinio deben incluir tu empresa, audiencia objetivo y plazos.</li>
<li><strong>Permisos</strong> — Solicitudes de republicación, sindicación y traducción se evalúan caso por caso.</li>
<li><strong>Privacidad</strong> — Las preguntas sobre el manejo de datos se responden en nuestra <a href="__PRIVACY__">Política de Privacidad</a>.</li>
</ul>
<h2>Lo que no hacemos</h2>
<p>System Report no proporciona soporte técnico para productos cubiertos, asesoría individual de inversión o legal, ni colocación pagada disfrazada de editorial.</p>
<h2>Independencia editorial</h2>
<p>Nuestras decisiones editoriales se toman independientemente de anunciantes, patrocinadores y las empresas que cubrimos. Si un artículo es patrocinado, esa relación se divulga claramente en el propio artículo.</p>
`,
};
PRIVACY.es = {
  metaTitle: 'Política de Privacidad — System Report',
  metaDescription: 'Política de privacidad de System Report — qué datos se recopilan, cómo se utilizan y tus derechos.',
  h1: 'Política de Privacidad',
  lastUpdated: 'Última actualización: abril de 2026',
  bodyHtml: `
<h2>La versión corta</h2>
<p>System Report es un sitio estático. No usamos cookies, no te rastreamos por la web y no recopilamos datos personales de los lectores nosotros mismos. Los servicios de terceros que integramos (analítica, anuncios) pueden establecer sus propias cookies, como se describe a continuación.</p>
<h2>Analítica</h2>
<p>Utilizamos <strong>Cloudflare Web Analytics</strong>, un servicio que prioriza la privacidad y que no usa cookies, no rastrea entre sitios, no recopila información personal identificable y no genera huella digital del navegador. Solo se recopilan métricas agregadas y anónimas como vistas de página, referentes y países.</p>
<h2>Publicidad</h2>
<p>Este sitio puede mostrar anuncios servidos por <strong>Google AdSense</strong>. Google y sus socios usan cookies y tecnologías similares para mostrar anuncios basados en tus visitas a este y otros sitios. Puedes desactivar la publicidad personalizada en la <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Configuración de anuncios de Google</a>. Para más información, consulta la <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">política de privacidad publicitaria de Google</a>.</p>
<h2>Recopilación de datos</h2>
<p>System Report no recopila, almacena ni procesa información personal directamente. No hay registro de usuarios, sistema de comentarios ni procesamiento del lado del servidor de datos de lectores en nuestra infraestructura.</p>
<h2>Servicios de terceros</h2>
<ul>
<li><strong>Cloudflare</strong> — Hosting CDN y analítica respetuosa con la privacidad.</li>
<li><strong>Google Fonts</strong> — Servido a través del CDN de Google para tipografía.</li>
<li><strong>Google AdSense</strong> — Publicidad (puede usar cookies; ver arriba).</li>
<li><strong>Pexels</strong> — Fotografía de stock cargada desde el CDN de Pexels.</li>
</ul>
<h2>Tus derechos</h2>
<p>Como System Report no recopila ni almacena datos personales, no hay nada a lo que podamos acceder, corregir, exportar o eliminar en tu nombre. Si has usado los servicios de Google en este sitio o fuera de él, puedes gestionar esos datos a través de los controles de <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Datos y privacidad</a> de Google.</p>
<h2>Privacidad de los menores</h2>
<p>System Report es una publicación para audiencia general y no está dirigida a menores de 13 años. No recopilamos a sabiendas información de menores.</p>
<h2>Cambios en esta política</h2>
<p>Podemos actualizar esta política ocasionalmente. La fecha de "Última actualización" en la parte superior refleja la revisión más reciente.</p>
<h2>Contacto</h2>
<p>Las preguntas sobre esta política pueden enviarse a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o por correo postal a:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.es = {
  metaTitle: 'Términos de uso — System Report',
  metaDescription: 'Los términos que rigen tu uso de System Report, incluyendo licencia de contenido, exenciones y uso aceptable.',
  h1: 'Términos de uso',
  lastUpdated: 'Última actualización: abril de 2026',
  bodyHtml: `
<h2>Acuerdo</h2>
<p>Al acceder o utilizar System Report (el "Sitio"), aceptas estos Términos de uso. Si no estás de acuerdo, no utilices el Sitio.</p>
<h2>Contenido editorial</h2>
<p>Todos los artículos, análisis y comentarios publicados en System Report son producidos por nuestro equipo editorial. Cuando un texto se basa en reportes externos, se referencian o enlazan las fuentes primarias. Nos esforzamos por la precisión pero no garantizamos que cada detalle esté libre de errores; los lectores deben verificar afirmaciones sensibles al tiempo con fuentes primarias antes de actuar.</p>
<h2>Propiedad intelectual</h2>
<p>Todo el contenido editorial original de este Sitio — incluido texto, titulares, ilustraciones y diseño — es propiedad de System Report y está protegido por derechos de autor. Puedes compartir extractos con la atribución correspondiente y un enlace al artículo original. La republicación de artículos completos, redistribución comercial o uso de nuestro contenido para entrenar modelos de aprendizaje automático requiere autorización previa por escrito. Escribe a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> para consultas de licencia.</p>
<h2>Imágenes destacadas</h2>
<p>Las imágenes editoriales se obtienen de <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> bajo la Licencia Pexels o términos similares libres de regalías. Se proporciona atribución al fotógrafo cuando se requiere. Las imágenes de Pexels no forman parte del contenido licenciable de System Report y se rigen por su licencia original.</p>
<h2>Enlaces a terceros</h2>
<p>Los artículos enlazan rutinariamente a sitios externos como referencia. No somos responsables del contenido, precisión, prácticas de privacidad o disponibilidad de sitios de terceros. Un enlace no constituye respaldo.</p>
<h2>Publicidad</h2>
<p>Este Sitio puede mostrar anuncios servidos por Google AdSense y otras redes publicitarias. Los anuncios son claramente distinguibles del contenido editorial. La información sobre el uso de cookies de los proveedores de anuncios está disponible en nuestra <a href="__PRIVACY__">Política de Privacidad</a>.</p>
<h2>Uso aceptable</h2>
<p>Aceptas no extraer, reflejar ni recolectar sistemáticamente el Sitio sin permiso; no usar el Sitio para entrenar o ajustar modelos de aprendizaje automático sin licencia separada; no intentar interferir con el funcionamiento, seguridad o disponibilidad normales del Sitio; ni representar el contenido de System Report como propio o avalado por nosotros.</p>
<h2>Exención de garantías</h2>
<p>El Sitio se proporciona "tal cual" y "según disponibilidad". En la medida máxima permitida por la ley, System Report rechaza todas las garantías, expresas o implícitas. Nada en este Sitio constituye asesoramiento financiero, legal, médico o profesional.</p>
<h2>Limitación de responsabilidad</h2>
<p>En la medida máxima permitida por la ley, System Report no será responsable de daños indirectos, incidentales, especiales, consecuentes o punitivos derivados de tu acceso al Sitio o uso del mismo.</p>
<h2>Ley aplicable</h2>
<p>Estos Términos se rigen por las leyes de la República de Türkiye, sin tener en cuenta los principios de conflicto de leyes. Cualquier disputa derivada de estos Términos estará sujeta a la jurisdicción exclusiva de los tribunales de Estambul.</p>
<h2>Cambios</h2>
<p>Podemos revisar estos Términos en cualquier momento. El uso continuado del Sitio tras una revisión constituye la aceptación de los términos actualizados.</p>
<h2>Contacto</h2>
<p>Las preguntas sobre estos términos pueden enviarse a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o por correo postal a:</p>
<address>__ADDRESS__</address>
`,
};

// ─── Français ───────────────────────────────────────────────────────────────
ABOUT.fr = {
  metaTitle: 'À propos — System Report',
  metaDescription: 'System Report propose des analyses approfondies et des commentaires d\'experts sur les actualités tech qui comptent.',
  h1: 'À propos de System Report',
  bodyHtml: `
<p class="lead">System Report est une publication d'actualité tech qui livre des analyses claires et documentées sur les histoires qui façonnent l'industrie. Nous coupons à travers le bruit pour mettre en avant ce qui compte vraiment.</p>
<h2>Ce que nous couvrons</h2>
<p>Nous couvrons l'ensemble du paysage technologique :</p>
<ul>
<li><strong>Silicium et matériel</strong> — Architecture des puces, lancements de produits et chaîne d'approvisionnement des semi-conducteurs.</li>
<li><strong>Intelligence artificielle</strong> — Avancées des modèles, adoption en entreprise et impact sociétal de l'IA.</li>
<li><strong>Logiciels et plateformes</strong> — Outils pour développeurs, infrastructure cloud et économie des plateformes.</li>
<li><strong>Politique et réglementation</strong> — Gouvernance numérique, antitrust et paysage réglementaire mondial.</li>
<li><strong>Sécurité et confidentialité</strong> — Renseignement sur les menaces, divulgations de vulnérabilités et protection des données.</li>
<li><strong>Startups et capital-risque</strong> — Levées de fonds, évolutions du marché et entreprises tech émergentes.</li>
</ul>
<h2>Notre approche</h2>
<p>Chaque article de System Report est original. Nous ne paraphrasons pas les communiqués de presse ni ne réécrivons les titres. Notre processus éditorial consiste à lire plusieurs sources primaires, à distiller les faits clés et à produire un point de vue exhaustif qui donne aux lecteurs une image complète en une seule lecture.</p>
<h2>Nos standards</h2>
<p><strong>L'exactitude d'abord.</strong> Chaque affirmation est recoupée avec plusieurs sources avant publication. <strong>Pas de clickbait.</strong> Les titres disent ce qui s'est passé. <strong>Pas de paywall.</strong> Tout le contenu est gratuit à lire. <strong>Rapide et privé.</strong> Une architecture statique signifie chargement instantané et aucun cookie de suivi.</p>
<h2>Contact</h2>
<p>Une info ou une correction ? Écrivez-nous à <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou visitez notre <a href="__CONTACT__">page de contact</a>.</p>
`,
};
CONTACT.fr = {
  metaTitle: 'Contact — System Report',
  metaDescription: 'Contactez l\'équipe éditoriale de System Report — informations, corrections, demandes publicitaires et questions générales.',
  h1: 'Contact',
  bodyHtml: `
<p class="lead">Nous lisons chaque message. Le moyen le plus rapide de joindre l'équipe éditoriale de System Report est l'e-mail.</p>
<h2>E-mail</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>Nous visons une réponse sous deux jours ouvrés.</p>
<h2>Adresse postale</h2>
<address>__ADDRESS__</address>
<h2>Sujets bienvenus</h2>
<ul>
<li><strong>Informations</strong> — Envoyez un bref résumé et les liens pertinents. La confidentialité est respectée sur demande.</li>
<li><strong>Corrections</strong> — Indiquez l'article et l'affirmation concernée. Les corrections sont publiées rapidement et de manière transparente.</li>
<li><strong>Presse et briefings produits</strong> — Annonces sous embargo et pré-briefings sont bienvenus. Indiquez l'heure d'embargo dans l'objet.</li>
<li><strong>Publicité</strong> — Les demandes de partenariat doivent inclure votre entreprise, audience cible et calendrier.</li>
<li><strong>Autorisations</strong> — Les demandes de republication, syndication et traduction sont évaluées au cas par cas.</li>
<li><strong>Confidentialité</strong> — Les questions sur la gestion des données sont traitées dans notre <a href="__PRIVACY__">Politique de confidentialité</a>.</li>
</ul>
<h2>Ce que nous ne faisons pas</h2>
<p>System Report ne fournit pas de support technique pour les produits couverts, ni de conseils individuels en investissement ou juridiques, ni de placements payants déguisés en éditorial.</p>
<h2>Indépendance éditoriale</h2>
<p>Nos décisions éditoriales sont prises indépendamment des annonceurs, sponsors et entreprises couvertes. Si un article est sponsorisé, cette relation est divulguée clairement dans l'article lui-même.</p>
`,
};
PRIVACY.fr = {
  metaTitle: 'Politique de confidentialité — System Report',
  metaDescription: 'Politique de confidentialité de System Report — quelles données sont collectées, comment elles sont utilisées et vos droits.',
  h1: 'Politique de confidentialité',
  lastUpdated: 'Dernière mise à jour : avril 2026',
  bodyHtml: `
<h2>Version courte</h2>
<p>System Report est un site statique. Nous n'utilisons pas de cookies, ne vous suivons pas sur le web et ne collectons pas nous-mêmes de données personnelles auprès des lecteurs. Les services tiers intégrés (analytique, publicité) peuvent définir leurs propres cookies, comme décrit ci-dessous.</p>
<h2>Analytique</h2>
<p>Nous utilisons <strong>Cloudflare Web Analytics</strong>, un service axé sur la confidentialité qui n'utilise pas de cookies, ne suit pas les utilisateurs entre les sites, ne collecte pas d'informations personnelles identifiables et ne crée pas d'empreinte de navigateur. Seules des métriques agrégées et anonymes sont collectées (pages vues, référents, pays).</p>
<h2>Publicité</h2>
<p>Ce site peut afficher des publicités servies par <strong>Google AdSense</strong>. Google et ses partenaires utilisent des cookies et technologies similaires pour diffuser des annonces basées sur vos visites sur ce site et d'autres. Vous pouvez désactiver la publicité personnalisée via les <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Paramètres des annonces Google</a>. Pour plus d'informations, consultez la <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">politique de confidentialité publicitaire de Google</a>.</p>
<h2>Collecte de données</h2>
<p>System Report ne collecte, ne stocke ni ne traite directement de données personnelles. Il n'y a ni inscription utilisateur, ni système de commentaires, ni traitement côté serveur des données des lecteurs sur notre infrastructure.</p>
<h2>Services tiers</h2>
<ul>
<li><strong>Cloudflare</strong> — Hébergement CDN et analytique respectueuse de la vie privée.</li>
<li><strong>Google Fonts</strong> — Diffusé via le CDN de Google pour la typographie.</li>
<li><strong>Google AdSense</strong> — Publicité (peut utiliser des cookies ; voir ci-dessus).</li>
<li><strong>Pexels</strong> — Photographies stock chargées depuis le CDN Pexels.</li>
</ul>
<h2>Vos droits</h2>
<p>Comme System Report ne collecte ni ne stocke de données personnelles, il n'y a rien à consulter, corriger, exporter ou supprimer en votre nom. Si vous avez utilisé les services Google sur ce site ou ailleurs, vous pouvez gérer ces données via les contrôles <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Données et confidentialité</a> de Google.</p>
<h2>Confidentialité des enfants</h2>
<p>System Report est une publication grand public et ne s'adresse pas aux enfants de moins de 13 ans. Nous ne collectons pas sciemment d'informations auprès d'enfants.</p>
<h2>Modifications de cette politique</h2>
<p>Nous pouvons mettre à jour cette politique à l'occasion. La date de "Dernière mise à jour" en haut de page reflète la révision la plus récente.</p>
<h2>Contact</h2>
<p>Les questions sur cette politique peuvent être envoyées à <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou par courrier à :</p>
<address>__ADDRESS__</address>
`,
};
TERMS.fr = {
  metaTitle: "Conditions d'utilisation — System Report",
  metaDescription: 'Les conditions régissant votre utilisation de System Report, y compris la licence du contenu, les avis de non-responsabilité et l\'usage acceptable.',
  h1: "Conditions d'utilisation",
  lastUpdated: 'Dernière mise à jour : avril 2026',
  bodyHtml: `
<h2>Accord</h2>
<p>En accédant à System Report (le « Site ») ou en l'utilisant, vous acceptez ces Conditions d'utilisation. Si vous n'êtes pas d'accord, veuillez ne pas utiliser le Site.</p>
<h2>Contenu éditorial</h2>
<p>Tous les articles, analyses et commentaires publiés sur System Report sont produits par notre équipe éditoriale. Lorsqu'un texte s'appuie sur des reportages externes, les sources primaires sont référencées ou liées. Nous nous efforçons d'être précis mais ne garantissons pas l'absence d'erreurs ; les lecteurs doivent vérifier les affirmations sensibles au temps auprès de sources primaires avant d'agir.</p>
<h2>Propriété intellectuelle</h2>
<p>Tout le contenu éditorial original de ce Site — texte, titres, illustrations et mise en page — est la propriété de System Report et est protégé par le droit d'auteur. Vous pouvez partager des extraits avec attribution appropriée et lien vers l'article original. La republication d'articles complets, la redistribution commerciale ou l'utilisation de notre contenu pour entraîner des modèles d'apprentissage automatique nécessitent une autorisation écrite préalable. Pour les demandes de licence : <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>Images d'illustration</h2>
<p>Les images éditoriales proviennent de <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> sous la Licence Pexels ou des conditions similaires libres de droits. L'attribution au photographe est fournie lorsque requise. Les images Pexels ne font pas partie du contenu sous licence de System Report et sont régies par leur licence d'origine.</p>
<h2>Liens tiers</h2>
<p>Les articles renvoient régulièrement à des sites externes à titre de référence. Nous ne sommes pas responsables du contenu, de l'exactitude, des pratiques de confidentialité ou de la disponibilité des sites tiers. Un lien ne constitue pas un soutien.</p>
<h2>Publicité</h2>
<p>Ce Site peut afficher des publicités servies par Google AdSense et d'autres réseaux. Les publicités sont clairement distinguables du contenu éditorial. Les informations sur l'utilisation de cookies par les fournisseurs publicitaires figurent dans notre <a href="__PRIVACY__">Politique de confidentialité</a>.</p>
<h2>Usage acceptable</h2>
<p>Vous acceptez de ne pas extraire, refléter ou récolter systématiquement le Site sans autorisation ; ne pas utiliser le Site pour entraîner ou affiner des modèles d'apprentissage automatique sans licence distincte ; ne pas tenter d'interférer avec le fonctionnement normal, la sécurité ou la disponibilité du Site ; ne pas présenter le contenu de System Report comme le vôtre ou comme approuvé par nous.</p>
<h2>Exclusion de garanties</h2>
<p>Le Site est fourni « tel quel » et « selon disponibilité ». Dans toute la mesure permise par la loi, System Report décline toutes les garanties, expresses ou implicites. Rien sur ce Site ne constitue un conseil financier, juridique, médical ou professionnel.</p>
<h2>Limitation de responsabilité</h2>
<p>Dans toute la mesure permise par la loi, System Report ne sera pas responsable des dommages indirects, accessoires, spéciaux, consécutifs ou punitifs résultant de votre accès ou utilisation du Site.</p>
<h2>Loi applicable</h2>
<p>Ces Conditions sont régies par les lois de la République de Türkiye, sans égard aux principes de conflits de lois. Tout litige relatif à ces Conditions relève de la compétence exclusive des tribunaux d'Istanbul.</p>
<h2>Modifications</h2>
<p>Nous pouvons réviser ces Conditions d'utilisation à tout moment. L'utilisation continue du Site après révision vaut acceptation des conditions mises à jour.</p>
<h2>Contact</h2>
<p>Les questions sur ces conditions peuvent être envoyées à <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou par courrier à :</p>
<address>__ADDRESS__</address>
`,
};

// ─── Deutsch ────────────────────────────────────────────────────────────────
ABOUT.de = {
  metaTitle: 'Über uns — System Report',
  metaDescription: 'System Report liefert fundierte Analysen und Experten-Kommentare zu den Tech-Geschichten, die zählen.',
  h1: 'Über System Report',
  bodyHtml: `
<p class="lead">System Report ist eine Tech-Publikation, die klare, gut recherchierte Analysen zu den prägenden Geschichten der Branche liefert. Wir filtern den Lärm heraus, um das Wesentliche sichtbar zu machen.</p>
<h2>Was wir abdecken</h2>
<p>Wir berichten über das gesamte Spektrum der Technologie:</p>
<ul>
<li><strong>Silizium und Hardware</strong> — Chip-Architektur, Geräte-Launches und die Halbleiter-Lieferkette.</li>
<li><strong>Künstliche Intelligenz</strong> — Modell-Durchbrüche, unternehmerische Adoption und gesellschaftliche Auswirkungen.</li>
<li><strong>Software und Plattformen</strong> — Entwickler-Tools, Cloud-Infrastruktur und Plattformökonomie.</li>
<li><strong>Politik und Regulierung</strong> — Digitale Governance, Kartellrecht und globaler regulatorischer Rahmen.</li>
<li><strong>Sicherheit und Datenschutz</strong> — Threat Intelligence, Schwachstellenoffenlegungen und Datenschutz.</li>
<li><strong>Startups und Venture Capital</strong> — Finanzierungsrunden, Marktverschiebungen und aufstrebende Unternehmen.</li>
</ul>
<h2>Unser Ansatz</h2>
<p>Jeder Artikel auf System Report ist Originalarbeit. Wir wiederholen keine Pressemitteilungen und schreiben keine Schlagzeilen um. Unser redaktioneller Prozess umfasst das Lesen mehrerer Primärquellen, das Destillieren der wesentlichen Fakten und die Erstellung einer umfassenden Sichtweise, die den Lesern in einem einzigen Durchgang ein vollständiges Bild liefert.</p>
<h2>Unsere Standards</h2>
<p><strong>Genauigkeit zuerst.</strong> Jede Behauptung wird vor der Veröffentlichung mit mehreren Quellen abgeglichen. <strong>Kein Clickbait.</strong> Schlagzeilen sagen, was passiert ist. <strong>Keine Paywall.</strong> Alle Inhalte sind frei lesbar. <strong>Schnell und privat.</strong> Statische Architektur bedeutet sofortiges Laden und keine Tracking-Cookies.</p>
<h2>Kontakt</h2>
<p>Hinweis oder Korrektur? Schreiben Sie uns an <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> oder besuchen Sie unsere <a href="__CONTACT__">Kontaktseite</a>.</p>
`,
};
CONTACT.de = {
  metaTitle: 'Kontakt — System Report',
  metaDescription: 'Kontaktieren Sie das Redaktionsteam von System Report — Hinweise, Korrekturen, Werbeanfragen und allgemeine Fragen.',
  h1: 'Kontakt',
  bodyHtml: `
<p class="lead">Wir lesen jede Nachricht. Der schnellste Weg zum Redaktionsteam von System Report ist E-Mail.</p>
<h2>E-Mail</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>Wir bemühen uns um eine Antwort innerhalb von zwei Werktagen.</p>
<h2>Postanschrift</h2>
<address>__ADDRESS__</address>
<h2>Worüber Sie schreiben können</h2>
<ul>
<li><strong>Hinweise</strong> — Senden Sie eine kurze Zusammenfassung und relevante Links. Vertraulichkeit wird auf Wunsch gewahrt.</li>
<li><strong>Korrekturen</strong> — Geben Sie den Artikel und die spezifische Aussage an. Korrekturen werden zeitnah und transparent veröffentlicht.</li>
<li><strong>Presse- und Produkt-Briefings</strong> — Sperrfristen-Ankündigungen und Vorab-Briefings sind willkommen. Bitte geben Sie die Sperrfrist im Betreff an.</li>
<li><strong>Werbung</strong> — Sponsoring- und Partnerschaftsanfragen sollten Unternehmen, Zielgruppe und Zeitplan enthalten.</li>
<li><strong>Genehmigungen</strong> — Anfragen zur Wiederveröffentlichung, Syndizierung und Übersetzung werden im Einzelfall geprüft.</li>
<li><strong>Datenschutz</strong> — Fragen zum Umgang mit Daten beantworten wir in unserer <a href="__PRIVACY__">Datenschutzrichtlinie</a>.</li>
</ul>
<h2>Was wir nicht tun</h2>
<p>System Report bietet keinen technischen Support für besprochene Produkte, keine individuelle Anlage- oder Rechtsberatung und keine als Redaktion getarnte bezahlte Platzierung.</p>
<h2>Redaktionelle Unabhängigkeit</h2>
<p>Unsere redaktionellen Entscheidungen werden unabhängig von Werbetreibenden, Sponsoren und besprochenen Unternehmen getroffen. Ist ein Beitrag gesponsert, wird diese Beziehung im Artikel selbst klar offengelegt.</p>
`,
};
PRIVACY.de = {
  metaTitle: 'Datenschutzrichtlinie — System Report',
  metaDescription: 'Datenschutzrichtlinie von System Report — welche Daten erhoben werden, wie sie verwendet werden und Ihre Rechte.',
  h1: 'Datenschutzrichtlinie',
  lastUpdated: 'Letzte Aktualisierung: April 2026',
  bodyHtml: `
<h2>Die Kurzfassung</h2>
<p>System Report ist eine statische Website. Wir verwenden keine Cookies, verfolgen Sie nicht über das Web und sammeln selbst keine personenbezogenen Daten von Lesern. Eingebundene Drittanbieter (Analytik, Werbung) können eigene Cookies setzen, wie unten beschrieben.</p>
<h2>Analytik</h2>
<p>Wir verwenden <strong>Cloudflare Web Analytics</strong>, einen datenschutzorientierten Dienst, der keine Cookies setzt, Nutzer nicht über Websites hinweg verfolgt, keine personenbezogenen Daten erhebt und keine Browser-Fingerprints erstellt. Es werden nur aggregierte, anonyme Metriken (Seitenaufrufe, Verweise, Länder) erfasst.</p>
<h2>Werbung</h2>
<p>Diese Website kann Anzeigen von <strong>Google AdSense</strong> anzeigen. Google und seine Partner verwenden Cookies und ähnliche Technologien, um Anzeigen basierend auf Ihren Besuchen dieser und anderer Websites auszuspielen. Personalisierte Werbung kann in den <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google-Anzeigeneinstellungen</a> deaktiviert werden. Weitere Informationen finden Sie in der <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Werbe-Datenschutzrichtlinie von Google</a>.</p>
<h2>Datenerhebung</h2>
<p>System Report erhebt, speichert oder verarbeitet keine personenbezogenen Daten direkt. Es gibt keine Nutzerregistrierung, kein Kommentarsystem und keine serverseitige Verarbeitung von Leserdaten in unserer Infrastruktur.</p>
<h2>Drittanbieter</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN-Hosting und datenschutzfreundliche Analytik.</li>
<li><strong>Google Fonts</strong> — Über Googles CDN für Typografie.</li>
<li><strong>Google AdSense</strong> — Werbung (kann Cookies setzen; siehe oben).</li>
<li><strong>Pexels</strong> — Stock-Fotografie über das Pexels-CDN.</li>
</ul>
<h2>Ihre Rechte</h2>
<p>Da System Report keine personenbezogenen Daten erhebt oder speichert, gibt es nichts, worauf wir in Ihrem Namen zugreifen, was wir korrigieren, exportieren oder löschen könnten. Wenn Sie Google-Dienste auf oder außerhalb dieser Website genutzt haben, können Sie diese Daten über die <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Daten- &amp; Datenschutz</a>-Steuerung von Google verwalten.</p>
<h2>Datenschutz für Kinder</h2>
<p>System Report ist eine Publikation für ein allgemeines Publikum und richtet sich nicht an Kinder unter 13 Jahren. Wir erheben wissentlich keine Informationen von Kindern.</p>
<h2>Änderungen dieser Richtlinie</h2>
<p>Wir können diese Richtlinie gelegentlich aktualisieren. Das Datum der "Letzten Aktualisierung" oben spiegelt die jüngste Überarbeitung wider.</p>
<h2>Kontakt</h2>
<p>Fragen zu dieser Datenschutzrichtlinie können an <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> oder per Post an folgende Adresse gerichtet werden:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.de = {
  metaTitle: 'Nutzungsbedingungen — System Report',
  metaDescription: 'Die Bedingungen für die Nutzung von System Report — einschließlich Inhaltslizenz, Haftungsausschluss und akzeptabler Nutzung.',
  h1: 'Nutzungsbedingungen',
  lastUpdated: 'Letzte Aktualisierung: April 2026',
  bodyHtml: `
<h2>Vereinbarung</h2>
<p>Mit dem Zugriff auf oder der Nutzung von System Report (der "Website") akzeptieren Sie diese Nutzungsbedingungen. Wenn Sie nicht zustimmen, nutzen Sie die Website bitte nicht.</p>
<h2>Redaktionelle Inhalte</h2>
<p>Alle auf System Report veröffentlichten Artikel, Analysen und Kommentare stammen von unserem Redaktionsteam. Wenn ein Beitrag auf externer Berichterstattung basiert, werden Primärquellen referenziert oder verlinkt. Wir streben Genauigkeit an, übernehmen aber keine Gewähr für Fehlerfreiheit; Leser sollten zeitkritische Aussagen vor dem Handeln mit Primärquellen verifizieren.</p>
<h2>Geistiges Eigentum</h2>
<p>Alle redaktionellen Originalinhalte dieser Website — Text, Schlagzeilen, Illustrationen und Layout — sind Eigentum von System Report und urheberrechtlich geschützt. Sie dürfen Auszüge mit Quellenangabe und Link zum Originalartikel teilen. Vollständige Republikation, kommerzielle Weiterverbreitung oder Nutzung unserer Inhalte zum Training von Machine-Learning-Modellen erfordern vorherige schriftliche Genehmigung. Lizenzanfragen: <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>Hero-Bilder</h2>
<p>Redaktionelle Hero-Bilder stammen von <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> unter der Pexels-Lizenz oder ähnlichen lizenzfreien Bedingungen. Wo erforderlich, wird der Fotograf genannt. Pexels-Bildmaterial ist nicht Teil der lizenzierbaren Inhalte von System Report und unterliegt seiner ursprünglichen Lizenz.</p>
<h2>Drittanbieter-Links</h2>
<p>Artikel verlinken regelmäßig auf externe Websites. Wir sind nicht verantwortlich für Inhalt, Genauigkeit, Datenschutzpraktiken oder Verfügbarkeit von Drittseiten. Ein Link bedeutet keine Empfehlung.</p>
<h2>Werbung</h2>
<p>Diese Website kann Anzeigen von Google AdSense und anderen Werbenetzwerken anzeigen. Anzeigen sind klar von redaktionellen Inhalten unterscheidbar. Informationen zur Cookie-Nutzung durch Werbeanbieter finden Sie in unserer <a href="__PRIVACY__">Datenschutzrichtlinie</a>.</p>
<h2>Akzeptable Nutzung</h2>
<p>Sie verpflichten sich, die Website nicht ohne Erlaubnis zu scrapen, zu spiegeln oder systematisch zu erfassen; die Website nicht zum Training oder Fine-Tuning von Machine-Learning-Modellen ohne separate Lizenz zu nutzen; den normalen Betrieb, die Sicherheit oder Verfügbarkeit der Website nicht zu stören; und Inhalte von System Report nicht als eigene oder von uns befürwortete auszugeben.</p>
<h2>Gewährleistungsausschluss</h2>
<p>Die Website wird "wie besehen" und "wie verfügbar" bereitgestellt. Im gesetzlich zulässigen Höchstmaß lehnt System Report alle ausdrücklichen oder stillschweigenden Gewährleistungen ab. Nichts auf dieser Website stellt Finanz-, Rechts-, medizinische oder professionelle Beratung dar.</p>
<h2>Haftungsbeschränkung</h2>
<p>Im gesetzlich zulässigen Höchstmaß haftet System Report nicht für indirekte, zufällige, besondere, Folge- oder Strafschäden, die aus Ihrem Zugriff oder Ihrer Nutzung der Website entstehen.</p>
<h2>Anwendbares Recht</h2>
<p>Diese Bedingungen unterliegen dem Recht der Republik Türkiye, ohne Berücksichtigung kollisionsrechtlicher Grundsätze. Streitigkeiten aus diesen Bedingungen unterliegen der ausschließlichen Zuständigkeit der Gerichte von Istanbul.</p>
<h2>Änderungen</h2>
<p>Wir können diese Nutzungsbedingungen jederzeit überarbeiten. Die fortgesetzte Nutzung der Website nach einer Überarbeitung gilt als Annahme der aktualisierten Bedingungen.</p>
<h2>Kontakt</h2>
<p>Fragen zu diesen Bedingungen können an <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> oder per Post an folgende Adresse gerichtet werden:</p>
<address>__ADDRESS__</address>
`,
};

// ─── 日本語 ──────────────────────────────────────────────────────────────────
ABOUT.ja = {
  metaTitle: 'System Report について',
  metaDescription: 'System Report は、テクノロジー業界を形作るニュースに深い分析と専門的な解説を提供します。',
  h1: 'System Report について',
  bodyHtml: `
<p class="lead">System Report は、テクノロジー業界を形作るニュースを明確かつ徹底したリサーチで届けるテック専門媒体です。ノイズを取り除き、本当に重要な情報を届けます。</p>
<h2>取り扱うトピック</h2>
<p>テクノロジー全分野をカバーしています：</p>
<ul>
<li><strong>シリコン &amp; ハードウェア</strong> — チップ・アーキテクチャ、デバイス発売、半導体サプライチェーン。</li>
<li><strong>人工知能</strong> — モデルの躍進、企業導入、AIが社会に与える影響。</li>
<li><strong>ソフトウェア &amp; プラットフォーム</strong> — 開発ツール、クラウドインフラ、進化するプラットフォーム経済。</li>
<li><strong>政策 &amp; 規制</strong> — デジタルガバナンス、独占禁止、グローバルな規制動向。</li>
<li><strong>セキュリティ &amp; プライバシー</strong> — 脅威インテリジェンス、脆弱性開示、データ保護。</li>
<li><strong>スタートアップ &amp; ベンチャー</strong> — 資金調達ラウンド、市場変化、新興テック企業。</li>
</ul>
<h2>私たちのアプローチ</h2>
<p>System Report のすべての記事はオリジナルです。プレスリリースを転載したり、見出しを書き換えたりしません。複数の一次情報源を読み込み、重要なファクトを蒸留し、一度の読書で全体像が把握できる包括的な記事を提供します。</p>
<h2>私たちの基準</h2>
<p><strong>正確さ第一。</strong>すべての主張は公開前に複数の情報源で照合されます。<strong>釣り見出しなし。</strong>見出しは事実を正直に伝えます。<strong>有料会員壁なし。</strong>すべてのコンテンツは無料で読めます。<strong>高速でプライベート。</strong>静的アーキテクチャにより、即時ページ表示とトラッキングクッキーなしを実現しています。</p>
<h2>お問い合わせ</h2>
<p>タレコミや訂正はありますか？<a href="mailto:contact@systemreport.net">contact@systemreport.net</a> までメールするか、<a href="__CONTACT__">お問い合わせページ</a>をご覧ください。</p>
`,
};
CONTACT.ja = {
  metaTitle: 'お問い合わせ — System Report',
  metaDescription: 'System Report 編集チームへのお問い合わせ — ニュースのタレコミ、訂正、広告掲載、その他のご質問。',
  h1: 'お問い合わせ',
  bodyHtml: `
<p class="lead">すべてのメッセージを読んでいます。System Report 編集チームへの最速の連絡方法はメールです。</p>
<h2>メール</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>2営業日以内の返信を目指しています。</p>
<h2>郵送先住所</h2>
<address>__ADDRESS__</address>
<h2>お問い合わせの内容</h2>
<ul>
<li><strong>ニュースのタレコミ</strong> — 簡単な概要と関連リンクをお送りください。希望される場合は守秘義務に対応します。</li>
<li><strong>訂正</strong> — 記事と具体的な主張を示してください。迅速かつ透明性をもって訂正を掲載します。</li>
<li><strong>プレス &amp; 製品ブリーフィング</strong> — エンバーゴ付き発表や事前ブリーフィングを歓迎します。件名にエンバーゴ時間を記載してください。</li>
<li><strong>広告掲載</strong> — スポンサーシップおよびパートナーシップのお問い合わせには、会社名、ターゲット層、希望時期をご記入ください。</li>
<li><strong>許諾</strong> — 転載、シンジケーション、翻訳のご依頼はケースバイケースで検討します。</li>
<li><strong>プライバシー</strong> — 当サイトのデータ取り扱いに関するご質問は<a href="__PRIVACY__">プライバシーポリシー</a>をご参照ください。</li>
</ul>
<h2>対応していないこと</h2>
<p>System Report は、取り扱い製品の技術サポート、個人向けの投資・法的アドバイス、編集コンテンツを装った有料掲載には対応していません。</p>
<h2>編集の独立性</h2>
<p>編集上の判断は、広告主・スポンサー・取材対象企業から独立して行われます。スポンサード記事の場合は、記事内に明確に開示されます。</p>
`,
};
PRIVACY.ja = {
  metaTitle: 'プライバシーポリシー — System Report',
  metaDescription: 'System Report のプライバシーポリシー — 収集するデータ、その利用方法、お客様の権利について。',
  h1: 'プライバシーポリシー',
  lastUpdated: '最終更新日：2026年4月',
  bodyHtml: `
<h2>概要</h2>
<p>System Report は静的ウェブサイトです。クッキーを使用せず、ウェブ上でのトラッキングも行わず、読者から直接個人データを収集しません。組み込んでいるサードパーティサービス（アナリティクス、広告）は以下に記載のとおり独自のクッキーを設定する場合があります。</p>
<h2>アナリティクス</h2>
<p>クッキー不使用、サイト横断トラッキング不使用、個人識別情報の収集なし、ブラウザフィンガープリンティング不使用のプライバシーファーストなサービス <strong>Cloudflare Web Analytics</strong> を使用しています。ページビュー、参照元、国別などの匿名化された集計メトリクスのみが収集されます。</p>
<h2>広告</h2>
<p>本サイトでは <strong>Google AdSense</strong> による広告が表示される場合があります。Google とそのパートナーは、このサイトや他のサイトへのアクセス状況に基づく広告配信のためにクッキーや類似技術を使用します。パーソナライズ広告の無効化は <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google の広告設定</a> からできます。詳細は <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google の広告プライバシーポリシー</a> をご覧ください。</p>
<h2>データ収集</h2>
<p>System Report は個人情報を直接収集・保存・処理しません。ユーザー登録、コメントシステム、読者データのサーバーサイド処理は行っていません。</p>
<h2>サードパーティサービス</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN ホスティングとプライバシー配慮型アナリティクス。</li>
<li><strong>Google Fonts</strong> — Google の CDN 経由でフォントを提供。</li>
<li><strong>Google AdSense</strong> — 広告（クッキーを使用する場合があります。上記参照）。</li>
<li><strong>Pexels</strong> — Pexels CDN から読み込まれるストック写真。</li>
</ul>
<h2>お客様の権利</h2>
<p>System Report は個人データを収集・保存しないため、アクセス・訂正・エクスポート・削除すべきデータはありません。このサイト内外で Google のサービスをご利用の場合は、Google の <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">データとプライバシー</a> からデータを管理できます。</p>
<h2>子どものプライバシー</h2>
<p>System Report は一般向けの媒体であり、13歳未満の子どもを対象としていません。子どもからの情報を意図的に収集することはありません。</p>
<h2>ポリシーの変更</h2>
<p>このポリシーは随時更新することがあります。ページ上部の「最終更新日」が最新の改訂日を示します。</p>
<h2>お問い合わせ</h2>
<p>このプライバシーポリシーに関するご質問は <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> またはご郵送にて下記宛先までお送りください：</p>
<address>__ADDRESS__</address>
`,
};
TERMS.ja = {
  metaTitle: '利用規約 — System Report',
  metaDescription: 'System Report の利用規約 — コンテンツのライセンス、免責事項、許容される使用について。',
  h1: '利用規約',
  lastUpdated: '最終更新日：2026年4月',
  bodyHtml: `
<h2>同意</h2>
<p>System Report（以下「本サイト」）にアクセスまたは使用することで、本利用規約に同意したものとみなします。同意されない場合は、本サイトのご利用をお控えください。</p>
<h2>編集コンテンツ</h2>
<p>System Report に掲載されるすべての記事、分析、解説は編集チームが制作します。外部報道に基づく場合は一次情報源が参照またはリンクされます。正確性に努めていますが、すべての詳細が誤りなしであることを保証するものではありません。時間的制約のある主張については、行動を起こす前に一次情報源でご確認ください。</p>
<h2>知的財産権</h2>
<p>本サイト上のすべてのオリジナル編集コンテンツ（テキスト、見出し、イラスト、レイアウトを含む）は System Report に帰属し、著作権により保護されています。適切な帰属表示と元記事へのリンクがある場合、抜粋を共有できます。記事全文の再掲載、商用再配布、または機械学習モデルのトレーニングへの使用には事前の書面による許可が必要です。ライセンスに関するお問い合わせは <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> まで。</p>
<h2>ヒーロー画像</h2>
<p>編集用ヒーロー画像は <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> のライセンスまたは類似のロイヤリティフリー条件のもとで利用しています。必要な場合は写真家のクレジットを表示しています。Pexels の画像は System Report のライセンス対象コンテンツには含まれず、元のライセンスに従います。</p>
<h2>第三者リンク</h2>
<p>記事では参考として外部サイトへのリンクを頻繁に掲載しています。第三者サイトの内容、正確性、プライバシー慣行、利用可能性については責任を負いません。リンクは推薦を意味しません。</p>
<h2>広告</h2>
<p>本サイトでは Google AdSense 等の広告ネットワークによる広告が表示される場合があります。広告は編集コンテンツと明確に区別されています。広告提供者のクッキー使用については<a href="__PRIVACY__">プライバシーポリシー</a>をご参照ください。</p>
<h2>利用規制</h2>
<p>許可なく本サイトのスクレイピング、ミラーリング、または組織的な情報収集を行わないこと；別途ライセンスなしに機械学習モデルのトレーニングや微調整に本サイトを使用しないこと；本サイトの通常の運営、セキュリティ、または可用性を妨害しようとしないこと；System Report のコンテンツを自己のものまたは当社の承認を得たものとして偽ることのないことに同意します。</p>
<h2>保証の否認</h2>
<p>本サイトは「現状有姿」「利用可能な状態」で提供されます。法律が許す最大限の範囲において、System Report はすべての明示的・黙示的保証を否認します。本サイトのいかなるコンテンツも、財務、法律、医療、または専門的なアドバイスを構成するものではありません。</p>
<h2>責任の制限</h2>
<p>法律が許す最大限の範囲において、System Report は本サイトへのアクセスまたは使用から生じるいかなる間接的、付随的、特別、結果的、または懲罰的損害についても責任を負いません。</p>
<h2>準拠法</h2>
<p>本規約は、法の抵触原則を考慮することなく、トルコ共和国の法律に準拠します。本規約に起因または関連するすべての紛争は、イスタンブール裁判所の専属管轄に服します。</p>
<h2>変更</h2>
<p>本利用規約はいつでも改訂することがあります。改訂後に本サイトを継続して使用することは、更新された規約への同意を意味します。</p>
<h2>お問い合わせ</h2>
<p>本規約に関するご質問は <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> またはご郵送にて下記宛先までお送りください：</p>
<address>__ADDRESS__</address>
`,
};

// ─── 简体中文 ────────────────────────────────────────────────────────────────
ABOUT['zh-CN'] = {
  metaTitle: '关于 — System Report',
  metaDescription: 'System Report 提供深度分析与专业评论，聚焦塑造科技行业的重要报道。',
  h1: '关于 System Report',
  bodyHtml: `
<p class="lead">System Report 是一家科技新闻媒体，致力于对塑造科技行业的重大事件提供清晰、深入的分析。我们穿透噪音，呈现真正重要的内容。</p>
<h2>我们的报道范围</h2>
<p>我们覆盖科技领域的全貌，包括：</p>
<ul>
<li><strong>芯片与硬件</strong> — 芯片架构、设备发布及半导体供应链。</li>
<li><strong>人工智能</strong> — 模型突破、企业应用及 AI 的社会影响。</li>
<li><strong>软件与平台</strong> — 开发工具、云基础设施及平台经济的演变。</li>
<li><strong>政策与监管</strong> — 数字治理、反垄断及全球监管动态。</li>
<li><strong>安全与隐私</strong> — 威胁情报、漏洞披露及数据保护。</li>
<li><strong>初创企业与风险投资</strong> — 融资轮次、市场变化及新兴科技公司。</li>
</ul>
<h2>我们的方法</h2>
<p>System Report 的每篇文章都是原创内容。我们不转载新闻稿，不改写标题。我们的编辑流程包括阅读多个一手来源、提炼关键事实，并为读者呈现一篇一次性阅读即可了解全貌的深度报道。</p>
<h2>我们的标准</h2>
<p><strong>准确性优先。</strong>每项声明在发布前均经过多方来源交叉核实。<strong>无标题党。</strong>标题如实告知发生了什么。<strong>无付费墙。</strong>所有内容免费阅读。<strong>快速且隐私。</strong>静态架构意味着页面即时加载，无跟踪 Cookie。</p>
<h2>联系我们</h2>
<p>有新闻线索或更正建议？请发送邮件至 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>，或访问我们的<a href="__CONTACT__">联系页面</a>。</p>
`,
};
CONTACT['zh-CN'] = {
  metaTitle: '联系我们 — System Report',
  metaDescription: '联系 System Report 编辑团队 — 新闻线索、更正、广告咨询及一般问题。',
  h1: '联系我们',
  bodyHtml: `
<p class="lead">我们阅读每一条留言。联系 System Report 编辑团队最快捷的方式是发送电子邮件。</p>
<h2>电子邮件</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>我们争取在两个工作日内回复。</p>
<h2>邮寄地址</h2>
<address>__ADDRESS__</address>
<h2>可以写信的内容</h2>
<ul>
<li><strong>新闻线索</strong> — 请提供简短摘要和相关链接。如有需要，我们尊重保密请求。</li>
<li><strong>更正</strong> — 请指出文章和具体声明。我们会及时、透明地发布更正。</li>
<li><strong>媒体 &amp; 产品简报</strong> — 欢迎禁止发布前的公告及预先简报。请在主题中注明禁止发布时间。</li>
<li><strong>广告合作</strong> — 赞助及合作咨询请说明公司名称、目标受众和拟议时间。</li>
<li><strong>许可授权</strong> — 转载、联合发布及翻译请求将逐案审核。</li>
<li><strong>隐私</strong> — 关于本站数据处理的问题，请参阅我们的<a href="__PRIVACY__">隐私政策</a>。</li>
</ul>
<h2>我们不提供的服务</h2>
<p>System Report 不提供所报道产品的技术支持、个人投资或法律建议，也不提供以编辑内容为名的付费植入。</p>
<h2>编辑独立性</h2>
<p>我们的编辑决策独立于广告商、赞助商及报道对象。如有赞助内容，相关关系将在文章中明确披露。</p>
`,
};
PRIVACY['zh-CN'] = {
  metaTitle: '隐私政策 — System Report',
  metaDescription: 'System Report 隐私政策 — 收集哪些数据、如何使用以及您的权利。',
  h1: '隐私政策',
  lastUpdated: '最后更新：2026年4月',
  bodyHtml: `
<h2>简短说明</h2>
<p>System Report 是一个静态网站。我们不使用 Cookie，不跨网站追踪您，也不直接收集读者的个人数据。我们嵌入的第三方服务（分析、广告）可能会按以下说明设置自己的 Cookie。</p>
<h2>数据分析</h2>
<p>我们使用 <strong>Cloudflare Web Analytics</strong>，这是一项隐私优先的服务，不使用 Cookie、不跨网站追踪用户、不收集个人身份信息、不进行浏览器指纹识别。仅收集页面浏览量、来源渠道、所在国家等匿名汇总指标。</p>
<h2>广告</h2>
<p>本站可能会展示由 <strong>Google AdSense</strong> 投放的广告。Google 及其合作伙伴使用 Cookie 和类似技术，根据您访问本站及其他网站的情况投放广告。您可以通过 <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 广告设置</a>退出个性化广告。更多信息请参阅 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google 广告隐私政策</a>。</p>
<h2>数据收集</h2>
<p>System Report 不直接收集、存储或处理个人信息。我们的基础设施中没有用户注册系统、评论系统或对读者数据的服务器端处理。</p>
<h2>第三方服务</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN 托管和注重隐私的分析服务。</li>
<li><strong>Google Fonts</strong> — 通过 Google CDN 提供字体。</li>
<li><strong>Google AdSense</strong> — 广告服务（可能使用 Cookie，详见上文）。</li>
<li><strong>Pexels</strong> — 从 Pexels CDN 加载的图库照片。</li>
</ul>
<h2>您的权利</h2>
<p>由于 System Report 不收集或存储个人数据，我们无法代您访问、更正、导出或删除任何数据。如果您在本站内外使用了 Google 服务，可通过 Google 的<a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">数据和隐私</a>控制台管理相关数据。</p>
<h2>儿童隐私</h2>
<p>System Report 面向普通大众，不以13岁以下儿童为目标受众。我们不会故意收集儿童的任何信息。</p>
<h2>政策变更</h2>
<p>我们可能会不时更新本政策。页面顶部的"最后更新"日期反映最新修订时间。</p>
<h2>联系我们</h2>
<p>有关本隐私政策的问题，请发送电子邮件至 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>，或通过邮件联系以下地址：</p>
<address>__ADDRESS__</address>
`,
};
TERMS['zh-CN'] = {
  metaTitle: '使用条款 — System Report',
  metaDescription: '关于使用 System Report 的条款，包括内容许可、免责声明及可接受使用规范。',
  h1: '使用条款',
  lastUpdated: '最后更新：2026年4月',
  bodyHtml: `
<h2>协议</h2>
<p>访问或使用 System Report（以下简称"本站"），即表示您同意本使用条款。如您不同意，请勿使用本站。</p>
<h2>编辑内容</h2>
<p>System Report 发布的所有文章、分析和评论均由我们的编辑团队制作。如内容引用外部报道，将注明或链接一手来源。我们努力确保准确性，但不保证每个细节都无误；读者在据此采取行动前，应以一手来源核实时效性较强的内容。</p>
<h2>知识产权</h2>
<p>本站所有原创编辑内容（包括文字、标题、插图及版式）均归 System Report 所有，受版权法保护。您可以在注明出处并链接原文的情况下分享摘录。全文转载、商业再发行或将内容用于训练机器学习模型，须事先获得书面许可。许可授权请联系 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>。</p>
<h2>配图</h2>
<p>编辑配图来源于 <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>，遵循 Pexels 许可或类似免版权条款。有要求时会标注摄影师署名。Pexels 图片不属于 System Report 可授权内容的一部分，受其原始许可约束。</p>
<h2>第三方链接</h2>
<p>文章中会定期链接外部网站作为参考。我们对第三方网站的内容、准确性、隐私做法或可用性不承担责任。链接不代表背书。</p>
<h2>广告</h2>
<p>本站可能展示由 Google AdSense 及其他广告网络投放的广告。广告与编辑内容有明确区分。广告提供商的 Cookie 使用信息，请参阅我们的<a href="__PRIVACY__">隐私政策</a>。</p>
<h2>可接受使用</h2>
<p>您同意不在未经许可的情况下抓取、镜像或系统性采集本站；不在未获单独授权的情况下将本站用于训练或微调机器学习模型；不干扰本站的正常运行、安全或可用性；不将 System Report 内容冒充为您自己的内容或经我们认可的内容。</p>
<h2>免责声明</h2>
<p>本站按"现状"和"可用状态"提供。在法律允许的最大范围内，System Report 否认所有明示或暗示的保证。本站任何内容均不构成财务、法律、医疗或专业建议。</p>
<h2>责任限制</h2>
<p>在法律允许的最大范围内，System Report 对因您访问或使用本站而产生的任何间接、偶然、特殊、后果性或惩罚性损害不承担责任。</p>
<h2>适用法律</h2>
<p>本条款受土耳其共和国法律管辖，不考虑法律冲突原则。因本条款引起的或与之相关的任何争议，应提交伊斯坦布尔法院专属管辖。</p>
<h2>变更</h2>
<p>我们可能随时修订本使用条款。修订后继续使用本站即表示接受更新后的条款。</p>
<h2>联系我们</h2>
<p>有关本条款的问题，请发送邮件至 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>，或通过邮件联系以下地址：</p>
<address>__ADDRESS__</address>
`,
};

// ─── 한국어 ──────────────────────────────────────────────────────────────────
ABOUT.ko = {
  metaTitle: 'System Report 소개',
  metaDescription: 'System Report는 기술 업계를 형성하는 중요한 뉴스를 심층 분석과 전문가 해설로 전달합니다.',
  h1: 'System Report 소개',
  bodyHtml: `
<p class="lead">System Report는 기술 업계를 형성하는 스토리를 명확하고 철저한 조사를 통해 전달하는 테크 뉴스 매체입니다. 불필요한 소음을 걷어내고 실제로 중요한 정보를 전면에 내세웁니다.</p>
<h2>다루는 주제</h2>
<p>기술 분야의 전 스펙트럼을 커버합니다:</p>
<ul>
<li><strong>실리콘 &amp; 하드웨어</strong> — 칩 아키텍처, 디바이스 출시, 반도체 공급망.</li>
<li><strong>인공지능</strong> — 모델 혁신, 기업 도입, AI의 사회적 영향.</li>
<li><strong>소프트웨어 &amp; 플랫폼</strong> — 개발자 도구, 클라우드 인프라, 진화하는 플랫폼 경제.</li>
<li><strong>정책 &amp; 규제</strong> — 디지털 거버넌스, 반독점, 글로벌 규제 환경.</li>
<li><strong>보안 &amp; 프라이버시</strong> — 위협 인텔리전스, 취약점 공개, 데이터 보호.</li>
<li><strong>스타트업 &amp; 벤처</strong> — 투자 라운드, 시장 변화, 신흥 기술 기업.</li>
</ul>
<h2>우리의 접근 방식</h2>
<p>System Report의 모든 기사는 독자적으로 작성됩니다. 보도자료를 그대로 옮기거나 헤드라인을 다시 쓰지 않습니다. 여러 1차 정보 출처를 검토하고 핵심 사실을 추출해 독자가 한 번의 읽기로 전체 그림을 파악할 수 있는 심층 기사를 제공합니다.</p>
<h2>우리의 기준</h2>
<p><strong>정확성 우선.</strong> 모든 주장은 발행 전 복수의 출처로 교차 검증됩니다. <strong>낚시 제목 없음.</strong> 헤드라인은 있는 그대로 사실을 전달합니다. <strong>유료 벽 없음.</strong> 모든 콘텐츠는 무료로 읽을 수 있습니다. <strong>빠르고 프라이빗.</strong> 정적 아키텍처 덕분에 즉각적인 페이지 로딩과 추적 쿠키 없음을 실현합니다.</p>
<h2>연락처</h2>
<p>제보나 수정 사항이 있으신가요? <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>으로 이메일을 보내거나 <a href="__CONTACT__">문의 페이지</a>를 방문해 주세요.</p>
`,
};
CONTACT.ko = {
  metaTitle: '문의하기 — System Report',
  metaDescription: 'System Report 편집팀에 문의하세요 — 제보, 정정, 광고 문의 및 일반 질문.',
  h1: '문의하기',
  bodyHtml: `
<p class="lead">모든 메시지를 읽습니다. System Report 편집팀에 연락하는 가장 빠른 방법은 이메일입니다.</p>
<h2>이메일</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>2영업일 이내 답변을 목표로 합니다.</p>
<h2>우편 주소</h2>
<address>__ADDRESS__</address>
<h2>문의 내용</h2>
<ul>
<li><strong>제보</strong> — 간단한 요약과 관련 링크를 보내주세요. 요청 시 기밀이 보장됩니다.</li>
<li><strong>정정</strong> — 기사와 특정 주장을 알려주세요. 신속하고 투명하게 정정 기사를 게재합니다.</li>
<li><strong>보도자료 &amp; 제품 브리핑</strong> — 엠바고 발표 및 사전 브리핑을 환영합니다. 제목에 엠바고 시간을 포함해 주세요.</li>
<li><strong>광고</strong> — 스폰서십 및 파트너십 문의 시 회사명, 타깃 고객층, 예상 일정을 포함해 주세요.</li>
<li><strong>허가</strong> — 재발행, 신디케이션, 번역 요청은 건별로 검토합니다.</li>
<li><strong>프라이버시</strong> — 본 사이트의 데이터 처리 방식에 관한 질문은 <a href="__PRIVACY__">개인정보 처리방침</a>에서 확인하실 수 있습니다.</li>
</ul>
<h2>제공하지 않는 것</h2>
<p>System Report는 다루는 제품에 대한 기술 지원, 개인 투자·법률 조언, 또는 편집 콘텐츠로 위장한 유료 게재를 제공하지 않습니다.</p>
<h2>편집 독립성</h2>
<p>편집 결정은 광고주, 스폰서, 취재 대상 기업과 독립적으로 이루어집니다. 스폰서 콘텐츠의 경우 해당 관계가 기사 내에 명확히 공개됩니다.</p>
`,
};
PRIVACY.ko = {
  metaTitle: '개인정보 처리방침 — System Report',
  metaDescription: 'System Report 개인정보 처리방침 — 수집하는 데이터, 사용 방법, 귀하의 권리.',
  h1: '개인정보 처리방침',
  lastUpdated: '최종 업데이트: 2026년 4월',
  bodyHtml: `
<h2>요약</h2>
<p>System Report는 정적 웹사이트입니다. 쿠키를 사용하지 않으며 웹상에서 사용자를 추적하지 않고 독자로부터 직접 개인 데이터를 수집하지 않습니다. 저희가 삽입하는 서드파티 서비스(분석, 광고)는 아래에 설명된 대로 자체 쿠키를 설정할 수 있습니다.</p>
<h2>분석</h2>
<p>쿠키를 사용하지 않고, 사이트 간 사용자 추적을 하지 않으며, 개인 식별 정보를 수집하지 않고, 브라우저 핑거프린팅을 하지 않는 프라이버시 우선 서비스인 <strong>Cloudflare Web Analytics</strong>를 사용합니다. 페이지 조회수, 유입 경로, 국가 등의 익명 집계 지표만 수집됩니다.</p>
<h2>광고</h2>
<p>본 사이트에는 <strong>Google AdSense</strong>가 제공하는 광고가 표시될 수 있습니다. Google과 그 파트너는 이 사이트 및 다른 사이트 방문에 기반한 광고 제공을 위해 쿠키 및 유사 기술을 사용합니다. <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google 광고 설정</a>을 통해 맞춤 광고를 거부할 수 있습니다. 자세한 내용은 <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google의 광고 개인정보 보호정책</a>을 참조하세요.</p>
<h2>데이터 수집</h2>
<p>System Report는 개인 정보를 직접 수집, 저장 또는 처리하지 않습니다. 당사 인프라에는 사용자 등록 시스템, 댓글 시스템, 독자 데이터의 서버 측 처리가 없습니다.</p>
<h2>서드파티 서비스</h2>
<ul>
<li><strong>Cloudflare</strong> — CDN 호스팅 및 프라이버시 중심 분석.</li>
<li><strong>Google Fonts</strong> — Google CDN을 통한 폰트 제공.</li>
<li><strong>Google AdSense</strong> — 광고(쿠키 사용 가능, 위 내용 참조).</li>
<li><strong>Pexels</strong> — Pexels CDN에서 로드되는 스톡 사진.</li>
</ul>
<h2>귀하의 권리</h2>
<p>System Report는 개인 데이터를 수집하거나 저장하지 않으므로 귀하를 대신해 접근, 수정, 내보내기 또는 삭제할 데이터가 없습니다. 이 사이트 내외에서 Google 서비스를 이용한 경우 Google의 <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">데이터 및 개인 정보 보호</a>를 통해 해당 데이터를 관리할 수 있습니다.</p>
<h2>아동 개인정보</h2>
<p>System Report는 일반 독자를 대상으로 하는 매체로, 13세 미만 아동을 대상으로 하지 않습니다. 아동으로부터 정보를 의도적으로 수집하지 않습니다.</p>
<h2>방침 변경</h2>
<p>본 방침은 수시로 업데이트될 수 있습니다. 페이지 상단의 "최종 업데이트" 날짜가 가장 최근 개정일을 반영합니다.</p>
<h2>문의</h2>
<p>본 개인정보 처리방침에 관한 질문은 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>으로 이메일을 보내거나 아래 주소로 우편을 보내주세요:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.ko = {
  metaTitle: '이용약관 — System Report',
  metaDescription: 'System Report 이용 약관 — 콘텐츠 라이선스, 면책 조항, 허용되는 사용 포함.',
  h1: '이용약관',
  lastUpdated: '최종 업데이트: 2026년 4월',
  bodyHtml: `
<h2>동의</h2>
<p>System Report(이하 "본 사이트")에 접근하거나 사용함으로써 본 이용약관에 동의하는 것으로 간주됩니다. 동의하지 않으시면 본 사이트를 사용하지 마십시오.</p>
<h2>편집 콘텐츠</h2>
<p>System Report에 게재된 모든 기사, 분석 및 해설은 저희 편집팀이 제작합니다. 외부 보도를 인용하는 경우 1차 출처를 참조하거나 링크합니다. 정확성을 위해 노력하지만 모든 세부 사항이 오류 없음을 보장하지 않습니다. 시의성이 중요한 주장은 행동 전에 1차 출처로 확인하시기 바랍니다.</p>
<h2>지적재산권</h2>
<p>본 사이트의 모든 독창적인 편집 콘텐츠(텍스트, 헤드라인, 일러스트, 레이아웃 포함)는 System Report에 귀속되며 저작권에 의해 보호됩니다. 적절한 출처 표기와 원문 링크를 포함하여 발췌문을 공유할 수 있습니다. 전문 재게재, 상업적 재배포, 또는 머신러닝 모델 학습을 위한 사용은 사전 서면 허가가 필요합니다. 라이선스 문의: <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>히어로 이미지</h2>
<p>편집용 히어로 이미지는 Pexels 라이선스 또는 유사한 무로열티 조건하에 <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a>에서 제공받습니다. 필요한 경우 사진 작가 크레딧을 표기합니다. Pexels 이미지는 System Report의 라이선스 가능한 콘텐츠에 포함되지 않으며 원래 라이선스를 따릅니다.</p>
<h2>서드파티 링크</h2>
<p>기사에는 참조 목적으로 외부 사이트 링크가 자주 포함됩니다. 서드파티 사이트의 내용, 정확성, 개인정보 보호 관행 또는 가용성에 대해 책임지지 않습니다. 링크는 추천을 의미하지 않습니다.</p>
<h2>광고</h2>
<p>본 사이트에는 Google AdSense 및 기타 광고 네트워크의 광고가 표시될 수 있습니다. 광고는 편집 콘텐츠와 명확히 구분됩니다. 광고 제공업체의 쿠키 사용에 관한 정보는 <a href="__PRIVACY__">개인정보 처리방침</a>에서 확인하세요.</p>
<h2>허용 사용</h2>
<p>귀하는 허가 없이 본 사이트를 스크래핑, 미러링 또는 체계적으로 수집하지 않을 것에 동의합니다. 별도 라이선스 없이 머신러닝 모델 학습 또는 미세 조정에 사용하지 않으며, 본 사이트의 정상적인 운영, 보안 또는 가용성을 방해하려 하지 않고, System Report 콘텐츠를 자신의 것이나 저희가 보증한 것으로 허위 표시하지 않습니다.</p>
<h2>보증 부인</h2>
<p>본 사이트는 "있는 그대로" 및 "가능한 상태로" 제공됩니다. 법이 허용하는 최대 범위에서 System Report는 모든 명시적 또는 묵시적 보증을 부인합니다. 본 사이트의 어떠한 내용도 재정, 법률, 의료 또는 전문적 조언을 구성하지 않습니다.</p>
<h2>책임 제한</h2>
<p>법이 허용하는 최대 범위에서 System Report는 본 사이트 접근 또는 사용으로 발생하는 어떠한 간접적, 부수적, 특별, 결과적 또는 징벌적 손해에 대해서도 책임지지 않습니다.</p>
<h2>준거법</h2>
<p>본 약관은 법 충돌 원칙과 관계없이 터키 공화국 법률에 따라 규율됩니다. 본 약관과 관련하여 발생하는 분쟁은 이스탄불 법원의 전속 관할에 따릅니다.</p>
<h2>변경</h2>
<p>본 이용약관은 언제든지 개정될 수 있습니다. 개정 후 본 사이트를 계속 사용하면 업데이트된 약관에 동의한 것으로 간주됩니다.</p>
<h2>문의</h2>
<p>본 약관에 관한 질문은 <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>으로 이메일을 보내거나 아래 주소로 우편을 보내주세요:</p>
<address>__ADDRESS__</address>
`,
};

// ─── Português ───────────────────────────────────────────────────────────────
ABOUT.pt = {
  metaTitle: 'Sobre — System Report',
  metaDescription: 'System Report oferece análise aprofundada e comentários especializados sobre as histórias que moldam o setor de tecnologia.',
  h1: 'Sobre o System Report',
  bodyHtml: `
<p class="lead">System Report é uma publicação de notícias de tecnologia focada em oferecer análises claras e bem fundamentadas das histórias que moldam a indústria. Filtramos o ruído para destacar o que realmente importa.</p>
<h2>O que cobrimos</h2>
<p>Cobrimos todo o espectro do cenário tecnológico, incluindo:</p>
<ul>
<li><strong>Silício &amp; Hardware</strong> — Arquitetura de chips, lançamentos de dispositivos e a cadeia de suprimentos de semicondutores.</li>
<li><strong>Inteligência Artificial</strong> — Avanços em modelos, adoção empresarial e o impacto social da IA.</li>
<li><strong>Software &amp; Plataformas</strong> — Ferramentas para desenvolvedores, infraestrutura de nuvem e a economia de plataformas em evolução.</li>
<li><strong>Política &amp; Regulação</strong> — Governança digital, antitruste e o panorama regulatório global.</li>
<li><strong>Segurança &amp; Privacidade</strong> — Inteligência de ameaças, divulgações de vulnerabilidades e proteção de dados.</li>
<li><strong>Startups &amp; Venture</strong> — Rodadas de investimento, mudanças de mercado e empresas de tecnologia emergentes.</li>
</ul>
<h2>Nossa abordagem</h2>
<p>Cada artigo do System Report é original. Não reproduzimos comunicados de imprensa nem reescrevemos manchetes. Nosso processo editorial envolve a leitura de múltiplas fontes primárias, a destilação dos fatos-chave e a produção de uma visão abrangente que oferece ao leitor um panorama completo em uma única leitura.</p>
<h2>Nossos padrões</h2>
<p><strong>Precisão em primeiro lugar.</strong> Cada afirmação é verificada em múltiplas fontes antes da publicação. <strong>Sem clickbait.</strong> As manchetes dizem o que aconteceu. <strong>Sem paywall.</strong> Todo o conteúdo é de leitura gratuita. <strong>Rápido e privado.</strong> A arquitetura estática garante carregamento instantâneo e ausência de cookies de rastreamento.</p>
<h2>Contato</h2>
<p>Tem uma dica ou correção? Envie um e-mail para <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou visite nossa <a href="__CONTACT__">página de contato</a>.</p>
`,
};
CONTACT.pt = {
  metaTitle: 'Contato — System Report',
  metaDescription: 'Entre em contato com a equipe editorial do System Report — dicas, correções, consultas publicitárias e perguntas gerais.',
  h1: 'Contato',
  bodyHtml: `
<p class="lead">Lemos todas as mensagens. A forma mais rápida de contatar a equipe editorial do System Report é por e-mail.</p>
<h2>E-mail</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>Nosso objetivo é responder em até dois dias úteis.</p>
<h2>Endereço postal</h2>
<address>__ADDRESS__</address>
<h2>Sobre o que escrever</h2>
<ul>
<li><strong>Dicas de pautas</strong> — Envie um breve resumo e links relevantes. A confidencialidade é respeitada mediante solicitação.</li>
<li><strong>Correções</strong> — Indique o artigo e a afirmação específica. Publicamos correções de forma rápida e transparente.</li>
<li><strong>Briefings de imprensa &amp; produtos</strong> — Anúncios com embargo e pré-briefings são bem-vindos. Inclua o horário do embargo no assunto.</li>
<li><strong>Publicidade</strong> — Consultas sobre patrocínio e parceria devem incluir o nome da empresa, público-alvo e cronograma proposto.</li>
<li><strong>Permissões</strong> — Pedidos de republicação, sindicalização e tradução são analisados caso a caso.</li>
<li><strong>Privacidade</strong> — Dúvidas sobre como este site trata os dados estão respondidas em nossa <a href="__PRIVACY__">Política de Privacidade</a>.</li>
</ul>
<h2>O que não fazemos</h2>
<p>O System Report não presta suporte técnico para os produtos que cobre, não oferece conselhos jurídicos ou de investimento individuais, nem aceita inserção paga disfarçada de conteúdo editorial.</p>
<h2>Independência editorial</h2>
<p>Nossas decisões editoriais são tomadas de forma independente de anunciantes, patrocinadores e empresas cobertas. Se uma publicação for patrocinada, esse relacionamento é claramente divulgado no próprio artigo.</p>
`,
};
PRIVACY.pt = {
  metaTitle: 'Política de Privacidade — System Report',
  metaDescription: 'Política de privacidade do System Report — quais dados são coletados, como são usados e seus direitos.',
  h1: 'Política de Privacidade',
  lastUpdated: 'Última atualização: Abril de 2026',
  bodyHtml: `
<h2>A versão resumida</h2>
<p>O System Report é um site estático. Não usamos cookies, não rastreamos você pela web e não coletamos dados pessoais dos leitores diretamente. Os serviços de terceiros que incorporamos (análise, anúncios) podem definir seus próprios cookies, conforme descrito abaixo.</p>
<h2>Análise</h2>
<p>Usamos o <strong>Cloudflare Web Analytics</strong>, um serviço voltado para a privacidade que não usa cookies, não rastreia usuários entre sites, não coleta informações de identificação pessoal e não realiza impressão digital de navegadores. Somente métricas agregadas e anônimas, como visualizações de página, referências e países, são coletadas.</p>
<h2>Publicidade</h2>
<p>Este site pode exibir anúncios veiculados pelo <strong>Google AdSense</strong>. O Google e seus parceiros usam cookies e tecnologias semelhantes para veicular anúncios com base nas suas visitas a este e a outros sites. Você pode desativar a publicidade personalizada em <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Configurações de anúncios do Google</a>. Para mais informações, consulte a <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">política de privacidade de publicidade do Google</a>.</p>
<h2>Coleta de dados</h2>
<p>O System Report não coleta, armazena ou processa informações pessoais diretamente. Não há sistema de registro de usuários, sistema de comentários ou processamento de dados de leitores no lado do servidor em nossa infraestrutura.</p>
<h2>Serviços de terceiros</h2>
<ul>
<li><strong>Cloudflare</strong> — Hospedagem CDN e análise que respeita a privacidade.</li>
<li><strong>Google Fonts</strong> — Fontes fornecidas via CDN do Google.</li>
<li><strong>Google AdSense</strong> — Publicidade (pode usar cookies; veja acima).</li>
<li><strong>Pexels</strong> — Fotos de banco de imagens carregadas do CDN do Pexels.</li>
</ul>
<h2>Seus direitos</h2>
<p>Como o System Report não coleta nem armazena dados pessoais, não há nada a acessar, corrigir, exportar ou excluir em seu nome. Se você usou os serviços do Google neste ou em outros sites, pode gerenciar esses dados por meio dos controles de <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Dados e privacidade</a> do Google.</p>
<h2>Privacidade de crianças</h2>
<p>O System Report é uma publicação de público geral e não se destina a crianças menores de 13 anos. Não coletamos conscientemente informações de crianças.</p>
<h2>Alterações nesta política</h2>
<p>Podemos atualizar esta política periodicamente. A data de "Última atualização" no topo desta página reflete a revisão mais recente.</p>
<h2>Contato</h2>
<p>Dúvidas sobre esta política de privacidade podem ser enviadas para <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou por carta para:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.pt = {
  metaTitle: 'Termos de Uso — System Report',
  metaDescription: 'Os termos que regem o uso do System Report, incluindo licenciamento de conteúdo, isenções de responsabilidade e uso aceitável.',
  h1: 'Termos de Uso',
  lastUpdated: 'Última atualização: Abril de 2026',
  bodyHtml: `
<h2>Acordo</h2>
<p>Ao acessar ou usar o System Report (o "Site"), você concorda com estes Termos de Uso. Se não concordar, não use o Site.</p>
<h2>Conteúdo editorial</h2>
<p>Todos os artigos, análises e comentários publicados no System Report são produzidos pela nossa equipe editorial. Quando uma peça se baseia em reportagens externas, as fontes primárias são referenciadas ou vinculadas. Nos esforçamos para ser precisos, mas não garantimos que cada detalhe esteja livre de erros; os leitores devem verificar afirmações sensíveis ao tempo em fontes primárias antes de agir com base nelas.</p>
<h2>Propriedade intelectual</h2>
<p>Todo o conteúdo editorial original deste Site — incluindo texto, manchetes, ilustrações e layout — é propriedade do System Report e está protegido por direitos autorais. Você pode compartilhar trechos com a devida atribuição e um link para o artigo original. A republicação de artigos completos, a redistribuição comercial ou o uso do nosso conteúdo para treinar modelos de aprendizado de máquina requer permissão prévia por escrito. E-mail para consultas de licenciamento: <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>Imagens de destaque</h2>
<p>As imagens de destaque editoriais são provenientes do <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> sob a Licença Pexels ou termos similares isentos de royalties. A atribuição ao fotógrafo é fornecida quando necessário. As imagens do Pexels não fazem parte do conteúdo licenciável do System Report e são regidas por sua licença original.</p>
<h2>Links de terceiros</h2>
<p>Os artigos frequentemente vinculam sites externos como referência. Não somos responsáveis pelo conteúdo, precisão, práticas de privacidade ou disponibilidade de sites de terceiros. Um link não constitui endosso.</p>
<h2>Publicidade</h2>
<p>Este Site pode exibir anúncios veiculados pelo Google AdSense e outras redes de publicidade. Os anúncios são claramente distinguíveis do conteúdo editorial. Informações sobre como os provedores de anúncios usam cookies estão disponíveis em nossa <a href="__PRIVACY__">Política de Privacidade</a>.</p>
<h2>Uso aceitável</h2>
<p>Você concorda em não raspar, espelhar ou coletar sistematicamente o Site sem permissão; não usar o Site para treinar ou ajustar modelos de aprendizado de máquina sem uma licença separada; não tentar interferir na operação normal, segurança ou disponibilidade do Site; e não deturpar o conteúdo do System Report como seu ou como endossado por nós.</p>
<h2>Isenção de garantias</h2>
<p>O Site é fornecido "como está" e "conforme disponível". Na extensão máxima permitida por lei, o System Report se isenta de todas as garantias, expressas ou implícitas. Nada neste Site constitui conselho financeiro, jurídico, médico ou profissional.</p>
<h2>Limitação de responsabilidade</h2>
<p>Na extensão máxima permitida por lei, o System Report não será responsável por quaisquer danos indiretos, incidentais, especiais, consequenciais ou punitivos decorrentes do seu acesso ou uso do Site.</p>
<h2>Lei aplicável</h2>
<p>Estes Termos são regidos pelas leis da República da Turquia, sem consideração aos princípios de conflito de leis. Qualquer disputa decorrente ou relacionada a estes Termos estará sujeita à jurisdição exclusiva dos tribunais de Istambul.</p>
<h2>Alterações</h2>
<p>Podemos revisar estes Termos de Uso a qualquer momento. O uso continuado do Site após uma revisão constitui aceitação dos termos atualizados.</p>
<h2>Contato</h2>
<p>Dúvidas sobre estes termos podem ser enviadas para <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> ou por carta para:</p>
<address>__ADDRESS__</address>
`,
};

// ─── Italiano ────────────────────────────────────────────────────────────────
ABOUT.it = {
  metaTitle: 'Chi siamo — System Report',
  metaDescription: 'System Report offre analisi approfondite e commenti specializzati sulle storie che plasmano il settore tecnologico.',
  h1: 'Chi siamo',
  bodyHtml: `
<p class="lead">System Report è una pubblicazione di notizie tecnologiche che si concentra sull'offrire analisi chiare e ben documentate delle storie che plasmano l'industria. Tagliamo attraverso il rumore per portare in primo piano ciò che conta davvero.</p>
<h2>Cosa copriamo</h2>
<p>Copriamo l'intero spettro del panorama tecnologico, tra cui:</p>
<ul>
<li><strong>Silicio &amp; Hardware</strong> — Architettura dei chip, lancio di dispositivi e la catena di approvvigionamento dei semiconduttori.</li>
<li><strong>Intelligenza Artificiale</strong> — Progressi dei modelli, adozione aziendale e l'impatto sociale dell'IA.</li>
<li><strong>Software &amp; Piattaforme</strong> — Strumenti per sviluppatori, infrastruttura cloud e l'economia delle piattaforme in evoluzione.</li>
<li><strong>Politica &amp; Regolamentazione</strong> — Governance digitale, antitrust e il panorama normativo globale.</li>
<li><strong>Sicurezza &amp; Privacy</strong> — Intelligence sulle minacce, divulgazioni di vulnerabilità e protezione dei dati.</li>
<li><strong>Startup &amp; Venture</strong> — Round di finanziamento, cambiamenti di mercato e aziende tecnologiche emergenti.</li>
</ul>
<h2>Il nostro approccio</h2>
<p>Ogni articolo di System Report è originale. Non rielaboriamo comunicati stampa né riscriviamo titoli. Il nostro processo editoriale prevede la lettura di più fonti primarie, la sintesi dei fatti chiave e la produzione di un'analisi completa che offre ai lettori un quadro esaustivo in un'unica lettura.</p>
<h2>I nostri standard</h2>
<p><strong>Precisione prima di tutto.</strong> Ogni affermazione è verificata su più fonti prima della pubblicazione. <strong>Niente clickbait.</strong> I titoli dicono cosa è successo. <strong>Nessun paywall.</strong> Tutti i contenuti sono di libera lettura. <strong>Veloce e privato.</strong> L'architettura statica significa caricamento istantaneo delle pagine e nessun cookie di tracciamento.</p>
<h2>Contatti</h2>
<p>Hai una segnalazione o una correzione? Scrivici a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o visita la nostra <a href="__CONTACT__">pagina di contatto</a>.</p>
`,
};
CONTACT.it = {
  metaTitle: 'Contatti — System Report',
  metaDescription: 'Contatta il team editoriale di System Report — segnalazioni, correzioni, richieste pubblicitarie e domande generali.',
  h1: 'Contatti',
  bodyHtml: `
<p class="lead">Leggiamo ogni messaggio. Il modo più rapido per contattare il team editoriale di System Report è l'email.</p>
<h2>Email</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>Il nostro obiettivo è rispondere entro due giorni lavorativi.</p>
<h2>Indirizzo postale</h2>
<address>__ADDRESS__</address>
<h2>Di cosa scrivere</h2>
<ul>
<li><strong>Segnalazioni</strong> — Invia un breve riassunto e i link pertinenti. La riservatezza è rispettata su richiesta.</li>
<li><strong>Correzioni</strong> — Indica l'articolo e l'affermazione specifica. Pubblichiamo le correzioni con tempestività e trasparenza.</li>
<li><strong>Comunicati stampa &amp; briefing di prodotto</strong> — Gli annunci in embargo e i pre-briefing sono i benvenuti. Includi l'orario dell'embargo nell'oggetto.</li>
<li><strong>Pubblicità</strong> — Le richieste di sponsorizzazione e partnership devono includere il nome dell'azienda, il pubblico di riferimento e i tempi proposti.</li>
<li><strong>Permessi</strong> — Le richieste di ripubblicazione, syndication e traduzione sono valutate caso per caso.</li>
<li><strong>Privacy</strong> — Le domande su come questo sito gestisce i dati trovano risposta nella nostra <a href="__PRIVACY__">Informativa sulla Privacy</a>.</li>
</ul>
<h2>Cosa non facciamo</h2>
<p>System Report non fornisce supporto tecnico per i prodotti che copre, non offre consulenza individuale in materia di investimenti o legale, né accetta inserzioni a pagamento mascherate da contenuto editoriale.</p>
<h2>Indipendenza editoriale</h2>
<p>Le nostre decisioni editoriali sono prese in modo indipendente da inserzionisti, sponsor e aziende che copriamo. Se un articolo è sponsorizzato, tale relazione è chiaramente indicata nell'articolo stesso.</p>
`,
};
PRIVACY.it = {
  metaTitle: 'Informativa sulla Privacy — System Report',
  metaDescription: 'Informativa sulla privacy di System Report — quali dati vengono raccolti, come vengono utilizzati e i tuoi diritti.',
  h1: 'Informativa sulla Privacy',
  lastUpdated: 'Ultimo aggiornamento: Aprile 2026',
  bodyHtml: `
<h2>La versione breve</h2>
<p>System Report è un sito web statico. Non utilizziamo cookie, non ti tracciamo attraverso il web e non raccogliamo direttamente dati personali dai lettori. I servizi di terze parti che incorporiamo (analisi, pubblicità) possono impostare i propri cookie come descritto di seguito.</p>
<h2>Analisi</h2>
<p>Utilizziamo <strong>Cloudflare Web Analytics</strong>, un servizio orientato alla privacy che non usa cookie, non traccia gli utenti tra siti diversi, non raccoglie informazioni di identificazione personale e non effettua il fingerprinting del browser. Vengono raccolte solo metriche aggregate e anonime, come visualizzazioni di pagina, referral e paesi.</p>
<h2>Pubblicità</h2>
<p>Questo sito può mostrare annunci pubblicitari erogati da <strong>Google AdSense</strong>. Google e i suoi partner utilizzano cookie e tecnologie simili per servire annunci in base alle tue visite a questo e altri siti. Puoi disattivare la pubblicità personalizzata tramite le <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Impostazioni annunci di Google</a>. Per ulteriori informazioni, consulta la <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">normativa sulla privacy pubblicitaria di Google</a>.</p>
<h2>Raccolta dati</h2>
<p>System Report non raccoglie, archivia o elabora direttamente informazioni personali. Non esiste alcun sistema di registrazione utenti, sistema di commenti o elaborazione lato server dei dati dei lettori nella nostra infrastruttura.</p>
<h2>Servizi di terze parti</h2>
<ul>
<li><strong>Cloudflare</strong> — Hosting CDN e analisi rispettosa della privacy.</li>
<li><strong>Google Fonts</strong> — Font forniti tramite la CDN di Google.</li>
<li><strong>Google AdSense</strong> — Pubblicità (può utilizzare cookie; vedi sopra).</li>
<li><strong>Pexels</strong> — Foto stock caricate dalla CDN di Pexels.</li>
</ul>
<h2>I tuoi diritti</h2>
<p>Poiché System Report non raccoglie né archivia dati personali, non c'è nulla da accedere, correggere, esportare o eliminare a tuo nome. Se hai utilizzato i servizi di Google su o fuori da questo sito, puoi gestire quei dati tramite i controlli <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">Dati e privacy</a> di Google.</p>
<h2>Privacy dei minori</h2>
<p>System Report è una pubblicazione di pubblico generale e non è rivolta a minori di 13 anni. Non raccogliamo consapevolmente informazioni da minori.</p>
<h2>Modifiche a questa informativa</h2>
<p>Potremmo aggiornare questa informativa di tanto in tanto. La data di "Ultimo aggiornamento" in cima a questa pagina riflette la revisione più recente.</p>
<h2>Contatti</h2>
<p>Le domande su questa informativa sulla privacy possono essere inviate a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o per posta a:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.it = {
  metaTitle: "Termini di utilizzo — System Report",
  metaDescription: "I termini che regolano l'utilizzo di System Report, inclusi licenza dei contenuti, dichiarazioni di non responsabilità e uso accettabile.",
  h1: 'Termini di utilizzo',
  lastUpdated: 'Ultimo aggiornamento: Aprile 2026',
  bodyHtml: `
<h2>Accordo</h2>
<p>Accedendo o utilizzando System Report (il "Sito"), accetti questi Termini di utilizzo. Se non sei d'accordo, ti preghiamo di non utilizzare il Sito.</p>
<h2>Contenuto editoriale</h2>
<p>Tutti gli articoli, le analisi e i commenti pubblicati su System Report sono prodotti dal nostro team editoriale. Quando un pezzo si basa su reportage esterni, le fonti primarie vengono citate o collegate. Ci impegniamo per l'accuratezza ma non garantiamo che ogni dettaglio sia privo di errori; i lettori dovrebbero verificare le affermazioni sensibili al tempo sulle fonti primarie prima di agire.</p>
<h2>Proprietà intellettuale</h2>
<p>Tutti i contenuti editoriali originali di questo Sito — inclusi testi, titoli, illustrazioni e layout — sono di proprietà di System Report e protetti da copyright. Puoi condividere estratti con la dovuta attribuzione e un link all'articolo originale. La ripubblicazione di articoli completi, la ridistribuzione commerciale o l'uso dei nostri contenuti per addestrare modelli di machine learning richiedono autorizzazione scritta preventiva. Email per richieste di licenza: <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>Immagini hero</h2>
<p>Le immagini hero editoriali provengono da <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> sotto la Licenza Pexels o termini simili privi di royalty. L'attribuzione al fotografo viene fornita quando richiesto. Le immagini Pexels non fanno parte del contenuto licenziabile di System Report e sono disciplinate dalla loro licenza originale.</p>
<h2>Link di terze parti</h2>
<p>Gli articoli collegano regolarmente siti esterni come riferimento. Non siamo responsabili del contenuto, dell'accuratezza, delle pratiche di privacy o della disponibilità di siti di terze parti. Un link non costituisce un'approvazione.</p>
<h2>Pubblicità</h2>
<p>Questo Sito può mostrare annunci pubblicitari erogati da Google AdSense e altre reti pubblicitarie. Gli annunci sono chiaramente distinguibili dal contenuto editoriale. Informazioni su come i fornitori di annunci utilizzano i cookie sono disponibili nella nostra <a href="__PRIVACY__">Informativa sulla Privacy</a>.</p>
<h2>Uso accettabile</h2>
<p>Accetti di non eseguire scraping, mirroring o raccolta sistematica del Sito senza permesso; di non utilizzare il Sito per addestrare o ottimizzare modelli di machine learning senza una licenza separata; di non tentare di interferire con il normale funzionamento, la sicurezza o la disponibilità del Sito; e di non presentare erroneamente i contenuti di System Report come propri o come da noi approvati.</p>
<h2>Esclusione di garanzie</h2>
<p>Il Sito è fornito "così com'è" e "come disponibile". Nella misura massima consentita dalla legge, System Report esclude tutte le garanzie, espresse o implicite. Nulla su questo Sito costituisce consulenza finanziaria, legale, medica o professionale.</p>
<h2>Limitazione di responsabilità</h2>
<p>Nella misura massima consentita dalla legge, System Report non sarà responsabile per eventuali danni indiretti, incidentali, speciali, consequenziali o punitivi derivanti dall'accesso o dall'utilizzo del Sito.</p>
<h2>Legge applicabile</h2>
<p>I presenti Termini sono disciplinati dalle leggi della Repubblica di Turchia, senza riguardo ai principi di conflitto di leggi. Qualsiasi controversia derivante da o in connessione con i presenti Termini sarà soggetta alla giurisdizione esclusiva dei tribunali di Istanbul.</p>
<h2>Modifiche</h2>
<p>Possiamo rivedere questi Termini di utilizzo in qualsiasi momento. L'utilizzo continuato del Sito dopo una revisione costituisce accettazione dei termini aggiornati.</p>
<h2>Contatti</h2>
<p>Le domande su questi termini possono essere inviate a <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> o per posta a:</p>
<address>__ADDRESS__</address>
`,
};

// ─── العربية ─────────────────────────────────────────────────────────────────
ABOUT.ar = {
  metaTitle: 'عن System Report',
  metaDescription: 'يقدّم System Report تحليلاً معمّقاً وتعليقاً متخصصاً على أبرز القصص التي تشكّل قطاع التكنولوجيا.',
  h1: 'عن System Report',
  bodyHtml: `
<p class="lead">System Report منشور متخصص في أخبار التكنولوجيا، يسعى إلى تقديم تحليل واضح وموثّق للقصص التي تشكّل صناعة التقنية. نخترق الضوضاء لنُبرز ما يهمّ فعلاً.</p>
<h2>ما نغطّيه</h2>
<p>نغطّي الطيف الكامل للمشهد التقني، بما يشمل:</p>
<ul>
<li><strong>الرقائق والأجهزة</strong> — معمارية الرقائق، وإطلاق الأجهزة، وسلسلة إمداد أشباه الموصلات.</li>
<li><strong>الذكاء الاصطناعي</strong> — اختراقات النماذج، واعتماد المؤسسات، والأثر الاجتماعي للذكاء الاصطناعي.</li>
<li><strong>البرمجيات والمنصات</strong> — أدوات المطورين، والبنية التحتية السحابية، واقتصاد المنصات المتطور.</li>
<li><strong>السياسات والتنظيم</strong> — الحوكمة الرقمية، ومكافحة الاحتكار، والمشهد التنظيمي العالمي.</li>
<li><strong>الأمن والخصوصية</strong> — استخبارات التهديدات، والإفصاح عن الثغرات، وحماية البيانات.</li>
<li><strong>الشركات الناشئة ورأس المال الجريء</strong> — جولات التمويل، وتحوّلات السوق، وشركات التقنية الصاعدة.</li>
</ul>
<h2>نهجنا</h2>
<p>كل مقال على System Report أصيل. لا نُعيد نشر البيانات الصحفية ولا نُعيد صياغة العناوين. تتضمّن عمليتنا التحريرية قراءة مصادر أولية متعددة، وتقطير الوقائع الجوهرية، وإنتاج رؤية شاملة تمنح القراء صورة كاملة في قراءة واحدة.</p>
<h2>معاييرنا</h2>
<p><strong>الدقة أولاً.</strong> كل ادعاء يُتحقَّق منه عبر مصادر متعددة قبل النشر. <strong>لا عناوين مضلّلة.</strong> تُخبرك العناوين بما حدث. <strong>لا جدار دفع.</strong> جميع المحتويات مجانية. <strong>سريع وخاص.</strong> البنية الثابتة تعني تحميلاً فورياً وبلا ملفات تتبع.</p>
<h2>تواصل معنا</h2>
<p>لديك معلومة أو تصحيح؟ راسلنا على <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> أو زر <a href="__CONTACT__">صفحة التواصل</a>.</p>
`,
};
CONTACT.ar = {
  metaTitle: 'اتصل بنا — System Report',
  metaDescription: 'تواصل مع فريق تحرير System Report — المعلومات الصحفية، والتصحيحات، والاستفسارات الإعلانية، والأسئلة العامة.',
  h1: 'اتصل بنا',
  bodyHtml: `
<p class="lead">نقرأ كل رسالة. أسرع طريقة للتواصل مع فريق تحرير System Report هي البريد الإلكتروني.</p>
<h2>البريد الإلكتروني</h2>
<p><a href="mailto:contact@systemreport.net"><strong>contact@systemreport.net</strong></a><br/>نهدف إلى الردّ خلال يومَي عمل.</p>
<h2>العنوان البريدي</h2>
<address>__ADDRESS__</address>
<h2>موضوعات المراسلة</h2>
<ul>
<li><strong>المعلومات الصحفية</strong> — أرسل ملخصاً موجزاً والروابط ذات الصلة. تُحترم السرية عند الطلب.</li>
<li><strong>التصحيحات</strong> — أشِر إلى المقال والادعاء المحدد. ننشر التصحيحات بسرعة وشفافية.</li>
<li><strong>إحاطات الصحافة والمنتجات</strong> — إعلانات الحظر المؤقت والإحاطات المسبقة موضع ترحيب. يُرجى ذكر وقت رفع الحظر في سطر الموضوع.</li>
<li><strong>الإعلانات</strong> — يجب أن تتضمّن استفسارات الرعاية والشراكة اسم شركتك والجمهور المستهدف والتوقيت المقترح.</li>
<li><strong>الأذونات</strong> — طلبات إعادة النشر والتوزيع المشترك والترجمة تُدرَس حالة بحالة.</li>
<li><strong>الخصوصية</strong> — أسئلة حول طريقة تعامل هذا الموقع مع البيانات مجاب عنها في <a href="__PRIVACY__">سياسة الخصوصية</a>.</li>
</ul>
<h2>ما لا نقدّمه</h2>
<p>لا يقدّم System Report دعماً تقنياً للمنتجات التي يغطّيها، ولا مشورة استثمارية أو قانونية فردية، ولا إعلانات مدفوعة مُقنَّعة في صورة محتوى تحريري.</p>
<h2>الاستقلالية التحريرية</h2>
<p>قراراتنا التحريرية تتّخذ باستقلالية عن المعلنين والرعاة والشركات التي نُغطّيها. إن كان أي مقال برعاية، فإن هذه العلاقة تُفصَح عنها بوضوح داخل المقال نفسه.</p>
`,
};
PRIVACY.ar = {
  metaTitle: 'سياسة الخصوصية — System Report',
  metaDescription: 'سياسة خصوصية System Report — البيانات التي نجمعها وكيفية استخدامها وحقوقك.',
  h1: 'سياسة الخصوصية',
  lastUpdated: 'آخر تحديث: أبريل 2026',
  bodyHtml: `
<h2>الخلاصة</h2>
<p>System Report موقع ثابت. لا نستخدم ملفات تعريف الارتباط، ولا نتتبّعك عبر الويب، ولا نجمع بيانات شخصية من القراء مباشرة. الخدمات الطرف الثالث التي ندمجها (التحليلات، والإعلانات) قد تضع ملفات تعريف الارتباط الخاصة بها كما هو موضح أدناه.</p>
<h2>التحليلات</h2>
<p>نستخدم <strong>Cloudflare Web Analytics</strong>، وهي خدمة تُولي الخصوصية الأولوية، لا تستخدم ملفات تعريف الارتباط، ولا تتتبّع المستخدمين عبر المواقع، ولا تجمع معلومات تعريف شخصية، ولا تُعرِّف المتصفحات. تُجمَع فقط مقاييس إجمالية مجهولة الهوية كمشاهدات الصفحات والمصادر المُحيلة والبلدان.</p>
<h2>الإعلانات</h2>
<p>قد يعرض هذا الموقع إعلانات من <strong>Google AdSense</strong>. تستخدم Google وشركاؤها ملفات تعريف الارتباط وتقنيات مماثلة لعرض إعلانات بناءً على زياراتك لهذا الموقع وغيره. يمكنك إلغاء الاشتراك في الإعلانات المخصّصة عبر <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">إعدادات إعلانات Google</a>. لمزيد من المعلومات، راجع <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">سياسة خصوصية الإعلانات من Google</a>.</p>
<h2>جمع البيانات</h2>
<p>لا يجمع System Report المعلومات الشخصية أو يخزّنها أو يعالجها مباشرة. لا يوجد نظام تسجيل مستخدمين، ولا نظام تعليقات، ولا معالجة من جانب الخادم لبيانات القراء على بنيتنا التحتية.</p>
<h2>خدمات الطرف الثالث</h2>
<ul>
<li><strong>Cloudflare</strong> — استضافة CDN وتحليلات تحترم الخصوصية.</li>
<li><strong>Google Fonts</strong> — الخطوط عبر شبكة CDN من Google.</li>
<li><strong>Google AdSense</strong> — الإعلانات (قد تستخدم ملفات تعريف الارتباط؛ انظر أعلاه).</li>
<li><strong>Pexels</strong> — صور مخزون محمّلة من شبكة CDN الخاصة بـ Pexels.</li>
</ul>
<h2>حقوقك</h2>
<p>بما أن System Report لا يجمع بيانات شخصية أو يخزّنها، فلا توجد بيانات للوصول إليها أو تصحيحها أو تصديرها أو حذفها نيابةً عنك. إذا كنت قد استخدمت خدمات Google على هذا الموقع أو خارجه، يمكنك إدارة تلك البيانات عبر ضوابط <a href="https://myaccount.google.com/data-and-privacy" target="_blank" rel="noopener noreferrer">البيانات والخصوصية</a> في Google.</p>
<h2>خصوصية الأطفال</h2>
<p>System Report منشور موجَّه للجمهور العام وغير موجَّه للأطفال دون سن 13 عاماً. لا نجمع عن قصد أي معلومات من الأطفال.</p>
<h2>التغييرات على هذه السياسة</h2>
<p>قد نحدّث هذه السياسة من وقت لآخر. يعكس تاريخ "آخر تحديث" في أعلى هذه الصفحة آخر مراجعة.</p>
<h2>تواصل معنا</h2>
<p>يمكن إرسال الأسئلة حول سياسة الخصوصية هذه إلى <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> أو عبر البريد إلى:</p>
<address>__ADDRESS__</address>
`,
};
TERMS.ar = {
  metaTitle: 'شروط الاستخدام — System Report',
  metaDescription: 'الشروط التي تحكم استخدامك لـ System Report، بما تشمل ترخيص المحتوى وإخلاء المسؤولية والاستخدام المقبول.',
  h1: 'شروط الاستخدام',
  lastUpdated: 'آخر تحديث: أبريل 2026',
  bodyHtml: `
<h2>الموافقة</h2>
<p>بالوصول إلى System Report ("الموقع") أو استخدامه، فإنك توافق على شروط الاستخدام هذه. إن لم توافق، يُرجى عدم استخدام الموقع.</p>
<h2>المحتوى التحريري</h2>
<p>جميع المقالات والتحليلات والتعليقات المنشورة على System Report من إنتاج فريقنا التحريري. حين يستند مقال إلى تقارير خارجية، تُستشهد المصادر الأولية أو تُربط بها. نسعى إلى الدقة لكننا لا نضمن خلوّ كل تفصيل من أخطاء؛ ينبغي للقراء التحقّق من الادعاءات الحساسة زمنياً من مصادر أولية قبل التصرف بناءً عليها.</p>
<h2>الملكية الفكرية</h2>
<p>جميع المحتويات التحريرية الأصلية على هذا الموقع — بما تشمل النصوص والعناوين والرسوم التوضيحية والتخطيط — ملك لـ System Report ومحمية بموجب حقوق النشر. يمكنك مشاركة مقتطفات مع الإسناد المناسب ورابط للمقال الأصلي. إعادة نشر المقالات كاملةً أو إعادة توزيعها تجارياً أو استخدام محتوانا لتدريب نماذج التعلّم الآلي يتطلّب إذناً مسبقاً كتابياً. للاستفسار عن التراخيص: <a href="mailto:contact@systemreport.net">contact@systemreport.net</a>.</p>
<h2>صور الغلاف</h2>
<p>صور الغلاف التحريرية مصدرها <a href="https://www.pexels.com" target="_blank" rel="noopener noreferrer">Pexels</a> بموجب ترخيص Pexels أو شروط مشابهة خالية من حقوق الملكية. يُنسَب الفضل إلى المصوّر عند الاقتضاء. صور Pexels ليست جزءاً من محتوى System Report القابل للترخيص وتخضع لترخيصها الأصلي.</p>
<h2>روابط الطرف الثالث</h2>
<p>كثيراً ما تُدرج المقالات روابط لمواقع خارجية كمرجع. لسنا مسؤولين عن محتوى مواقع الطرف الثالث أو دقّتها أو ممارساتها في الخصوصية أو توافرها. الرابط لا يُعدّ تزكية.</p>
<h2>الإعلانات</h2>
<p>قد يعرض هذا الموقع إعلانات من Google AdSense وشبكات إعلانية أخرى. الإعلانات قابلة للتمييز بوضوح عن المحتوى التحريري. معلومات حول كيفية استخدام مزوّدي الإعلانات لملفات تعريف الارتباط متاحة في <a href="__PRIVACY__">سياسة الخصوصية</a>.</p>
<h2>الاستخدام المقبول</h2>
<p>توافق على عدم استخراج بيانات الموقع أو نسخه أو جمع محتواه منهجياً دون إذن؛ وعدم استخدامه لتدريب نماذج التعلّم الآلي أو ضبطها الدقيق دون ترخيص منفصل؛ وعدم محاولة التدخّل في التشغيل الطبيعي للموقع أو أمنه أو توافره؛ وعدم تقديم محتوى System Report باعتباره محتواك الخاص أو معتمداً منّا.</p>
<h2>إخلاء المسؤولية عن الضمانات</h2>
<p>يُقدَّم الموقع "كما هو" و"حسب التوفّر". في أقصى حدود ما يسمح به القانون، يتبرّأ System Report من جميع الضمانات الصريحة أو الضمنية. لا شيء على هذا الموقع يُشكّل مشورة مالية أو قانونية أو طبية أو مهنية.</p>
<h2>تحديد المسؤولية</h2>
<p>في أقصى حدود ما يسمح به القانون، لن يكون System Report مسؤولاً عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو عقابية ناجمة عن وصولك إلى الموقع أو استخدامه.</p>
<h2>القانون الواجب التطبيق</h2>
<p>تخضع هذه الشروط لقوانين جمهورية تركيا دون اعتبار لمبادئ تعارض القوانين. تخضع أي نزاعات ناشئة عن هذه الشروط أو المتعلقة بها للاختصاص القضائي الحصري لمحاكم إسطنبول.</p>
<h2>التغييرات</h2>
<p>يحق لنا مراجعة شروط الاستخدام هذه في أي وقت. الاستمرار في استخدام الموقع بعد أي مراجعة يُعدّ قبولاً للشروط المحدّثة.</p>
<h2>تواصل معنا</h2>
<p>يمكن إرسال الأسئلة حول هذه الشروط إلى <a href="mailto:contact@systemreport.net">contact@systemreport.net</a> أو عبر البريد إلى:</p>
<address>__ADDRESS__</address>
`,
};

