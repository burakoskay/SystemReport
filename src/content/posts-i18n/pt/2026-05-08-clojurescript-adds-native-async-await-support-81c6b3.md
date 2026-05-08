---
title: "ClojureScript adiciona suporte nativo a async/await"
date: 2026-05-08T14:16:34.187Z
tags: ["clojurescript","async","javascript"]
hero_image: "/hero/2026-05-08-clojurescript-adds-native-async-await-support-81c6b3.jpg"
hero_image_credit_name: "Stanislav Kondratiev"
hero_image_credit_url: "https://www.pexels.com/@technobulka"
visual_keyword: "developer typing async await code in a modern code editor"
description: "Lançamento de 7 de maio do ClojureScript traz sintaxe async/await, aproximando a interoperabilidade com JavaScript e redefinindo código assíncrono para entusias"
sources_count: 5
locale: "pt"
canonical_slug: "2026-05-08-clojurescript-adds-native-async-await-support-81c6b3"
---

O ClojureScript finalmente fala a linguagem do JavaScript moderno: async/await. O novo lançamento, postado na página oficial de notícias do ClojureScript em 7 de maio de 2026, adiciona sintaxe nativa para funções assíncronas. Desenvolvedores agora podem escrever `async (fn [] …)` e chamadas `await` sem precisar cair em promessas brutas, uma mudança que parece imediata no dia-a-dia de codificação.

O anúncio está disponível em https://clojurescript.org/news/2026-05-07-release e obteve 149 pontos no Hacker News, com 41 comentários iniciando um debate acalorado. A equipe central enquadrou a adição como uma resposta à demanda crescente por uma interoperabilidade mais suave com bibliotecas JavaScript que já dependem de async/await. Nenhum número de versão é fornecido no post, mas o URL deixa a data clara, e a comunidade já começou a testar o recurso em projetos reais.

## Como async/await muda o código ClojureScript

Antes dessa mudança, desenvolvedores ClojureScript envolviam chamadas assíncronas JavaScript em objetos `js/Promise` e usavam cadeias `.then` ou canais `core.async` para gerenciar o fluxo. Esses padrões funcionam, mas adicionam burocracia e obscurecem a intenção. Com async/await nativo, um simples `await (js/fetch url)` substitui uma cadeia de promessas multi-etapa, tornando o código legível como Clojure síncrono enquanto preserva o comportamento não bloqueador.

A sintaxe se integra limpa com macros Clojure existentes. Um bloco `async` é apenas outra macro que se expande para uma função assíncrona JavaScript por baixo. Como o ClojureScript já compila para JavaScript, a transformação é direta: o compilador emite definições de função assíncrona e insere `await` onde a macro sinaliza. Isso significa que nenhum novo tempo de execução é introduzido; o recurso se apoia no suporte interno do mecanismo JavaScript.

## Benefícios imediatos para o desenvolvimento diário

De um ponto de vista prático, a nova sintaxe reduz a sobrecarga mental de gerenciar callbacks. Um componente típico de busca de dados em um aplicativo Reagent pode agora parecer uma definição `defn` Clojure simples que declara `async` e usa `await` dentro. O resultado são arquivos mais curtos, tratamento de erros mais claro com `try/catch` e depuração mais fácil porque rastros de pilha mapeiam diretamente para o código-fonte ClojureScript original.

Em termos de desempenho, não há penalidade mensurável. O código compilado ainda é executado como funções assíncronas JavaScript nativas, que os mecanismos modernos V8 e SpiderMonkey otimizam agressivamente. Desenvolvedores que se importam com a latência podem continuar usando `core.async` para controle refinado, mas o caminho padrão para a maioria das chamadas HTTP se torna a rota async/await mais enxuta.

## Reação da comunidade e pontos de discórdia

O tópico do Hacker News revela uma divisão. Alguns comentaristas elogiam a mudança como "longa data" e apontam que a sintaxe alinha o ClojureScript com o resto do ecossistema JavaScript, reduzindo a curva de aprendizado para recém-chegados. Outros se preocupam com "crepúsculo semântico": introduzir outra maneira de lidar com assincronia pode fragmentar bases de código que já dependem fortemente de `core.async`.

Uma preocupação recorrente é a ferramenta. IDEs e linters que entendem ClojureScript precisam de atualizações para reconhecer as novas formas de macro. A comunidade já abriu solicitações de pull para o linter popular `clj-kondo`, mas o suporte total pode atrasar o lançamento. Até que as ferramentas sejam atualizadas, os desenvolvedores podem ver positivos falsos ou perder a conclusão automática, um ponto de atrito que a equipe central precisará abordar.

## Como isso se encaixa no cenário de linguagem maior

Async/await não é novo no mundo JavaScript; ele chegou em ES2017 e desde então se tornou o padrão de facto para código assíncrono. Linguagens que compilam para JavaScript, como TypeScript e ReasonML, adotaram a sintaxe precocemente. A adição do ClojureScript o traz em linha com aqueles pares, eliminando uma lacuna de interoperabilidade de longa data.

Outras linguagens exploraram o rastreamento automático de dependência, como discutido em um tópico recente do Stack Exchange sobre variáveis de atualização automática. Embora o ClojureScript não vise se tornar uma linguagem de fluxo de dados, o recurso async/await compartilha o espírito de reduzir a burocracia e deixar o tempo de execução lidar com a propagação. Ele também espelha a tendência em direção a padrões assíncronos declarativos vistos em Rust's `async/.await` e Python's `asyncio`, reforçando a ideia de que linguagens de programação modernas convergem em abstrações semelhantes para concorrência.

## O que observar em seguida

O próximo marco é a curva de adoção. Observe os lançamentos futuros das principais ferramentas ClojureScript — Shadow-CLJS, Figwheel e o compilador oficial — para suporte atualizado da macro async. Preste atenção às primeiras bibliotecas do mundo real que publicam APIs baseadas em async/await; seu sucesso sinalizará se a comunidade adota o novo padrão ou permanece com `core.async`. Por fim, fique de olho nos comentários do Hacker News como um barômetro: se o debate se estabelecer em dicas práticas em vez de objeções, async/await pode se tornar o modelo assíncrono padrão para desenvolvedores ClojureScript.