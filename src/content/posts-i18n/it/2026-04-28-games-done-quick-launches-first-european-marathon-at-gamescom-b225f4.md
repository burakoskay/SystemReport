---
title: "Games Done Quick lancia il suo primo maratona europea a Gamescom"
date: 2026-04-28T19:49:57.309Z
tags: ["gamesdonequick","charity","gaming","events"]
hero_image: "/hero/2026-04-28-games-done-quick-launches-first-european-marathon-at-gamescom-b225f4.jpg"
hero_image_credit_name: "Matheus Amaral"
hero_image_credit_url: "https://www.pexels.com/@eumatheusamaral"
visual_keyword: "crowded convention hall with gamers watching a speedrun stage"
description: "GDQ porta il suo maratona di speedrunning caritatevole a Colonia nel mese di agosto, estendendo la presenza di pubblico in diretta e testando un nuovo orario di"
sources_count: 8
locale: "it"
canonical_slug: "2026-04-28-games-done-quick-launches-first-european-marathon-at-gamescom-b225f4"
audio_path: "/audio/2026-04-28-games-done-quick-launches-first-european-marathon-at-gamescom-b225f4.mp3"
audio_bytes: 605458
audio_mime: "audio/mpeg"
---

Games Done Quick eseguirà la sua prima maratona in diretta sul suolo europeo a Gamescom a Colonia, dal 28 al 30 agosto. Il movimento aggiunge un pubblico fisico a un format che è vissuto online per oltre una decade.

L'evento occuperà gli espositori di tre giorni di Gamescom, con trasmissioni giornaliere dalle 4 alle 14 ET su Twitch e YouTube. I responsabili hanno confermato l'orario e il luogo in una nota stampa, e hanno citato l'amministratore delegato Ashley Farkas: "Siamo entusiasti di espandere Games Done Quick a livello globale e di portare un evento in diretta a Gamescom in Germania, un'opportunità che è estremamente significativa per il nostro team.".

La debuttante europea di GDQ segue una maratona di gennaio che ha incluso esecuzioni live di *Super Mario Sunshine*, *Hades II*, e *Clair Obscur: Expedition 33*. Quel show ha raccolto una parte del cumulativo $60 milioni di GDQ raccolti per beneficenza.

## Logistica e formato

Il luogo di Colonia ospiterà una scena, caselle per i corridori e uno schermo grande per il pubblico in diretta. GDQ trasmetterà lo stesso feed di trasmissione a Twitch e YouTube, preservando il modello a doppia traccia che consente ai telespettatori remoti di assistere mentre i fan sul posto applaudono in persona.

L'orario del maratona si comprime dalle tipiche 72 ore a tre giorni, allineandosi con i blocchi programmatici di Gamescom.

L'ordine delle corse sarà simile a quelle precedenti maratone di GDQ: i corridori affrontano categorie che vanno dai titoli classici di Nintendo alle rilasci indipendenti, con ogni corsa seguita da incentivi alla donazione. Il pubblico in diretta voterà su alcune sfide caritative, una pratica introdotta da GDQ nel 2022 per aumentare l'impegno.

## Impatto della comunità e raccoglimento fondi

Il modello di base di GDQ combina la divertente esperienza dei speedrun con le donazioni caritative. Le maratone precedenti hanno sostenuto organizzazioni come la Fondazione contro il cancro e l'Associazione Alzheimer.

L'evento di Colonia continuerà quel modello, con una lista di beneficiari dichiarati che comprende due ONG europee concentrate sui disturbi mentali giovanili.

Gli dati iniziali di donazione dalla maratona di gennaio hanno mostrato un picco quando i corridori hanno sbloccato "multipli di donazione" legati alle vittorie in gioco. GDQ pianifica di riprodurre quei trigger, ma con un twist: i partecipanti presenti possono attivare un moltiplicatore tenendo alta una carta QR che collega direttamente alla pagina di donazione. L'approccio ibrido potrebbe testare se la presenza fisica si traduce in contributi più elevati per spettatore.

I critici hanno avvertito che gli eventi di beneficenza possono rischiare "l'indigestione di donazioni" quando proliferano su più piattaforme. La decisione di GDQ di aggiungere un pubblico in diretta potrebbe esacerbare quel rischio, specialmente se l'esperienza in diretta attrae i donatori lontano dalla trasmissione online.

## Contesto industriale: eventi di beneficenza in gioco

GDQ non è l'unico evento di speedrunning e beneficenza a sperimentare luoghi di incontro fisici. Il fundraiser annuale *Extra Life* ha tenuto corsi pop-up in convention come PAX, e *Twitch Rivals* ha incorporato gironi caritative nei suoi tornei di esports.

Cosa distingue GDQ è la sua concentrazione esclusiva nei speedrun, un settore che richiede precisione di timing, conoscenza approfondita dei giochi e una comunità che apprezza la maestria tecnica.

Lo spostamento verso eventi ibridi riflette una tendenza più ampia nell'industria dei giochi: sfruttare le convenzioni fisiche per aumentare l'impegno dei fan mentre mantenendo la scalabilità delle trasmissioni online. Le società come Blizzard e Riot hanno utilizzato le scene delle convenzioni per presentare nuovi titoli, ma raramente integrano un componente caritativo. Il modello di GDQ potrebbe ispirare altre comunità di nicchia ad adottare un formato a doppia traccia simile, specialmente mentre gli inserzionisti cercano ROI misurabile sui metrici delle audience in diretta.

La sorveglianza regolamentare dei fondi di beneficenza di grande scala ha aumentato nell'UE, con nuove richieste di trasparenza per le donazioni online. La partnership di GDQ con Gamescom significa che dovranno rispettare la legge fiscale tedesca e i requisiti di reporting, un passo avanti rispetto al loro quadro di conformità storico centrato sugli Stati Uniti. L'organizzazione ha assunto un consulente legale europeo per auditare il flusso di donazione, un passo che potrebbe diventare pratica standard per gli eventi di beneficenza transfrontalieri.

## Mezzi tecnici di un maratona di speedrun

Una maratona di speedrun poggia su due pilastri tecnici: sincronizzazione di timer preciso e cattura di video affidabile. GDQ utilizza il timer LiveSplit, che trasmette i tempi divisi in diretta al sovrapposizione della trasmissione.

Per lo spettacolo di Colonia, l'equipaggio di produzione eseguirà una versione locale del timer LiveSplit su un workstation dedicato, inviando i dati sia allo schermo sul posto che alla trasmissione remota via NDI (Network Device Interface).

La cattura di video sarà gestita da una flotta di schede di cattura, ognuna assegnata al console di un corridore - siano esso Nintendo Switch, PlayStation o PC. La trasmissione è inviata attraverso un'istanza centrale di OBS (Open Broadcaster Software) che applica le transizioni di scena, le alert di donazione e le sovrapposizioni del chat.

La ridondanza è inclusa: un nodo secondario di OBS riflette la trasmissione principale, pronto a prendere il controllo se l'encoder primario fallisce.

La miscelazione di audio presenta un unico sfide quando si mescola il rumore del pubblico sul posto con il commento del corridore. GDQ userà un mixer digitale che isoli i microfoni ambientali dalla scena e combini con l'audio del casco del corridore. La miscela sarà inviata al sistema di PA del salone e all'uscita di trasmissione, assicurando che entrambi le audience sentano la stessa esperienza.

## Cosa osservare

Il prossimo punto di dati da seguire è il totale di donazione riferito al termine della maratona di Colonia, suddiviso in donazioni sul posto e online. GDQ pubblicherà un audit post-evento che include la conformità alle norme di beneficenza tedesche.

Gli osservatori seguiranno anche come il formato ibrido influisce sulla tenuta del spettatore su Twitch e YouTube, specialmente durante le slot mattutine ET che sovrappongono con la giornata europea.

Se l'evento si rivela finanziariamente sostenibile, GDQ potrebbe pianificare altre maratone in diretta in altre regioni, potenzialmente estendendosi a esposizioni di giochi principali in Asia. L'abilità di GDQ a scalare il suo modello di produzione mentre naviga i quadri regolamentari transfrontalieri determinerà se l'approccio ibrido diventerà la nuova norma per gli eventi di beneficenza in gioco.