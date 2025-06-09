class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('#firstName');
    this.lastName = page.locator('#lastName');
    this.email = page.locator('#email');
    this.password = page.locator('#password');
    this.confirmPassword = page.locator('#confirmPassword');
    this.registerButton = page.locator('button:has-text("Get Started")');
    this.firstNameError = page.locator('#field\\:\\:\\«r1»\\:\\:error-text');
    this.lastNameError = page.locator('#field\\:\\:\\«r2»\\:\\:error-text');
    this.emailError = page.locator('#field\\:\\:\\«r3»\\:\\:error-text');
    this.errorAlert = page.locator('.chakra-alert__title.css-1jeznpc');
    this.passwordError = page.locator('#field\\:\\:\\«r4»\\:\\:error-text');
    this.confirmError  = page.locator('#field\\:\\:\\«r5»\\:\\:error-text');
    this.registerButton = page.locator('button:has-text("Get Started")');
  }

  async goto() {
    await this.page.goto('http://localhost:8000/register');
  }

  async enterFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  async enterLastName(lastName) {
    await this.lastName.fill(lastName);
  }

  async enterEmail(email) {
    await this.email.fill(email);
  }

  async enterPassword(password) {
    await this.password.fill(password);
  }

  async enterConfirmPassword(confirmPassword) {
    await this.confirmPassword.fill(confirmPassword);
  }

  async clickRegister() {
    await this.registerButton.click();
  }

  async getFirstNameError() {
  if (await this.firstNameError.isVisible()) {
    return await this.firstNameError.textContent();
  }
  return '';
}

  async getLastNameError(){
    return await this.lastNameError.textContent();
  }

  async getEmailError(){
    return await this.emailError.textContent();
  }

  async register(firstName, lastName, email, password, confirmPassword) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastName);
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.clickRegister();
  }
}

module.exports = RegisterPage;
