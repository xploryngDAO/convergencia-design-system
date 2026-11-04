import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Timeline',
  component: UI.Timeline,
  parameters: {
    docs: {
      description: {
        component:
          'Histórico cronológico com descrição e horário. Cor reforça o tipo sem substituir texto.\n\n**Anatomia:** lista, marcador, título, detalhe, tempo.\n\n**Teclado:** Leitura sequencial.\n\n**Origem:** connected-work activity patterns.',
      },
    },
  },
  args: {
    items: [
      {
        title: 'Referência adicionada',
        detail: 'Pesquisa inicial vinculada ao projeto.',
        time: 'Hoje, 09:41',
      },
      {
        title: 'Proposta revisada',
        detail: 'Próximo passo confirmado.',
        time: 'Hoje, 10:00',
        tone: 'success',
      },
    ],
  },
} satisfies Meta<typeof UI.Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
