import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/Navigation',
  component: UI.Navigation,
  parameters: {
    docs: {
      description: {
        component:
          'Navegação por contexto, com ícone, nome e contagem opcional. Rotas reais devem fornecer href.\n\n**Anatomia:** nav, links, ícones, aria-current, contagem.\n\n**Teclado:** Tab e Enter.\n\n**Origem:** journey-shell.css .js-rail.',
      },
    },
  },
  args: {
    active: 'home',
    items: [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'projects', label: 'Projetos', icon: 'folder', count: 3 },
      { id: 'brain', label: 'Brain', icon: 'brain' },
    ],
  },
} satisfies Meta<typeof UI.Navigation>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
