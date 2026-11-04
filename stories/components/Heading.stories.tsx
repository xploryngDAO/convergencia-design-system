import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Heading',
  component: UI.Heading,
  parameters: {
    docs: {
      description: {
        component:
          'Hierarquia semântica de títulos. Escolha o nível pelo documento, não pelo tamanho desejado.\n\n**Anatomia:** elemento h1–h4, escala tipográfica.\n\n**Teclado:** Não interativo.\n\n**Origem:** interface-system.css --ui-title.',
      },
    },
  },
  args: { children: 'O próximo capítulo', level: 1 },
} satisfies Meta<typeof UI.Heading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Section: Story = { args: { level: 2 } };
export const Group: Story = { args: { level: 3 } };
