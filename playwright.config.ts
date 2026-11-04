import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  workers: 4,
  timeout: 45000,
  expect: { timeout: 8000 },
  retries: 0,
  reporter: [['list'], ['json', { outputFile: 'test-results/browser-results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:6007',
    headless: true,
    viewport: { width: 1440, height: 1000 },
    launchOptions: process.env.PLAYWRIGHT_CHANNEL
      ? { channel: process.env.PLAYWRIGHT_CHANNEL }
      : {},
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'npx http-server storybook-static -a 127.0.0.1 -p 6007 -c-1 --silent',
    url: 'http://127.0.0.1:6007',
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
