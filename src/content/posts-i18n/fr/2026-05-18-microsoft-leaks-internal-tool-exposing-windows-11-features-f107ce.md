---
title: "Microsoft divulgue accidentellement un outil interne, révélant des fonctionnalités de Windows 11"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "La divulgation de StagingTool et d'une vulnérabilité dans Recall donnent aux utilisateurs avancés et aux attaquants un nouvel accès aux composants internes de W"
sources_count: 5
locale: "fr"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

## Un outil interne divulgué, révélant des fonctionnalités cachées de Windows 11

Microsoft a accidentellement publié son outil interne StagingTool, donnant aux utilisateurs avancés de Windows un accès direct à des fonctionnalités cachées de Windows 11. Cet outil, qui utilise le système de drapeaux de Microsoft, permet de contourner les tests A/B et d'activer des fonctionnalités non publiées sur les versions de prévisualisation Insider.

L'outil a été brièvement disponible sur le Feedback Hub mercredi avant d'être retiré quelques heures plus tard, mais les membres de la communauté ont commencé à le partager. StagingTool est similaire à l'outil tiers ViveTool, mais utilise le système de drapeaux officiel de Microsoft.

## Une vulnérabilité dans Recall permet l'extraction de captures d'écran

Lors de la reconstruction de la chronologie Recall avec des enclaves VBS, un chiffrement AES-256-GCM et une authentification Windows Hello, l'objectif était clair : garder les captures d'écran, le texte OCR et les métadonnées à l'abri dans un coffre-fort. Cependant, la pratique montre que le processus frontal de vault, AIXHost.exe, s'exécute sans protections de processus légères, AppContainer ou application de l'intégrité du code.

Cette omission signifie que tout processus d'utilisateur standard peut injecter du code dans AIXHost.exe et détourner les mêmes API COM que l'interface utilisateur légitime. Un outil appelé TotalRecall Reloaded exploite cette faille avec une charge utile de deux fichiers : un injecteur (totalrecall.exe) et une DLL.

## La barre des tâches enfin dotée d'options demandées

Cinq ans après le lancement de Windows 11, Microsoft teste une barre des tâches plus petite et un menu Démarrer plus personnalisable. Les modifications apportées répondent à une plainte de longue date selon laquelle la barre des tâches par défaut est volumineuse et que le menu Démarrer offre une personnalisation limitée.

## À surveiller : la mise à jour de septembre, les outils communautaires et la réponse de Microsoft

La prochaine mise à jour majeure de Windows 11, prévue pour septembre, promet une prise en charge native des fichiers RAR et 7-Zip. Avec StagingTool déjà disponible, les amateurs vont probablement tester cette fonctionnalité des semaines avant le déploiement officiel, ce qui pourrait faire apparaître des bogues ou des régressions de sécurité.

La position officielle de Microsoft, comme indiqué dans un billet de blog précédent du programme Insider, reconnaît que les « Insiders techniques » découvrent des drapeaux désactivés et les activent manuellement. La fuite de StagingTool rend ce processus plus simple et met la pression sur l'entreprise pour resserrer ses canaux de distribution internes.

## La tension plus large entre ouverture et contrôle

Les deux histoires - la fuite de StagingTool et l'injection Recall - mettent en évidence un paradoxe dans la philosophie de développement de Microsoft. D'une part, l'entreprise adopte un modèle d'« innovation continue » qui expédie des modifications incrémentales derrière des drapeaux de fonctionnalités. D'autre part, les mécanismes mêmes qui permettent une itération rapide deviennent des vecteurs d'attaque lorsqu'ils sont exposés.