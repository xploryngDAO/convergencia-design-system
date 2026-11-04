import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/PageHeader',
  component: UI.PageHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Título, descrição e ações de página. Uma ação principal por contexto; evitar duplicação no shell.\n\n**Anatomia:** eyebrow, h1, descrição, ações.\n\n**Teclado:** Ações seguem ordem do DOM.\n\n**Origem:** interface-system.css .page-heading.',
      },
    },
  },
  args: {
    title: 'Meus projetos',
    description: 'Organize ideias, pessoas e próximos passos.',
    eyebrow: 'Seu espaço',
    actions: (
      <UI.Button variant="primary" icon="plus">
        Novo projeto
      </UI.Button>
    ),
  },
} satisfies Meta<typeof UI.PageHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
