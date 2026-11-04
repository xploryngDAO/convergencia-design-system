import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Link',
  component: UI.Link,
  parameters: {
    docs: {
      description: {
        component:
          'Navegação real com destino explícito e sublinhado. Use Button para comandos.\n\n**Anatomia:** âncora, texto, href.\n\n**Teclado:** Tab e Enter.\n\n**Origem:** styles.css anchors.',
      },
    },
  },
  args: {
    children: 'Guia de adoção',
    href: 'https://github.com/xploryngDAO/convergencia-design-system/blob/main/docs/adoption.md',
  },
} satisfies Meta<typeof UI.Link>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
