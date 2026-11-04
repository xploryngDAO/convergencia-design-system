import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { tokens, Icon, Heading, Text, Card, Stack, Badge, Button } from '../src';
import { iconPaths, type IconName } from '../src/icons/paths';
export default {
  title: 'Fundações/Linguagem visual',
  parameters: {
    docs: {
      description: {
        component:
          'Valores extraídos da cascata ativa da Convergência. O fundo frio, papel branco, índigo e superfícies arredondadas são a identidade; espaçamento e hierarquia dão continuidade entre produtos.',
      },
    },
  },
} satisfies Meta;
type Story = StoryObj;
export const Colors: Story = {
  name: 'Cores semânticas',
  render: () => (
    <div className="catalog-grid">
      {Object.entries(tokens)
        .filter(([k]) => k.startsWith('color.'))
        .map(([key, value]) => (
          <div className="catalog-swatch" key={key}>
            <div style={{ background: `var(--cv-${key.replaceAll('.', '-')})` }} />
            <div>
              <strong>{key.slice(6)}</strong>
              <br />
              <code>{value}</code>
              <br />
              <code>--cv-{key.replaceAll('.', '-')}</code>
            </div>
          </div>
        ))}
    </div>
  ),
};
export const Typography: Story = {
  name: 'Tipografia',
  render: () => (
    <Stack>
      <Heading level={1}>Um lugar para continuar.</Heading>
      <Heading level={2}>Ideias que ganham forma</Heading>
      <Heading level={3}>Cada detalhe pertence ao mesmo universo</Heading>
      <Heading level={4}>Uma conversa, o próximo passo</Heading>
      <Text>
        Texto de leitura em Segoe UI Variable, Segoe UI ou fonte do sistema. Corpo 14 px com
        entrelinha confortável. A interface se adapta à plataforma sem distribuir fontes
        proprietárias.
      </Text>
      <Text muted>
        Texto secundário usa o valor final #65708a; títulos, controles e metadados têm papéis
        distintos.
      </Text>
    </Stack>
  ),
};
export const Spacing: Story = {
  name: 'Espaçamento',
  render: () => (
    <div>
      {Object.entries(tokens)
        .filter(([k]) => k.startsWith('space.'))
        .map(([k, v]) => (
          <div className="catalog-token" key={k}>
            <code>
              {k} · {v}
            </code>
            <span style={{ width: v }} />
          </div>
        ))}
    </div>
  ),
};
export const Radius: Story = {
  name: 'Raios e superfícies',
  render: () => (
    <div className="catalog-grid">
      {Object.entries(tokens)
        .filter(([k]) => k.startsWith('radius.'))
        .map(([k, v]) => (
          <Card key={k} style={{ borderRadius: v, minHeight: 130 }}>
            <strong>{k}</strong>
            <Text muted>{v}</Text>
          </Card>
        ))}
    </div>
  ),
};
export const Icons: Story = {
  name: '39 ícones da Convergência',
  render: () => (
    <div className="catalog-icons">
      {Object.keys(iconPaths).map((k) => (
        <div key={k}>
          <Icon name={k as IconName} size={24} />
          <code>{k}</code>
        </div>
      ))}
    </div>
  ),
};
export const Elevation: Story = {
  name: 'Elevação',
  render: () => (
    <div className="catalog-grid">
      <Card>Superfície de leitura · borda + sombra discreta</Card>
      <Card style={{ boxShadow: 'var(--cv-shadow-floating)' }}>
        Superfície flutuante · menus e painéis
      </Card>
    </div>
  ),
};
export const Motion: Story = {
  name: 'Movimento e acessibilidade',
  render: () => (
    <Stack>
      <Badge tone="accent">120 / 180 / 300 ms</Badge>
      <Text>
        Feedback curto; transições suaves. prefers-reduced-motion desliga as animações. O movimento
        não comunica informação sozinho.
      </Text>
      <Button variant="primary">Passe o cursor ou use Tab</Button>
    </Stack>
  ),
};
