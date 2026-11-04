import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Átomos/Divider',
  component: UI.Divider,
  parameters: {
    docs: {
      description: {
        component:
          'Separação discreta entre grupos relacionados.\n\n**Anatomia:** linha e margens.\n\n**Teclado:** Não interativo.\n\n**Origem:** styles.css hr.',
      },
    },
  },
  args: {},
} satisfies Meta<typeof UI.Divider>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
