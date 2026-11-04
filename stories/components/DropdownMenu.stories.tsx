import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/DropdownMenu',
  component: UI.DropdownMenu,
  parameters: {
    docs: {
      description: {
        component:
          'Menu de comandos contextual. Foco é restaurado ao fechar; itens podem estar indisponíveis.\n\n**Anatomia:** trigger, content, itens.\n\n**Teclado:** Enter/Espaço abre; setas navegam; Escape fecha.\n\n**Origem:** interface-system.css .ui-zoom.',
      },
    },
  },
  args: {
    label: 'Ações',
    items: [
      { label: 'Renomear', onSelect: () => {} },
      { label: 'Duplicar', onSelect: () => {} },
      { label: 'Arquivar', onSelect: () => {}, danger: true },
      { label: 'Compartilhar', onSelect: () => {}, disabled: true },
    ],
  },
} satisfies Meta<typeof UI.DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
