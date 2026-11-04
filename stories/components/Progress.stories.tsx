import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Progress',
  component: UI.Progress,
  parameters: {
    docs: {
      description: {
        component:
          'Progresso determinado entre 0 e 100, com rótulo e valor visíveis.\n\n**Anatomia:** rótulo, percentual, progress nativo.\n\n**Teclado:** Não interativo.\n\n**Origem:** project progress patterns.',
      },
    },
  },
  args: { value: 64, label: 'Projeto Aurora' },
} satisfies Meta<typeof UI.Progress>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Empty: Story = { args: { value: 0 } };
export const Complete: Story = { args: { value: 100 } };
