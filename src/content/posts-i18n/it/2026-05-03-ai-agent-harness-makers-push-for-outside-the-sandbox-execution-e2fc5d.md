---
title: "I creatori di harnesses per agenti AI spingono per l'esecuzione al di fuori della sandbox"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Gli sviluppatori di harnesses per agenti AI, come OmoiOS e Broccoli, sostengono che l'esecuzione degli agenti al di fuori della sandbox migliora le prestazioni "
sources_count: 6
locale: "it"
canonical_slug: "2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---

## Il caso dell'esecuzione al di fuori della sandbox

I creatori di harnesses per agenti AI, come OmoiOS e Broccoli, stanno spingendo per l'esecuzione al di fuori della sandbox. Questo approccio promette miglioramenti nelle prestazioni e nell'affidabilità. OmoiOS, un runtime di orchestrazione open-source, trasforma le specifiche in PR utilizzando sciami di agenti paralleli in sandbox isolate.

Il sistema OmoiOS include un agente supervisore che gestisce le merge e mantiene tutto sotto controllo. Genera specifiche fondate sul codebase esistente, costruendo un DAG di task con dipendenze reali. Il sistema esegue sciami di agenti attraverso sandbox isolate fino a quando il lavoro non è completato.

## Implementazioni concrete

Broccoli, un altro harness per agenti AI, trasforma i biglietti Linear in PR spediti powered by Claude e Codex, eseguiti su Google Cloud. Il sistema funziona come due carichi di lavoro Cloud Run su un Postgres condiviso.

Per distribuire Broccoli, gli utenti hanno bisogno di un progetto Google Cloud, un'app GitHub e segreti specifici da GitHub, Linear, OpenAI e Anthropic. La sequenza di distribuzione parte da zero, spiega da dove provengono i valori e richiama passaggi che devono ancora essere eseguiti manualmente per motivi di sicurezza.

## Benefici e compromessi

L'esecuzione degli agenti al di fuori della sandbox offre diversi benefici, tra cui una migliore consapevolezza delle dipendenze, esecuzione parallela e handoff strutturato tra task. Tuttavia, questo approccio solleva anche interrogativi sulla sicurezza e sul controllo.

I sistemi OmoiOS e Broccoli affrontano queste preoccupazioni attraverso sandbox isolate e agenti supervisori. Tuttavia, gli utenti devono ancora valutare i benefici e i rischi dell'esecuzione al di fuori della sandbox.

## Uno sguardo più approfondito su OmoiOS

OmoiOS è progettato per automatizzare il processo di trasformazione delle specifiche in PR. Utilizza un agente supervisore per gestire il processo e assicurarsi che tutto rimanga sotto controllo. Il sistema è costruito per gestire task complessi e dipendenze, rendendolo uno strumento potente per gli sviluppatori.

Una delle caratteristiche chiave di OmoiOS è la sua capacità di generare specifiche fondate sul codebase esistente. Ciò consente agli sviluppatori di costruire su ciò che hanno già, piuttosto che partire da zero. Il sistema include anche un DAG di task con dipendenze reali, che aiuta a garantire che i task siano completati nell'ordine corretto.

## Architettura di Broccoli

L'architettura di Broccoli è progettata per sfruttare la potenza degli agenti AI. Il sistema utilizza due carichi di lavoro Cloud Run su un Postgres condiviso, che consente di scalare e gestire grandi carichi di lavoro.

Il processo di distribuzione per Broccoli è progettato per essere semplice, con istruzioni chiare e un processo di impostazione semplice. Tuttavia, gli utenti devono ancora essere consapevoli delle preoccupazioni di sicurezza e assicurarsi di avere le autorizzazioni e l'accesso necessari.

## Contesto industriale

La spinta per l'esecuzione al di fuori della sandbox riflette una tendenza più ampia nello sviluppo di AI. Man mano che gli agenti AI diventano più potenti, gli sviluppatori stanno cercando modi per scalare il loro uso e migliorare la loro affidabilità.

L'uso di agenti AI nello sviluppo di software, ad esempio, sta diventando sempre più popolare. Gli agenti AI possono automatizzare task, come la codifica e il test, liberando gli sviluppatori di concentrarsi su lavori di livello superiore.

Tuttavia, l'uso di agenti AI solleva anche interrogativi sullo spostamento dei posti di lavoro e sulla necessità di nuove competenze. Man mano che gli agenti AI diventano più diffusi, gli sviluppatori dovranno adattarsi a nuovi modi di lavorare.

## Storia degli harnesses per agenti AI

Il concetto di harnesses per agenti AI è in circolazione da diversi anni. Le prime implementazioni erano spesso limitate dalla loro capacità di scalare e gestire task complessi. Tuttavia, i recenti progressi nell'AI e nel machine learning hanno reso possibile costruire harnesses più potenti e sofisticati.

OmoiOS e Broccoli sono solo due esempi dei molti harnesses per agenti AI attualmente disponibili. Ognuno ha i suoi punti di forza e di debolezza, e gli sviluppatori dovranno valutare attentamente le loro opzioni prima di scegliere un harness.

## Meccaniche tecniche

Le meccaniche tecniche degli harnesses per agenti AI sono complesse e sfaccettate. A livello alto, gli harnesses utilizzano agenti AI per automatizzare task e flussi di lavoro. Tuttavia, i dettagli di come funziona possono variare notevolmente a seconda dell'implementazione.

Nel caso di OmoiOS, il sistema utilizza una combinazione di sciami di agenti paralleli e sandbox isolate per eseguire il lavoro. Questo approccio consente una maggiore scalabilità e flessibilità, garantendo al contempo che i task siano completati in modo sicuro e affidabile.

## Implicazioni a valle

Lo sviluppo degli harnesses per agenti AI ha implicazioni significative a valle. Man mano che questi sistemi diventano più diffusi, è probabile che abbiano un impatto importante sul modo in cui il software viene sviluppato e distribuito.

Una delle implicazioni chiave è il potenziale per una maggiore produttività. Automatizzando task e flussi di lavoro, gli sviluppatori possono concentrarsi su lavori di livello superiore e fornire software più velocemente.

Tuttavia, ci sono anche potenziali rischi e sfide associati agli harnesses per agenti AI. Ad esempio, c'è il rischio che questi sistemi possano sostituire i lavoratori umani o esacerbare i pregiudizi esistenti.

## Cosa tenere d'occhio

Lo sviluppo degli harnesses per agenti AI e la loro distribuzione al di fuori della sandbox è un'area da tenere d'occhio. Decisioni chiave, come l'adozione di OmoiOS e Broccoli, e azioni regolamentari, come le linee guida per lo sviluppo di agenti AI, plasmeranno il futuro dell'uso degli agenti AI.

Il prossimo punto di riferimento è come questi sistemi si comportano nelle distribuzioni reali. Conseguiranno le loro promesse di prestazioni e affidabilità migliorate? Solo il tempo lo dirà.

Man mano che gli agenti AI diventano più diffusi, è essenziale monitorare il loro sviluppo e la loro distribuzione. Le decisioni prese ora plasmeranno il futuro dell'uso degli agenti AI e il suo impatto su industrie e società nel suo insieme.

## Sviluppi futuri

Il futuro degli harnesses per agenti AI sarà probabilmente plasmato da una serie di fattori, tra cui progressi nell'AI e nel machine learning, cambiamenti nelle esigenze regolamentari e spostamenti nella domanda del mercato.

Una cosa è certa: gli harnesses per agenti AI sono qui per restare. Man mano che questi sistemi diventano più diffusi, è essenziale comprendere i loro benefici e rischi potenziali e monitorare il loro sviluppo e la loro distribuzione nel tempo.