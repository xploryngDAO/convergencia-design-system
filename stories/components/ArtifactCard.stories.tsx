import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/ArtifactCard',
  component: UI.ArtifactCard,
  parameters: {
    docs: {
      description: {
        component:
          'Material selecionável com tipo, título e metadado. O callback abre o destino definido pelo produto.\n\n**Anatomia:** glifo, título, descrição, seta.\n\n**Teclado:** Tab e Enter.\n\n**Origem:** styles.css .response-artifact.',
      },
    },
  },
  args: {
    title: 'Plano Aurora',
    description: 'Documento · atualizado hoje',
    icon: 'file',
    onOpen: () => {},
  },
} satisfies Meta<typeof UI.ArtifactCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
