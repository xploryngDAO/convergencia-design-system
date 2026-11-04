import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/Dialog',
  component: UI.Dialog,
  parameters: {
    docs: {
      description: {
        component:
          'Diálogo modal responsivo: central no desktop, ancorado embaixo até 600px. Foco preso, retorno ao trigger e Escape.\n\n**Anatomia:** overlay, título, descrição, corpo rolável, ações fixas, fechar.\n\n**Teclado:** Tab contido; Escape fecha; foco retorna à origem.\n\n**Origem:** styles.css #sheet; interface-system.css mobile panels.',
      },
    },
  },
  args: {
    title: 'Novo projeto',
    description: 'Dê um nome ao próximo capítulo.',
    trigger: <UI.Button variant="primary">Abrir painel</UI.Button>,
    children: <UI.TextField label="Nome do projeto" placeholder="Ex.: Aurora" />,
    footer: <UI.Button variant="primary">Continuar</UI.Button>,
  },
} satisfies Meta<typeof UI.Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
