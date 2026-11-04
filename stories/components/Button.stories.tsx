import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Button',
  component: UI.Button,
  parameters: {
    docs: {
      description: {
        component:
          'Ação com rótulo, ícone opcional e estados de processamento. Primary é a ação principal do contexto.\n\n**Anatomia:** controle, ícone, rótulo, indicador de processamento.\n\n**Teclado:** Tab, Enter e Espaço; desabilitado não recebe foco.\n\n**Origem:** styles.css .button; interface-system.css --ui-control.',
      },
    },
  },
  args: { children: 'Continuar', variant: 'primary' },
} satisfies Meta<typeof UI.Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: 'secondary', children: 'Voltar' } };
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ver detalhes' } };
export const Danger: Story = { args: { variant: 'danger', children: 'Excluir' } };
export const Loading: Story = { args: { loading: true, children: 'Salvando' } };
export const Disabled: Story = { args: { disabled: true } };
export const LongLabel: Story = {
  args: { children: 'Continuar com todas as referências selecionadas' },
};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
