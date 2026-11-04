import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/ProjectCard',
  component: UI.ProjectCard,
  parameters: {
    docs: {
      description: {
        component:
          'Resumo de projeto com estado, progresso e participantes. A ação de abrir tem lugar único.\n\n**Anatomia:** glifo, badge, título, descrição, progresso, pessoas, ação.\n\n**Teclado:** Tab e Enter na ação.\n\n**Origem:** interface-system.css .wp-project-card.',
      },
    },
  },
  args: {
    title: 'Projeto Aurora',
    description: 'Uma ideia que conecta pesquisa, criação e revisão.',
    progress: 64,
    members: ['Jarvis', 'Lia', 'Atlas'],
    onOpen: () => {},
  },
} satisfies Meta<typeof UI.ProjectCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
