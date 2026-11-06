# Convergência Design System

A linguagem visual comum: tokens, componentes e blocos para as superfícies da Convergência.

[Plano de controle](https://github.com/xploryngDAO/convergencia-kit) · [BOM](https://github.com/xploryngDAO/convergencia-kit/blob/main/convergencia.bom.json) · [Contrato para agentes](AGENTS.md) · [Padrão de documentação](https://github.com/xploryngDAO/convergencia-docs)

## Interface

O design system em uso: o console de referência e o catálogo de tokens.

| Console de referência | Catálogo no Storybook |
| :---: | :---: |
| <img src="docs/images/console-desktop.png" alt="Sala de operações do agente com turno, aprovação e cockpit" width="520" /> | <img src="docs/images/storybook.png" alt="Catálogo de cores semânticas no Storybook" width="520" /> |
| Turno, aprovação, cockpit, evidência e launcher. | Tokens, tipografia, estados e fundações. |

<sub>Capturas reais do build 0.5.3 — console em 1440px e Storybook de tokens.</sub>

## O que é

O Design System reúne a identidade visual do ecossistema: cores, tipografia, espaçamento, componentes e blocos prontos para as telas de produto.

Ele é a referência para que Personia, SuperJarvis, apps e próximos projetos pareçam ter vindo do mesmo lugar.

## Por que existe

- 101 tokens com fonte única;
- 60 componentes tipados;
- 19 blocos de domínio para aprovação, custo, confiança, evidência, pacote e superfícies;
- tema claro e escuro, acessibilidade e testes.

## Como começar

```bash
npm install https://github.com/xploryngDAO/convergencia-design-system/releases/download/v0.5.3/xploryng-convergencia-0.5.3.tgz
npm run build
npm test
npm run storybook
```

## O que tem dentro

- tokens para web e nativo;
- átomos, campos, navegação, feedback e padrões;
- blocos de domínio registrados para agentes;
- Storybook e exemplos de adoção.

## Storybook

O catálogo está publicado como artefato da release `v0.5.3`
(`storybook-static-0.5.3.zip`). Baixe, extraia e sirva localmente; a hospedagem
pública foi desativada pela privatização do repositório.

## Como se conecta

É consumido pelas interfaces dos produtos e pelo console do consumidor de referência.

## Estado

- Truth class: `contract-spec`
- Versão: `0.5.3`
- Release: `v0.5.3` com digest verificado
- Realidade: publicado e privado
- Pendência: Storybook público desativado pela privatização; hospedar artefato interno.

## Licença

MIT.
