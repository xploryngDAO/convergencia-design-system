import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/DesignSystemProvider',
  component: UI.DesignSystemProvider,
  parameters: {
    docs: {
      description: {
        component:
          'Raiz de escopo e tema. Portais de menus e painéis recebem o mesmo tema sem alterar globais do documento.\n\n**Anatomia:** contexto React, raiz .cv-root, data-theme.\n\n**Teclado:** Não interativo.\n\n**Origem:** new cross-product theme contract.',
      },
    },
  },
  args: {
    theme: 'dark',
    children: (
      <UI.Card>
        <UI.Heading level={3}>Convergência à noite</UI.Heading>
        <UI.Text muted>O mesmo sistema de relações e hierarquia.</UI.Text>
        <UI.Button variant="primary">Continuar</UI.Button>
      </UI.Card>
    ),
  },
} satisfies Meta<typeof UI.DesignSystemProvider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
