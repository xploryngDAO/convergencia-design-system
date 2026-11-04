import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/Sheet',
  component: UI.Sheet,
  parameters: {
    docs: {
      description: {
        component:
          'Mesmo contrato de Dialog; alias para painéis de edição. A posição é responsiva, não decidida pelo chamador.\n\n**Anatomia:** mesma anatomia de Dialog.\n\n**Teclado:** Mesma interação de Dialog.\n\n**Origem:** mobile bottom-sheet contract.',
      },
    },
  },
  args: {
    title: 'Detalhes da referência',
    description: 'Revise o contexto antes de salvar.',
    trigger: <UI.Button>Editar referência</UI.Button>,
    children: <UI.TextArea label="Descrição" />,
  },
} satisfies Meta<typeof UI.Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
