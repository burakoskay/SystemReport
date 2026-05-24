---
title: "La reverse engineering riemerge nell'hardware, nel silicio e nell'AI"
date: 2026-05-24T08:38:11.849Z
tags: ["reverse engineering","hacker culture","open-source hardware"]
hero_image: "/hero/2026-05-24-reverse-engineering-resurfaces-in-hardware-silicon-and-ai-48933e.jpg"
hero_image_credit_name: "Djenz Van Eysendeyk"
hero_image_credit_url: "https://www.pexels.com/@djenz-van-eysendeyk-1836927628"
visual_keyword: "circuit board"
description: "Dalla scheda Spacelab del 1980 al silicio open-source x86 e agli scraper API basati su LLM, gli appassionati spingono la reverse engineering verso nuovi domini."
sources_count: 4
locale: "it"
canonical_slug: "2026-05-24-reverse-engineering-resurfaces-in-hardware-silicon-and-ai-48933e"
audio_path: "/audio/2026-05-24-reverse-engineering-resurfaces-in-hardware-silicon-and-ai-48933e.mp3"
audio_bytes: 561364
audio_mime: "audio/mpeg"
---

## Circuiti vintage sottoposti a teardown moderno

Un appassionato ha pubblicato un'analisi passo dopo passo dei circuiti all'interno di una scheda computer Spacelab del 1980. La descrizione mostra il layout della scheda, i valori dei componenti e i percorsi logici che hanno guidato l'hardware di controllo della missione originale. L'autore ha tracciato ogni traccia con un oscilloscopio portatile, fotografato la scheda sotto ingrandimento e annotato lo schema con simboli moderni.

Lo sforzo dimostra che un design di tre decenni fa può ancora essere compreso senza documentazione originale. La scheda Spacelab precede gli strumenti CAD diffusi, quindi il reverse-engineer ha dovuto fare affidamento sull'ispezione visiva e su ipotesi educate sulle famiglie logiche utilizzate. Il post include un elenco completo delle reti che altri appassionati possono utilizzare in un ambiente di simulazione.

Quello che il teardown evidenzia è un compromesso tra la conservazione storica e il riutilizzo pratico. I componenti della scheda non sono più in stock, ma lo schema ora consente l'emulazione o la ricreazione su FPGA moderni. La comunità può preservare il comportamento dell'hardware anche se i componenti fisici decadono.

## Open-source 80386 costruito attorno al microcodice originale

Un progetto separato ha rilasciato un'implementazione open-source della CPU Intel 80386, soprannominata **z386**. Gli sviluppatori hanno estratto il microcodice originale da un chip legacy e lo hanno avvolto in una descrizione hardware che può essere sintetizzata su un FPGA. Il risultato è un processore a 32 bit funzionante che esegue sistemi operativi classici senza modifiche.

Il team ha pubblicato il codice sorgente HDL completo, l'immagine del microcodice ROM estratto e una suite di test che verifica la decodifica delle istruzioni, la gestione della memoria e dei privilegi. Basando il design sul microcodice autentico, il progetto evita la necessità di riscrivere l'insieme di istruzioni complesso da zero. La licenza open-source consente a chiunque di compilare il core per la propria scheda.

Lo sforzo z386 mostra come la reverse engineering possa far rivivere il silicio morto per l'educazione e lo sviluppo degli appassionati. Solleva anche interrogativi sulla legalità della ridistribuzione del microcodice originato in un chip proprietario. Finora il progetto ha evitato rivendicazioni dirette sull'uso commerciale, limitandosi a contesti di ricerca e apprendimento.

## La reverse engineering API basata su LLM guadagna terreno

Integuru ha rilasciato la prima versione di un agente AI che genera codice di integrazione mediante reverse-engineering delle API interne di una piattaforma. Gli utenti alimentano lo strumento con un file HAR, un JSON di cookie e una descrizione in linguaggio naturale dell'azione desiderata. L'agente emette quindi Python eseguibile che chiama gli endpoint privati della piattaforma.

Il flusso di lavoro prevede una chiave API OpenAI e consiglia il modello gpt-4o per la generazione del grafico. Se l'account ha accesso a o1-preview, lo strumento passa automaticamente a quel modello per la generazione del codice. Il repository viene fornito con un ambiente Jupyter gestito da Poetry, una pipeline CI che viene eseguita ad ogni push e una gestione esplicita dei token di autenticazione a due fattori.

L'approccio di Integuru rimuove il lavoro manuale di ispezione del traffico di rete e di assemblaggio delle chiamate HTTP. Solleva anche la stessa tensione etica che ha perseguitato l'hardware sottoposto a reverse-engineering: l'estrazione automatizzata delle API non documentate viola i termini del servizio della piattaforma? Gli autori riconoscono il rischio e mantengono lo strumento open-source, lasciando la decisione all'utente.

## I campi di hacker mantengono viva la cultura della reverse engineering

Il campo EMF (Electromagnetic Field) a Milton Keynes ha tenuto la sua prima edizione britannica dal 31 agosto al 2 settembre 2012. Il festival di tre giorni ha riunito hacker, ingegneri, artisti e scienziati attorno a un campo di Pineham Park. Le sessioni hanno coperto argomenti dalla modificazione genetica alla raccolta di serrature, dalla fisica dell'energia elevata alla reverse engineering.

Il modello di volontariato di EMF rispecchia l'ethos di precedenti incontri europei e statunitensi come il Chaos Communication Congress e ToorCamp. Fornendo spazio per colloqui improvvisati e demo pratiche, il campo crea un luogo a basso livello di ostacolo per progetti come il teardown di Spacelab, il core z386 e l'agente Integuru per trovare collaboratori.

La struttura informale dell'evento incoraggia i partecipanti a condividere dati grezzi, schemi e codice senza la lucidatura di un lancio commerciale. Quell'apertura alimenta l'iterazione rapida vista nei tre racconti di reverse-engineering evidenziati qui.

## Una breve storia della reverse engineering

La reverse engineering è presente da decenni, con primi esempi che includono l'analisi di software e hardware proprietari. La pratica ha guadagnato popolarità negli anni '80 e '90, quando appassionati e ricercatori hanno iniziato a esplorare il funzionamento interno dei sistemi informatici.

Un esempio degno di nota è lo sviluppo del progetto GNU, che mirava a creare un'alternativa gratuita e open-source ai sistemi operativi proprietari. Il progetto si è basato fortemente sulla reverse engineering, poiché gli sviluppatori hanno cercato di comprendere il funzionamento interno del software proprietario.

## Il ruolo dei campi di hacker nella promozione dell'innovazione

I campi di hacker come EMF svolgono un ruolo cruciale nella promozione dell'innovazione e della collaborazione nella comunità della reverse engineering. Questi eventi forniscono una piattaforma per appassionati e ricercatori per condividere il proprio lavoro, imparare dagli altri e collaborare a nuovi progetti.

Riunendo individui provenienti da contesti diversi, i campi di hacker facilitano lo scambio di idee ed expertise. Questa impollinazione incrociata di conoscenze consente ai partecipanti di affrontare sfide complesse e sviluppare soluzioni innovative.

## Cosa guardare dopo

Aspettatevi la prossima versione del core z386, che promette implementazioni FPGA accurate nel tempo in grado di eseguire sistemi operativi legacy a velocità quasi originale. Seguite la tabella di marcia di Integuru per il supporto di ulteriori flussi di autenticazione e una maggiore compatibilità dei modelli, soprattutto quando OpenAI rilascerà nuovi modelli di istruzioni. Infine, tenete d'occhio i prossimi calendari dei campi di hacker; il prossimo incontro EMF è previsto per il 2024 e potrebbe presentare nuovi strumenti di reverse-engineering che combinano hardware vintage con analisi basate su AI.