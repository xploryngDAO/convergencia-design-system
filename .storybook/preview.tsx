import React from 'react';
import type { Preview } from '@storybook/react-vite';
import '../src/styles.css';
import '../stories/catalog.css';
import { DesignSystemProvider } from '../src/provider';
const preview: Preview = {
  tags: ['autodocs'],
  globalTypes: {
    theme: {
      description: 'Tema Convergência',
      toolbar: { icon: 'circlehollow', items: ['light', 'dark'] },
    },
  },
  // Playwright runs axe explicitly; manual mode prevents concurrent axe runs in the preview.
  initialGlobals: { theme: 'light', a11y: { manual: true } },
  decorators: [
    (Story, context) => (
      <DesignSystemProvider className="story-root" theme={context.globals.theme}>
        <Story />
      </DesignSystemProvider>
    ),
  ],
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: [
          'Comece aqui',
          'Fundações',
          'Átomos',
          'Moléculas',
          'Organismos',
          'Templates',
          'Referência',
        ],
      },
    },
  },
};
export default preview;
