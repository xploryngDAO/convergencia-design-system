import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Alert',
  component: UI.Alert,
  parameters: {
    docs: {
      description: {
        component:
          'Feedback persistente junto ao contexto. Erro usa alert; demais mensagens usam status.\n\n**Anatomia:** ícone, título, descrição.\n\n**Teclado:** Anúncio por leitor de tela.\n\n**Origem:** styles.css .quiet-note.',
      },
    },
  },
  args: {
    title: 'Referências organizadas',
    children: 'Você pode revisar os materiais antes de continuar.',
    tone: 'success',
  },
} satisfies Meta<typeof UI.Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = {
  args: {
    title: 'Não foi possível salvar',
    children: 'Verifique sua conexão e tente novamente.',
    tone: 'danger',
  },
};
export const Offline: Story = {
  args: {
    title: 'Você está offline',
    children: 'Continue com os materiais já disponíveis.',
    tone: 'warning',
  },
};
