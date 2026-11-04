import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/EmptyState',
  component: UI.EmptyState,
  parameters: {
    docs: {
      description: {
        component:
          'Estado sem conteúdo com explicação e próximo passo útil. Distinguir vazio, busca sem resultado e erro.\n\n**Anatomia:** ícone, título, descrição, ação.\n\n**Teclado:** Ação acessível pelo teclado.\n\n**Origem:** styles.css .empty-state.',
      },
    },
  },
  args: {
    title: 'Um espaço para suas ideias',
    description: 'Adicione a primeira referência para começar.',
    action: (
      <UI.Button variant="primary" icon="plus">
        Adicionar referência
      </UI.Button>
    ),
  },
} satisfies Meta<typeof UI.EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NoResults: Story = {
  args: {
    title: 'Nenhum resultado',
    description: 'Tente outro termo ou revise os filtros.',
    icon: 'search',
    action: undefined,
  },
};
