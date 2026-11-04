# Validação da v0.1.0

Data: 04/11/2026. Plataforma local: Windows, Node 24, Chrome via Playwright.

| Verificação  | Resultado                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------- |
| TypeScript   | Biblioteca, configuração e stories aprovados                                                                     |
| Formatação   | Fonte, exemplos e documentação padronizados com Prettier                                                         |
| Contratos    | 6 testes aprovados: tokens, contraste, registro, origem, exports e aliases inválidos                             |
| Navegador    | 87 testes aprovados; zero falhas, ignorados ou flaky na execução final                                           |
| Componentes  | 60 stories padrão renderizadas e verificadas com axe-core                                                        |
| Layout       | Home em 320, 393, 844 e 1440 px, temas claro/escuro; 844×390 cobre paisagem baixa                                |
| Templates    | Projetos, conversa, materiais, Canvas, agenda e offline em 320 e 1440 px                                         |
| Interações   | Criação/busca, envio de mensagem, abas por teclado, foco de diálogo, Escape, tema de portal e movimento reduzido |
| Distribuição | Pacote instalado em consumidor temporário independente; 60 exports, SSR React, CSS e tokens nativos verificados  |
| Catálogo     | 111 exemplos de estado/composição e 64 páginas de documentação geradas                                           |

Capturas revisadas: [desktop](images/home-desktop.png) e [mobile](images/home-mobile.png).

O relatório detalhado de cada execução de CI fica nos artefatos `browser-evidence` do GitHub Actions. O workflow valida antes de publicar o Storybook. O catálogo permite executar a verificação de acessibilidade manualmente; os testes Playwright a executam automaticamente, evitando duas execuções simultâneas do axe na mesma página.

## Limites

- Emulação Chromium não prova comportamento em aparelho físico, Safari, Firefox ou leitor de tela real.
- Axe-core cobre regras automatizáveis; não constitui certificação integral de acessibilidade.
- A inspeção de origem é local e inclui alterações ainda não publicadas no SuperJarvis.
- O inventário preserva estilos específicos de domínio; não são todos APIs públicas da biblioteca.
- Tokens nativos foram verificados como exports e valores, sem alegação de componentes React Native testados.
- Nenhum projeto atual foi migrado; a adoção foi adiada pelo proprietário.
