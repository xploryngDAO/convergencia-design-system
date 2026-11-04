import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Message',
  component: UI.Message,
  parameters: {
    docs: {
      description: {
        component:
          'Mensagem com autoria e horário opcional; variante humana deslocada e tingida.\n\n**Anatomia:** autor, avatar, tempo, conteúdo.\n\n**Teclado:** Texto legível; não força live region.\n\n**Origem:** styles.css .message.',
      },
    },
  },
  args: {
    author: 'Jarvis',
    time: '09:41',
    children: 'Podemos organizar suas referências antes de preparar o próximo passo.',
  },
} satisfies Meta<typeof UI.Message>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Human: Story = {
  args: { author: 'Você', human: true, children: 'Vamos começar pelo contexto.' },
};
