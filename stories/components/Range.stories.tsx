import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Range',
  component: UI.Range,
  parameters: {
    docs: {
      description: {
        component:
          'Valor ajustável com output visível e limites explícitos.\n\n**Anatomia:** label, output, range nativo.\n\n**Teclado:** Setas, Home e End.\n\n**Origem:** settings range patterns.',
      },
    },
  },
  args: { label: 'Intensidade', value: 50, onChange: () => {} },
} satisfies Meta<typeof UI.Range>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState(50);
  return <UI.Range label="Intensidade" value={v} onChange={setV} />;
}
export const Default: Story = { render: () => <Demo /> };
