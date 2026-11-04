# Adoção em projetos atuais e futuros

## Situação

O proprietário decidiu adiar a adoção nos projetos existentes em 04/11/2026. A publicação desta biblioteca não altera nenhum aplicativo consumidor. Este guia é o procedimento pronto para quando houver uma solicitação de adoção.

## Projeto novo

1. Instalar a release exata indicada no README e versionar o lockfile.
2. Adicionar `DesignSystemProvider` na raiz e importar `styles.css` uma vez.
3. Começar pelo `AppShell` ou uma composição pequena de `PageHeader`, `Card`, campos e ações.
4. Consultar `component-registry.json`; usar a story para confirmar variantes e teclado.
5. Implementar domínio, rotas, dados, autenticação e autorizações separadamente.
6. Executar a jornada com teclado, viewport estreito, tema escuro, texto longo, vazio, erro e carregamento.

Use o [exemplo React](../examples/react/App.tsx) como ponto de entrada. A API do design system não depende de backend nem de provider de IA.

## Projeto existente

1. Mapear rotas, CSS global, tokens existentes, componentes e testes; capturar a interface atual em contexto isolado.
2. Criar `design-system.config.json` com repositório, versão e escopo da adoção. `node scripts/adopt.mjs /caminho/do/projeto` apenas mostra o que criaria; `--write` grava somente se ainda não existir.
3. Migrar primeiro uma jornada delimitada. Introduzir `.cv-root` para conter estilos e manter o restante estável.
4. Mapear os tokens existentes aos semânticos, preservando diferenças de domínio justificadas.
5. Substituir componentes progressivamente. Não trocar todas as classes por busca e substituição.
6. Validar rotas, foco, atalhos, rolagem, estados, persistência e responsividade antes de ampliar.
7. Registrar o que foi realmente migrado. Atualizar o pacote por PR/revisão com comparação visual.

O arquivo de configuração é uma declaração de dependência e intenção; não implementa CSS automaticamente e não comprova migração. Não adicionar esse arquivo a outros projetos até a adoção ser solicitada.

## HTML/CSS sem React

Após instalar/extrair o pacote, sirva `tokens.css` e `styles.css` da versão fixada. Eles precisam continuar no mesmo diretório porque `styles.css` importa `tokens.css`. Classes ficam dentro de `.cv-root`; `data-theme="dark"` ativa o tema escuro. Consulte [exemplo HTML](../examples/vanilla/index.html).

`legacy.css` fornece aliases explícitos para `--bg`, `--paper`, `--ink`, `--muted`, `--line` e `--accent` em `.cv-legacy`. É uma ponte de migração, não uma cópia do CSS completo do SuperJarvis. Carregue `tokens.css` antes dele. Não substituir CSS ativo do PWA sem revisar seu cache e ciclo de atualização.

## Regras para manter uma fonte única

- Projetos consomem releases; não mantêm forks silenciosos de tokens ou componentes.
- Extensões de domínio usam composição; alterações compartilhadas retornam para esta biblioteca.
- Exceções têm motivo, escopo, responsável e prazo de revisão.
- Nunca usar `latest`, branch móvel ou URL sem versão como dependência de produção.
- Não esconder problemas de contraste ou comportamento para obter aparência semelhante.
- Atualizar o design system não equivale a publicar o produto. Cada produto mantém seu próprio processo de release.

## Bloco para instruções de agentes do consumidor

```md
Design padrão: Convergência / SuperJarvis.
Fonte: https://github.com/xploryngDAO/convergencia-design-system
Versão adotada: 0.1.0 (confirmar no lockfile).
Leia AGENTS.md e docs/adoption.md da mesma tag antes de alterar UI.
Reutilize tokens, componentes e padrões. Não redesenhe a identidade.
Preserve domínio, rotas, persistência e permissões do produto.
Comprove a jornada alterada em desktop, mobile e teclado.
```
