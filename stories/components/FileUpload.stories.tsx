import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/FileUpload',
  component: UI.FileUpload,
  parameters: {
    docs: {
      description: {
        component:
          'Seleção de arquivos local. O componente não envia nada; validação e upload pertencem ao produto.\n\n**Anatomia:** área, ícone, instrução, input file.\n\n**Teclado:** Tab e seletor nativo.\n\n**Origem:** attachments presentation.',
      },
    },
  },
  args: { label: 'Adicionar materiais', accept: '.pdf,.txt,.md', onFiles: () => {} },
} satisfies Meta<typeof UI.FileUpload>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
