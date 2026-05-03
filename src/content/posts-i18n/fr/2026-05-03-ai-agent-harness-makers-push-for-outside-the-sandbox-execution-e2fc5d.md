---
title: "Les créateurs de harnais d'agents IA poussent pour une exécution hors sandbox"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Les développeurs de harnais d'agents IA, comme OmoiOS et Broccoli, argumentent que l'exécution d'agents hors sandbox améliore les performances et la fiabilité."
sources_count: 6
locale: "fr"
canonical_slug: "2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---

## Le cas de l'exécution hors sandbox

Les créateurs de harnais d'agents IA, tels que OmoiOS et Broccoli, poussent pour une exécution hors sandbox. Cette approche promet des performances et une fiabilité améliorées. OmoiOS, un runtime d'orchestration open-source, transforme les spécifications en PR en utilisant des essaims d'agents parallèles dans des sandbox isolés.

Le système OmoiOS comprend un agent de supervision qui gère les fusions et maintient tout sous contrôle. Il génère des spécifications ancrées dans le codebase existant, créant un DAG de tâches avec des dépendances réelles. Le système exécute des essaims d'agents sur des sandbox isolés jusqu'à ce que le travail soit terminé.

## Implémentations concrètes

Broccoli, un autre harnais d'agents IA, transforme les tickets Linear en PR expédiés alimentés par Claude et Codex, exécutés sur Google Cloud. Le système fonctionne comme deux charges de travail Cloud Run sur une base de données Postgres partagée.

Pour déployer Broccoli, les utilisateurs ont besoin d'un projet Google Cloud, d'une application GitHub et de secrets spécifiques provenant des comptes GitHub, Linear, OpenAI et Anthropic. La séquence de déploiement commence à partir de zéro, explique d'où viennent les valeurs et appelle les étapes qui doivent encore être effectuées manuellement pour des raisons de sécurité.

## Avantages et compromis

L'exécution d'agents hors sandbox offre plusieurs avantages, notamment une meilleure prise en compte des dépendances, une exécution parallèle et une passation structurée entre les tâches. Cependant, cette approche soulève également des questions sur la sécurité et le contrôle.

Les systèmes OmoiOS et Broccoli répondent à ces préoccupations grâce à des sandbox isolés et des agents de supervision. Cependant, les utilisateurs doivent encore peser les avantages et les risques de l'exécution hors sandbox.

## Un regard plus approfondi sur OmoiOS

OmoiOS est conçu pour automatiser le processus de transformation des spécifications en PR. Il utilise un agent de supervision pour gérer le processus et garantir que tout reste sous contrôle. Le système est conçu pour gérer des tâches complexes et des dépendances, ce qui en fait un outil puissant pour les développeurs.

L'une des caractéristiques clés d'OmoiOS est sa capacité à générer des spécifications ancrées dans le codebase existant. Cela permet aux développeurs de s'appuyer sur ce qu'ils ont déjà, plutôt que de repartir à zéro. Le système comprend également un DAG de tâches avec des dépendances réelles, ce qui aide à garantir que les tâches sont terminées dans l'ordre correct.

## Architecture de Broccoli

L'architecture de Broccoli est conçue pour tirer parti de la puissance des agents IA. Le système utilise deux charges de travail Cloud Run sur une base de données Postgres partagée, ce qui lui permet de s'adapter et de gérer de lourdes charges de travail.

Le processus de déploiement de Broccoli est conçu pour être simple, avec des instructions claires et un processus de configuration simple. Cependant, les utilisateurs doivent encore être conscients des préoccupations de sécurité et garantir qu'ils disposent des autorisations et de l'accès nécessaires.

## Contexte industriel

La poussée pour une exécution hors sandbox reflète une tendance plus large dans le développement de l'IA. À mesure que les agents IA deviennent plus puissants, les développeurs recherchent des moyens de mettre à l'échelle leur utilisation et d'améliorer leur fiabilité.

L'utilisation d'agents IA dans le développement de logiciels, par exemple, devient de plus en plus populaire. Les agents IA peuvent automatiser des tâches, telles que la programmation et les tests, libérant les développeurs pour se concentrer sur des travaux de niveau supérieur.

Cependant, l'utilisation d'agents IA soulève également des questions sur le déplacement d'emplois et la nécessité de nouvelles compétences. À mesure que les agents IA deviennent plus répandus, les développeurs devront s'adapter à de nouvelles façons de travailler.

## Histoire des harnais d'agents IA

Le concept de harnais d'agents IA existe depuis plusieurs années. Les premières implémentations étaient souvent limitées par leur capacité à s'adapter et à gérer des tâches complexes. Cependant, les progrès récents de l'IA et de l'apprentissage automatique ont permis de créer des harnais plus puissants et plus sophistiqués.

OmoiOS et Broccoli ne sont que deux exemples des nombreux harnais d'agents IA actuellement disponibles. Chacun a ses propres forces et faiblesses, et les développeurs devront évaluer soigneusement leurs options avant de choisir un harnais.

## Mécaniques techniques

Les mécaniques techniques des harnais d'agents IA sont complexes et multiformes. À un niveau élevé, les harnais utilisent des agents IA pour automatiser des tâches et des flux de travail. Cependant, les spécificités de la façon dont cela fonctionne peuvent varier considérablement en fonction de l'implémentation.

Dans le cas d'OmoiOS, le système utilise une combinaison d'essaims d'agents parallèles et de sandbox isolés pour effectuer le travail. Cette approche permet une plus grande évolutivité et une plus grande flexibilité, tout en garantissant que les tâches sont terminées de manière sécurisée et fiable.

## Implications en aval

Le développement de harnais d'agents IA a des implications importantes en aval. À mesure que ces systèmes deviennent plus répandus, ils sont susceptibles d'avoir un impact majeur sur la façon dont les logiciels sont développés et déployés.

L'une des implications clés est le potentiel d'augmentation de la productivité. En automatisant les tâches et les flux de travail, les développeurs peuvent se concentrer sur des travaux de niveau supérieur et livrer des logiciels plus rapidement.

Cependant, il existe également des risques et des défis potentiels associés aux harnais d'agents IA. Par exemple, il existe un risque que ces systèmes puissent déplacer les travailleurs humains ou exacerber les biais existants.

## À surveiller

Le développement de harnais d'agents IA et leur déploiement hors sandbox est un domaine à surveiller. Les décisions clés, telles que l'adoption d'OmoiOS et de Broccoli, et les actions réglementaires, telles que les lignes directrices pour le développement d'agents IA, façonneront l'avenir de l'utilisation d'agents IA.

Le prochain point de données à surveiller est la façon dont ces systèmes fonctionnent dans les déploiements réels. Vont-ils tenir leurs promesses d'amélioration des performances et de la fiabilité ? Seul le temps le dira.

À mesure que les agents IA deviennent plus répandus, il est essentiel de suivre leur développement et leur déploiement. Les décisions prises maintenant façonneront l'avenir de l'utilisation d'agents IA et son impact sur les industries et la société dans son ensemble.

## Développements futurs

L'avenir des harnais d'agents IA sera probablement façonné par un certain nombre de facteurs, notamment les progrès de l'IA et de l'apprentissage automatique, les changements dans les exigences réglementaires et les changements dans la demande du marché.

Une chose est certaine : les harnais d'agents IA sont là pour rester. À mesure que ces systèmes deviennent plus répandus, il est essentiel de comprendre leurs avantages et leurs risques potentiels, et de suivre leur développement et leur déploiement au fil du temps.