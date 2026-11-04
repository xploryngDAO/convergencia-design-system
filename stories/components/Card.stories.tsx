import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Card',
  component: UI.Card,
  parameters: {
    docs: {
      description: {
        component:
          'Superfície de conteúdo com borda, raio de painel e rodapé opcional. Card não é interativo por si.\n\n**Anatomia:** superfície, conteúdo, rodapé.\n\n**Teclado:** Apenas controles internos.\n\n**Origem:** styles.css .context-panel.',
      },
    },
  },
  args: {
    children: (
      <>
        <UI.Heading level={3}>Contexto que continua</UI.Heading>
        <UI.Text muted>Uma superfície tranquila para leitura e decisão.</UI.Text>
      </>
    ),
    footer: <UI.Button>Ver materiais</UI.Button>,
  },
} satisfies Meta<typeof UI.Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
