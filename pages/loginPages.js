class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');     // İstifadəçi adı üçün input
    this.passwordInput = page.locator('#password');     // Şifrə üçün input
    this.loginButton = page.locator('#login');          // Giriş düyməsi
    this.errorMessage = page.locator('#errorMessage');  // Səhv mesajı
    this.welcomeMessage = page.locator('#welcomeMessage'); // Uğurlu giriş mesajı
  }

  async goto() {
    await this.page.goto('https://example.com/login');  // Login səhifəsinə keç
  }

  async login(username, password) {
    await this.usernameInput.fill(username);  // İstifadəçi adı daxil et
    await this.passwordInput.fill(password);  // Şifrə daxil et
    await this.loginButton.click();           // Giriş et
  }
}

module.exports = { LoginPage };
