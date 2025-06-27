class Licences {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('[data-test="login-submit-button"]');
    this.errorAlert = page.locator('.chakra-alert__title.css-1jeznpc');//The provided credentials are incorrect.
    this.emailError = page.locator('[data-test="login-email-input-error"]');
    this.licenseKey = page.locator('p.chakra-tooltip__trigger');
    this.searchInput = page.locator('[data-test="license-filter-search"]');
    this.license = page.locator('[data-test="licenses"]');
    this.setting = page.locator('[data-test="settings"]');
    this.collapse = page.locator('[data-test="side-navigation-toggle"]');
    this.tableOne = page.locator('[data-test="license-table-view-1"]');
    this.tableTwo = page.locator('[data-test="license-table-view-2"]');
    this.filterButton = page.locator('data-test="license-filter-button"');
    this.filterProductSelect = page.locator(['data-test="license-filter-product-select"']);
    this.linked = page.locator('[data-test="license-filter-linked"]');
    this.unlinked = page.locator('[data-test="license-filter-unlinked"]');
    this.licenseFilterClear = page.locator('[data-test="license-filter-clear"]');
    this.licenseFilterApply= page.locator('[data-test="license-filter-apply""]');
    
    
  }

  async goto() {
    await this.page.goto('/login');
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
