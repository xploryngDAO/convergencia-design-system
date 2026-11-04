import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/RadioGroup',
  component: UI.RadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Escolha mutuamente exclusiva dentro de um fieldset com legenda.\n\n**Anatomia:** fieldset, legend, radios nativos.\n\n**Teclado:** Tab entra no grupo; setas mudam seleção.\n\n**Origem:** form selection patterns.',
      },
    },
  },
  args: {
    label: 'Densidade',
    value: 'comfortable',
    options: [
      { value: 'comfortable', label: 'Confortável' },
      { value: 'compact', label: 'Compacta' },
    ],
    onValueChange: () => {},
  },
} satisfies Meta<typeof UI.RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState('comfortable');
  return (
    <UI.RadioGroup
      label="Densidade"
      value={v}
      onValueChange={setV}
      options={[
        { value: 'comfortable', label: 'Confortável' },
        { value: 'compact', label: 'Compacta' },
      ]}
    />
  );
}
export const Default: Story = { render: () => <Demo /> };
