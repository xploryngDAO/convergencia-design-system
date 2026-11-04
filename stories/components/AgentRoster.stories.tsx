import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/AgentRoster',
  component: UI.AgentRoster,
  parameters: {
    docs: {
      description: {
        component:
          'Seleção horizontal de agentes, com rolagem local e identidade estável.\n\n**Anatomia:** grupo, cartões, seleção.\n\n**Teclado:** Tab e Enter; rolagem horizontal.\n\n**Origem:** experience.js hero; discovery.css carousel.',
      },
    },
  },
  args: {
    agents: [
      { name: 'Jarvis', role: 'Parceiro' },
      { name: 'Lia', role: 'Pesquisa' },
      { name: 'Íris', role: 'Criação' },
    ],
    selected: 'Jarvis',
    onSelect: () => {},
  },
} satisfies Meta<typeof UI.AgentRoster>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState('Jarvis');
  return (
    <UI.AgentRoster
      agents={[
        { name: 'Jarvis', role: 'Parceiro' },
        { name: 'Lia', role: 'Pesquisa' },
        { name: 'Íris', role: 'Criação' },
      ]}
      selected={v}
      onSelect={setV}
    />
  );
}
export const Default: Story = { render: () => <Demo /> };
