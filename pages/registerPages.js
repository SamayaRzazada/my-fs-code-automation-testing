class Registerpage {
  constructor(page) {
    this.page = page;
    this.firstName = '#firstName';
    this.lastName = '#lastName';
    this.email = '#email';
    this.password = '#password';
    this.confirmPassword = '#confirmPassword';
    this.registerButton = '';
    this.errorMessage = '.error-message';
    this.successMessage = '.success-message';

  }
  async goto() {
    await this.page.goto('http://localhost:8000/register');
  }

  async enterFistName(firstName) {
    await this.page.fill(this.firstNameInput, firstName);
  }

  async enterLastName(lastName) {
    await this.page.fill(this.lastNameInput, lastName);
  }

  async enterEmail(email) {
    await this.page.fill(this.emailInput, email);
  }

  async enterPassword(password) {
    await this.page.fill(this.passwordInput, password);

  }
  async enterConfirmPassword(confirmPassword) {
    await this.page.fill(this.confirmPasswordInput, confirmPassword)
  }

  async clickRegister() {
    await this.page.click(this.registerButton);
  }

  async getErrorMessage() {
    return this.page.textContent(this.errorMessage);
  }


  async getSuccessMessage() {
    return this.page.textContent(this.successMessage);
  }
  async register(email, password, confirmPassword) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.enterConfirmPassword(confirmPassword);
    await this.clickRegister();
  }
}

module.exports = RegisterPage;
