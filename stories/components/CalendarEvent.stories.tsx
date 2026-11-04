import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Moléculas/CalendarEvent',
  component: UI.CalendarEvent,
  parameters: {
    docs: {
      description: {
        component:
          'Bloco de agenda com hora e título; timezone e conflitos pertencem ao domínio.\n\n**Anatomia:** borda semântica, horário, título.\n\n**Teclado:** Tab e Enter.\n\n**Origem:** agenda.css event styles.',
      },
    },
  },
  args: {
    title: 'Revisão do projeto Aurora',
    time: '09:00 — 10:00',
    tone: 'accent',
    onOpen: () => {},
  },
} satisfies Meta<typeof UI.CalendarEvent>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
