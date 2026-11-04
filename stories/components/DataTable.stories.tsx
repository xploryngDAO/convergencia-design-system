import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/DataTable',
  component: UI.DataTable,
  parameters: {
    docs: {
      description: {
        component:
          'Tabela semântica com caption e cabeçalhos. Rolagem local mantém legibilidade em telas estreitas.\n\n**Anatomia:** região rolável, caption, thead, tbody.\n\n**Teclado:** Tab alcança região e ações; setas rolam nativamente.\n\n**Origem:** app-suite.css file lists.',
      },
    },
  },
  args: {
    caption: 'Materiais do projeto',
    columns: [
      { key: 'name', label: 'Nome' },
      { key: 'type', label: 'Tipo' },
      { key: 'status', label: 'Estado' },
    ],
    rows: [
      {
        name: 'Plano Aurora',
        type: 'Documento',
        status: <UI.Badge tone="success">Pronto</UI.Badge>,
      },
      {
        name: 'Pesquisa inicial',
        type: 'Referência',
        status: <UI.Badge tone="warning">Em revisão</UI.Badge>,
      },
    ],
  },
} satisfies Meta<typeof UI.DataTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
