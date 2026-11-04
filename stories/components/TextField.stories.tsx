import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/TextField',
  component: UI.TextField,
  parameters: {
    docs: {
      description: {
        component:
          'Campo com rótulo persistente, ajuda, erro associado e API nativa de input. Placeholder não substitui label.\n\n**Anatomia:** label, input, ajuda, erro.\n\n**Teclado:** Tab, digitação; teclado nativo pelo type.\n\n**Origem:** interface-system.css .field.',
      },
    },
  },
  args: {
    label: 'Nome do projeto',
    placeholder: 'Ex.: Aurora',
    hint: 'Um nome que ajude a reconhecer o contexto.',
  },
} satisfies Meta<typeof UI.TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { error: 'Informe o nome do projeto.', required: true } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Projeto arquivado' } };
export const ReadOnly: Story = { args: { readOnly: true, defaultValue: 'Aurora' } };
export const Email: Story = {
  args: { type: 'email', label: 'E-mail', placeholder: 'voce@exemplo.com', autoComplete: 'email' },
};
