# Cobertura e fronteiras

| Camada               | Entrega                                                                              | Como verificar                             |
| -------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------ |
| Fonte                | 26 CSS, 8.848 regras, 124 declarações de custom properties, 72 condições responsivas | Inventário e hashes                        |
| Tokens               | 101 valores tipados, temas, CSS e adaptação nativa                                   | `tokens/tokens.json`, geração e testes     |
| Átomos e composições | 60 exportações visuais com contrato                                                  | `component-registry.json`, tipos e stories |
| Ícones               | 39 SVGs de origem                                                                    | `src/icons/paths.ts`, galeria visual       |
| Templates            | 7 jornadas demonstrativas                                                            | `stories/Templates.stories.tsx`            |
| Integração           | React, HTML/CSS e tokens nativos                                                     | Exemplos e guia                            |
| Adoção               | Preparada, adiada pelo proprietário                                                  | Nenhum consumidor migrado                  |

## Regras de produto preservadas como referência

O inventário registra também cenas World, galáxia Brain, editores, janelas de computador, estúdio de agentes e ajustes contextuais de cada app. Essas regras são específicas da composição e do domínio. A biblioteca fornece primitivas como `CanvasNode`, `AgentRoster`, `AppShell`, `Message`, `DataTable` e `ApprovalCard`; não inclui um motor 3D, um editor de grafos completo, um filesystem, um provedor de IA ou os apps de domínio.

Não é correto medir cobertura como “8.848 componentes”: são regras CSS, com overrides e condições. O registro separa os componentes reutilizáveis da referência integral, evitando transformar cada seletor histórico em uma API permanente.

## Critério para ampliar

Um novo padrão compartilhado exige: origem ou necessidade concreta, ao menos um consumidor, anatomia, estados, comportamento responsivo, acessibilidade, API, story, validação e versão. Estilos que só fazem sentido no produto permanecem no produto e consomem os tokens comuns.
