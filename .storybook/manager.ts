import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';
addons.setConfig({
  theme: create({
    base: 'light',
    brandTitle: 'Convergência · SuperJarvis',
    brandUrl: 'https://github.com/xploryngDAO/convergencia-design-system',
    colorPrimary: '#6367c9',
    colorSecondary: '#5557a2',
    appBg: '#f3f5fc',
    appContentBg: '#ffffff',
    appBorderColor: '#e1e5f0',
    appBorderRadius: 12,
    fontBase: '"Segoe UI Variable", "Segoe UI", sans-serif',
    textColor: '#28314d',
    barSelectedColor: '#5557a2',
  }),
});
