import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/IconButton',
  component: UI.IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'Ação compacta com nome acessível obrigatório; tooltip não substitui o nome.\n\n**Anatomia:** controle, ícone, aria-label.\n\n**Teclado:** Tab, Enter e Espaço.\n\n**Origem:** styles.css .icon-button.',
      },
    },
  },
  args: { icon: 'plus', label: 'Adicionar referência' },
} satisfies Meta<typeof UI.IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
