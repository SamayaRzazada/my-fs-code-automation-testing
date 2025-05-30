const { test, expect } = require('@playwright/test')


test.describe('Login feature', () => {

    test.beforeEach(async ({ page }) => {

        console.log(`Running ${test.info().title}`);

        await page.goto('https://my.fs-code.com/login', { timeout: 30000, waitUntil: 'load' });
    });


    test('Login successfully with valid credentials', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('button:has-text("Log in")')

        await expect(page).toHaveURL('https://my.fs-code.com/licenses');
    });

    test('Login with visible password input (eye icon)', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('[aria-label="Toggle password visibility"]')
        await page.click('button:has-text("Log in")')
       
        await expect(page).toHaveURL('https://my.fs-code.com/licenses');

    });












});
