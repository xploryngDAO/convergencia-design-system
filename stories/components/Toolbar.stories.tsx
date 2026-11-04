import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Toolbar',
  component: UI.Toolbar,
  parameters: {
    docs: {
      description: {
        component:
          'Grupo de controles do conteúdo. Usa group para preservar navegação nativa, sem prometer teclado de toolbar ARIA.\n\n**Anatomia:** grupo, filtros, ações.\n\n**Teclado:** Tab segue todos os controles.\n\n**Origem:** app-shell.js toolbar slot.',
      },
    },
  },
  args: {
    children: (
      <>
        <UI.SearchField label="Buscar" />
        <UI.Button icon="sliders">Filtros</UI.Button>
      </>
    ),
  },
} satisfies Meta<typeof UI.Toolbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
