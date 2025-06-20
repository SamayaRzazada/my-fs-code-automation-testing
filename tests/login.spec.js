const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPages');
const { loginData, expectedMessages } = require('../testData/loginData.js');

test.describe('Login feature', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('Login successfully with valid credentials', async ({ page }) => {
    await loginPage.login(
      loginData.validUser.email,
      loginData.validUser.password);
    await expect(page).toHaveURL(expectedMessages.loginSuccessRedirect);
  });

  test('Login with visible password input (eye icon)', async ({ page }) => {
    await loginPage.login(
      loginData.validUser.email,
      loginData.validUser.password);
    await loginPage.togglePasswordVisibility();
    await expect(page).toHaveURL(expectedMessages.loginSuccessRedirect);
  });

  test('Login with an unregistered email', async ({ page }) => {
    await loginPage.login(
      loginData.invalidUser.email,
      loginData.validUser.password);

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
    await loginPage.login(
      loginData.invalidUser.email, 
      loginData.validUser.page);
    await expect(loginPage.emailError).toHaveText(expectedMessages.invalidEmailFormat);
  });

  test('Sign in with empty email', async () => {
    await loginPage.login(
      loginData.emptyFields.email, 
      loginData.validUser.password);
    await expect(loginPage.emailError).toHaveText(expectedMessages.emptyEmail);
  });

  test('Sign in with empty password', async () => {
    await loginPage.login(
      loginData.validUser.email, 
      loginData.emptyFields.password);
    await expect(loginPage.passwordError).toHaveText(expectedMessages.emptyPassword);
  });

  test('Sign in with empty credentials', async () => {
    await loginPage.login(
      loginData.emptyFields.email, 
      loginData.emptyFields.password);
    await expect(loginPage.emailError).toHaveText(expectedMessages.emptyEmail);
    await expect(loginPage.passwordError).toHaveText(expectedMessages.emptyPassword);
  });

  test('Login with incorrect password', async () => {
    await loginPage.login(
      loginData.validUser.email, 
      loginData.invalidUser.password);
    await expect(loginPage.errorAlert).toHaveText(expectedMessages.invalidCredentials);
  });

  test('Login with both incorrect email and password', async () => {
    await loginPage.login(
      loginData.invalidUser.email, 
      loginData.invalidUser.password);
const errorText = await loginPage.getErrorText();

    if (errorText?.includes(expectedMessages.invalidCredentials)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.invalidCredentials);
    } else if (errorText?.includes(expectedMessages.tooManyAttempts)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.tooManyAttempts);
    }});

  test('Maximum length test for email input field', async () => {
    await loginPage.login(
      `${loginData.longInput}@gmail.com`, 
      loginData.invalidUser.password);

    const errorText = await loginPage.getErrorText();

    if (errorText?.includes(expectedMessages.invalidCredentials)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.invalidCredentials);
    } else if (errorText?.includes(expectedMessages.tooManyAttempts)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.tooManyAttempts);
    }
  });


  test('Maximum length test for password input field', async () => {
    await loginPage.login(
      loginData.validUser.email, 
      loginData.longInput);

    const errorText = await loginPage.getErrorText();

    if (errorText?.includes(expectedMessages.invalidCredentials)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.invalidCredentials);
    } else if (errorText?.includes(expectedMessages.tooManyAttempts)) {
      await expect(loginPage.errorAlert).toHaveText(expectedMessages.tooManyAttempts);
    }
  });


  test.afterEach(async ({ page }) => {
    await page.close();
  });

});