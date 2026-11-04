import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: {
        index: 'src/index.ts',
        'tokens/index': 'src/tokens/index.ts',
        'tokens/native': 'src/tokens/native.ts',
      },
      formats: ['es'],
    },
    rollupOptions: { external: [/^react($|\/)/, /^react-dom($|\/)/, /^@radix-ui\//] },
  },
});
