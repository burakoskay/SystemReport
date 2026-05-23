---
title: "BambuStudio Violazione AGPL Scatena Debatito Legale e FOSS"
date: 2026-05-23T13:56:41.536Z
tags: ["foss","agpl","software licensing","gpl","open source"]
hero_image: "/hero/2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d.jpg"
hero_image_credit_name: "Markus Winkler"
hero_image_credit_url: "https://www.pexels.com/@markus-winkler-1430818"
visual_keyword: "AGPL license agreement document next to a computer monitor showing code diffs"
description: "BambuStudio viola termini AGPL con fork di PrusaSlicer"
sources_count: 3
locale: "it"
canonical_slug: "2026-05-23-bambustudio-agpl-violation-sparks-legal-and-foss-debate-09556d"
---

## Legge Open-Source Entra Nel Mondo Reale

La fork di PrusaSlicer da parte di BambuStudio ha scatenato una tempesta legale sulla conformità AGPL. La violazione non è solo una questione tecnica, ma un collisione tra strumenti aziendali e le rigide richieste di reciprocità delle licenze copyleft. Per la comunità di Prusa, non si tratta di riutilizzo del codice, ma di stabilire se gli attori proprietari possono scegliere i vantaggi dello sviluppo open-source senza adempiere ai propri obblighi.

Il disaccordo verte su come BambuStudio ha modificato PrusaSlicer, un software di stampa 3D gratuito, e poi distribuito queste modifiche senza condividere il codice sorgente. L'AGPL richiede che qualsiasi opera derivata distribuita in rete debba essere anch'essa open-source. L'approccio di Bambu - fork del tool, aggiunta di funzionalità e vendita di una versione SaaS - rientra pienamente nel mirino della licenza. Il lead developer di Prusa, Josef Prusa, ha documentato la violazione nei commit del codice e nelle differenze dell'API, creando una traccia cartacea che è difficile per un tribunale ignorare.

## Precedenti Giuridici Si Scontrano

Non è la prima volta che la licenza open-source si scontra con gli interessi commerciali. Il caso Versata vs. Ameriprise del 2022 ha rivelato un difetto più profondo nel modo in cui le aziende trattano il codice con licenza GPL. Il software di gestione dei canali di distribuzione di Versata includeva il codice GPL VTD-XML, ma l'azienda ha evitato una licenza proprietaria. Quando Ameriprise ha scoperto ciò, ha contro-aggredito, sostenendo che la violazione della GPL da parte di Versata annullava il loro stesso utilizzo del software. La causa si è incentrata sul fatto che un tribunale statale potesse ascoltare la richiesta di violazione della GPL - una questione risolta dalla sentenza del tribunale secondo cui la legge federale sul diritto d'autore la prevedeva.

L'esito ha lasciato un vuoto. I tribunali ora affrontano un muro procedurale: mentre possono pronunciarsi sulla conformità alla licenza, non possono costringere un'azienda ad aprire il codice di un prodotto sotto la GPL a meno che il caso non sia formulato come una violazione diretta del diritto d'autore. Questa technicalità consente ai trasgressori di evitare la piena portata delle esigenze della licenza mentre affrontano ancora rischi legali sulla distribuzione.

## Perché AGPL È Importante per gli Ecosistemi Proprietari

L'AGPL è stato progettato per chiudere una lacuna nella GPL richiedendo la divulgazione del codice sorgente anche per i servizi in rete. A differenza della GPL, che si concentra sulla distribuzione del software, l'AGPL affronta esplicitamente il SaaS come forma di distribuzione. Il modello SaaS di BambuStudio, che include il codice PrusaSlicer modificato in un servizio ospitato, rende la violazione AGPL azionabile legalmente.

L'attivismo di Prusa mette in luce una tensione più ampia: i progetti open-source devono far rispettare le licenze per mantenere la loro integrità, ma l'applicazione richiede risorse che la maggior parte degli sviluppatori non ha. Questo caso potrebbe costringere a un confronto su come le licenze open-source interagiscono con i modelli aziendali cloud-first. Se Prusa vince, potrebbe stabilire un precedente per cui il SaaS non è immune alle esigenze copyleft - un mutamento che potrebbe propagarsi attraverso l'industria.

## Cosa Aspettare

Il caso BambuStudio probabilmente si concentrerà sul fatto che un tribunale accetti l'argomentazione di Prusa secondo cui il SaaS costituisce una distribuzione ai sensi dell'AGPL. Se Prusa vince, potrebbe diventare un modello per altri progetti FOSS per far valere le licenze contro i fornitori di servizi cloud. Altrimenti, una sconfitta potrebbe incoraggiare le aziende a sfruttare l'ambiguità dell'AGPL intorno ai modelli di servizio.

In parallelo, l'esito del caso Versata potrebbe chiarire come i tribunali gestiscono le violazioni della GPL nel software commerciale. Anche se un tribunale non può costringere un'azienda ad aprire il codice, potrebbe comunque imporre danni o inibizioni. Qualsiasi risultato ridisegnerebbe le valutazioni del rischio per le aziende che utilizzano componenti open-source. La comunità FOSS ha bisogno di regole chiare - preferibilmente dai tribunali, non dalle cause - su dove viene tracciata la linea tra conformità ed exploit.