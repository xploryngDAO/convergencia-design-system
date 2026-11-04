import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Icon',
  component: UI.Icon,
  parameters: {
    docs: {
      description: {
        component:
          '39 SVGs próprios, grade 24×24 e traço 1.65. Ícones decorativos ficam fora da árvore acessível.\n\n**Anatomia:** viewBox, traços, título opcional.\n\n**Teclado:** Não interativo.\n\n**Origem:** app.js paths.',
      },
    },
  },
  args: { name: 'brain', size: 32, title: 'Brain' },
} satisfies Meta<typeof UI.Icon>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
