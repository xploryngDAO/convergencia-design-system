# Fundações e detalhes visuais

## Identidade

A Convergência combina superfície fria `#f3f5fc`, papel branco, texto `#28314d`, índigo `#6367c9` e bordas `#e1e5f0`. O resultado deve ter continuidade entre produtos: respiro, cantos suaves, hierarquia discreta, contexto visível e poucas ações competindo por atenção. Não trocar a tipografia por uma fonte de marca externa nem converter todas as superfícies em cartões decorativos.

## Fonte canônica

`tokens/tokens.json` usa tipos e valores do formato DTCG: cores sRGB, dimensões em px, durações em ms, pesos, curvas e sombras. `npm run tokens` gera `src/tokens.css`, `src/tokens/index.ts`, `src/tokens/native.ts` e `src/legacy.css`. Os artefatos gerados são versionados para revisão. O build reproduz esses arquivos deterministicamente.

| Família                                                          | Papel e uso                                                            |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `color.background`                                               | Plano de fundo da aplicação                                            |
| `color.surface` / `surface-subtle`                               | Papel de leitura / agrupamento secundário                              |
| `color.text` / `text-muted`                                      | Leitura principal / metadados e ajuda                                  |
| `color.accent` / `accent-soft` / `accent-text`                   | Ação principal / seleção / texto sobre seleção                         |
| `color.success`, `warning`, `danger`, `rose`                     | Estados com seus pares `*-soft`; sempre acompanhados de texto          |
| `space.s0…s64`                                                   | Escala espacial; múltiplos de 4 predominam, 2/6/10 são ajustes ópticos |
| `radius.small/tab/control/field/panel/hero/pill`                 | 7/9/12/13/18/26/999 px, conforme o papel                               |
| `size.control/touch`                                             | 40 px desktop; 44 px mobile                                            |
| `font.micro/meta/control/body/lead/section/surface/page/display` | 10/12/13/14/16/18/22/28/34 px                                          |
| `motion.fast/normal/slow`                                        | 120/180/300 ms; reduzir movimento desliga animações                    |
| `layout.*`                                                       | Rail 224 px, compacto 88, inspetor 310, diálogo 560, máximo 1580       |

## Tipografia

`Segoe UI Variable`, `Segoe UI`, `system-ui`, `sans-serif`. Não há download de fontes. O fallback depende do sistema operacional e pode alterar métricas; comparar capturas na plataforma alvo antes de prometer igualdade pixel a pixel. Pesos 400, 500 e 600; títulos com entrelinha 1.2 e corpo 1.6–1.8. Metadados de 12 px continuam legíveis. 10 px é reservado à navegação compacta e decoração não essencial.

Títulos de página usam 28 px no desktop e 23 px até 900 px. A fonte de 24 px de `discovery.css` permanece no inventário como papel contextual; não é uma substituição universal de todos os títulos. Campos usam 16 px no celular para evitar zoom indesejado durante a digitação.

## Estados

- Padrão: borda suave e contraste do texto.
- Hover: superfície sutil; não é o único sinal de disponibilidade.
- Foco: contorno de 3 px, offset 3 px, sem remover a indicação de teclado.
- Selecionado: superfície índigo clara e atributo semântico (`aria-pressed`, `aria-current` ou estado da primitive).
- Desabilitado: opacidade 0.42 e controle nativo desabilitado; não aplicar a textos informativos essenciais.
- Carregamento: nome do botão preservado, `aria-busy`, reenvio bloqueado.
- Erro: mensagem associada por `aria-describedby`, `aria-invalid` e instrução de recuperação.
- Vazio/offline: explicação contextual; domínio decide persistência e reconexão.

## Correções documentadas

O `--muted` inicial era `#767e96`; o contrato final `interface-system.css` usa `#65708a`. A biblioteca usa o valor final. Os textos de estado foram escurecidos nos seus fundos suaves: aviso `#927149` → `#80613c`, sucesso `#477c65` → `#3c7059` e erro `#b45454` → `#a14343`. O teste exige 4.5:1 para esses pares. No tema escuro, núcleo e texto secundário seguem `styles.css`/`journey-shell.css`; pares de status foram normalizados e o texto sobre o botão índigo usa fundo escuro. Não reproduzimos a antiga regra que tratava `system` como sempre escuro; o produto escolhe `light`/`dark` a partir de sua preferência de sistema.

## Ícones e retratos

Os 39 SVGs usam viewBox 24×24, sem fill, stroke 1.65 e pontas arredondadas. Tamanhos 16/20/24 conforme contexto. `Icon` é decorativo por padrão; `title` o torna imagem nomeada. `IconButton` exige um nome independente.

MiniAvs são parte da identidade visual do produto, mas seus arquivos não estão incluídos nesta distribuição. `Avatar` e `AgentCard` aceitam `src`, mostram iniciais quando não há imagem e mantêm o nome acessível. O produto fornece os retratos autorizados.

## Elevação e movimento

Sombra de cartão é discreta; bordas definem separação mesmo sem sombra. Menus e diálogos usam elevação flutuante. Modais têm overlay e foco contido. Transições orientam, não bloqueiam; respeitar `prefers-reduced-motion` e cores forçadas. Nenhum estado deve depender só de cor, animação ou hover.

Referências técnicas: [DTCG](https://www.designtokens.org/tr/2025.10/format/) e [Storybook](https://storybook.js.org/docs/). Os contratos visuais vêm do SuperJarvis, não dessas ferramentas.
