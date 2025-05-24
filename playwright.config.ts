module.exports = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  retries: 1,
  testDir: 'tests',
  timeout: 30000,
}