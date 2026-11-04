import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Grid',
  component: UI.Grid,
  parameters: {
    docs: {
      description: {
        component:
          'Grade fluida com colunas que respeitam a largura disponível, sem overflow em 320px.\n\n**Anatomia:** grid, mínimo de coluna, gap.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css .project-grid.',
      },
    },
  },
  args: {
    children: (
      <>
        <UI.Card>Pesquisa</UI.Card>
        <UI.Card>Criação</UI.Card>
        <UI.Card>Revisão</UI.Card>
      </>
    ),
  },
} satisfies Meta<typeof UI.Grid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
