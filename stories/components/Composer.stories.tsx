import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/Composer',
  component: UI.Composer,
  parameters: {
    docs: {
      description: {
        component:
          'Mensagem com agente e ação de envio. Não envia texto vazio nem executa IA; callback pertence ao consumidor.\n\n**Anatomia:** contexto, textarea, ajuda, enviar.\n\n**Teclado:** Enter cria linha; Tab e Enter no botão enviam.\n\n**Origem:** styles.css .composer; prompt-focus.css.',
      },
    },
  },
  args: { agent: 'Jarvis', onSend: () => {} },
} satisfies Meta<typeof UI.Composer>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  const [v, setV] = useState('');
  return (
    <UI.Stack>
      <UI.Composer agent="Jarvis" onSend={setV} />
      {v && <UI.Alert title="Enviado no exemplo">{v}</UI.Alert>}
    </UI.Stack>
  );
}
export const Default: Story = { render: () => <Demo /> };
