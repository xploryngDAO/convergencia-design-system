import { createRoot } from 'react-dom/client';
import { DesignSystemProvider } from '../../../src/index';
import '../../../src/tokens.css';
import '../../../src/styles.css';
import './favoritos.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <DesignSystemProvider theme="light">
    <App />
  </DesignSystemProvider>
);
