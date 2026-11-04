import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/StatCard',
  component: UI.StatCard,
  parameters: {
    docs: {
      description: {
        component:
          'Indicador com rótulo e contexto. Valores são strings para preservar unidades e localização.\n\n**Anatomia:** rótulo, valor, detalhe, ícone.\n\n**Teclado:** Não interativo.\n\n**Origem:** operational summary cards.',
      },
    },
  },
  args: {
    label: 'Projetos em andamento',
    value: '12',
    detail: '3 próximos de concluir',
    icon: 'folder',
  },
} satisfies Meta<typeof UI.StatCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
