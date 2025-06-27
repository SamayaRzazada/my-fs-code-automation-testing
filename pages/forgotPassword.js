class ForgotPassword {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('[data-test="forgot-password-email-input"]'); 
    this.submitButton = page.locator('[data-test="forgot-password-submit-button"]');
    this.errorMessage = page.locator('[data-test="forgot-password-email-input-error"]'); 
    this.loginButton = page.locator('[data-test="forgot-password-back-to-login-link"]');
  }

  async goto() {
    await this.page.goto('/forgot-password');
  }

  async submitEmail(email) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }

async getErrorMessage() {
    if (await this.errorMessage.isVisible()) {
      return (await this.errorMessage.textContent()).trim();
    }
    return '';
  }

  async clickBackToLogin() {
    await this.loginButton.click();
  }

  async getCurrentUrl() {
    return this.page.url();
  }
}

module.exports = ForgotPassword;