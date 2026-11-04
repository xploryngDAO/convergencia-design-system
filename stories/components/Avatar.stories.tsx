import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Avatar',
  component: UI.Avatar,
  parameters: {
    docs: {
      description: {
        component:
          'Identidade de pessoa ou agente. Aceita imagem do produto e oferece iniciais como fallback.\n\n**Anatomia:** superfície arredondada, imagem ou iniciais, nome acessível.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css .avatar.',
      },
    },
  },
  args: { name: 'Jarvis', size: 'md' },
} satisfies Meta<typeof UI.Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Small: Story = { args: { size: 'sm' } };
export const Large: Story = { args: { size: 'lg' } };
export const ImageFailure: Story = { args: { src: './missing-avatar.png', name: 'Atlas' } };
