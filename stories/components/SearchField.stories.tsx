import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/SearchField',
  component: UI.SearchField,
  parameters: {
    docs: {
      description: {
        component:
          'Busca rotulada; o produto controla consulta, filtro, debounce e resultados.\n\n**Anatomia:** ícone, label, input search.\n\n**Teclado:** Tab, digitação e limpeza nativa.\n\n**Origem:** styles.css .search-field.',
      },
    },
  },
  args: { label: 'Buscar materiais', placeholder: 'Nome, assunto ou referência' },
} satisfies Meta<typeof UI.SearchField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
