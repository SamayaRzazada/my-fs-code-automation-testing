class Licences {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button:has-text("Log in")');
    this.errorAlert = page.locator('.chakra-alert__title.css-1jeznpc');
    this.emailError = page.locator('#field\\:\\:\\«r1»\\:\\:error-text');
    this.licenseCode1 = page.locator('p.chakra-tooltip__trigger').nth(0);
    this.licenseCode2 = page.locator('p.chakra-tooltip__trigger').nth(1);
    this.licenseKey = page.locator('p.chakra-tooltip__trigger');
    this.searchInput = page.locator('#«rl»');

  }

  async goto() {
    await this.page.goto('http://localhost:8000/login');
  }

  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async getSearchInput(){
    await this.searchInput.press('Enter');
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

  async toggleProductVisibility() {
    await this.productToggle.click();
  }
  async getLicenseKeyText() {
    return await this.licenseKey.textContent();
  }

  async isLicenseKeyVisible() {
    return await this.licenseKey.isVisible();
  }


  async isErrorVisible() {
    return await this.errorAlert.isVisible();
  }
}

module.exports = { Licences };
