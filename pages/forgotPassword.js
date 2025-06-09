class ForgotPassword {
    constructor(page) {
        this.page = page;
        this.emailInput = page.locator('#email');
        this.resetButton = page.locator('//button[text()="Reset Password"]');
        this.errorMessage = page.locator('#field\\:\\:\\«r1»\\:\\:error-text');
        this.loginButton = page.locator('.chakra-link.css-bpcbsm');
     /* this.message = page.locator('.message'); // email sent or error
        this.passwordInput = page.locator('input[name="password"]');
        this.confirmPasswordInput = page.locator('input[name="confirmPassword"]');
     */
    }

    async goto() {
        await this.page.goto('https://my.fs-code.com/forgot-password');
    }

    async submitEmail(email) {
        await this.emailInput.fill(email);
        await this.resetButton.click();
    }

    /*async fillResetForm(password, confirmPassword) {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.submitButton.click();
    }
    */

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }

    async clickResetButton() {
        await this.resetButton.click();
    }
    async clickLoginButton() {
        await this.loginButton.click();
    }
}

module.exports = { ForgotPassword };
