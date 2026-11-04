import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/Toast',
  component: UI.Toast,
  parameters: {
    docs: {
      description: {
        component:
          'Confirmação breve sem roubar foco. O produto decide tempo e fila; mensagens importantes não somem automaticamente.\n\n**Anatomia:** ícone, mensagem, dispensar opcional.\n\n**Teclado:** Anúncio polite; Tab alcança dispensar.\n\n**Origem:** styles.css #toast.',
      },
    },
  },
  args: { children: 'Alterações salvas.', onDismiss: () => {} },
} satisfies Meta<typeof UI.Toast>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
