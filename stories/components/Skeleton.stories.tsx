import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Skeleton',
  component: UI.Skeleton,
  parameters: {
    docs: {
      description: {
        component:
          'Reserva de geometria decorativa durante carregamento. O contêiner deve anunciar o carregamento.\n\n**Anatomia:** retângulo, largura e altura.\n\n**Teclado:** Oculto de leitores de tela.\n\n**Origem:** Normalization of loading feedback.',
      },
    },
  },
  args: { width: '240px', height: 24 },
} satisfies Meta<typeof UI.Skeleton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
