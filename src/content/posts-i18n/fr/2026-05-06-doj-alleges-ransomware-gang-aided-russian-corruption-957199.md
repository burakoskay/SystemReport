---
title: "Le DOJ allègue qu'un gang de ransomware a aidé la corruption russe"
date: 2026-05-06T21:25:08.167Z
tags: ["cybersecurity","ransomware","api-breach","supply-chain-attack","braintrust"]
hero_image: "/hero/2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199.jpg"
hero_image_credit_name: "Christina Morillo"
hero_image_credit_url: "https://www.pexels.com/@divinetechygirl"
visual_keyword: "cybersecurity breach investigation in a dimly lit server room"
description: "Les procureurs américains accusent un groupe de ransomware d'avoir aidé la corruption gouvernementale russe"
sources_count: 3
locale: "fr"
canonical_slug: "2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199"
---

## Le DOJ dépose une accusation contre un groupe de ransomware lié à l'État russe

Les procureurs américains ont accusé un gang de ransomware d'avoir facilité la corruption du gouvernement russe grâce à des opérations de piratage qui ont détourné des fonds illicites vers des acteurs liés à l'État. L'acte d'accusation, rendu public cette semaine, allègue que le groupe a évité les impôts et esquivé le service militaire tout en profitant d'attaques qui ont exploité des vulnérabilités dans les infrastructures de l'État russe. L'affaire marque un tournant dans la manière dont les gouvernements occidentaux traquent les réseaux de cybercriminels jusqu'aux menaces pour la sécurité nationale.

Le gang, opérant sous un alias non divulgué dans l'acte d'accusation, est accusé de diriger un « schéma de blanchiment d'argent sophistiqué » qui a canalisé les bénéfices du ransomware à travers des sociétés-écrans à Dubaï et aux Îles Vierges britanniques. Les procureurs notent l'utilisation par le groupe d'exploits zero-day précédemment attribués à des unités liées à l'État russe, créant une zone grise juridique qui complique les efforts d'extradition.

## Braintrust ordonne la rotation des clés API après une faille de sécurité dans le cloud

Quelques heures avant l'annonce du DOJ, le startup d'infrastructure d'IA Braintrust a divulgué une faille de sécurité de son environnement Amazon Web Services. Dans un avis aux clients, la société a conseillé à tous les utilisateurs de faire tourner les clés API immédiatement après que les attaquants ont accédé à un système interne gérant les données client. La faille de sécurité a exposé des métadonnées sur les pipelines de formation de modèles d'IA, mais n'a pas inclus un accès direct aux modèles ou aux datasets propriétaires.

L'équipe de sécurité de Braintrust a retracé l'intrusion à un seau S3 mal configuré qui est resté ouvert pendant 17 jours. La société a depuis corrigé la vulnérabilité et initié une audit forensique complète. Les startups utilisant le « système d'exploitation d'ingénierie d'IA » de Braintrust sont maintenant confrontées à une charge opérationnelle urgente pour régénérer les informations d'identification à travers les flux de production.

## Attaque de la chaîne d'approvisionnement d'un mois infecte Daemon Tools

Parallèlement à ces événements, des chercheurs en sécurité ont confirmé une attaque de la chaîne d'approvisionnement contre Daemon Tools, une application d'imagerie de disque utilisée par plus de 15 millions de développeurs. Un logiciel malveillant a été intégré dans une mise à jour logicielle entre le 15 mars et le 15 avril 2024, selon l'analyse de Kaspersky. L'installateur compromis a créé une prise de pied persistante dans les systèmes des victimes à travers un rootkit personnalisé qui a échappé à Windows Defender.

Le vecteur d'attaque a contourné les protocoles de signature de code standard en compromettant une dépendance tierce dans le pipeline de construction. Les chercheurs ont trouvé des preuves liant le logiciel malveillant à la même infrastructure utilisée dans la faille de sécurité de SolarWinds, bien qu'aucun lien direct avec l'affaire du DOJ n'ait été établi. Les utilisateurs sont invités à exécuter des analyses de système complet avec des règles YARA mises à jour.

## La surface d'attaque du risque cybernétique en expansion

Ces trois incidents révèlent une complexité croissante des menaces cybernétiques modernes. L'affaire du DOJ montre comment les groupes criminels peuvent devenir des extensions de facto des intérêts étatiques en exploitant les angles morts géopolitiques. Pendant ce temps, les failles de sécurité de Braintrust et de Daemon Tools mettent en évidence comment les vulnérabilités de la chaîne d'approvisionnement ne sont plus limitées aux logiciels d'entreprise traditionnels, mais affectent maintenant les infrastructures d'IA et les outils de développement.

Le Département de la sécurité intérieure a publié un nouvel avis exhortant les organisations à auditer les dépendances tierces dans les flux de travail d'IA. Les directives appellent spécifiquement l'attention sur les risques de dépendances non corrigées dans les environnements de formation de modèles, où même l'exposition des métadonnées peut permettre des attaques de formation adverses. À mesure que ces cas convergent, la communauté technique est confrontée à un réexamen des modèles de sécurité hérités qui ne peuvent pas résoudre les vecteurs d'attaque modernes.

## Ce à quoi il faut prêter attention

Le DOJ va probablement demander une audience d'extradition à Moscou dans les 45 jours, un mouvement qui pourrait forcer la Russie à répondre aux allégations de cybercriminalité américaines en vertu de la Convention de Budapest. Les clients de Braintrust devraient s'attendre à un rapport de sécurité formel d'ici le 1er mai, qui détaillera les résultats de l'audit forensique et les plans de compensation. Pour les utilisateurs de Daemon Tools, l'étape critique suivante consiste à mettre à jour tous les systèmes avec la dernière version (5.5.2+) publiée aujourd'hui, qui inclut une vérification de signature pour toutes les mises à jour futures.