import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/AppShell',
  component: UI.AppShell,
  parameters: {
    docs: {
      description: {
        component:
          'Estrutura responsiva com rail, contexto, leitura, inspetor e dock. Somente uma área principal; painéis não comprimem o conteúdo em telas pequenas.\n\n**Anatomia:** rail, cabeçalho, main, inspetor, dock, skip link.\n\n**Teclado:** Skip link, Tab, scroll contextual; agente abre painel no mobile.\n\n**Origem:** app-shell.js; journey-shell.css; discovery.css.',
      },
    },
  },
  args: {
    items: [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'apps', label: 'Apps', icon: 'grid' },
    ],
    active: 'home',
    onNavigate: () => {},
    children: <UI.PageHeader title="Seu espaço" description="Uma base para todos os produtos." />,
    inspector: <UI.Text>Assistente contextual</UI.Text>,
  },
} satisfies Meta<typeof UI.AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
