import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Stepper',
  component: UI.Stepper,
  parameters: {
    docs: {
      description: {
        component:
          'Progresso entre etapas nomeadas, sem sugerir conclusão por cor apenas. Índice current começa em zero.\n\n**Anatomia:** lista, número/conclusão, nome, etapa atual.\n\n**Teclado:** Não interativo.\n\n**Origem:** project creation stages.',
      },
    },
  },
  args: { steps: ['Contexto', 'Referências', 'Revisão', 'Conclusão'], current: 2 },
} satisfies Meta<typeof UI.Stepper>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
