import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Badge',
  component: UI.Badge,
  parameters: {
    docs: {
      description: {
        component:
          'Metadado curto; texto sempre acompanha a cor semântica. Não usar como botão.\n\n**Anatomia:** superfície, rótulo.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css .pill.',
      },
    },
  },
  args: { children: 'Em revisão', tone: 'accent' },
} satisfies Meta<typeof UI.Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Success: Story = { args: { tone: 'success', children: 'Concluído' } };
export const Warning: Story = { args: { tone: 'warning', children: 'Pendente' } };
export const Danger: Story = { args: { tone: 'danger', children: 'Falhou' } };
export const Rose: Story = { args: { tone: 'rose', children: 'Criação' } };
export const Neutral: Story = { args: { tone: 'neutral', children: 'Rascunho' } };
