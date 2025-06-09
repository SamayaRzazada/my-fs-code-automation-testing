const { test, expect } = require('@playwright/test');
const { ForgotPassword } = require('../pages/forgotPassword.js');

test.describe('Forgot password feature', () => {
  let forgotPassword;

  test.beforeEach(async ({ page }) => {
    forgotPassword = new ForgotPassword(page);
    await forgotPassword.goto();
  });
  //bug
  test('Unregistered Email Entry', async () => {
    await forgotPassword.submitEmail('testerqwert@gmail.com');
    await expect(forgotPassword.errorMessage).toHaveText('Email not found');
  });

  //Bug 
  test(' Invalid Email Format Entry', async () => {
    await forgotPassword.submitEmail('tesrt2@');
    await expect(forgotPassword.errorMessage).toHaveText('Enter a valid email address')
  });

  test(' Empty Email Field Submission', async () => {
    await forgotPassword.submitEmail('');
    await expect(forgotPassword.errorMessage).toHaveText('Email is required');
  });

  test('Valid Email Entry', async ({ page }) => {
    await forgotPassword.submitEmail('smarzazd@gmail.com');
    await expect(page).toHaveURL('https://my.fs-code.com/forgot-password');
  });

  test('Back to Login Link Functionality (Forgot password page)', async ({ page }) => {
    await forgotPassword.loginButton.click();
    await expect(page).toHaveURL('https://my.fs-code.com/login');
  });

  /* test('Mismatched Passwords', async ({ page }) => {
      await page.goto('http://localhost:8000/reset-password?token=validTokenHere');
      await resetPassword.fillResetForm('StrongPass123', 'WrongPass123');
      await expect(resetPassword.alertMessage).toHaveText('Passwords do not match');
    });
  
    test('Weak Password Validation', async ({ page }) => {
      await page.goto('http://localhost:8000/reset-password?token=validTokenHere');
      await resetPassword.fillResetForm('123', '123');
      await expect(resetPassword.alertMessage).toHaveText('Password must contain at least 8 characters');
    });
  
    test('Successful Password Reset', async ({ page }) => {
      await page.goto('http://localhost:8000/reset-password?token=validTokenHere');
      await resetPassword.fillResetForm('StrongPass123', 'StrongPass123');
      await expect(resetPassword.alertMessage).toHaveText('Password has been successfully reset');
      await expect(page).toHaveURL(/login/); // yönləndirmə yoxlaması
    });
  */




});
