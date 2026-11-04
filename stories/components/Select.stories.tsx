import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Select',
  component: UI.Select,
  parameters: {
    docs: {
      description: {
        component:
          'Seleção única nativa, mantendo comportamento de teclado e acessibilidade da plataforma.\n\n**Anatomia:** label, select, opções, ajuda.\n\n**Teclado:** Tab, setas e seleção nativa.\n\n**Origem:** styles.css .field select.',
      },
    },
  },
  args: {
    label: 'Espaço',
    defaultValue: 'personal',
    options: [
      { value: 'personal', label: 'Meu espaço' },
      { value: 'team', label: 'Equipe Aurora' },
    ],
  },
} satisfies Meta<typeof UI.Select>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
