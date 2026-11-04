import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Switch',
  component: UI.Switch,
  parameters: {
    docs: {
      description: {
        component:
          'Alternância imediata de preferência. Para consentimento explícito prefira Checkbox.\n\n**Anatomia:** checkbox com role switch, trilho, rótulo.\n\n**Teclado:** Tab e Espaço.\n\n**Origem:** settings toggle patterns.',
      },
    },
  },
  args: { label: 'Lembretes ativos', defaultChecked: true },
} satisfies Meta<typeof UI.Switch>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Off: Story = { args: { defaultChecked: false } };
export const Disabled: Story = { args: { disabled: true } };
