import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/WorkspaceSwitcher',
  component: UI.WorkspaceSwitcher,
  parameters: {
    docs: {
      description: {
        component:
          'Troca explícita de contexto. Não muda permissões; o produto valida o espaço selecionado.\n\n**Anatomia:** ícone, select, opções.\n\n**Teclado:** Seleção nativa por teclado.\n\n**Origem:** styles.css .workspace-switch.',
      },
    },
  },
  args: {
    value: 'personal',
    options: [
      { value: 'personal', label: 'Meu espaço' },
      { value: 'team', label: 'Equipe Aurora' },
    ],
    onChange: () => {},
  },
} satisfies Meta<typeof UI.WorkspaceSwitcher>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState('personal');
  return (
    <UI.WorkspaceSwitcher
      value={v}
      onChange={setV}
      options={[
        { value: 'personal', label: 'Meu espaço' },
        { value: 'team', label: 'Equipe Aurora' },
      ]}
    />
  );
}
export const Default: Story = { render: () => <Demo /> };
