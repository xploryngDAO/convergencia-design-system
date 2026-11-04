import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/ApprovalCard',
  component: UI.ApprovalCard,
  parameters: {
    docs: {
      description: {
        component:
          'Proposta explícita antes de uma ação. O consumidor implementa autorização, persistência e auditoria.\n\n**Anatomia:** estado de decisão, título, explicação, revisar, aprovar.\n\n**Teclado:** Tab e Enter; loading bloqueia duplicação.\n\n**Origem:** Canvas human decision patterns.',
      },
    },
  },
  args: {
    title: 'Aplicar organização sugerida',
    description: 'Mover três referências para a coleção Aurora. Revise o escopo antes de aprovar.',
    onApprove: () => {},
    onReject: () => {},
  },
} satisfies Meta<typeof UI.ApprovalCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Pending: Story = { args: { pending: true } };
