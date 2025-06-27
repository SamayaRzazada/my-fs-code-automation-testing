class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.confirmPassword = page.locator('#confirmPassword');
    this.registerButton = page.locator('[data-test="register-submit-button"]');
    this.firstNameError = page.locator('[data-test="register-first-name-input-error"]');
    this.lastNameError = page.locator('[data-test="register-last-name-input-error"]');
    this.emailError = page.locator('[data-test="register-email-input-error"]');
    this.passwordError = page.locator('[data-test="register-password-input-error"]');
    this.confirmPasswordError = page.locator('[data-test="register-confirm-password-input-error"]');
    this.alertError = page.locator('.chakra-alert__title.css-1jeznpc');
  }

  async goto() {
    await this.page.goto('/register');
  }

async register(firstName, lastName, email, password, confirmPassword) {
  await this.firstName.fill(firstName);
  await this.lastName.fill(lastName);
  await this.email.fill(email);
  await this.password.fill(password);
  await this.confirmPassword.fill(confirmPassword);
  await this.registerButton.click();
}
 

  async submitRegistration(data) {
    await this.register(data);
  }

  async getFirstNameError() {
    return await this.getVisibleText(this.firstNameError);
  }

  async getLastNameError() {
    return await this.getVisibleText(this.lastNameError);
  }

  async getEmailError() {
    return await this.getVisibleText(this.emailError);
  }

  async getPasswordError() {
    return await this.getVisibleText(this.passwordError);
  }

  async getConfirmPasswordError() {
    return await this.getVisibleText(this.confirmPasswordError);
  }

  async getAlertError() {
    return await this.getVisibleText(this.alertError);
  }

  async getVisibleText(locator) {
    if (await locator.isVisible()) {
      return (await locator.textContent()).trim();
    }
    return '';
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = RegisterPage;
