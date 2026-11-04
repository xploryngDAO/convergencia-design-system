# ADR-001: biblioteca compartilhada com Convergência como referência

Status: aceita para a biblioteca. Adoção nos produtos: adiada pelo proprietário.
Data: 2026-11-04.

## Contexto

O proprietário definiu Convergência como padrão de design para seus projetos e solicitou um repositório público com design atômico, Storybook e instruções para agentes. A implementação de origem usa HTML/CSS/JavaScript e uma cascata extensa; apps independentes e mobile têm variações. Há mudanças locais posteriores à última publicação registrada.

## Decisão

Manter um repositório independente, tokens JSON, CSS com namespace `cv-`, biblioteca React tipada, valores nativos e catálogo Storybook. Capturar integralmente a cascata em inventário com hashes, sem copiar o estado da aplicação. Formalizar 60 componentes e 7 composições demonstrativas. Usar Radix para os contratos de foco de diálogo, tabs, menu e tooltip.

A distribuição é uma release GitHub instalável e um Storybook público em Pages. Isso oferece uma fonte versionada sem depender de uma conta npm ou serviço pago. A documentação em português orienta humanos e agentes.

## Alternativas

Copiar CSS para cada app dificultaria rastrear versões e corrigir inconsistências. Transformar todo seletor em componente exportado tornaria o histórico acidental uma API rígida. Reescrever imediatamente os produtos ampliaria o escopo e contrariaria a decisão posterior de adiar adoção. Uma biblioteca React Native completa exigiria revisão e testes específicos; nesta versão a superfície nativa recebe apenas valores de tokens.

## Consequências

A fonte da biblioteca é única, mas a referência de procedência continua auditável. Mudanças compartilhadas exigem versão e comparação visual. O inventário não equivale a migração nem a paridade funcional de Brain/World/Canvas. Os consumidores preservam seus próprios domínios, rotas, dados, permissões e ciclos de publicação.
