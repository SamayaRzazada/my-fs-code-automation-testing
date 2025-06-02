class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');     
    this.passwordInput = page.locator('#password');     
    this.loginButton = page.locator('#login');         
    this.errorMessage = page.locator('#errorMessage');  
    this.welcomeMessage = page.locator('#welcomeMessage'); 
    this.emailError = '#email-error';      
  }

  async goto() {
    await this.page.goto('http://localhost:8000');  
  }

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.submitButton);
  }

  async getErrorMessage() {
    return await this.page.textContent(this.errorMessage);
  }

  async getEmailError() {
    return await this.page.textContent(this.emailError);
  }

  async getPasswordError() {
    return await this.page.textContent(this.passwordError);
  }
}

module.exports = { LoginPage };
