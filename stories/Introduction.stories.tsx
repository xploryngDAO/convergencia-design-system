import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Card, Grid, Heading, Text, Stack, Link, Icon } from '../src';
export default {
  title: 'Comece aqui/Convergência',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;
export const Overview: StoryObj = {
  name: 'Visão e uso',
  render: () => (
    <div className="catalog-reading">
      <div className="catalog-hero">
        <Badge tone="accent">SuperJarvis · Design System · v0.1.0</Badge>
        <h1>
          Uma identidade.
          <br />
          Muitos produtos.
        </h1>
        <p>
          Convergência é a linguagem visual compartilhada do SuperJarvis: clara, humana, contextual
          e contínua do desktop ao celular.
        </p>
        <Link href="https://github.com/xploryngDAO/convergencia-design-system">
          Código, instalação e guia para agentes ↗
        </Link>
      </div>
      <Grid>
        <Card>
          <Icon name="palette" />
          <Heading level={3}>Fundações</Heading>
          <Text muted>
            101 tokens: cores, tipografia, espaçamentos, raios, dimensões, elevação e movimento.
          </Text>
        </Card>
        <Card>
          <Icon name="grid" />
          <Heading level={3}>Design atômico</Heading>
          <Text muted>
            Primitivas, campos, navegação, feedback, organismos e templates interativos.
          </Text>
        </Card>
        <Card>
          <Icon name="devices" />
          <Heading level={3}>Continuidade</Heading>
          <Text muted>
            Rail no desktop, dock no celular, painéis inferiores e áreas de leitura com rolagem
            própria.
          </Text>
        </Card>
      </Grid>
      <h2>Como usar este catálogo</h2>
      <ol>
        <li>Explore as fundações e os estados de cada componente na barra lateral.</li>
        <li>Use Controls para alterar propriedades; Docs mostra API e código do exemplo.</li>
        <li>Alterne o tema na barra do Storybook e redimensione o viewport.</li>
        <li>Teste com teclado, zoom e textos longos antes de integrar ao seu produto.</li>
      </ol>
      <h2>O que é canônico</h2>
      <Text>
        A referência é a cascata de mockups/convergencia, incluindo interface-system e discovery. As
        regras específicas de Brain, Canvas e World permanecem rastreadas no inventário; os
        componentes reutilizáveis têm contratos próprios.
      </Text>
      <h2>Para agentes</h2>
      <Stack>
        <Text>
          Leia AGENTS.md → docs/adoption.md → component-registry.json. Instale uma versão fixa,
          importe o CSS uma vez e reutilize componentes. Mudanças de aparência pertencem ao design
          system e precisam de exemplo e verificação.
        </Text>
        <Link href="https://github.com/xploryngDAO/convergencia-design-system/blob/main/AGENTS.md">
          Abrir o contrato de implementação
        </Link>
      </Stack>
    </div>
  ),
};
