import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as UI from '../../src';
const meta = {
  title: 'Organismos/BottomNav',
  component: UI.BottomNav,
  parameters: {
    docs: {
      description: {
        component:
          'Dock inferior para no máximo cinco destinos frequentes. Aparece no shell até 900 px.\n\n**Anatomia:** dock, navegação, safe area.\n\n**Teclado:** Tab e Enter; alvo de toque 44px.\n\n**Origem:** styles.css .mobile-dock; app-suite.css.',
      },
    },
  },
  args: {
    active: 'home',
    items: [
      { id: 'home', label: 'Início', icon: 'home' },
      { id: 'chat', label: 'Conversas', icon: 'chat' },
      { id: 'apps', label: 'Apps', icon: 'grid' },
    ],
  },
} satisfies Meta<typeof UI.BottomNav>;
export default meta;
type Story = StoryObj<typeof meta>;
function Demo() {
  return (
    <div style={{ maxWidth: 420 }}>
      <style>{'.story-root .cv-bottom-nav{display:block}'}</style>
      <UI.BottomNav
        active="home"
        items={[
          { id: 'home', label: 'Início', icon: 'home' },
          { id: 'chat', label: 'Conversas', icon: 'chat' },
          { id: 'apps', label: 'Apps', icon: 'grid' },
        ]}
      />
    </div>
  );
}
export const Default: Story = { render: () => <Demo /> };
