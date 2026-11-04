# Versões e distribuição

O pacote e o catálogo são publicados a partir da mesma revisão Git. Versionar `package.json`, lockfile, `CHANGELOG.md` e registro juntos. Tags são `vX.Y.Z`; release contém o `.tgz` instalável. O npm público não é pressuposto.

- Patch: correção compatível, documentação e ajustes sem mudança de contrato.
- Minor: componente, variante ou token aditivo; incluir impacto visual e migração.
- Major: remoção, renomeação, alteração incompatível de comportamento ou mudança de identidade.

Durante 0.x, mudanças incompatíveis incrementam minor e exigem guia explícito. Ainda assim, consumidores fixam a versão e não recebem mudanças silenciosas.

## Release

1. Executar `npm run check` e revisar as capturas.
2. Executar `npm pack`; verificar o conteúdo do pacote e instalação em consumidor isolado.
3. Criar commit e tag revisados; publicar o `.tgz` na release correspondente.
4. CI publica o Storybook no GitHub Pages. Confirmar o URL, índice e uma story pública.
5. Registrar falhas ou limites em vez de declarar que todos os produtos foram atualizados.

Não incluir `node_modules`, credenciais, saídas de teste ou código privado de consumidores. O catálogo usa fixtures demonstrativas.
