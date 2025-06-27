const { test, expect } = require('@playwright/test');
const RegisterPage = require('../pages/registerPages');
const { registerData, expectedMessages } = require('../testData/registerData');


test.describe('Register feature', () => {
  let registerPage;
  
  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    await registerPage.goto();
  });

  test(' Successful registration with valid data', async ({ page }) => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(page).toHaveURL(expectedMessages.loginSuccessRedirect);
  });

  test(' First name is required', async () => {
    await registerPage.register(
      registerData.emptyFields.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.firstNameError).toHaveText(expectedMessages.firstNameRequired);
  });

  test(' First name too short', async () => {
    await registerPage.register(
      registerData.tooShort.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.firstNameError).toHaveText(expectedMessages.firstNameTooShort);
  });

  test(' Last name is required', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.emptyFields.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.lastNameError).toHaveText(expectedMessages.lastNameRequired);
  });

  test(' Last name too short', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.tooShort.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.lastNameError).toHaveText(expectedMessages.lastNameTooShort);
  });

  test(' Email is required', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.emptyFields.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.emailError).toHaveText(expectedMessages.emptyEmail);
  });

  test(' Invalid email format', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.invalidFormat.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.emailError).toHaveText(expectedMessages.invalidEmailFormat);
  });

  test(' Email already exists', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.emailExists.email,
      registerData.ValidUser.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.errorAlert).toHaveText(expectedMessages.emailExists);
  });

  test(' Password is required', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.emptyFields.password,
      registerData.ValidUser.confirmPassword
    );
    await expect(registerPage.passwordError).toHaveText(expectedMessages.emptyPassword);
  });

  test(' Confirm password is required', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.emptyFields.confirmPassword
    );
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMessages.confirmPasswordRequired);

  });

  test(' Password too short', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.tooShort.password,
      registerData.tooShort.confirmPassword
    );
    await expect(registerPage.passwordError).toHaveText(expectedMessages.passwordTooShort);
  });

  test('Password needs number', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.passwordNeedsNumber.password,
      registerData.passwordNeedsNumber.confirmPassword
    );
    await expect(registerPage.passwordError).toHaveText(expectedMessages.passwordNeedsNumber);
  });

  test('Password needs uppercase letter', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.passwordNeedsUppercase.password,
      registerData.passwordNeedsUppercase.confirmPassword
    );
    await expect(registerPage.passwordError).toHaveText(expectedMessages.passwordNeedsUppercase);
  });

  test('Passwords mismatch', async () => {
    await registerPage.register(
      registerData.ValidUser.firstName,
      registerData.ValidUser.lastName,
      registerData.ValidUser.email,
      registerData.ValidUser.password,
      registerData.passwordsMismatch.confirmPassword
    );
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMessages.passwordsMismatch);
  });

  test(' All fields empty', async () => {
    await registerPage.register(
      registerData.emptyFields.firstName,
      registerData.emptyFields.lastName,
      registerData.emptyFields.email,
      registerData.emptyFields.password,
      registerData.emptyFields.confirmPassword
    );

    await expect(registerPage.firstNameError).toHaveText(expectedMessages.firstNameRequired);
    await expect(registerPage.lastNameError).toHaveText(expectedMessages.lastNameRequired);
    await expect(registerPage.emailError).toHaveText(expectedMessages.emptyEmail);
    await expect(registerPage.passwordError).toHaveText(expectedMessages.emptyPassword);
    await expect(registerPage.confirmPasswordError).toHaveText(expectedMessages.confirmPasswordRequired);
  });
});
