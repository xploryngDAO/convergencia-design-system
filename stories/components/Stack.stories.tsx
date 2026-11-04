import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Stack',
  component: UI.Stack,
  parameters: {
    docs: {
      description: {
        component:
          'Layout unidimensional com gap explícito; linhas podem quebrar. Não adiciona semântica de domínio.\n\n**Anatomia:** contêiner flex, gap.\n\n**Teclado:** Não interativo.\n\n**Origem:** shared flex layouts.',
      },
    },
  },
  args: {
    direction: 'row',
    children: (
      <>
        <UI.Badge>Contexto</UI.Badge>
        <UI.Badge tone="accent">Ideia</UI.Badge>
        <UI.Badge tone="success">Continuidade</UI.Badge>
      </>
    ),
  },
} satisfies Meta<typeof UI.Stack>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
