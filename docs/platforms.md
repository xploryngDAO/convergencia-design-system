# Plataformas e comportamento responsivo

## Web React

Biblioteca ESM para React 18.3/19, com declarações TypeScript. Componentes interativos usam estado local ou callbacks controlados pelo consumidor. Menus, tooltips, abas e diálogos usam Radix. A biblioteca não usa router, fetch de dados do produto ou localStorage. `DesignSystemProvider` transmite o tema aos portais.

Em aplicações com React Server Components, coloque os componentes interativos em um módulo cliente (`'use client'`) e importe o CSS no layout permitido pelo framework. Não importar a biblioteca interativa diretamente em um Server Component.

## Web sem React

Tokens e classes funcionam independentemente de React. Elementos nativos — botão, input, select, details, progress — mantêm comportamento nativo. Diálogo, menu e tabs exigem implementação de foco, teclado e ARIA. Não anunciar paridade de comportamento apenas por aplicar classes.

## Expo / React Native

`nativeTokens` exporta cores como valores hexadecimais e dimensões como números em pixels lógicos. O adaptador é intencionalmente de valores; não fornece componentes React Native nem prova de execução em aparelho. Consulte [exemplo](../examples/native/tokens.ts).

Fontes precisam de mapeamento por plataforma; `Segoe UI` não é instalada pela biblioteca. Sombras devem ser convertidas para a API suportada; não passar uma string CSS `box-shadow` a StyleSheet. Safe areas usam APIs nativas. Contraste, dimensão, ordem de foco e navegação precisam ser verificados no app real.

## Larguras e rolagem

| Faixa       | Comportamento                                              |
| ----------- | ---------------------------------------------------------- |
| >1100 px    | Rail de 224 px, leitura e inspetor contextual de 310 px    |
| 901–1100 px | Rail mantido; inspetor abre em painel pelo botão Agente    |
| ≤900 px     | Rail oculto, dock inferior, conteúdo ocupa a largura       |
| ≤600 px     | Diálogo embaixo, largura total, safe area, controles 44 px |

O shell ocupa `100dvh`; a área principal possui sua rolagem. Não usar `overflow:hidden` para mascarar conteúdo inacessível. Tabelas e carrosséis usam rolagem local. Diálogos limitam a altura e mantêm cabeçalho/ações separados da leitura. Paisagem com pouca altura precisa ser validada, assim como a abertura do teclado virtual.

## Limites de comprovação

Os testes automatizados usam Chromium emulado; não equivalem a Safari, Firefox, leitor de tela real ou aparelho Android/iOS físico. Compare a fonte de sistema e o viewport efetivo na plataforma alvo antes da distribuição do produto.
