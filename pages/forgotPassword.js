class ForgotPassword {
  constructor(page) {
    this.page = page;
    this.emailInput = page.locator('#email'); 
    this.submitButton = page.locator('.chakra-button.css-1dq2jlv');
    this.errorMessage = page.locator('.error-message'); 
    this.loginButton = page.locator('a:has-text("Back to Login")');
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