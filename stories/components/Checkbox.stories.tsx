import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Checkbox',
  component: UI.Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'Seleção independente; checked/onChange permitem controle pelo produto.\n\n**Anatomia:** input nativo, label, ajuda.\n\n**Teclado:** Tab e Espaço.\n\n**Origem:** form controls.',
      },
    },
  },
  args: { label: 'Incluir referências', hint: 'Os materiais ficam vinculados ao contexto.' },
} satisfies Meta<typeof UI.Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
