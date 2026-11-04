import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Chip',
  component: UI.Chip,
  parameters: {
    docs: {
      description: {
        component:
          'Filtro ou referência selecionada; remoção precisa de nome específico.\n\n**Anatomia:** rótulo, remoção opcional.\n\n**Teclado:** Tab e Enter na remoção.\n\n**Origem:** styles.css .composer-chips.',
      },
    },
  },
  args: { children: 'Referências', onRemove: () => {}, removeLabel: 'Remover filtro Referências' },
} satisfies Meta<typeof UI.Chip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
