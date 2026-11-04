import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Breadcrumbs',
  component: UI.Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component:
          'Caminho hierárquico, distinto do histórico do navegador. Último item marca a página.\n\n**Anatomia:** nav, lista ordenada, separador, destino.\n\n**Teclado:** Tab nos links.\n\n**Origem:** styles.css .header-location.',
      },
    },
  },
  args: {
    items: [
      { label: 'Projetos', href: '#projects' },
      { label: 'Aurora', href: '#aurora' },
      { label: 'Referências' },
    ],
  },
} satisfies Meta<typeof UI.Breadcrumbs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
