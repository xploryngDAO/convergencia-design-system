import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Text',
  component: UI.Text,
  parameters: {
    docs: {
      description: {
        component:
          'Texto de leitura com quebra de palavras e variante secundária.\n\n**Anatomia:** bloco ou texto inline.\n\n**Teclado:** Não interativo.\n\n**Origem:** interface-system.css --ui-body.',
      },
    },
  },
  args: { children: 'Ideias boas merecem um lugar para continuar.', muted: false },
} satisfies Meta<typeof UI.Text>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = { args: { muted: true } };
