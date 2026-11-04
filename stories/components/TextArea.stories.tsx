import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/TextArea',
  component: UI.TextArea,
  parameters: {
    docs: {
      description: {
        component:
          'Texto longo com redimensionamento vertical, ajuda e validação.\n\n**Anatomia:** label, textarea, ajuda, erro.\n\n**Teclado:** Teclado nativo, Enter cria linha.\n\n**Origem:** styles.css .field textarea.',
      },
    },
  },
  args: {
    label: 'Contexto',
    placeholder: 'Descreva o que precisa continuar...',
    hint: 'Seja claro sobre objetivo e restrições.',
  },
} satisfies Meta<typeof UI.TextArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: 'Descreva o contexto antes de continuar.' } };
