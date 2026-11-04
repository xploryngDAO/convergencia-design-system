import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/AgentCard',
  component: UI.AgentCard,
  parameters: {
    docs: {
      description: {
        component:
          'Agente selecionável com identidade, função e estado pressionado. O produto fornece retratos licenciados.\n\n**Anatomia:** avatar, nome, função, seleção.\n\n**Teclado:** Tab, Enter e Espaço.\n\n**Origem:** styles.css .persona-card.',
      },
    },
  },
  args: { name: 'Jarvis', role: 'Seu parceiro', selected: true, onSelect: () => {} },
} satisfies Meta<typeof UI.AgentCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
