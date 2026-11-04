import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Tooltip',
  component: UI.Tooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Ajuda complementar por hover ou foco. Não deve conter ações ou informação essencial exclusiva.\n\n**Anatomia:** trigger e descrição flutuante.\n\n**Teclado:** Foco exibe; Escape dispensa.\n\n**Origem:** discoverable controls.',
      },
    },
  },
  args: {
    content: 'Adicionar uma referência ao projeto',
    children: <UI.IconButton label="Adicionar referência" icon="plus" />,
  },
} satisfies Meta<typeof UI.Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
