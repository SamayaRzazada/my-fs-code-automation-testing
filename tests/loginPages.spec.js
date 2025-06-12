const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPages.js');
const { loginData, expectedMessages } = require('../data/testData');

test.describe('Login feature', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);
    await expect(page).toHaveURL(expectedMessages.loginSuccessRedirect);
  });

  test('Login with visible password input (eye icon)', async ({ page }) => {
    await loginPage.login(loginData.validUser.email, loginData.validUser.password);
    await loginPage.togglePasswordVisibility();
    await expect(page).toHaveURL(expectedMessages.loginSuccessRedirect);
  });

  test('Login with an unregistered email', async ({ page }) => {
    await loginPage.login(loginData.invalidUser.email, loginData.validUser.password);

    const errorText = await loginPage.getErrorText();

      if (errorText?.includes(expectedMessages.invalidCredentials)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.invalidCredentials);
    } else if (errorText?.includes(expectedMessages.tooManyAttempts)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.tooManyAttempts);
    } else {
      throw new Error(`Unexpected error message: "${errorText}"`);
    }
  });


  test('Login - Invalid email format', async () => {
    await loginPage.login(loginData.invalidUser.email, loginData.validUser.page);
    await expect(loginPage.emailError).toHaveText(expectedMessages.invalidEmailFormat);
  });

  test('Sign in with empty email', async () => {
    await loginPage.login('', 'Tester2025');
    await expect(loginPage.emailError).toHaveText('Email is required');
  });

  test('Sign in with empty password', async () => {
    await loginPage.login('smarzazad@gmail.com', '');
    await expect(loginPage.passwordError).toHaveText('Password is required');
  });

  test('Sign in with empty credentials', async () => {
    await loginPage.login('', '');
    await expect(loginPage.emailError).toHaveText('Email is required');
    await expect(loginPage.passwordError).toHaveText('Password is required');
  });

  test('Login with incorrect password', async () => {
    await loginPage.login('smarzazad@gmail.com', 'Wert123!');
    await expect(loginPage.errorAlert).toHaveText('The provided credentials are incorrect.');
  });

  test('Login with both incorrect email and password', async () => {
    await loginPage.login('sdjfjfj@gmail.com', 'Wert123!');
const errorText = await loginPage.getErrorText();

    if (errorText?.includes('The provided credentials are incorrect.')) {
      await expect(loginPage.errorAlert).toHaveText('The provided credentials are incorrect.');
    } else if (errorText?.includes('Too Many Attempts.')) {
      await expect(loginPage.errorAlert).toHaveText('Too Many Attempts.');
    }});

  test('Maximum length test for email input field', async () => {
    const longInput = 'a'.repeat(256);
    await loginPage.login(`${longInput}@gmail.com`, 'Wert123!');

    const errorText = await loginPage.getErrorText();

    if (errorText?.includes('The provided credentials are incorrect.')) {
      await expect(loginPage.errorAlert).toHaveText('The provided credentials are incorrect.');
    } else if (errorText?.includes('Too Many Attempts.')) {
      await expect(loginPage.errorAlert).toHaveText('Too Many Attempts.');
    } 
  });

  test('Maximum length test for password input field', async () => {
    const longInput = 'a'.repeat(256);
    await loginPage.login('smarzazad@gmail.com', longInput);

    const errorText = await loginPage.getErrorText();

    if (errorText?.includes('The provided credentials are incorrect.')) {
      await expect(loginPage.errorAlert).toHaveText('The provided credentials are incorrect.');
    } else if (errorText?.includes('Too Many Attempts.')) {
      await expect(loginPage.errorAlert).toHaveText('Too Many Attempts.');
    } 
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

});
