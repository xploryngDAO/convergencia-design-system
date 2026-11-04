import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Accordion',
  component: UI.Accordion,
  parameters: {
    docs: {
      description: {
        component:
          'Divulgação progressiva com details/summary nativos; múltiplas seções podem ficar abertas.\n\n**Anatomia:** summary, indicador, conteúdo.\n\n**Teclado:** Tab e Enter/Espaço.\n\n**Origem:** styles.css .response-plan.',
      },
    },
  },
  args: {
    items: [
      {
        title: 'O que acontece ao aprovar?',
        content: 'A integração do produto deve executar apenas o escopo apresentado.',
      },
      {
        title: 'Como revisar depois?',
        content: 'O produto deve manter histórico de mudanças e contexto.',
      },
    ],
  },
} satisfies Meta<typeof UI.Accordion>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
