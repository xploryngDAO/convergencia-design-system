import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Tabs',
  component: UI.Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Alterna painéis no mesmo contexto, com roving tabindex e relações ARIA. Navegação de rota usa Navigation.\n\n**Anatomia:** tablist, trigger, panel.\n\n**Teclado:** Setas, Home/End; Tab segue para conteúdo.\n\n**Origem:** interface-system.css .segmented .sj-app-tabs.',
      },
    },
  },
  args: {
    label: 'Visualização',
    items: [
      { value: 'overview', label: 'Visão geral', content: 'Contexto, pessoas e próximos passos.' },
      { value: 'materials', label: 'Materiais', content: 'Arquivos e referências deste projeto.' },
      { value: 'disabled', label: 'Indisponível', content: '', disabled: true },
    ],
  },
} satisfies Meta<typeof UI.Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
