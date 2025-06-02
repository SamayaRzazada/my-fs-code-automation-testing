class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Log in")');
    this.passwordToggle = page.locator('[aria-label="Toggle password visibility"]');
    this.errorAlert = page.locator('.chakra-alert__title.css-1jeznpc');
    this.emailError = page.locator('#field\\:\\:\\«r1»\\:\\:error-text');
    this.passwordError = page.locator('#field\\:\\:\\«r2»\\:\\:error-text');
  }

  async goto() {
    await this.page.goto('http://localhost:8000/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async togglePasswordVisibility() {
    await this.passwordToggle.click();
  }

  async getErrorText() {
    return await this.errorAlert.textContent();
  }

  async getEmailError() {
    return await this.emailError.textContent();
  }

  async getPasswordError() {
    return await this.passwordError.textContent();
  }
}

module.exports = { LoginPage };
