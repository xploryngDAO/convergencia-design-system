# Contribuir

Convergência preserva a identidade do SuperJarvis. Antes de alterar UI, leia `AGENTS.md`, a origem do componente e suas stories.

1. Abra uma branch focada. Descreva o problema, o consumidor e o comportamento esperado.
2. Modifique fonte, tokens e stories juntos. Não editar arquivos gerados manualmente.
3. Inclua estados de teclado, erro, vazio, carregamento e mobile quando se aplicarem.
4. Atualize registro e changelog. Mudanças de API exigem migração explícita.
5. Execute `npm run check`, revise capturas e confira `npm pack --dry-run`.
6. Envie PR com evidências, impacto e limitações. Não incluir dados reais de usuários.

Prefira composição a novos componentes quase idênticos. Uma divergência visual precisa de justificativa e decisão registrada. Discussões devem ser respeitosas, específicas e centradas na experiência de uso.
