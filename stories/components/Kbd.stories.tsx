import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Kbd',
  component: UI.Kbd,
  parameters: {
    docs: {
      description: {
        component:
          'Representação de atalho; não registra o atalho no sistema.\n\n**Anatomia:** tecla, borda, texto monoespaçado.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css .search-button kbd.',
      },
    },
  },
  args: { children: 'Ctrl K' },
} satisfies Meta<typeof UI.Kbd>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
