import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/AvatarGroup',
  component: UI.AvatarGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Participantes compactos; nomes individuais continuam acessíveis.\n\n**Anatomia:** lista de avatares sobrepostos.\n\n**Teclado:** Não interativo.\n\n**Origem:** project/team patterns.',
      },
    },
  },
  args: { names: ['Jarvis', 'Lia', 'Atlas'] },
} satisfies Meta<typeof UI.AvatarGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
