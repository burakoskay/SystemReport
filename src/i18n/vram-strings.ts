export type Locale = 'en' | 'tr' | 'es' | 'fr' | 'de' | 'ja' | 'zh-CN' | 'ko' | 'pt' | 'it' | 'ar';
export const RTL_LOCALES = new Set<Locale>(['ar']);

export interface VramCalculatorStrings {
  metaTitle: string;
  metaDescription: string;
  breadcrumbHome: string;
  breadcrumbTools: string;
  breadcrumbTool: string;
  eyebrow: string;
  h1: string;
  subtitle: string;

  hardwareSettingsLabel: string;
  macFamilyLabel: string;
  macRamLabel: string;
  macOsLabel: string;
  frameworkLabel: string;

  modelSettingsLabel: string;
  modelSearchLabel: string;
  modelSearchPlaceholder: string;
  modelSearchNoResults: string;
  modelSearchLivePlaceholder: string;

  paramsLabel: string;
  paramsDesc: string;
  precisionLabel: string;
  precisionDesc: string;
  contextLabel: string;
  contextDesc: string;
  batchLabel: string;
  batchDesc: string;

  advancedSettingsLabel: string;
  layersLabel: string;
  hiddenSizeLabel: string;
  attentionHeadsLabel: string;
  kvHeadsLabel: string;

  resultsTitle: string;
  totalMemory: string;
  modelWeights: string;
  kvCache: string;
  activationMemory: string;
  frameworkOverhead: string;
  macOsOverhead: string;
  usedLabel: string;
  availableLabel: string;

  throughputLabel: string;
  ttftLabel: string;
  powerDrawLabel: string;
  costPerHrLabel: string;
  emissionsPerHrLabel: string;

  recommendedTitle: string;
  recommendedEmpty: string;
  recommendedBadge: string;

  deployTitle: string;
  deployDesc: string;
  deployCopied: string;
  deployInstallHint: string;
  deployInstallHintOllama: string;
  deployInstallHintVllm: string;
  deployInstallHintSglang: string;
  deployInstallHintMlx: string;

  ratingTitle: string;
  ratingGodTier: string;
  ratingGood: string;
  ratingBad: string;
  ratingCannotRun: string;

  specsBandwidth: string;
  specsNeuralEngine: string;

  hfResultsLabel: string;
  hfSearchingLabel: string;
  hfNoResults: string;
  hfApiLabel: string;
  hfLoadingModel: string;
  hfFetchError: string;

  faqTitle: string;
  faq: Array<{ q: string; a: string }>;
}

const EN: VramCalculatorStrings = {
  metaTitle: 'Can My Mac Run It? — LLM Memory Calculator for Apple Silicon',
  metaDescription: 'Free calculator to check if your Mac can run any LLM locally. Estimates VRAM usage, token throughput, and compatibility for Apple Silicon M1 through M5.',
  breadcrumbHome: 'Home',
  breadcrumbTools: 'Tools',
  breadcrumbTool: 'Mac LLM Calculator',
  eyebrow: 'Free Tool',
  h1: 'Can My Mac Run It?',
  subtitle: 'The definitive LLM memory calculator for Macs. Estimate the exact memory footprint, token generation speed, and compatibility for your specific {strong}Apple Silicon{/strong} configuration.',

  hardwareSettingsLabel: '1. Your Hardware',
  macFamilyLabel: 'Mac Processor',
  macRamLabel: 'Unified Memory (RAM)',
  macOsLabel: 'macOS Version',
  frameworkLabel: 'Inference Framework',

  modelSettingsLabel: '2. Choose a Model',
  modelSearchLabel: 'Search Models',
  modelSearchPlaceholder: 'e.g. Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'No local models found. Press Enter to search Hugging Face…',
  modelSearchLivePlaceholder: 'Searching Hugging Face…',

  paramsLabel: 'Parameters (Billions)',
  paramsDesc: 'e.g. 8 for an 8B model.',
  precisionLabel: 'Quantization / Precision',
  precisionDesc: 'Lower precision = less memory, slight quality loss.',
  contextLabel: 'Context Window (Tokens)',
  contextDesc: 'Prompt + max generated tokens combined.',
  batchLabel: 'Batch Size',
  batchDesc: 'Parallel sequences (1 for chat).',

  advancedSettingsLabel: 'Advanced Architecture',
  layersLabel: 'Layers',
  hiddenSizeLabel: 'Hidden Size',
  attentionHeadsLabel: 'Attention Heads',
  kvHeadsLabel: 'KV Heads (GQA/MQA)',

  resultsTitle: 'Memory Breakdown',
  totalMemory: 'Total RAM Required',
  modelWeights: 'Model Weights',
  kvCache: 'KV Cache',
  activationMemory: 'Activation Memory',
  frameworkOverhead: 'Framework Overhead',
  macOsOverhead: 'macOS Reservation',
  usedLabel: 'Used',
  availableLabel: 'Available',

  throughputLabel: 'Throughput (Est.)',
  ttftLabel: 'Time to First Token',
  powerDrawLabel: 'Power Draw',
  costPerHrLabel: 'Est. Cost / Hr',
  emissionsPerHrLabel: 'CO₂ / Hr',

  recommendedTitle: 'Recommended for Your Mac',
  recommendedEmpty: 'No curated models fit this configuration. Try more RAM or lower quantization.',
  recommendedBadge: 't/s',

  deployTitle: 'Quick Start',
  deployDesc: 'Copy and paste into your terminal to get started:',
  deployCopied: 'Copied!',
  deployInstallHint: 'Install the framework first if you haven\'t already:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Verdict',
  ratingGodTier: 'Excellent — runs comfortably with headroom to spare. Great for chat and heavy context.',
  ratingGood: 'Good — solid for coding and general use. May slow at maximum context length.',
  ratingBad: 'Tight Fit — will rely on swap memory. Expect degraded performance for real-time use.',
  ratingCannotRun: 'Cannot Run — not enough RAM. Reduce model size, lower quantization, or upgrade hardware.',

  specsBandwidth: 'Bandwidth',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face Results',
  hfSearchingLabel: 'Searching Hugging Face…',
  hfNoResults: 'No models found.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Loading',
  hfFetchError: 'Could not fetch config for this model (it may be gated). Using estimated parameters.',

  faqTitle: 'Frequently Asked Questions',
  faq: [
    { q: 'How is token throughput calculated?', a: 'On Apple Silicon, inference speed is bottlenecked by memory bandwidth. We divide your chip\'s bandwidth by the loaded model size, then apply a framework-specific efficiency factor (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'Why does macOS version matter?', a: 'macOS reserves memory for the system. Sequoia and Tahoe reserve more than Sonoma due to on-device AI features. This calculator accounts for the difference so your estimate is realistic.' },
    { q: 'Why do frameworks use different amounts of RAM?', a: 'vLLM pre-allocates large KV cache blocks for high concurrency. Ollama carries Go runtime overhead (~600 MB). MLX and SGLang are leaner C++/Python backends (~200 MB base).' },
    { q: 'What does quantization do?', a: 'Quantization reduces the precision of model weights (e.g. FP16 → INT4), shrinking memory usage by 2–4×. The trade-off is a small quality loss, usually acceptable for chat and code tasks.' },
    { q: 'How are power and cost estimates calculated?', a: 'Power is derived from your chip\'s TDP under load. Cost uses the global average electricity rate ($0.15/kWh). Emissions use the global average grid carbon intensity (385 g CO₂e/kWh).' },
    { q: 'Can I run models larger than my RAM?', a: 'Technically yes — macOS will use swap memory on your SSD. But throughput drops to roughly 10% of normal, making real-time chat unusable. We flag this as "Tight Fit" or "Cannot Run" depending on the overshoot.' },
  ],
};

const TR: VramCalculatorStrings = {
  metaTitle: 'Mac\'im Çalıştırabilir Mi? — Apple Silicon LLM Bellek Hesaplayıcı',
  metaDescription: 'Mac\'inizin herhangi bir LLM\'yi yerel olarak çalıştırıp çalıştıramayacağını kontrol edin. M1–M5 Apple Silicon için VRAM kullanımı, token hızı ve uyumluluk hesaplama.',
  breadcrumbHome: 'Ana Sayfa',
  breadcrumbTools: 'Araçlar',
  breadcrumbTool: 'Mac LLM Hesaplayıcı',
  eyebrow: 'Ücretsiz Araç',
  h1: 'Mac\'im Çalıştırabilir Mi?',
  subtitle: 'Mac\'ler için kesin LLM bellek hesaplayıcı. {strong}Apple Silicon{/strong} yapılandırmanız için bellek kullanımı, token üretim hızı ve uyumluluğu hesaplayın.',

  hardwareSettingsLabel: '1. Donanımınız',
  macFamilyLabel: 'Mac İşlemci',
  macRamLabel: 'Birleşik Bellek (RAM)',
  macOsLabel: 'macOS Sürümü',
  frameworkLabel: 'Çıkarım Çerçevesi',

  modelSettingsLabel: '2. Model Seçin',
  modelSearchLabel: 'Model Ara',
  modelSearchPlaceholder: 'Örn: Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'Yerel model bulunamadı. Hugging Face\'te aramak için Enter\'a basın…',
  modelSearchLivePlaceholder: 'Hugging Face\'te aranıyor…',

  paramsLabel: 'Parametre Sayısı (Milyar)',
  paramsDesc: 'Örn: 8B model için 8.',
  precisionLabel: 'Kuantizasyon / Hassasiyet',
  precisionDesc: 'Düşük hassasiyet = daha az bellek, hafif kalite kaybı.',
  contextLabel: 'Bağlam Penceresi (Token)',
  contextDesc: 'Prompt + maksimum üretilen token toplamı.',
  batchLabel: 'Yığın Boyutu',
  batchDesc: 'Paralel diziler (sohbet için 1).',

  advancedSettingsLabel: 'Gelişmiş Mimari',
  layersLabel: 'Katmanlar',
  hiddenSizeLabel: 'Gizli Boyut',
  attentionHeadsLabel: 'Dikkat Kafaları',
  kvHeadsLabel: 'KV Kafaları (GQA/MQA)',

  resultsTitle: 'Bellek Dökümü',
  totalMemory: 'Toplam Gereken RAM',
  modelWeights: 'Model Ağırlıkları',
  kvCache: 'KV Önbellek',
  activationMemory: 'Aktivasyon Belleği',
  frameworkOverhead: 'Çerçeve Yükü',
  macOsOverhead: 'macOS Rezervasyonu',
  usedLabel: 'Kullanılan',
  availableLabel: 'Kullanılabilir',

  throughputLabel: 'Verim (Tahmini)',
  ttftLabel: 'İlk Token Süresi',
  powerDrawLabel: 'Güç Tüketimi',
  costPerHrLabel: 'Tahmini Maliyet / Sa',
  emissionsPerHrLabel: 'CO₂ / Sa',

  recommendedTitle: 'Mac\'iniz İçin Önerilen',
  recommendedEmpty: 'Bu yapılandırmaya uyan model bulunamadı. Daha fazla RAM veya düşük kuantizasyon deneyin.',
  recommendedBadge: 't/s',

  deployTitle: 'Hızlı Başlangıç',
  deployDesc: 'Başlamak için terminale kopyalayıp yapıştırın:',
  deployCopied: 'Kopyalandı!',
  deployInstallHint: 'Henüz yüklemediyseniz önce çerçeveyi kurun:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Sonuç',
  ratingGodTier: 'Mükemmel — fazlasıyla yeterli bellekle rahatça çalışır. Sohbet ve ağır bağlam için ideal.',
  ratingGood: 'İyi — kodlama ve genel kullanım için sağlam. Maksimum bağlamda hafif yavaşlayabilir.',
  ratingBad: 'Dar — takas belleğine bağımlı olacak. Gerçek zamanlı kullanımda performans düşüşü beklenir.',
  ratingCannotRun: 'Çalıştırılamaz — yeterli RAM yok. Model boyutunu küçültün veya donanımı yükseltin.',

  specsBandwidth: 'Bant Genişliği',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face Sonuçları',
  hfSearchingLabel: 'Hugging Face\'te aranıyor…',
  hfNoResults: 'Model bulunamadı.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Yükleniyor',
  hfFetchError: 'Bu modelin yapılandırması alınamadı (erişim kısıtlı olabilir). Tahmini parametreler kullanılıyor.',

  faqTitle: 'Sıkça Sorulan Sorular',
  faq: [
    { q: 'Token verimi nasıl hesaplanır?', a: 'Apple Silicon\'da çıkarım hızı bellek bant genişliğiyle sınırlıdır. Çipinizin bant genişliğini yüklenen model boyutuna böler, ardından çerçeveye özgü verimlilik faktörü uygularız (MLX ≈ %85, Ollama ≈ %65, vLLM ≈ %70, SGLang ≈ %88).' },
    { q: 'macOS sürümü neden önemli?', a: 'macOS sistem için bellek ayırır. Sequoia ve Tahoe, cihaz üzerinde yapay zeka özellikleri nedeniyle Sonoma\'dan daha fazla ayırır. Bu hesaplayıcı farkı hesaba katar.' },
    { q: 'Çerçeveler neden farklı miktarda RAM kullanır?', a: 'vLLM yüksek eşzamanlılık için büyük KV önbellek blokları önceden ayırır. Ollama Go çalışma zamanı yükü taşır (~600 MB). MLX ve SGLang daha yalın C++/Python arka uçlarıdır (~200 MB taban).' },
    { q: 'Kuantizasyon ne yapar?', a: 'Kuantizasyon model ağırlıklarının hassasiyetini düşürür (örn: FP16 → INT4), bellek kullanımını 2–4× azaltır. Karşılığında küçük bir kalite kaybı olur, genellikle sohbet ve kod görevleri için kabul edilebilir.' },
    { q: 'Güç ve maliyet tahminleri nasıl hesaplanır?', a: 'Güç, çipinizin yük altındaki TDP\'sinden türetilir. Maliyet küresel ortalama elektrik fiyatını ($0,15/kWh), emisyonlar küresel ortalama şebeke karbon yoğunluğunu (385 g CO₂e/kWh) kullanır.' },
    { q: 'RAM\'imden büyük modelleri çalıştırabilir miyim?', a: 'Teknik olarak evet — macOS SSD\'nizdeki takas belleğini kullanır. Ancak verim normalin yaklaşık %10\'una düşer, bu da gerçek zamanlı sohbeti kullanılamaz hale getirir.' },
  ],
};

const ES: VramCalculatorStrings = {
  metaTitle: '¿Mi Mac Puede Ejecutarlo? — Calculadora de Memoria LLM para Apple Silicon',
  metaDescription: 'Calculadora gratuita para verificar si tu Mac puede ejecutar cualquier LLM localmente. Estima el uso de VRAM, rendimiento de tokens y compatibilidad para Apple Silicon M1 a M5.',
  breadcrumbHome: 'Inicio',
  breadcrumbTools: 'Herramientas',
  breadcrumbTool: 'Calculadora LLM para Mac',
  eyebrow: 'Herramienta Gratuita',
  h1: '¿Mi Mac Puede Ejecutarlo?',
  subtitle: 'La calculadora definitiva de memoria LLM para Mac. Estima el uso exacto de memoria, la velocidad de generación de tokens y la compatibilidad para tu configuración {strong}Apple Silicon{/strong}.',

  hardwareSettingsLabel: '1. Tu Hardware',
  macFamilyLabel: 'Procesador Mac',
  macRamLabel: 'Memoria Unificada (RAM)',
  macOsLabel: 'Versión de macOS',
  frameworkLabel: 'Framework de Inferencia',

  modelSettingsLabel: '2. Elige un Modelo',
  modelSearchLabel: 'Buscar Modelos',
  modelSearchPlaceholder: 'Ej: Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'No se encontraron modelos locales. Pulsa Enter para buscar en Hugging Face…',
  modelSearchLivePlaceholder: 'Buscando en Hugging Face…',

  paramsLabel: 'Parámetros (Miles de Millones)',
  paramsDesc: 'Ej: 8 para un modelo de 8B.',
  precisionLabel: 'Cuantización / Precisión',
  precisionDesc: 'Menor precisión = menos memoria, leve pérdida de calidad.',
  contextLabel: 'Ventana de Contexto (Tokens)',
  contextDesc: 'Prompt + tokens generados combinados.',
  batchLabel: 'Tamaño de Lote',
  batchDesc: 'Secuencias paralelas (1 para chat).',

  advancedSettingsLabel: 'Arquitectura Avanzada',
  layersLabel: 'Capas',
  hiddenSizeLabel: 'Tamaño Oculto',
  attentionHeadsLabel: 'Cabezas de Atención',
  kvHeadsLabel: 'Cabezas KV (GQA/MQA)',

  resultsTitle: 'Desglose de Memoria',
  totalMemory: 'RAM Total Requerida',
  modelWeights: 'Pesos del Modelo',
  kvCache: 'Caché KV',
  activationMemory: 'Memoria de Activación',
  frameworkOverhead: 'Sobrecarga del Framework',
  macOsOverhead: 'Reserva de macOS',
  usedLabel: 'Usado',
  availableLabel: 'Disponible',

  throughputLabel: 'Rendimiento (Est.)',
  ttftLabel: 'Tiempo al Primer Token',
  powerDrawLabel: 'Consumo Energético',
  costPerHrLabel: 'Costo Est. / Hr',
  emissionsPerHrLabel: 'CO₂ / Hr',

  recommendedTitle: 'Recomendados para Tu Mac',
  recommendedEmpty: 'Ningún modelo curado se ajusta a esta configuración. Prueba con más RAM o menor cuantización.',
  recommendedBadge: 't/s',

  deployTitle: 'Inicio Rápido',
  deployDesc: 'Copia y pega en tu terminal para comenzar:',
  deployCopied: '¡Copiado!',
  deployInstallHint: 'Instala el framework primero si aún no lo tienes:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Veredicto',
  ratingGodTier: 'Excelente — funciona cómodamente con margen de sobra. Ideal para chat y contexto pesado.',
  ratingGood: 'Bueno — sólido para programación y uso general. Puede ralentizarse en contexto máximo.',
  ratingBad: 'Ajustado — dependerá de la memoria swap. Rendimiento degradado en uso en tiempo real.',
  ratingCannotRun: 'No puede ejecutarse — RAM insuficiente. Reduce el tamaño del modelo o mejora el hardware.',

  specsBandwidth: 'Ancho de banda',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Resultados de Hugging Face',
  hfSearchingLabel: 'Buscando en Hugging Face…',
  hfNoResults: 'No se encontraron modelos.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Cargando',
  hfFetchError: 'No se pudo obtener la configuración de este modelo (puede estar restringido). Usando parámetros estimados.',

  faqTitle: 'Preguntas Frecuentes',
  faq: [
    { q: '¿Cómo se calcula el rendimiento de tokens?', a: 'En Apple Silicon, la velocidad de inferencia está limitada por el ancho de banda de memoria. Dividimos el ancho de banda de tu chip por el tamaño del modelo cargado, y aplicamos un factor de eficiencia del framework (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: '¿Por qué importa la versión de macOS?', a: 'macOS reserva memoria para el sistema. Sequoia y Tahoe reservan más que Sonoma debido a funciones de IA en el dispositivo. Esta calculadora tiene en cuenta la diferencia.' },
    { q: '¿Por qué los frameworks usan diferente cantidad de RAM?', a: 'vLLM preasigna grandes bloques de caché KV para alta concurrencia. Ollama tiene sobrecarga del runtime Go (~600 MB). MLX y SGLang son backends más ligeros en C++/Python (~200 MB base).' },
    { q: '¿Qué hace la cuantización?', a: 'La cuantización reduce la precisión de los pesos del modelo (ej: FP16 → INT4), reduciendo el uso de memoria 2–4×. A cambio hay una ligera pérdida de calidad, generalmente aceptable para chat y código.' },
    { q: '¿Cómo se calculan los costos de energía y emisiones?', a: 'La potencia se deriva del TDP de tu chip bajo carga. El costo usa la tarifa eléctrica promedio global ($0.15/kWh). Las emisiones usan la intensidad de carbono promedio global (385 g CO₂e/kWh).' },
    { q: '¿Puedo ejecutar modelos más grandes que mi RAM?', a: 'Técnicamente sí — macOS usará memoria swap en tu SSD. Pero el rendimiento cae a ~10% de lo normal, haciendo el chat en tiempo real inutilizable.' },
  ],
};

const FR: VramCalculatorStrings = {
  metaTitle: 'Mon Mac Peut-il le Faire Tourner ? — Calculateur de Mémoire LLM pour Apple Silicon',
  metaDescription: 'Calculateur gratuit pour vérifier si votre Mac peut exécuter un LLM localement. Estime l\'utilisation VRAM, le débit de tokens et la compatibilité pour Apple Silicon M1 à M5.',
  breadcrumbHome: 'Accueil',
  breadcrumbTools: 'Outils',
  breadcrumbTool: 'Calculateur LLM Mac',
  eyebrow: 'Outil Gratuit',
  h1: 'Mon Mac Peut-il le Faire Tourner ?',
  subtitle: 'Le calculateur de mémoire LLM définitif pour Mac. Estimez l\'empreinte mémoire exacte, la vitesse de génération de tokens et la compatibilité pour votre configuration {strong}Apple Silicon{/strong}.',

  hardwareSettingsLabel: '1. Votre Matériel',
  macFamilyLabel: 'Processeur Mac',
  macRamLabel: 'Mémoire Unifiée (RAM)',
  macOsLabel: 'Version de macOS',
  frameworkLabel: 'Framework d\'Inférence',

  modelSettingsLabel: '2. Choisir un Modèle',
  modelSearchLabel: 'Rechercher des Modèles',
  modelSearchPlaceholder: 'Ex : Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'Aucun modèle local trouvé. Appuyez sur Entrée pour rechercher sur Hugging Face…',
  modelSearchLivePlaceholder: 'Recherche sur Hugging Face…',

  paramsLabel: 'Paramètres (Milliards)',
  paramsDesc: 'Ex : 8 pour un modèle 8B.',
  precisionLabel: 'Quantification / Précision',
  precisionDesc: 'Moins de précision = moins de mémoire, légère perte de qualité.',
  contextLabel: 'Fenêtre de Contexte (Tokens)',
  contextDesc: 'Prompt + tokens générés combinés.',
  batchLabel: 'Taille du Lot',
  batchDesc: 'Séquences parallèles (1 pour le chat).',

  advancedSettingsLabel: 'Architecture Avancée',
  layersLabel: 'Couches',
  hiddenSizeLabel: 'Taille Cachée',
  attentionHeadsLabel: 'Têtes d\'Attention',
  kvHeadsLabel: 'Têtes KV (GQA/MQA)',

  resultsTitle: 'Détail de la Mémoire',
  totalMemory: 'RAM Totale Requise',
  modelWeights: 'Poids du Modèle',
  kvCache: 'Cache KV',
  activationMemory: 'Mémoire d\'Activation',
  frameworkOverhead: 'Surcharge du Framework',
  macOsOverhead: 'Réservation macOS',
  usedLabel: 'Utilisé',
  availableLabel: 'Disponible',

  throughputLabel: 'Débit (Est.)',
  ttftLabel: 'Temps au Premier Token',
  powerDrawLabel: 'Consommation',
  costPerHrLabel: 'Coût Est. / Hr',
  emissionsPerHrLabel: 'CO₂ / Hr',

  recommendedTitle: 'Recommandés pour Votre Mac',
  recommendedEmpty: 'Aucun modèle ne correspond à cette configuration. Essayez plus de RAM ou une quantification plus basse.',
  recommendedBadge: 't/s',

  deployTitle: 'Démarrage Rapide',
  deployDesc: 'Copiez et collez dans votre terminal pour commencer :',
  deployCopied: 'Copié !',
  deployInstallHint: 'Installez d\'abord le framework si ce n\'est pas déjà fait :',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Verdict',
  ratingGodTier: 'Excellent — fonctionne confortablement avec de la marge. Idéal pour le chat et les contextes lourds.',
  ratingGood: 'Bon — solide pour le code et l\'utilisation générale. Peut ralentir au contexte maximum.',
  ratingBad: 'Serré — dépendra de la mémoire swap. Performances dégradées en temps réel.',
  ratingCannotRun: 'Impossible — RAM insuffisante. Réduisez la taille du modèle ou améliorez le matériel.',

  specsBandwidth: 'Bande passante',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Résultats Hugging Face',
  hfSearchingLabel: 'Recherche sur Hugging Face…',
  hfNoResults: 'Aucun modèle trouvé.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Chargement',
  hfFetchError: 'Impossible de récupérer la configuration de ce modèle (accès restreint). Utilisation de paramètres estimés.',

  faqTitle: 'Questions Fréquentes',
  faq: [
    { q: 'Comment le débit de tokens est-il calculé ?', a: 'Sur Apple Silicon, la vitesse d\'inférence est limitée par la bande passante mémoire. Nous divisons la bande passante de votre puce par la taille du modèle chargé, puis appliquons un facteur d\'efficacité du framework (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'Pourquoi la version de macOS est-elle importante ?', a: 'macOS réserve de la mémoire pour le système. Sequoia et Tahoe réservent plus que Sonoma en raison des fonctionnalités IA embarquées. Ce calculateur prend en compte cette différence.' },
    { q: 'Pourquoi les frameworks utilisent-ils des quantités de RAM différentes ?', a: 'vLLM préalloue de grands blocs de cache KV pour la haute concurrence. Ollama a une surcharge du runtime Go (~600 Mo). MLX et SGLang sont des backends plus légers en C++/Python (~200 Mo de base).' },
    { q: 'Que fait la quantification ?', a: 'La quantification réduit la précision des poids du modèle (ex : FP16 → INT4), réduisant l\'utilisation mémoire de 2–4×. En contrepartie, une légère perte de qualité, généralement acceptable pour le chat et le code.' },
    { q: 'Comment sont calculés les coûts énergétiques et les émissions ?', a: 'La puissance est dérivée du TDP de votre puce sous charge. Le coût utilise le tarif électrique moyen mondial (0,15 $/kWh). Les émissions utilisent l\'intensité carbone moyenne mondiale (385 g CO₂e/kWh).' },
    { q: 'Puis-je exécuter des modèles plus grands que ma RAM ?', a: 'Techniquement oui — macOS utilisera la mémoire swap sur votre SSD. Mais le débit tombe à ~10% de la normale, rendant le chat en temps réel inutilisable.' },
  ],
};

const DE: VramCalculatorStrings = {
  metaTitle: 'Kann Mein Mac Das? — LLM-Speicherrechner für Apple Silicon',
  metaDescription: 'Kostenloser Rechner um zu prüfen, ob Ihr Mac ein LLM lokal ausführen kann. Schätzt VRAM-Nutzung, Token-Durchsatz und Kompatibilität für Apple Silicon M1 bis M5.',
  breadcrumbHome: 'Startseite',
  breadcrumbTools: 'Tools',
  breadcrumbTool: 'Mac LLM-Rechner',
  eyebrow: 'Kostenloses Tool',
  h1: 'Kann Mein Mac Das?',
  subtitle: 'Der definitive LLM-Speicherrechner für Macs. Berechnen Sie den genauen Speicherbedarf, die Token-Generierungsgeschwindigkeit und die Kompatibilität für Ihre {strong}Apple Silicon{/strong}-Konfiguration.',

  hardwareSettingsLabel: '1. Ihre Hardware',
  macFamilyLabel: 'Mac-Prozessor',
  macRamLabel: 'Unified Memory (RAM)',
  macOsLabel: 'macOS-Version',
  frameworkLabel: 'Inferenz-Framework',

  modelSettingsLabel: '2. Modell Wählen',
  modelSearchLabel: 'Modelle Suchen',
  modelSearchPlaceholder: 'Z.B. Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'Keine lokalen Modelle gefunden. Enter drücken für Hugging Face-Suche…',
  modelSearchLivePlaceholder: 'Suche auf Hugging Face…',

  paramsLabel: 'Parameter (Milliarden)',
  paramsDesc: 'Z.B. 8 für ein 8B-Modell.',
  precisionLabel: 'Quantisierung / Präzision',
  precisionDesc: 'Weniger Präzision = weniger Speicher, leichter Qualitätsverlust.',
  contextLabel: 'Kontextfenster (Tokens)',
  contextDesc: 'Prompt + max. generierte Tokens kombiniert.',
  batchLabel: 'Batch-Größe',
  batchDesc: 'Parallele Sequenzen (1 für Chat).',

  advancedSettingsLabel: 'Erweiterte Architektur',
  layersLabel: 'Schichten',
  hiddenSizeLabel: 'Hidden Size',
  attentionHeadsLabel: 'Attention Heads',
  kvHeadsLabel: 'KV Heads (GQA/MQA)',

  resultsTitle: 'Speicheraufschlüsselung',
  totalMemory: 'Gesamter RAM-Bedarf',
  modelWeights: 'Modellgewichte',
  kvCache: 'KV-Cache',
  activationMemory: 'Aktivierungsspeicher',
  frameworkOverhead: 'Framework-Overhead',
  macOsOverhead: 'macOS-Reservierung',
  usedLabel: 'Belegt',
  availableLabel: 'Verfügbar',

  throughputLabel: 'Durchsatz (Sch.)',
  ttftLabel: 'Zeit bis zum Ersten Token',
  powerDrawLabel: 'Leistungsaufnahme',
  costPerHrLabel: 'Kosten / Std.',
  emissionsPerHrLabel: 'CO₂ / Std.',

  recommendedTitle: 'Empfohlen für Ihren Mac',
  recommendedEmpty: 'Kein kuratiertes Modell passt zu dieser Konfiguration. Versuchen Sie mehr RAM oder niedrigere Quantisierung.',
  recommendedBadge: 't/s',

  deployTitle: 'Schnellstart',
  deployDesc: 'In Ihr Terminal kopieren und einfügen:',
  deployCopied: 'Kopiert!',
  deployInstallHint: 'Installieren Sie zuerst das Framework:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Ergebnis',
  ratingGodTier: 'Ausgezeichnet — läuft komfortabel mit Reserve. Ideal für Chat und umfangreichen Kontext.',
  ratingGood: 'Gut — solide für Programmierung und allgemeine Nutzung. Kann bei maximalem Kontext langsamer werden.',
  ratingBad: 'Knapp — wird auf Swap-Speicher angewiesen sein. Eingeschränkte Echtzeitleistung.',
  ratingCannotRun: 'Nicht ausführbar — unzureichender RAM. Modellgröße reduzieren oder Hardware upgraden.',

  specsBandwidth: 'Bandbreite',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face Ergebnisse',
  hfSearchingLabel: 'Suche auf Hugging Face…',
  hfNoResults: 'Keine Modelle gefunden.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Laden',
  hfFetchError: 'Konfiguration für dieses Modell konnte nicht abgerufen werden (möglicherweise eingeschränkt). Geschätzte Parameter werden verwendet.',

  faqTitle: 'Häufig Gestellte Fragen',
  faq: [
    { q: 'Wie wird der Token-Durchsatz berechnet?', a: 'Auf Apple Silicon wird die Inferenzgeschwindigkeit durch die Speicherbandbreite begrenzt. Wir teilen die Bandbreite Ihres Chips durch die geladene Modellgröße und wenden einen Framework-spezifischen Effizienzfaktor an (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'Warum ist die macOS-Version wichtig?', a: 'macOS reserviert Speicher für das System. Sequoia und Tahoe reservieren mehr als Sonoma aufgrund von On-Device-KI-Funktionen. Dieser Rechner berücksichtigt den Unterschied.' },
    { q: 'Warum nutzen Frameworks unterschiedlich viel RAM?', a: 'vLLM alloziert große KV-Cache-Blöcke für hohe Parallelität. Ollama hat Go-Runtime-Overhead (~600 MB). MLX und SGLang sind schlankere C++/Python-Backends (~200 MB Basis).' },
    { q: 'Was bewirkt Quantisierung?', a: 'Quantisierung reduziert die Präzision der Modellgewichte (z.B. FP16 → INT4), was den Speicherbedarf um 2–4× senkt. Der Kompromiss ist ein leichter Qualitätsverlust.' },
    { q: 'Wie werden Strom- und Emissionskosten berechnet?', a: 'Die Leistung wird aus dem TDP Ihres Chips unter Last abgeleitet. Kosten verwenden den globalen Durchschnitts-Strompreis (0,15 $/kWh). Emissionen verwenden die globale Durchschnitts-Kohlenstoffintensität (385 g CO₂e/kWh).' },
    { q: 'Kann ich Modelle ausführen, die größer als mein RAM sind?', a: 'Technisch ja — macOS nutzt Swap-Speicher auf Ihrer SSD. Der Durchsatz sinkt jedoch auf ~10% des Normalen, was Echtzeit-Chat unbrauchbar macht.' },
  ],
};

const JA: VramCalculatorStrings = {
  metaTitle: 'Macで動く？ — Apple Silicon LLMメモリ計算ツール',
  metaDescription: 'MacでLLMをローカル実行できるか確認する無料ツール。Apple Silicon M1〜M5のVRAM使用量、トークン速度、互換性を計算。',
  breadcrumbHome: 'ホーム',
  breadcrumbTools: 'ツール',
  breadcrumbTool: 'Mac LLM計算ツール',
  eyebrow: '無料ツール',
  h1: 'Macで動く？',
  subtitle: 'Mac向けLLMメモリ計算の決定版。{strong}Apple Silicon{/strong}構成に合わせた正確なメモリ使用量、トークン生成速度、互換性を計算します。',

  hardwareSettingsLabel: '1. ハードウェア',
  macFamilyLabel: 'Macプロセッサ',
  macRamLabel: 'ユニファイドメモリ（RAM）',
  macOsLabel: 'macOSバージョン',
  frameworkLabel: '推論フレームワーク',

  modelSettingsLabel: '2. モデル選択',
  modelSearchLabel: 'モデル検索',
  modelSearchPlaceholder: '例：Llama 3.1 8B、Qwen 2.5、Mixtral…',
  modelSearchNoResults: 'ローカルモデルが見つかりません。EnterでHugging Faceを検索…',
  modelSearchLivePlaceholder: 'Hugging Faceを検索中…',

  paramsLabel: 'パラメータ数（10億単位）',
  paramsDesc: '例：8Bモデルなら8。',
  precisionLabel: '量子化 / 精度',
  precisionDesc: '低精度 = 少ないメモリ、わずかな品質低下。',
  contextLabel: 'コンテキストウィンドウ（トークン）',
  contextDesc: 'プロンプト＋最大生成トークンの合計。',
  batchLabel: 'バッチサイズ',
  batchDesc: '並列シーケンス数（チャットは1）。',

  advancedSettingsLabel: '高度なアーキテクチャ',
  layersLabel: 'レイヤー数',
  hiddenSizeLabel: '隠れ層サイズ',
  attentionHeadsLabel: 'アテンションヘッド',
  kvHeadsLabel: 'KVヘッド（GQA/MQA）',

  resultsTitle: 'メモリ内訳',
  totalMemory: '必要RAM合計',
  modelWeights: 'モデル重み',
  kvCache: 'KVキャッシュ',
  activationMemory: 'アクティベーションメモリ',
  frameworkOverhead: 'フレームワークオーバーヘッド',
  macOsOverhead: 'macOS予約',
  usedLabel: '使用中',
  availableLabel: '利用可能',

  throughputLabel: 'スループット（推定）',
  ttftLabel: '最初のトークンまでの時間',
  powerDrawLabel: '消費電力',
  costPerHrLabel: '推定コスト / 時',
  emissionsPerHrLabel: 'CO₂ / 時',

  recommendedTitle: 'お使いのMacにおすすめ',
  recommendedEmpty: 'この構成に合うモデルがありません。RAMを増やすか量子化を下げてください。',
  recommendedBadge: 't/s',

  deployTitle: 'クイックスタート',
  deployDesc: 'ターミナルにコピー＆ペーストして開始：',
  deployCopied: 'コピーしました！',
  deployInstallHint: 'フレームワークを先にインストール：',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: '判定',
  ratingGodTier: '最適 — 余裕を持って快適に動作。チャットや大きなコンテキストに最適。',
  ratingGood: '良好 — コーディングや一般用途に適切。最大コンテキストでやや遅くなる可能性。',
  ratingBad: 'ギリギリ — スワップメモリに依存。リアルタイム使用ではパフォーマンスが低下。',
  ratingCannotRun: '実行不可 — RAMが不足しています。モデルサイズを下げるかハードウェアをアップグレードしてください。',

  specsBandwidth: '帯域幅',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face 結果',
  hfSearchingLabel: 'Hugging Faceを検索中…',
  hfNoResults: 'モデルが見つかりません。',
  hfApiLabel: 'HF',
  hfLoadingModel: '読み込み中',
  hfFetchError: 'このモデルの設定を取得できませんでした（アクセス制限の可能性）。推定パラメータを使用します。',

  faqTitle: 'よくある質問',
  faq: [
    { q: 'トークンスループットはどのように計算されますか？', a: 'Apple Siliconでは推論速度はメモリ帯域幅によって制限されます。チップの帯域幅をロードされたモデルサイズで割り、フレームワーク固有の効率係数を適用します（MLX ≈ 85%、Ollama ≈ 65%、vLLM ≈ 70%、SGLang ≈ 88%）。' },
    { q: 'macOSバージョンが重要な理由は？', a: 'macOSはシステム用にメモリを予約します。SequoiaとTahoeはデバイス上のAI機能のためSonomaより多く予約します。この計算ツールはその差を考慮します。' },
    { q: 'フレームワークごとにRAM使用量が異なるのはなぜ？', a: 'vLLMは高い並列性のために大きなKVキャッシュブロックを事前確保します。OllamaはGoランタイムのオーバーヘッド（約600MB）があります。MLXとSGLangはよりコンパクトなC++/Pythonバックエンド（約200MBベース）です。' },
    { q: '量子化とは何ですか？', a: '量子化はモデル重みの精度を下げ（例：FP16→INT4）、メモリ使用量を2〜4倍削減します。わずかな品質低下がありますが、チャットやコードタスクには通常許容範囲です。' },
    { q: '電力とコストの見積もりはどのように計算されますか？', a: '電力はチップの負荷時TDPから算出します。コストは世界平均電気料金（$0.15/kWh）、排出量は世界平均グリッド炭素強度（385 g CO₂e/kWh）を使用します。' },
    { q: 'RAMより大きなモデルを実行できますか？', a: '技術的には可能です — macOSはSSD上のスワップメモリを使用します。ただしスループットは通常の約10%に低下し、リアルタイムチャットは実用的でなくなります。' },
  ],
};

const ZH_CN: VramCalculatorStrings = {
  metaTitle: '我的Mac能跑吗？— Apple Silicon LLM内存计算器',
  metaDescription: '免费工具，检查你的Mac能否在本地运行任何LLM。估算Apple Silicon M1至M5的VRAM使用量、Token速度和兼容性。',
  breadcrumbHome: '首页',
  breadcrumbTools: '工具',
  breadcrumbTool: 'Mac LLM计算器',
  eyebrow: '免费工具',
  h1: '我的Mac能跑吗？',
  subtitle: 'Mac上最权威的LLM内存计算器。为你的{strong}Apple Silicon{/strong}配置精确估算内存占用、Token生成速度和兼容性。',

  hardwareSettingsLabel: '1. 你的硬件',
  macFamilyLabel: 'Mac处理器',
  macRamLabel: '统一内存（RAM）',
  macOsLabel: 'macOS版本',
  frameworkLabel: '推理框架',

  modelSettingsLabel: '2. 选择模型',
  modelSearchLabel: '搜索模型',
  modelSearchPlaceholder: '例如：Llama 3.1 8B、Qwen 2.5、Mixtral…',
  modelSearchNoResults: '未找到本地模型。按回车搜索Hugging Face…',
  modelSearchLivePlaceholder: '正在搜索Hugging Face…',

  paramsLabel: '参数量（十亿）',
  paramsDesc: '例如：8B模型输入8。',
  precisionLabel: '量化 / 精度',
  precisionDesc: '精度越低 = 内存越少，质量略有下降。',
  contextLabel: '上下文窗口（Token数）',
  contextDesc: '提示词 + 最大生成Token总和。',
  batchLabel: '批次大小',
  batchDesc: '并行序列数（对话用1）。',

  advancedSettingsLabel: '高级架构设置',
  layersLabel: '层数',
  hiddenSizeLabel: '隐藏层大小',
  attentionHeadsLabel: '注意力头',
  kvHeadsLabel: 'KV头（GQA/MQA）',

  resultsTitle: '内存详情',
  totalMemory: '所需总RAM',
  modelWeights: '模型权重',
  kvCache: 'KV缓存',
  activationMemory: '激活内存',
  frameworkOverhead: '框架开销',
  macOsOverhead: 'macOS预留',
  usedLabel: '已使用',
  availableLabel: '可用',

  throughputLabel: '吞吐量（估算）',
  ttftLabel: '首Token延迟',
  powerDrawLabel: '功耗',
  costPerHrLabel: '估算成本 / 时',
  emissionsPerHrLabel: 'CO₂ / 时',

  recommendedTitle: '推荐给你的Mac',
  recommendedEmpty: '没有模型适合此配置。请尝试增加RAM或降低量化精度。',
  recommendedBadge: 't/s',

  deployTitle: '快速开始',
  deployDesc: '复制粘贴到终端即可开始：',
  deployCopied: '已复制！',
  deployInstallHint: '如果尚未安装，请先安装框架：',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: '评估',
  ratingGodTier: '非常适合 — 内存充裕，运行流畅。适合对话和大上下文。',
  ratingGood: '良好 — 适合编程和一般用途。最大上下文时可能略慢。',
  ratingBad: '勉强 — 将依赖交换内存。实时使用性能下降。',
  ratingCannotRun: '无法运行 — RAM不足。请减小模型大小或升级硬件。',

  specsBandwidth: '带宽',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face 结果',
  hfSearchingLabel: '正在搜索Hugging Face…',
  hfNoResults: '未找到模型。',
  hfApiLabel: 'HF',
  hfLoadingModel: '加载中',
  hfFetchError: '无法获取此模型的配置（可能受限）。使用估算参数。',

  faqTitle: '常见问题',
  faq: [
    { q: 'Token吞吐量是如何计算的？', a: '在Apple Silicon上，推理速度受内存带宽限制。我们用芯片带宽除以加载的模型大小，然后应用框架效率系数（MLX ≈ 85%、Ollama ≈ 65%、vLLM ≈ 70%、SGLang ≈ 88%）。' },
    { q: '为什么macOS版本很重要？', a: 'macOS为系统预留内存。Sequoia和Tahoe因设备端AI功能比Sonoma预留更多。本计算器会考虑这一差异。' },
    { q: '为什么不同框架使用不同的RAM量？', a: 'vLLM为高并发预分配大型KV缓存块。Ollama有Go运行时开销（约600MB）。MLX和SGLang是更精简的C++/Python后端（约200MB基础）。' },
    { q: '什么是量化？', a: '量化降低模型权重精度（如FP16→INT4），将内存使用减少2-4倍。代价是轻微质量下降，对对话和编程任务通常可以接受。' },
    { q: '功耗和成本估算如何计算？', a: '功耗基于芯片负载下的TDP。成本使用全球平均电价（$0.15/kWh）。排放使用全球平均电网碳强度（385 g CO₂e/kWh）。' },
    { q: '能运行超过RAM大小的模型吗？', a: '技术上可以 — macOS会使用SSD上的交换内存。但吞吐量降至正常的约10%，实时对话将无法使用。' },
  ],
};

const KO: VramCalculatorStrings = {
  metaTitle: '내 Mac에서 돌릴 수 있을까? — Apple Silicon LLM 메모리 계산기',
  metaDescription: 'Mac에서 LLM을 로컬로 실행할 수 있는지 확인하는 무료 도구. Apple Silicon M1~M5의 VRAM 사용량, 토큰 속도, 호환성 계산.',
  breadcrumbHome: '홈',
  breadcrumbTools: '도구',
  breadcrumbTool: 'Mac LLM 계산기',
  eyebrow: '무료 도구',
  h1: '내 Mac에서 돌릴 수 있을까?',
  subtitle: 'Mac을 위한 궁극의 LLM 메모리 계산기. {strong}Apple Silicon{/strong} 구성에 맞는 정확한 메모리 사용량, 토큰 생성 속도, 호환성을 계산합니다.',

  hardwareSettingsLabel: '1. 하드웨어',
  macFamilyLabel: 'Mac 프로세서',
  macRamLabel: '통합 메모리 (RAM)',
  macOsLabel: 'macOS 버전',
  frameworkLabel: '추론 프레임워크',

  modelSettingsLabel: '2. 모델 선택',
  modelSearchLabel: '모델 검색',
  modelSearchPlaceholder: '예: Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: '로컬 모델을 찾을 수 없습니다. Enter를 눌러 Hugging Face 검색…',
  modelSearchLivePlaceholder: 'Hugging Face 검색 중…',

  paramsLabel: '파라미터 (십억)',
  paramsDesc: '예: 8B 모델이면 8.',
  precisionLabel: '양자화 / 정밀도',
  precisionDesc: '낮은 정밀도 = 적은 메모리, 약간의 품질 저하.',
  contextLabel: '컨텍스트 윈도우 (토큰)',
  contextDesc: '프롬프트 + 최대 생성 토큰 합계.',
  batchLabel: '배치 크기',
  batchDesc: '병렬 시퀀스 수 (채팅은 1).',

  advancedSettingsLabel: '고급 아키텍처',
  layersLabel: '레이어',
  hiddenSizeLabel: '히든 사이즈',
  attentionHeadsLabel: '어텐션 헤드',
  kvHeadsLabel: 'KV 헤드 (GQA/MQA)',

  resultsTitle: '메모리 분석',
  totalMemory: '필요 총 RAM',
  modelWeights: '모델 가중치',
  kvCache: 'KV 캐시',
  activationMemory: '활성화 메모리',
  frameworkOverhead: '프레임워크 오버헤드',
  macOsOverhead: 'macOS 예약',
  usedLabel: '사용 중',
  availableLabel: '사용 가능',

  throughputLabel: '처리량 (추정)',
  ttftLabel: '첫 토큰 시간',
  powerDrawLabel: '소비 전력',
  costPerHrLabel: '추정 비용 / 시간',
  emissionsPerHrLabel: 'CO₂ / 시간',

  recommendedTitle: '맥에 추천',
  recommendedEmpty: '이 구성에 맞는 모델이 없습니다. RAM을 늘리거나 양자화를 낮춰보세요.',
  recommendedBadge: 't/s',

  deployTitle: '빠른 시작',
  deployDesc: '터미널에 복사하여 붙여넣기:',
  deployCopied: '복사됨!',
  deployInstallHint: '프레임워크를 먼저 설치하세요:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: '판정',
  ratingGodTier: '최적 — 여유 있게 편안하게 실행. 채팅과 대용량 컨텍스트에 이상적.',
  ratingGood: '양호 — 코딩과 일반 사용에 적합. 최대 컨텍스트에서 약간 느려질 수 있음.',
  ratingBad: '빠듯함 — 스왑 메모리에 의존. 실시간 사용 시 성능 저하 예상.',
  ratingCannotRun: '실행 불가 — RAM 부족. 모델 크기를 줄이거나 하드웨어를 업그레이드하세요.',

  specsBandwidth: '대역폭',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Hugging Face 결과',
  hfSearchingLabel: 'Hugging Face 검색 중…',
  hfNoResults: '모델을 찾을 수 없습니다.',
  hfApiLabel: 'HF',
  hfLoadingModel: '로딩 중',
  hfFetchError: '이 모델의 설정을 가져올 수 없습니다 (접근 제한 가능). 추정 파라미터를 사용합니다.',

  faqTitle: '자주 묻는 질문',
  faq: [
    { q: '토큰 처리량은 어떻게 계산되나요?', a: 'Apple Silicon에서 추론 속도는 메모리 대역폭에 의해 제한됩니다. 칩의 대역폭을 로드된 모델 크기로 나누고 프레임워크별 효율 계수를 적용합니다 (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'macOS 버전이 왜 중요한가요?', a: 'macOS는 시스템용으로 메모리를 예약합니다. Sequoia와 Tahoe는 온디바이스 AI 기능으로 인해 Sonoma보다 더 많이 예약합니다. 이 계산기는 그 차이를 반영합니다.' },
    { q: '프레임워크마다 RAM 사용량이 다른 이유는?', a: 'vLLM은 높은 동시성을 위해 대형 KV 캐시 블록을 사전 할당합니다. Ollama는 Go 런타임 오버헤드가 있습니다 (~600MB). MLX와 SGLang은 더 가벼운 C++/Python 백엔드입니다 (~200MB 기본).' },
    { q: '양자화란 무엇인가요?', a: '양자화는 모델 가중치의 정밀도를 낮춰 (예: FP16→INT4) 메모리 사용을 2~4배 줄입니다. 약간의 품질 저하가 있지만 채팅과 코딩에는 보통 허용 범위입니다.' },
    { q: '전력과 비용 추정은 어떻게 계산되나요?', a: '전력은 칩의 부하 시 TDP에서 도출합니다. 비용은 세계 평균 전기 요금 ($0.15/kWh), 배출량은 세계 평균 전력망 탄소 강도 (385 g CO₂e/kWh)를 사용합니다.' },
    { q: 'RAM보다 큰 모델을 실행할 수 있나요?', a: '기술적으로 가능합니다 — macOS가 SSD의 스왑 메모리를 사용합니다. 하지만 처리량이 정상의 약 10%로 떨어져 실시간 채팅은 사실상 불가능합니다.' },
  ],
};

const PT: VramCalculatorStrings = {
  metaTitle: 'Meu Mac Aguenta? — Calculadora de Memória LLM para Apple Silicon',
  metaDescription: 'Calculadora gratuita para verificar se seu Mac pode rodar qualquer LLM localmente. Estima uso de VRAM, taxa de tokens e compatibilidade para Apple Silicon M1 a M5.',
  breadcrumbHome: 'Início',
  breadcrumbTools: 'Ferramentas',
  breadcrumbTool: 'Calculadora LLM Mac',
  eyebrow: 'Ferramenta Gratuita',
  h1: 'Meu Mac Aguenta?',
  subtitle: 'A calculadora definitiva de memória LLM para Mac. Estime o uso exato de memória, velocidade de geração de tokens e compatibilidade para sua configuração {strong}Apple Silicon{/strong}.',

  hardwareSettingsLabel: '1. Seu Hardware',
  macFamilyLabel: 'Processador Mac',
  macRamLabel: 'Memória Unificada (RAM)',
  macOsLabel: 'Versão do macOS',
  frameworkLabel: 'Framework de Inferência',

  modelSettingsLabel: '2. Escolha um Modelo',
  modelSearchLabel: 'Buscar Modelos',
  modelSearchPlaceholder: 'Ex: Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'Nenhum modelo local encontrado. Pressione Enter para buscar no Hugging Face…',
  modelSearchLivePlaceholder: 'Buscando no Hugging Face…',

  paramsLabel: 'Parâmetros (Bilhões)',
  paramsDesc: 'Ex: 8 para um modelo de 8B.',
  precisionLabel: 'Quantização / Precisão',
  precisionDesc: 'Menor precisão = menos memória, leve perda de qualidade.',
  contextLabel: 'Janela de Contexto (Tokens)',
  contextDesc: 'Prompt + tokens gerados combinados.',
  batchLabel: 'Tamanho do Lote',
  batchDesc: 'Sequências paralelas (1 para chat).',

  advancedSettingsLabel: 'Arquitetura Avançada',
  layersLabel: 'Camadas',
  hiddenSizeLabel: 'Tamanho Oculto',
  attentionHeadsLabel: 'Cabeças de Atenção',
  kvHeadsLabel: 'Cabeças KV (GQA/MQA)',

  resultsTitle: 'Detalhamento de Memória',
  totalMemory: 'RAM Total Necessária',
  modelWeights: 'Pesos do Modelo',
  kvCache: 'Cache KV',
  activationMemory: 'Memória de Ativação',
  frameworkOverhead: 'Overhead do Framework',
  macOsOverhead: 'Reserva do macOS',
  usedLabel: 'Usado',
  availableLabel: 'Disponível',

  throughputLabel: 'Taxa (Est.)',
  ttftLabel: 'Tempo até Primeiro Token',
  powerDrawLabel: 'Consumo',
  costPerHrLabel: 'Custo Est. / Hr',
  emissionsPerHrLabel: 'CO₂ / Hr',

  recommendedTitle: 'Recomendados para Seu Mac',
  recommendedEmpty: 'Nenhum modelo curado se encaixa nesta configuração. Tente mais RAM ou quantização menor.',
  recommendedBadge: 't/s',

  deployTitle: 'Início Rápido',
  deployDesc: 'Copie e cole no terminal para começar:',
  deployCopied: 'Copiado!',
  deployInstallHint: 'Instale o framework primeiro se ainda não tiver:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Veredito',
  ratingGodTier: 'Excelente — roda confortavelmente com folga. Ideal para chat e contexto pesado.',
  ratingGood: 'Bom — sólido para programação e uso geral. Pode desacelerar no contexto máximo.',
  ratingBad: 'Apertado — dependerá de memória swap. Desempenho degradado em uso em tempo real.',
  ratingCannotRun: 'Não pode rodar — RAM insuficiente. Reduza o tamanho do modelo ou melhore o hardware.',

  specsBandwidth: 'Largura de banda',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Resultados do Hugging Face',
  hfSearchingLabel: 'Buscando no Hugging Face…',
  hfNoResults: 'Nenhum modelo encontrado.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Carregando',
  hfFetchError: 'Não foi possível obter a configuração deste modelo (pode ser restrito). Usando parâmetros estimados.',

  faqTitle: 'Perguntas Frequentes',
  faq: [
    { q: 'Como a taxa de tokens é calculada?', a: 'No Apple Silicon, a velocidade de inferência é limitada pela largura de banda da memória. Dividimos a largura de banda do seu chip pelo tamanho do modelo carregado, aplicando um fator de eficiência do framework (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'Por que a versão do macOS importa?', a: 'O macOS reserva memória para o sistema. Sequoia e Tahoe reservam mais que Sonoma devido a recursos de IA no dispositivo. Esta calculadora leva em conta a diferença.' },
    { q: 'Por que frameworks usam quantidades diferentes de RAM?', a: 'vLLM pré-aloca grandes blocos de cache KV para alta concorrência. Ollama tem overhead do runtime Go (~600 MB). MLX e SGLang são backends mais leves em C++/Python (~200 MB base).' },
    { q: 'O que a quantização faz?', a: 'Quantização reduz a precisão dos pesos do modelo (ex: FP16 → INT4), diminuindo o uso de memória em 2–4×. A contrapartida é uma leve perda de qualidade, geralmente aceitável para chat e código.' },
    { q: 'Como são calculados energia e emissões?', a: 'A potência é derivada do TDP do seu chip sob carga. Custo usa a tarifa elétrica média global ($0.15/kWh). Emissões usam a intensidade de carbono média global (385 g CO₂e/kWh).' },
    { q: 'Posso rodar modelos maiores que minha RAM?', a: 'Tecnicamente sim — o macOS usará memória swap no SSD. Mas a taxa cai para ~10% do normal, tornando o chat em tempo real inutilizável.' },
  ],
};

const IT: VramCalculatorStrings = {
  metaTitle: 'Il Mio Mac Ce la Fa? — Calcolatore Memoria LLM per Apple Silicon',
  metaDescription: 'Calcolatore gratuito per verificare se il tuo Mac può eseguire qualsiasi LLM localmente. Stima l\'uso VRAM, il throughput token e la compatibilità per Apple Silicon M1-M5.',
  breadcrumbHome: 'Home',
  breadcrumbTools: 'Strumenti',
  breadcrumbTool: 'Calcolatore LLM Mac',
  eyebrow: 'Strumento Gratuito',
  h1: 'Il Mio Mac Ce la Fa?',
  subtitle: 'Il calcolatore definitivo di memoria LLM per Mac. Stima l\'impronta di memoria esatta, la velocità di generazione token e la compatibilità per la tua configurazione {strong}Apple Silicon{/strong}.',

  hardwareSettingsLabel: '1. Il Tuo Hardware',
  macFamilyLabel: 'Processore Mac',
  macRamLabel: 'Memoria Unificata (RAM)',
  macOsLabel: 'Versione macOS',
  frameworkLabel: 'Framework di Inferenza',

  modelSettingsLabel: '2. Scegli un Modello',
  modelSearchLabel: 'Cerca Modelli',
  modelSearchPlaceholder: 'Es: Llama 3.1 8B, Qwen 2.5, Mixtral…',
  modelSearchNoResults: 'Nessun modello locale trovato. Premi Invio per cercare su Hugging Face…',
  modelSearchLivePlaceholder: 'Ricerca su Hugging Face…',

  paramsLabel: 'Parametri (Miliardi)',
  paramsDesc: 'Es: 8 per un modello 8B.',
  precisionLabel: 'Quantizzazione / Precisione',
  precisionDesc: 'Meno precisione = meno memoria, lieve perdita di qualità.',
  contextLabel: 'Finestra di Contesto (Token)',
  contextDesc: 'Prompt + token generati combinati.',
  batchLabel: 'Dimensione Batch',
  batchDesc: 'Sequenze parallele (1 per chat).',

  advancedSettingsLabel: 'Architettura Avanzata',
  layersLabel: 'Livelli',
  hiddenSizeLabel: 'Dimensione Nascosta',
  attentionHeadsLabel: 'Teste di Attenzione',
  kvHeadsLabel: 'Teste KV (GQA/MQA)',

  resultsTitle: 'Dettaglio Memoria',
  totalMemory: 'RAM Totale Richiesta',
  modelWeights: 'Pesi del Modello',
  kvCache: 'Cache KV',
  activationMemory: 'Memoria di Attivazione',
  frameworkOverhead: 'Overhead del Framework',
  macOsOverhead: 'Riserva macOS',
  usedLabel: 'Usato',
  availableLabel: 'Disponibile',

  throughputLabel: 'Throughput (Stima)',
  ttftLabel: 'Tempo al Primo Token',
  powerDrawLabel: 'Consumo',
  costPerHrLabel: 'Costo St. / Ora',
  emissionsPerHrLabel: 'CO₂ / Ora',

  recommendedTitle: 'Consigliati per il Tuo Mac',
  recommendedEmpty: 'Nessun modello curato si adatta a questa configurazione. Prova con più RAM o quantizzazione inferiore.',
  recommendedBadge: 't/s',

  deployTitle: 'Avvio Rapido',
  deployDesc: 'Copia e incolla nel terminale per iniziare:',
  deployCopied: 'Copiato!',
  deployInstallHint: 'Installa prima il framework se non l\'hai ancora fatto:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'Verdetto',
  ratingGodTier: 'Eccellente — funziona comodamente con margine. Ideale per chat e contesto pesante.',
  ratingGood: 'Buono — solido per programmazione e uso generale. Potrebbe rallentare al contesto massimo.',
  ratingBad: 'Stretto — dipenderà dalla memoria swap. Prestazioni degradate in tempo reale.',
  ratingCannotRun: 'Non eseguibile — RAM insufficiente. Riduci la dimensione del modello o aggiorna l\'hardware.',

  specsBandwidth: 'Larghezza di banda',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'Risultati Hugging Face',
  hfSearchingLabel: 'Ricerca su Hugging Face…',
  hfNoResults: 'Nessun modello trovato.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'Caricamento',
  hfFetchError: 'Impossibile ottenere la configurazione di questo modello (potrebbe essere limitato). Usando parametri stimati.',

  faqTitle: 'Domande Frequenti',
  faq: [
    { q: 'Come viene calcolato il throughput dei token?', a: 'Su Apple Silicon, la velocità di inferenza è limitata dalla larghezza di banda della memoria. Dividiamo la larghezza di banda del chip per la dimensione del modello caricato, applicando un fattore di efficienza del framework (MLX ≈ 85%, Ollama ≈ 65%, vLLM ≈ 70%, SGLang ≈ 88%).' },
    { q: 'Perché la versione di macOS è importante?', a: 'macOS riserva memoria per il sistema. Sequoia e Tahoe riservano più di Sonoma a causa delle funzionalità AI sul dispositivo. Questo calcolatore tiene conto della differenza.' },
    { q: 'Perché i framework usano quantità diverse di RAM?', a: 'vLLM prealloca grandi blocchi di cache KV per l\'alta concorrenza. Ollama ha overhead del runtime Go (~600 MB). MLX e SGLang sono backend più snelli in C++/Python (~200 MB base).' },
    { q: 'Cosa fa la quantizzazione?', a: 'La quantizzazione riduce la precisione dei pesi del modello (es: FP16 → INT4), riducendo l\'uso di memoria di 2–4×. Il compromesso è una lieve perdita di qualità, generalmente accettabile per chat e codice.' },
    { q: 'Come vengono calcolati potenza e emissioni?', a: 'La potenza è derivata dal TDP del chip sotto carico. Il costo usa la tariffa elettrica media globale ($0,15/kWh). Le emissioni usano l\'intensità di carbonio media globale (385 g CO₂e/kWh).' },
    { q: 'Posso eseguire modelli più grandi della mia RAM?', a: 'Tecnicamente sì — macOS userà la memoria swap sull\'SSD. Ma il throughput scende a ~10% del normale, rendendo la chat in tempo reale inutilizzabile.' },
  ],
};

const AR: VramCalculatorStrings = {
  metaTitle: 'هل يستطيع Mac تشغيله؟ — حاسبة ذاكرة LLM لـ Apple Silicon',
  metaDescription: 'أداة مجانية للتحقق مما إذا كان Mac الخاص بك يمكنه تشغيل أي LLM محلياً. تقدير استخدام VRAM وسرعة الرموز والتوافق لـ Apple Silicon M1 إلى M5.',
  breadcrumbHome: 'الرئيسية',
  breadcrumbTools: 'الأدوات',
  breadcrumbTool: 'حاسبة LLM للماك',
  eyebrow: 'أداة مجانية',
  h1: 'هل يستطيع Mac تشغيله؟',
  subtitle: 'الحاسبة النهائية لذاكرة LLM للماك. قدّر استهلاك الذاكرة الدقيق وسرعة توليد الرموز والتوافق لتكوين {strong}Apple Silicon{/strong} الخاص بك.',

  hardwareSettingsLabel: '1. الأجهزة',
  macFamilyLabel: 'معالج Mac',
  macRamLabel: 'الذاكرة الموحدة (RAM)',
  macOsLabel: 'إصدار macOS',
  frameworkLabel: 'إطار الاستدلال',

  modelSettingsLabel: '2. اختر نموذجاً',
  modelSearchLabel: 'البحث عن نماذج',
  modelSearchPlaceholder: 'مثال: Llama 3.1 8B، Qwen 2.5، Mixtral…',
  modelSearchNoResults: 'لم يتم العثور على نماذج محلية. اضغط Enter للبحث في Hugging Face…',
  modelSearchLivePlaceholder: 'جارٍ البحث في Hugging Face…',

  paramsLabel: 'المعاملات (مليارات)',
  paramsDesc: 'مثال: 8 لنموذج 8B.',
  precisionLabel: 'التكميم / الدقة',
  precisionDesc: 'دقة أقل = ذاكرة أقل، فقدان طفيف في الجودة.',
  contextLabel: 'نافذة السياق (رموز)',
  contextDesc: 'المطالبة + الحد الأقصى للرموز المولدة.',
  batchLabel: 'حجم الدفعة',
  batchDesc: 'تسلسلات متوازية (1 للمحادثة).',

  advancedSettingsLabel: 'بنية متقدمة',
  layersLabel: 'الطبقات',
  hiddenSizeLabel: 'الحجم المخفي',
  attentionHeadsLabel: 'رؤوس الانتباه',
  kvHeadsLabel: 'رؤوس KV (GQA/MQA)',

  resultsTitle: 'تفصيل الذاكرة',
  totalMemory: 'إجمالي RAM المطلوب',
  modelWeights: 'أوزان النموذج',
  kvCache: 'ذاكرة KV المؤقتة',
  activationMemory: 'ذاكرة التنشيط',
  frameworkOverhead: 'حمل الإطار',
  macOsOverhead: 'حجز macOS',
  usedLabel: 'مستخدم',
  availableLabel: 'متاح',

  throughputLabel: 'الإنتاجية (تقدير)',
  ttftLabel: 'وقت أول رمز',
  powerDrawLabel: 'استهلاك الطاقة',
  costPerHrLabel: 'التكلفة / ساعة',
  emissionsPerHrLabel: 'CO₂ / ساعة',

  recommendedTitle: 'موصى به لجهاز Mac الخاص بك',
  recommendedEmpty: 'لا توجد نماذج مناسبة لهذا التكوين. جرّب زيادة RAM أو تقليل التكميم.',
  recommendedBadge: 'رمز/ث',

  deployTitle: 'بدء سريع',
  deployDesc: 'انسخ والصق في الطرفية للبدء:',
  deployCopied: 'تم النسخ!',
  deployInstallHint: 'ثبّت الإطار أولاً إن لم يكن مثبتاً:',
  deployInstallHintOllama: 'brew install ollama && ollama serve',
  deployInstallHintVllm: 'pip install vllm',
  deployInstallHintSglang: 'pip install "sglang[all]"',
  deployInstallHintMlx: 'pip install mlx-lm',

  ratingTitle: 'الحكم',
  ratingGodTier: 'ممتاز — يعمل بأريحية مع هامش كبير. مثالي للمحادثة والسياق الثقيل.',
  ratingGood: 'جيد — مناسب للبرمجة والاستخدام العام. قد يبطئ عند أقصى سياق.',
  ratingBad: 'ضيق — سيعتمد على ذاكرة المبادلة. أداء متدهور في الاستخدام الفوري.',
  ratingCannotRun: 'لا يمكن التشغيل — RAM غير كافٍ. قلل حجم النموذج أو حدّث الأجهزة.',

  specsBandwidth: 'عرض النطاق',
  specsNeuralEngine: 'Neural Engine',

  hfResultsLabel: 'نتائج Hugging Face',
  hfSearchingLabel: 'جارٍ البحث في Hugging Face…',
  hfNoResults: 'لم يتم العثور على نماذج.',
  hfApiLabel: 'HF',
  hfLoadingModel: 'جارٍ التحميل',
  hfFetchError: 'تعذر جلب إعدادات هذا النموذج (قد يكون مقيداً). يتم استخدام معاملات تقديرية.',

  faqTitle: 'الأسئلة الشائعة',
  faq: [
    { q: 'كيف يتم حساب إنتاجية الرموز؟', a: 'على Apple Silicon، سرعة الاستدلال محدودة بعرض نطاق الذاكرة. نقسم عرض نطاق الشريحة على حجم النموذج المحمّل، ثم نطبق معامل كفاءة الإطار (MLX ≈ 85%، Ollama ≈ 65%، vLLM ≈ 70%، SGLang ≈ 88%).' },
    { q: 'لماذا يهم إصدار macOS؟', a: 'يحجز macOS ذاكرة للنظام. Sequoia وTahoe يحجزان أكثر من Sonoma بسبب ميزات الذكاء الاصطناعي على الجهاز. هذه الحاسبة تأخذ الفرق بالاعتبار.' },
    { q: 'لماذا تستخدم الأطر كميات مختلفة من RAM؟', a: 'vLLM يخصص مسبقاً كتل كبيرة من ذاكرة KV المؤقتة للتزامن العالي. Ollama لديه حمل وقت تشغيل Go (~600 ميجابايت). MLX وSGLang أخف وزناً بخلفيات C++/Python (~200 ميجابايت أساس).' },
    { q: 'ما الذي يفعله التكميم؟', a: 'التكميم يقلل دقة أوزان النموذج (مثلاً FP16 → INT4)، مما يقلل استخدام الذاكرة 2-4 أضعاف. المقابل هو فقدان طفيف في الجودة، مقبول عادةً للمحادثة والبرمجة.' },
    { q: 'كيف يتم حساب الطاقة والانبعاثات؟', a: 'الطاقة مشتقة من TDP الشريحة تحت الحمل. التكلفة تستخدم متوسط سعر الكهرباء العالمي ($0.15/kWh). الانبعاثات تستخدم متوسط كثافة كربون الشبكة العالمية (385 غ CO₂e/kWh).' },
    { q: 'هل يمكنني تشغيل نماذج أكبر من RAM الخاص بي؟', a: 'تقنياً نعم — سيستخدم macOS ذاكرة المبادلة على SSD. لكن الإنتاجية تنخفض إلى ~10% من المعدل الطبيعي، مما يجعل المحادثة الفورية غير قابلة للاستخدام.' },
  ],
};

export const VRAM_STRINGS: Record<Locale, VramCalculatorStrings> = {
  en: EN, tr: TR, es: ES, fr: FR, de: DE, ja: JA, 'zh-CN': ZH_CN, ko: KO, pt: PT, it: IT, ar: AR,
};
