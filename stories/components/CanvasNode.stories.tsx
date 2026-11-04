import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/CanvasNode',
  component: UI.CanvasNode,
  parameters: {
    docs: {
      description: {
        component:
          'Nó selecionável de fluxo; visualização e seleção somente. Execução e conexões são domínio do produto.\n\n**Anatomia:** tipo, título, descrição, seleção.\n\n**Teclado:** Tab, Enter e Espaço.\n\n**Origem:** canvas-editor.css flow nodes.',
      },
    },
  },
  args: {
    title: 'Lia pesquisa',
    description: 'Reunir referências relevantes',
    kind: 'Etapa',
    selected: true,
    onSelect: () => {},
  },
} satisfies Meta<typeof UI.CanvasNode>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
