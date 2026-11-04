# Acessibilidade

O sistema usa controles nativos sempre que possível e primitives Radix para interações compostas. A aparência da Convergência é preservada junto com nomes, foco, relações e estados acessíveis.

## Contratos

- Botões de ícone exigem rótulo. Ícones decorativos são `aria-hidden`.
- Campos têm label e descrições/erros associados. Placeholder é exemplo, nunca nome.
- Tabs usam roving tabindex e painéis associados. SegmentedControl é um grupo de botões pressionáveis.
- Diálogos têm título e descrição, foco contido, Escape e retorno ao trigger. A ancoragem móvel não altera a semântica.
- Menus têm navegação por setas, Escape e retorno de foco. Tooltips aparecem também com foco.
- O shell inclui skip link e main. Rolagem local não deve aprisionar o teclado.
- Status e erros têm texto; não dependem apenas de cor.
- Ações mobile medem ao menos 44 px. Textos longos quebram sem esconder a ação.
- Redução de movimento e cores forçadas são respeitadas.

## Testes e responsabilidade do consumidor

`npm run test:browser` executa axe-core, percursos de teclado, estados e dimensões selecionadas. Regras automatizadas não substituem navegação com leitor de tela, testes com usuários, contraste de imagens, conteúdo do produto ou auditoria completa de conformidade. Não declarar certificação WCAG com base apenas nesses testes.

As variações de texto de aviso e pares de tema escuro são explicadas em `foundations.md`. Valores herdados que permanecem apenas no inventário não são automaticamente aprovados para novos componentes.
