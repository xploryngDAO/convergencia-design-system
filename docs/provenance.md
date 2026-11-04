# Procedência e fidelidade

Extração de 04/11/2026 da única base web ativa: `mockups/convergencia/` do SuperJarvis.

- Repositório de origem: https://github.com/xploryngDAO/SuperJarvis
- HEAD observado: `ed3806b83b93c850a3a96fa5744f2fedec0d45e1`.
- Havia mudanças locais posteriores ao HEAD. Elas foram consideradas na extração; não atribuir seus bytes à tag v0.0.59.0.
- A ordem dos 26 estilos foi obtida do `index.html`, incluindo `interface-system.css`, `journey-shell.css` e `discovery.css`.
- Cada arquivo tem SHA-256, tamanho, ordem e número de regras em [source-inventory.json](reference/source-inventory.json).
- Ícones vêm do objeto `paths` em `app.js`, convertido em dados SVG constantes.

O inventário contém seletores, contexto de media query e declarações. Ele permite investigar cada detalhe sem publicar o estado da aplicação, seu armazenamento ou seus dados de domínio. Não inclui prompts, leis, estudos, credenciais, logs pessoais ou o acervo do usuário.

## Quatro estados distintos

1. **Observado:** estilos e componentes existentes na árvore local, identificados por hashes.
2. **Normalizado:** tokens semânticos, namespaces, contraste, contratos de teclado e API portátil.
3. **Implementado e testado:** componentes e exemplos desta biblioteca, conforme `component-registry.json` e testes.
4. **Adotado em produto:** depende de migração e validação específicas. Nenhum projeto existente foi migrado nesta entrega.

Não reivindicar equivalência pixel a pixel da aplicação inteira. O objetivo é preservar a identidade e transformar padrões em contratos reutilizáveis. Valores históricos e de domínio permanecem no inventário mesmo quando não são tokens recomendados.

## Atualizar a extração

```bash
npm run audit:source -- /caminho/para/SuperJarvis
```

Esse comando lê apenas a entrada HTML, os CSS carregados, os paths SVG e o HEAD Git. Ele atualiza o inventário e os ícones. Não altera o SuperJarvis. A atualização precisa de revisão dos deltas, dos tokens e das stories; não é sincronização automática de design.
