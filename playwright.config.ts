

import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config(); 

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL,
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  retries: 1,
  testDir: 'tests',
  timeout: 10000,
  expect: {
    timeout: 30000,
  },
});
