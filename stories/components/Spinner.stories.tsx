import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Spinner',
  component: UI.Spinner,
  parameters: {
    docs: {
      description: {
        component:
          'Carregamento indeterminado; forneça label quando for independente.\n\n**Anatomia:** anel, nome de status.\n\n**Teclado:** Não interativo; respeita movimento reduzido.\n\n**Origem:** Normalization of loading feedback.',
      },
    },
  },
  args: { label: 'Carregando materiais' },
} satisfies Meta<typeof UI.Spinner>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
