module.exports = {
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  retries: 1,
  testDir: 'tests',
  timeout: 10000,  // bütün test üçün maksimum vaxt (ms)
  expect: {
    timeout: 30000 // bütün expect-lər üçün timeout (ms)
  },
  
}
