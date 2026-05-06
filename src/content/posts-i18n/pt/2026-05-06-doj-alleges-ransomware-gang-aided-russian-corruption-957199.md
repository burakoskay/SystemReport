---
title: "DOJ Alega que Gangue de Ransomware Ajudou Corrupção Russa"
date: 2026-05-06T21:25:08.167Z
tags: ["cybersecurity","ransomware","api-breach","supply-chain-attack","braintrust"]
hero_image: "/hero/2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199.jpg"
hero_image_credit_name: "Christina Morillo"
hero_image_credit_url: "https://www.pexels.com/@divinetechygirl"
visual_keyword: "cybersecurity breach investigation in a dimly lit server room"
description: "Promotores americanos acusam grupo de ransomware de ajudar corrupção russa"
sources_count: 3
locale: "pt"
canonical_slug: "2026-05-06-doj-alleges-ransomware-gang-aided-russian-corruption-957199"
---

## DOJ Arquiva Indiciamento Contra Grupo de Ransomware Ligado ao Estado Russo

Promotores americanos acusaram um grupo de ransomware de possibilitar a corrupção do governo russo por meio de operações de hacking que desviaram fundos ilícitos para atores ligados ao Estado. A denúncia, desentranhada esta semana, alega que o grupo evitou impostos e se esquivou do serviço militar enquanto lucrava com ataques que exploravam vulnerabilidades na infraestrutura estatal russa. O caso marca uma mudança na forma como os governos ocidentais rastreiam redes cibernéticas criminosas a ameaças à segurança nacional.

O grupo, operando sob um pseudônimo retido na denúncia, é acusado de executar um 'esquema de lavagem de dinheiro sofisticado' que canalizou os rendimentos do ransomware por meio de empresas de fachada em Dubai e nas Ilhas Virgens Britânicas. Os promotores observam o uso do grupo de exploits de zero-day anteriormente atribuídos a unidades ligadas ao Estado russo, criando uma área cinzenta legal que complica os esforços de extradição.

## Braintrust Ordena Rotação de Chave de API Após Violação de Nuvem

Horas antes do anúncio do DOJ, a startup de infraestrutura de IA Braintrust divulgou uma violação de seu ambiente da Amazon Web Services. Em um comunicado ao cliente, a empresa aconselhou todos os usuários a rotacionar as chaves de API imediatamente após os atacantes acessarem um sistema interno que lidava com dados de cliente. O comprometimento expôs metadados sobre pipelines de treinamento de modelos de IA, mas não incluiu acesso direto a modelos ou conjuntos de dados proprietários.

A equipe de segurança da Braintrust rastreou a intrusão a um balde S3 mal configurado que permaneceu aberto por 17 dias. A empresa desde então corrigiu a vulnerabilidade e iniciou uma auditoria forense completa. As startups que usam o 'sistema operacional de engenharia de IA' da Braintrust agora enfrentam uma sobrecarga operacional urgente para regenerar credenciais em fluxos de trabalho de produção.

## Ataque de Suprimento de Mês Infecta Daemon Tools

Paralelamente a esses eventos, pesquisadores de segurança confirmaram um ataque de suprimento de cadeia contra o Daemon Tools, um aplicativo de imagem de disco usado por mais de 15 milhões de desenvolvedores. Malware foi incorporado a uma atualização de software entre 15 de março e 15 de abril de 2024, de acordo com a análise da Kaspersky. O instalador backdoored criou um ponto de apoio persistente nos sistemas das vítimas por meio de um rootkit personalizado que evitou o Windows Defender.

O vetor de ataque bypassou protocolos padrão de assinatura de código, comprometendo uma dependência de terceiros na pipeline de build. Os pesquisadores encontraram evidências que ligam o malware à mesma infraestrutura usada na violação do SolarWinds, embora nenhuma conexão direta com o caso do DOJ tenha sido estabelecida. Os usuários são aconselhados a executar varreduras de sistema completas com regras YARA atualizadas.

## A Superfície Expansiva do Risco Cibernético

Esses três incidentes revelam uma complexidade profunda em ameaças cibernéticas modernas. O caso do DOJ demonstra como grupos criminosos podem se tornar extensões de facto de interesses estatais, explorando pontos cegos geopolíticos. Enquanto isso, as violações da Braintrust e do Daemon Tools destacam como vulnerabilidades de suprimento de cadeia não estão mais limitadas a software de empresa tradicional, mas agora afetam infraestrutura de IA e ferramentas de desenvolvedor.

O Departamento de Segurança Nacional emitiu um novo comunicado, aconselhando organizações a auditar dependências de terceiros em fluxos de trabalho de IA. A orientação específica chama a atenção para os riscos de dependências não corrigidas em ambientes de treinamento de modelo, onde mesmo a exposição de metadados pode habilitar ataques de treinamento adversarial. À medida que esses casos convergem, a comunidade técnica enfrenta um ajuste de contas com modelos de segurança legados que não podem lidar com vetores de ataque modernos.

## O Que Observar

O DOJ provavelmente solicitará uma audiência de extradição em Moscou dentro de 45 dias, um movimento que poderia forçar a Rússia a responder a alegações americanas de cibercrime sob a Convenção de Budapeste. Os clientes da Braintrust devem esperar um relatório de segurança formal até 1º de maio, que detalhará descobertas forenses e planos de compensação. Para os usuários do Daemon Tools, a próxima etapa crítica é atualizar todos os sistemas com a última compilação (5.5.2+) lançada hoje, que inclui verificação de assinatura para todas as atualizações futuras.