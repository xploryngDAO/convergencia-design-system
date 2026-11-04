# Contrato de implementação — Convergência

## Autoridade e ordem de leitura

1. Leia `README.md`, `docs/foundations.md` e `docs/adoption.md`.
2. Consulte `component-registry.json` e a story do componente escolhido.
3. Use os tipos exportados em `src/` como contrato da API.
4. Consulte `docs/provenance.md` para distinguir origem histórica, normalização e API atual.

Convergência é o padrão visual definido pelo proprietário. Este repositório é a fonte da biblioteca compartilhada. Não importar padrões de outros design systems para substituir sua identidade. A adoção nos projetos existentes está adiada: consultar o proprietário antes de iniciar uma migração que não tenha sido solicitada na sessão.

## Implementar em um produto

- Instale uma release exata e versione o lockfile; não aponte produção para `main` ou CDN sem versão.
- Importe `styles.css` uma vez. Use `DesignSystemProvider` para escopo e tema.
- Procure componente → variante → composição antes de criar outro componente.
- Use tokens semânticos; não replique valores hexadecimais, sombras ou raios dentro do produto.
- `Button` executa; `Link` navega; `Tabs` troca painéis; `Navigation` troca destinos. Não misture essas funções.
- Toda ação de ícone tem `label`; todo campo tem `label` persistente; erros explicam como corrigir.
- Uma ação principal por contexto. Não duplicar criação, chat ou navegação entre cabeçalho e conteúdo.
- No celular: alvos de 44 px, dock legível, painéis inferiores e safe areas. No desktop: rail e painéis centrais.
- Preserve rotas, dados, autenticação, autorização e persistência do produto durante a migração.
- Componentes visuais não concedem permissões nem executam integrações. Propostas de agente precisam de revisão e autorização implementadas pelo domínio.
- Exemplos não constituem backend, IA, sincronização ou prova de produção.

## Alterar a biblioteca

- Edite `tokens/tokens.json`; rode `npm run tokens`. Não edite artefatos gerados à mão.
- Não adicione estilos globais sem `.cv-root` ou prefixo `cv-`. Portais mantêm o tema do provider.
- Novo componente precisa de tipos, anatomia, teclado, descrição, origem/justificativa, estados, story e entrada no registro.
- Interações complexas usam primitives acessíveis já adotadas. Não reduzir seus contratos de foco.
- Preserve a API pública; documente depreciações e aumente a versão segundo `docs/versioning.md`.
- Atualize documentação, changelog e exemplos no mesmo conjunto de alterações.
- Não publicar dados privados, fixtures de clientes, credenciais, capturas de sessões reais ou imagens sem direito de distribuição.

## Verificação antes de entregar

Rode `npm run check`. Para mudanças visuais, examine as capturas em desktop e mobile. Teste as jornadas afetadas com teclado e temas claro/escuro. Não afirme compatibilidade de aparelho físico, leitor de tela real ou integração de produto sem executar essa verificação.

Ao concluir, informe versão, componentes alterados, testes executados e limitações. Não confunda inventário de estilos com componentes implementados ou projetos migrados.
