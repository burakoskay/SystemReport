---
title: "Microsoft vaza ferramenta interna, expondo recursos do Windows 11"
date: 2026-05-18T18:07:07.084Z
tags: ["windows","security","features"]
hero_image: "/hero/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.jpg"
hero_image_credit_name: "Edward Jenner"
hero_image_credit_url: "https://www.pexels.com/@edward-jenner"
visual_keyword: "Windows 11 taskbar with hidden feature toggle overlay"
description: "Vazamento de StagingTool e vulnerabilidade no Recall dão aos usuários avançados e atacantes acesso a recursos internos do Windows 11, enquanto o SO finalmente r"
sources_count: 5
locale: "pt"
canonical_slug: "2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce"
audio_path: "/audio/2026-05-18-microsoft-leaks-internal-tool-exposing-windows-11-features-f107ce.mp3"
audio_bytes: 577037
audio_mime: "audio/mpeg"
---

A liberação acidental pela Microsoft de sua ferramenta interna StagingTool deu aos usuários avançados do Windows uma chave direta para recursos ocultos do Windows 11, expondo tanto a opacidade do desenvolvimento da empresa quanto um ponto cego de segurança mais amplo.

A ferramenta surgiu em uma "busca de bug" no Feedback Hub na quarta-feira, apenas para ser removida horas depois que membros da comunidade começaram a compartilhá-la. O StagingTool é um aplicativo de linha de comando que alterna IDs de recursos, permitindo que qualquer pessoa contorne o teste A/B da Microsoft e habilite funcionalidades não lançadas em compilações de pré-visualização do Insider. O vazamento espelha a ferramenta ViveTool de terceiros de longa data, mas usa o próprio sistema de bandeiras da Microsoft. O momento é notável: a Microsoft sugeriu uma atualização de setembro que adicionará suporte nativo para arquivos RAR e 7-Zip, e a comunidade agora tem um atalho para testar essas e outras "Momentos" não nomeadas antes de serem anunciadas publicamente.

## Uma vulnerabilidade no Recall que permite que qualquer usuário extraia suas capturas de tela

Quando a Microsoft reconstruiu a linha do tempo do Recall com enclaves VBS, criptografia AES-256-GCM e autenticação do Windows Hello, a intenção era clara: manter as capturas de tela capturadas, texto OCR e metadados selados dentro de um cofre. Na prática, o processo de front-end do cofre, AIXHost.exe, é executado sem proteção de processo leve, AppContainer ou aplicação de integridade de código. Essa omissão significa que qualquer processo de usuário padrão pode injetar código no AIXHost.exe e sequestrar as mesmas APIs COM que a interface legítima usa.

O TotalRecall Reloaded explora essa lacuna com uma carga de dois arquivos: um injetor (totalrecall.exe) e uma DLL. O injetor captura a lista de processos, aloca memória no AIXHost.exe, grava o caminho da DLL e cria um thread remoto que chama LoadLibraryW - injeção clássica de DLL, sem exploit de kernel, sem direitos de administrador. Como a DACL padrão do Windows concede acesso total a processos de mesmo usuário, o ataque funciona em um nível obrigatório médio com BUILTIN\Administrators definido como apenas negar. A carga útil então inicializa um apartamento COM, oculta sua identidade e percorre o mesmo caminho de descriptografia que a interface legítima segue, puxando capturas de tela descriptografadas e dados OCR como objetos COM ativos.

Do ponto de vista de segurança, a falha é inquietante. O enclave ainda requer um gesto do Windows Hello, então a ferramenta não ignora a autenticação; ela simplesmente acompanha uma vez que o usuário autenticou. No entanto, o fato de um usuário padrão poder extrair silenciosamente semanas de atividade sem elevação significa que qualquer conta comprometida - seja por phishing ou por um insider mal-intencionado - pode colher um tesouro de dados visuais potencialmente sensíveis. As empresas que dependem do Recall do Windows 11 para conformidade ou registro forense agora enfrentam uma superfície de ataque que ignora as defesas tradicionais de escalada de privilégios.

## A barra de tarefas finalmente ganha as opções que os usuários exigiram

Cinco anos após o lançamento do Windows 11, a Microsoft está testando uma barra de tarefas menor e um menu Iniciar mais personalizável. As alterações abordam uma reclamação de longa data de que a barra de tarefas padrão parece volumosa e que o menu Iniciar oferece personalização limitada. Compilações iniciais mostram uma linha de ícones condensada e a capacidade de fixar ou desfixar itens com granularidade mais fina, aproximando a interface do usuário da flexibilidade que os usuários desfrutavam no Windows 10.

Embora o ajuste possa parecer cosmético, ele tem implicações práticas para usuários avançados que gerenciam dezenas de janelas em vários monitores. Uma barra de tarefas mais fina libera espaço de tela, especialmente em laptops com alta DPI, e os controles adicionais do menu Iniciar reduzem a necessidade de alcançar as Configurações ou lançadores de terceiros. A mudança também sinaliza que a Microsoft está ouvindo o ciclo de feedback da comunidade, que foi amplificado por ferramentas como o StagingTool que expõem experimentos de interface ocultos.

## O que observar: atualização de setembro, ferramentas de comunidade e resposta da Microsoft

A próxima grande atualização do Windows 11, prevista para setembro, promete manipulação nativa de RAR e 7-Zip - recursos que tradicionalmente exigiram instaladores de terceiros. Com o StagingTool já disponível, os entusiastas provavelmente testarão essa funcionalidade semanas antes do lançamento oficial, potencialmente descobrindo bugs ou regressões de segurança antes do tempo. Monitorar os repositórios GitHub da comunidade para novas submissões de ID de recurso dará uma prévia do que a Microsoft planeja enviar.

A postura oficial da Microsoft, conforme observado em uma postagem anterior do blog do Programa Insider, reconhece que "Insiders técnicos" descobrem bandeiras desativadas e as habilitam manualmente. O vazamento do StagingTool torna esse processo mais direto e coloca pressão na empresa para apertar seus canais de distribuição interna. Futuros eventos de "busca de bug" podem ver uma verificação mais rigorosa de links internos, e podemos ver a Microsoft responder com sua própria utilidade sancionada de alternância de recursos ou salvaguardas de teste A/B mais rigorosas. Para as empresas, a combinação de um caminho de extração Recall e uma ferramenta de alternância de recursos compartilhada publicamente destaca a necessidade de monitoramento rigoroso de endpoint e aplicação de políticas à medida que o Windows 11 continua a evoluir.

## A tensão mais ampla entre abertura e controle

As duas histórias - o vazamento do StagingTool e a injeção Recall - destacam um paradoxo na filosofia de desenvolvimento da Microsoft. Por um lado, a empresa adota um modelo de "inovação contínua" que envia alterações incrementais atrás de bandeiras de recursos. Por outro lado, os próprios mecanismos que permitem a iteração rápida se tornam vetores de ataque quando expostos. Os usuários avançados apreciam a capacidade de espiar por trás da cortina, mas essa curiosidade pode inadvertidamente enfraquecer a postura de segurança da plataforma.

Se a Microsoft quiser preservar os benefícios da agilidade de bandeiras de recursos sem entregar as chaves, ela precisará endurecer os processos que expõem essas bandeiras. Isso pode significar adicionar proteções PPL ou AppContainer a hosts de interface do usuário como AIXHost.exe, ou criptografar mapeamentos de ID de recurso de uma maneira que apenas ferramentas internas assinadas possam ler. Até lá, a comunidade continuará a caminhar na linha entre o ajuste produtivo e a exposição explorável, e toda ferramenta vazada ou vulnerabilidade descoberta mudará o equilíbrio.