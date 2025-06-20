const { test, expect } = require('@playwright/test');
const ForgotPassword = require('../pages/forgotPassword.js');

const { forgotPasswordData, expectedForgotPasswordMessages } = require('../testData/forgotPasswordData');

test.describe('Forgot password feature', () => {
  let forgotPassword;

  test.beforeEach(async ({ page }) => {
    forgotPassword = new ForgotPassword(page);
    await forgotPassword.goto();
  });

  test('Unregistered Email Entry', async () => {
    await forgotPassword.submitEmail(forgotPasswordData.unregisteredEmail);
    await expect(forgotPassword.errorMessage).toHaveText(expectedForgotPasswordMessages.emailNotFound);
  });

  test('Invalid Email Format Entry', async () => {
    await forgotPassword.submitEmail(forgotPasswordData.invalidEmailFormat);
    await expect(forgotPassword.errorMessage).toHaveText(expectedForgotPasswordMessages.invalidEmailFormat);
  });

  test('Empty Email Field Submission', async () => {
    await forgotPassword.submitEmail(forgotPasswordData.emptyEmail);
    await expect(forgotPassword.errorMessage).toHaveText(expectedForgotPasswordMessages.emptyEmail);
  });

  test('Valid Email Entry', async ({ page }) => {
    await forgotPassword.submitEmail(forgotPasswordData.validEmail);
    await expect(page).toHaveURL(expectedForgotPasswordMessages.validRedirectUrl);
  });

  test('Back to Login Link Functionality (Forgot password page)', async ({ page }) => {
    await forgotPassword.loginButton.click();
    await expect(page).toHaveURL(expectedForgotPasswordMessages.loginRedirectUrl);
  });

});
