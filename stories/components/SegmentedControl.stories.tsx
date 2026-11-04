import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/SegmentedControl',
  component: UI.SegmentedControl,
  parameters: {
    docs: {
      description: {
        component:
          'Escolha de modo sem trocar painel ARIA. Botões usam aria-pressed.\n\n**Anatomia:** grupo, botões, seleção.\n\n**Teclado:** Tab e Enter/Espaço.\n\n**Origem:** interface-system.css .segmented.',
      },
    },
  },
  args: {
    label: 'Modo de visualização',
    value: 'list',
    options: [
      { value: 'list', label: 'Lista' },
      { value: 'grid', label: 'Grade' },
    ],
    onValueChange: () => {},
  },
} satisfies Meta<typeof UI.SegmentedControl>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState('list');
  return (
    <UI.SegmentedControl
      label="Visualização"
      value={v}
      onValueChange={setV}
      options={[
        { value: 'list', label: 'Lista' },
        { value: 'grid', label: 'Grade' },
      ]}
    />
  );
}
export const Default: Story = { render: () => <Demo /> };
