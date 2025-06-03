const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/registerPages.js');


test.describe('Register feature', () => {
  let registerPage;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test('Successful account creation with simple random email', async ({ page }) => {
    const email = `user${Date.now()}@example.com`;

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
  
test('Email required field validation', async({page})=>{
    await registerPage.register('Tester','qatest',' ','Password12!','Password12!');
    await expect(registerPage.emailError).toHaveText('Email is required');
  });
  test('Invalid email format validation', async({page})=>{
    await registerPage.register('Tester','qatest','wkaksgmail.com','Password12!','Password12!');
    await expect(registerPage.emailError).toHaveText('Invalid email format');
  });

  test('Existing email validation', async({page})=>{
   await registerPage.register('Tester','qatest','smarzazad@gmail.com','Password12!','Password12!') ;
   await expect(registerPage.errorAlert).toHaveText('Email already exists');
  });




  
  






});