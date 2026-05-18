---
title: "Microsoft perde uno strumento interno, esponendo le funzionalità di Windows 11"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "La perdita di StagingTool e una vulnerabilità in Recall danno agli utenti esperti e agli aggressori un nuovo accesso agli interni di Windows 11 mentre il sistem"
sources_count: 5
locale: "it"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

La pubblicazione accidentale da parte di Microsoft del suo strumento interno StagingTool ha fornito agli utenti esperti di Windows una chiave diretta per accedere alle funzionalità nascoste di Windows 11, esponendo sia la trasparenza nello sviluppo dell'azienda che un più ampio punto debole nella sicurezza.

Lo strumento è emerso in una richiesta di "bug bash" sul Feedback Hub mercoledì, solo per essere ritirato poche ore dopo che i membri della comunità hanno iniziato a condividerlo. StagingTool è un'applicazione da riga di comando che attiva gli ID delle funzionalità, consentendo a chiunque di aggirare i test A/B di Microsoft e abilitare le funzionalità non rilasciate sui build di anteprima per Insider. La perdita di informazioni rispecchia il lungo esistente strumento di terze parti ViveTool, ma utilizza il sistema di flag ufficiale di Microsoft. La tempistica è degna di nota: Microsoft ha accennato a un imminente aggiornamento di settembre che aggiungerà il supporto nativo per i file RAR e 7-Zip, e la comunità ora dispone di un collegamento per testare tali funzionalità e altri "Momenti" non nominati prima che vengano annunciati pubblicamente.

## Una vulnerabilità in Recall che consente a qualsiasi utente di esfiltrare gli screenshot

Quando Microsoft ha ricostruito la cronologia di Recall con enclave VBS, crittografia AES-256-GCM e autenticazione Windows Hello, l'intento era chiaro: mantenere gli screenshot catturati, il testo OCR e i metadati sigillati all'interno di un vault. In pratica, il processo front-end del vault, AIXHost.exe, viene eseguito senza Protected Process Light, AppContainer o imposizione dell'integrità del codice. Questa omissione significa che qualsiasi processo utente standard può iniettare codice in AIXHost.exe e dirottare le stesse API COM utilizzate dall'interfaccia utente legittima.

TotalRecall Reloaded sfrutta questa lacuna con un payload di due file: un injector (totalrecall.exe) e una DLL. L'injector esegue la scansione dell'elenco dei processi, alloca memoria in AIXHost.exe, scrive il percorso della DLL e crea un thread remoto che chiama LoadLibraryW: iniezione di DLL classica, nessun exploit del kernel, nessun diritto di amministratore. Poiché il DACL di Windows predefinito concede l'accesso completo ai processi utente dello stesso utente, l'attacco funziona a un livello obbligatorio medio con BUILTIN\Administrators impostato su deny-only. Il payload inizializza quindi un appartamento COM, cela la sua identità e percorre lo stesso percorso di decrittazione seguito dall'interfaccia utente legittima, estraendo screenshot decrittati e dati OCR come oggetti COM live.

Dal punto di vista della sicurezza, la falla è inquietante. L'enclave richiede ancora un gesto di Windows Hello, quindi lo strumento non aggira l'autenticazione; semplicemente si accompagna una volta che l'utente si è autenticato. Tuttavia, il fatto che un utente standard possa silenziosamente estrarre settimane di attività senza elevazione significa che qualsiasi account compromesso - sia tramite phishing o un utente malintenzionato - può raccogliere un tesoro di dati visivi potenzialmente sensibili. Le aziende che si affidano a Recall di Windows 11 per la conformità o la registrazione forense ora si trovano di fronte a una superficie di attacco che aggira le tradizionali difese di escalation dei privilegi.

## La barra delle applicazioni ottiene finalmente le opzioni richieste dagli utenti

Cinque anni dopo il lancio di Windows 11, Microsoft sta testando una barra delle applicazioni più piccola e un menu Start più personalizzabile. Le modifiche affrontano una lamentela di lunga data secondo cui la barra delle applicazioni predefinita sembra ingombrante e che il menu Start offre una personalizzazione limitata. I primi build mostrano una riga di icone condensata e la possibilità di fissare o rimuovere elementi con una granularità più fine, portando l'interfaccia utente più vicino alla flessibilità goduta dagli utenti in Windows 10.

## Cosa guardare: aggiornamento di settembre, strumenti della comunità e risposta di Microsoft

Il prossimo importante aggiornamento di Windows 11, previsto per settembre, promette la gestione nativa di RAR e 7-Zip - funzionalità che tradizionalmente richiedevano installatori di terze parti. Con StagingTool già disponibile, gli appassionati probabilmente testeranno quella funzionalità settimane prima del rollout ufficiale, potenzialmente scoprendo bug o regressioni di sicurezza in anticipo. Monitorare i repository GitHub della comunità per nuove funzionalità ID fornirà un'anteprima di ciò che Microsoft prevede di rilasciare.

La posizione ufficiale di Microsoft, come indicato in un precedente post del blog del programma Insider, riconosce che gli "Insider tecnici" scoprono flag disabilitati e li abilitano manualmente. La perdita di StagingTool rende quel processo più semplice e mette pressione sull'azienda per rafforzare i suoi canali di distribuzione interni. Futuri eventi di bug-bash potrebbero vedere un controllo più rigoroso dei collegamenti interni e potremmo vedere Microsoft spinta con la sua utility di attivazione delle funzionalità autorizzate o con protezioni di test A/B più strette. Per le aziende, la combinazione di un percorso di estrazione Recall e di uno strumento di attivazione delle funzionalità condiviso pubblicamente sottolinea la necessità di un monitoraggio rigoroso degli endpoint e dell'applicazione delle policy mentre Windows 11 continua a evolversi.

## La più ampia tensione tra apertura e controllo

Le due storie - la perdita di StagingTool e l'iniezione Recall - evidenziano un paradosso nella filosofia di sviluppo di Microsoft. Da un lato, l'azienda abbraccia un modello di "innovazione continua" che invia modifiche incrementali dietro flag delle funzionalità. D'altra parte, i meccanismi stessi che abilitano l'iterazione rapida diventano vettori di attacco quando vengono esposti. Gli utenti esperti apprezzano la possibilità di sbirciare dietro la tenda, ma quella curiosità può indebolire involontariamente la postura di sicurezza della piattaforma.

Se Microsoft vuole preservare i benefici dell'agilità dei flag delle funzionalità senza distribuire le chiavi, dovrà rafforzare i processi che espongono quei flag. Ciò potrebbe significare aggiungere protezioni PPL o AppContainer agli host dell'interfaccia utente come AIXHost.exe, o crittografare le mappature degli ID delle funzionalità in un modo che solo gli strumenti interni firmati possono leggere. Fino ad allora, la comunità continuerà a camminare sul filo tra la sperimentazione produttiva e l'esposizione sfruttabile, e ogni strumento trapelato o vulnerabilità scoperta cambierà l'equilibrio.