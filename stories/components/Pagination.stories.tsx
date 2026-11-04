import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Pagination',
  component: UI.Pagination,
  parameters: {
    docs: {
      description: {
        component:
          'Navegação entre páginas com limites explícitos; total mínimo 1.\n\n**Anatomia:** anterior, página atual, próxima.\n\n**Teclado:** Tab e Enter; atualização anunciada.\n\n**Origem:** app-suite page controls.',
      },
    },
  },
  args: { page: 1, total: 5, onPageChange: () => {} },
} satisfies Meta<typeof UI.Pagination>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState(1);
  return <UI.Pagination page={v} total={5} onPageChange={setV} />;
}
export const Default: Story = { render: () => <Demo /> };
