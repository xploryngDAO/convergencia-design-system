import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Status',
  component: UI.Status,
  parameters: {
    docs: {
      description: {
        component:
          'Presença ou conectividade com indicador e texto. Não confundir presença com autorização.\n\n**Anatomia:** ponto, rótulo.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css .presence-dot.',
      },
    },
  },
  args: { children: 'Disponível', tone: 'success' },
} satisfies Meta<typeof UI.Status>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
