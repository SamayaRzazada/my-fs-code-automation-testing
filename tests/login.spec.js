const { test, expect } = require('@playwright/test')


test.describe('Login feature', () => {

    test.beforeEach(async ({ page }) => {

        console.log(`Running ${test.info().title}`);

        await page.goto('http://localhost:8000/login?redirectTo=%2F', { timeout: 30000, waitUntil: 'load' });
    });


    test('Login successfully with valid credentials', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('button:has-text("Log in")')

        await expect(page).toHaveURL('http://localhost:8000/licenses');
    });

    test('Login with visible password input (eye icon)', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('[aria-label="Toggle password visibility"]')
        await page.click('button:has-text("Log in")')

        await expect(page).toHaveURL('http://localhost:8000/licenses');

    });

    test('Login with an unregistered email', async ({ page }) => {
        await page.fill('#email', 'sdjfjfj@gmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('button:has-text("Log in")')


        const errorLocator = page.locator('.chakra-alert__title.css-1jeznpc');
        const errorText = await errorLocator.textContent();

        if (errorText?.includes('The provided credentials are incorrect.')) {
            await expect(errorLocator).toHaveText('The provided credentials are incorrect.');
        } else if (errorText?.includes('Too Many Attempts.')) {
            await expect(errorLocator).toHaveText('Too Many Attempts.');
        } else {
            throw new Error(`Unexpected error message: "${errorText}"`);
        }


    });

    test('Login - Invalid email format', {
        annotation: { type: 'report', description: 'default error message' },
    }, async ({ page }) => {
        await page.fill('#email', 'sdjfjfjgmail.com')
        await page.fill('#password', 'Tester2025')
        await page.click('button:has-text("Log in")')

        await expect(page.locator('#field\\:\\:\\«r1»\\:\\:error-text')).toHaveText('The Invalid email format');

    });

    test('Sign in with empty email', async ({ page }) => {
        await page.fill('#email', '')
        await page.fill('#password', 'Tester2025')
        await page.click('button:has-text("Log in")')

        await expect(page.locator('#field\\:\\:\\«r1»\\:\\:error-text')).toHaveText('Email is required');


    });

    test('Sign in with empty password', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', '')
        await page.click('button:has-text("Log in")')

        await expect(page.locator('#field\\:\\:\\«r2»\\:\\:error-text')).toHaveText('Password is required');
    });

    test('Sign in with empty credentials', async ({ page }) => {
        await page.fill('#email', '')
        await page.fill('#password', '')
        await page.click('button:has-text("Log in")')

        await expect(page.locator('#field\\:\\:\\«r1»\\:\\:error-text')).toHaveText('Email is required');
        await expect(page.locator('#field\\:\\:\\«r2»\\:\\:error-text')).toHaveText('Password is required');
    });

    test('Login with incorrect password', async ({ page }) => {
        await page.fill('#email', 'smarzazad@gmail.com')
        await page.fill('#password', 'Wert123!')
        await page.click('button:has-text("Log in")')


        await expect(page.locator('.chakra-alert__title.css-1jeznpc')).toHaveText('The provided credentials are incorrect.');
    });

    test('Login with both incorrect email and password', async ({ page }) => {
        await page.fill('#email', 'sdjfjfj@gmail.com')
        await page.fill('#password', 'Wert123!')
        await page.click('button:has-text("Log in")')

        await expect(page.locator('.chakra-alert__title.css-1jeznpc')).toHaveText('The provided credentials are incorrect.');

    });

    test('Maximum length test for email input field', async ({ page }) => {

        const longInput = 'a'.repeat(256);



        await page.fill('#email', `${longInput}@gmail.com`)
        await page.fill('#password', 'Wert123!')
        await page.click('button:has-text("Log in")')

        const errorLocator = page.locator('.chakra-alert__title.css-1jeznpc');
        const errorText = await errorLocator.textContent();

        if (errorText?.includes('The provided credentials are incorrect.')) {
            await expect(errorLocator).toHaveText('The provided credentials are incorrect.');
        } else if (errorText?.includes('Too Many Attempts.')) {
            await expect(errorLocator).toHaveText('Too Many Attempts.');
        } else {
            throw new Error(`Unexpected error message: "${errorText}"`);
        }

    });

    test('Maximum length test for password input field', async ({ page }) => {

        const longInput = 'a'.repeat(256);



        await page.fill('#email', `smarzazad@gmail.com`)
        await page.fill('#password', longInput)
        await page.click('button:has-text("Log in")')

        const errorLocator = page.locator('.chakra-alert__title.css-1jeznpc');
        const errorText = await errorLocator.textContent();

        if (errorText?.includes('The provided credentials are incorrect.')) {
            await expect(errorLocator).toHaveText('The provided credentials are incorrect.');
        } else if (errorText?.includes('Too Many Attempts.')) {
            await expect(errorLocator).toHaveText('Too Many Attempts.');
        } else {
            throw new Error(`Unexpected error message: "${errorText}"`);
        }

    });
    test.afterEach(async ({ page }) => {
    await page.close();
});

});
