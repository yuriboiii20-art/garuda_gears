import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 3,
  reporter: 'list',
  globalSetup: './tests/setup.js',
  use: { baseURL: 'http://127.0.0.1:4173', channel: 'chrome', headless: true },
});
