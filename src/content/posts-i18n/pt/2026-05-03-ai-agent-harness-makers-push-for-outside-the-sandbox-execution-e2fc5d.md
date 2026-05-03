---
title: "Fabricantes de Harness de Agentes de IA Empuram Execução Fora da Sandbox"
date: 2026-05-03T09:26:43.710Z
tags: ["AI","machine learning","software development"]
hero_image: "/hero/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.jpg"
hero_image_credit_name: "Katya Wolf"
hero_image_credit_url: "https://www.pexels.com/@katya-wolf"
visual_keyword: "AI agent harnesses"
description: "Desenvolvedores de harness de agentes de IA, como OmoiOS e Broccoli, argumentam que executar agentes fora da sandbox melhora desempenho e confiabilidade."
sources_count: 6
locale: "pt"
canonical_slug: "2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d"
audio_path: "/audio/2026-05-03-ai-agent-harness-makers-push-for-outside-the-sandbox-execution-e2fc5d.mp3"
audio_bytes: 621759
audio_mime: "audio/mpeg"
---

## O Caso para Execução Fora da Sandbox

Os fabricantes de harness de agentes de IA, como OmoiOS e Broccoli, estão empurrando para execução fora da sandbox. Essa abordagem promete melhorar desempenho e confiabilidade. OmoiOS, um runtime de orquestração de código aberto, transforma especificações em PRs usando enxames de agentes paralelos em sandboxes isoladas.

O sistema OmoiOS inclui um agente supervisor que gerencia mesclas e mantém tudo no trilho. Ele gera especificações baseadas no código existente, construindo um DAG de tarefas com dependências reais. O sistema executa enxames de agentes em sandboxes isoladas até que o trabalho seja feito.

## Implementações Concretas

Broccoli, outro harness de agentes de IA, transforma ingressos Linear em PRs enviados usando Claude e Codex, executando na nuvem do Google. O sistema funciona como dois workloads do Cloud Run sobre um Postgres compartilhado.

Para implantar o Broccoli, os usuários precisam de um projeto do Google Cloud, um aplicativo GitHub e segredos específicos das contas GitHub, Linear, OpenAI e Anthropic. A sequência de implantação começa do zero, explica de onde vêm os valores e chama etapas que ainda precisam ocorrer manualmente por razões de segurança.

## Benefícios e Compromissos

Executar agentes fora da sandbox oferece vários benefícios, incluindo melhor conscientização de dependência, execução paralela e transição estruturada entre tarefas. No entanto, essa abordagem também levanta questões sobre segurança e controle.

Os sistemas OmoiOS e Broccoli abordam essas preocupações por meio de sandboxes isoladas e agentes supervisores. No entanto, os usuários ainda precisam pesar os benefícios e riscos da execução fora da sandbox.

## Uma Visão Mais Aprofundada do OmoiOS

OmoiOS é projetado para automatizar o processo de transformar especificações em PRs. Ele usa um agente supervisor para gerenciar o processo e garantir que tudo permaneça no trilho. O sistema é construído para lidar com tarefas complexas e dependências, tornando-o uma ferramenta poderosa para desenvolvedores.

Uma das principais características do OmoiOS é sua capacidade de gerar especificações baseadas no código existente. Isso permite que os desenvolvedores construam sobre o que já possuem, em vez de começar do zero. O sistema também inclui um DAG de tarefas com dependências reais, o que ajuda a garantir que as tarefas sejam concluídas na ordem correta.

## Arquitetura do Broccoli

A arquitetura do Broccoli é projetada para aproveitar o poder dos agentes de IA. O sistema usa dois workloads do Cloud Run sobre um Postgres compartilhado, o que permite que ele seja escalado e lide com grandes workloads.

O processo de implantação do Broccoli é projetado para ser direto, com instruções claras e um processo de configuração simples. No entanto, os usuários ainda precisam estar atentos às preocupações de segurança e garantir que tenham as permissões e acesso necessários.

## Contexto da Indústria

A pressão por execução fora da sandbox reflete uma tendência mais ampla no desenvolvimento de IA. À medida que os agentes de IA se tornam mais poderosos, os desenvolvedores estão procurando maneiras de escalar seu uso e melhorar sua confiabilidade.

O uso de agentes de IA no desenvolvimento de software, por exemplo, está se tornando cada vez mais popular. Os agentes de IA podem automatizar tarefas, como codificação e teste, liberando desenvolvedores para se concentrar em trabalhos de nível superior.

No entanto, o uso de agentes de IA também levanta questões sobre deslocamento de empregos e a necessidade de novas habilidades. À medida que os agentes de IA se tornam mais prevalentes, os desenvolvedores precisarão se adaptar a novas formas de trabalhar.

## História dos Harness de Agentes de IA

O conceito de harness de agentes de IA existe há vários anos. Implementações iniciais eram frequentemente limitadas por sua capacidade de escalar e lidar com tarefas complexas. No entanto, avanços recentes em IA e aprendizado de máquina tornaram possível construir harness mais poderosos e sofisticados.

OmoiOS e Broccoli são apenas dois exemplos dos muitos harness de agentes de IA atualmente disponíveis. Cada um tem seus próprios pontos fortes e fracos, e os desenvolvedores precisarão avaliar cuidadosamente suas opções antes de escolher um harness.

## Mecânica Técnica

A mecânica técnica dos harness de agentes de IA é complexa e multifacetada. Em alto nível, os harness usam agentes de IA para automatizar tarefas e fluxos de trabalho. No entanto, os detalhes de como isso funciona podem variar amplamente dependendo da implementação.

No caso do OmoiOS, o sistema usa uma combinação de enxames de agentes paralelos e sandboxes isoladas para realizar o trabalho. Essa abordagem permite maior escalabilidade e flexibilidade, ao mesmo tempo em que garante que as tarefas sejam concluídas de forma segura e confiável.

## Implicações a Jusante

O desenvolvimento de harness de agentes de IA tem implicações significativas a jusante. À medida que esses sistemas se tornam mais prevalentes, é provável que tenham um grande impacto na forma como o software é desenvolvido e implantado.

Uma das principais implicações é o potencial de aumento de produtividade. Ao automatizar tarefas e fluxos de trabalho, os desenvolvedores podem se concentrar em trabalhos de nível superior e entregar software mais rapidamente.

No entanto, também há riscos e desafios potenciais associados aos harness de agentes de IA. Por exemplo, há o risco de que esses sistemas possam deslocar trabalhadores humanos ou exacerbar vieses existentes.

## O que Observar

O desenvolvimento de harness de agentes de IA e sua implantação fora da sandbox é uma área a observar. Decisões importantes, como a adoção do OmoiOS e do Broccoli, e ações regulatórias, como diretrizes para desenvolvimento de agentes de IA, moldarão o futuro do uso de agentes de IA.

O próximo ponto de dados a observar é como esses sistemas se comportam em implantações do mundo real. Eles entregarão o que prometem em termos de desempenho e confiabilidade melhorados? Apenas o tempo dirá.

À medida que os agentes de IA se tornam mais prevalentes, é essencial rastrear seu desenvolvimento e implantação. As decisões tomadas agora moldarão o futuro do uso de agentes de IA e seu impacto em indústrias e na sociedade como um todo.

## Desenvolvimentos Futuros

O futuro dos harness de agentes de IA provavelmente será moldado por vários fatores, incluindo avanços em IA e aprendizado de máquina, mudanças em requisitos regulatórios e mudanças na demanda do mercado.

Uma coisa é certa: os harness de agentes de IA estão aqui para ficar. À medida que esses sistemas se tornam mais prevalentes, é essencial entender seus benefícios e riscos potenciais e rastrear seu desenvolvimento e implantação ao longo do tempo.