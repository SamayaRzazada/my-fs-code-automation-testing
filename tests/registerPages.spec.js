const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/registerPages.js');
const { faker } = require('@faker-js/faker');


test.describe('Register feature', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('Successful account creation with simple random email', async ({ page }) => {
    const email = faker.internet.email();

    await registerPage.register('Tester', 'qatest', email, 'Password12!', 'Password12!');
    await expect(page).toHaveURL('http://localhost:8000/verify-email');
  });

  test('First name required field validation', async ({ page }) => {
    await registerPage.register('', 'qatest', 'mail@gmail.com', 'Password12!', 'Password12!');
    await expect(registerPage.firstNameError).toHaveText('First name is required');
  });

  test('First name must be at least 3 characters', async ({ page }) => {
    await registerPage.register('Al', 'QATest', 'testuser@example.com', 'Password12!', 'Password12!');
    await expect(registerPage.firstNameError).toHaveText('First name must be at least 3 characters long');
  });

  test('Last name required field validation', async ({ page }) => {
    await registerPage.register('Tester', ' ', 'mail@gmail.com', 'Password12!', 'Password12!');
    await expect(registerPage.lastNameError).toHaveText('Last name is required');
  });

  test('Last name must be at least 3 characters', async ({ page }) => {
    await registerPage.register('Ald', 'Te', 'testuser@example.com', 'Password12!', 'Password12!');
    await expect(registerPage.lastNameError).toHaveText('Last name must be at least 3 characters long');
  });

  test('Email required field validation', async ({ page }) => {
    await registerPage.register('Tester', 'qatest', ' ', 'Password12!', 'Password12!');
    await expect(registerPage.emailError).toHaveText('Email is required');
  });

  test('Invalid email format validation', async ({ page }) => {
    await registerPage.register('Tester', 'qatest', 'wkaksgmail.com', 'Password12!', 'Password12!');
    await expect(registerPage.emailError).toHaveText('Invalid email format');
  });

  test('Existing email validation', async ({ page }) => {
    await registerPage.register('Tester', 'qatest', 'smarzazad@gmail.com', 'Password12!', 'Password12!');
    await expect(registerPage.errorAlert).toHaveText('Email already exists');
  });

  test('Password required field validation', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', '', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password is required');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Weak password complexity validation', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', '123', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password must be at least 8 characters long');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Warning message for password with 6 characters ', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', 'P@1234', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password must be at least 8 characters long');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Warning message for password without uppercase letter', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', 'p@1234', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password must be at least 8 characters long');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Warning message for password without number', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', 'P@qwerty', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password must contain at least one number');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Warning message for password Lower case', async ({ page }) => {
    await registerPage.register('Tester', 'Tester', 'testuser@example.com', '1@qwerty', 'Password12!');
    await expect(registerPage.passwordError).toHaveText('Password must contain at least one uppercase letter');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Confirm Password empty validation', async ({ page }) => {
    await registerPage.register('Tester', 'QATest', 'testuser@example.com', 'Password12!', '');
    await expect(registerPage.confirmError).toHaveText('Confirm Password is required');
  });

  test('Passwords mismatch validation', async ({ page }) => {
    await registerPage.register('Tester', 'QATest', 'testuser@example.com', 'Password12!', 'Password12!1');
    await expect(registerPage.confirmError).toHaveText("Passwords don't match");
  });

  test('Registration attempt with empty fields', async ({ page }) => {
    await registerPage.register('', '', '', '', '');
    await expect(registerPage.firstNameError).toHaveText('First name is required');
    await expect(registerPage.lastNameError).toHaveText('Last name is required');
    await expect(registerPage.emailError).toHaveText('Email is required');
    await expect(registerPage.passwordError).toHaveText('Password is required');
    await expect(registerPage.confirmError).toHaveText('Confirm Password is required');
  });

});