const forgotPasswordData = {
  validEmail: 'smarzazd@gmail.com',

  unregisteredEmail: 'testerqwert@gmail.com',

  invalidEmailFormat: 'tesrt2@',

  emptyEmail: ''
};

const expectedForgotPasswordMessages = {
  emailNotFound: 'Email not found',
  invalidEmailFormat: 'Enter a valid email address',
  emptyEmail: 'Email is required',
  validRedirectUrl: 'http://localhost:8000/forgot-password',
  loginRedirectUrl: 'http://localhost:8000/login'
};

module.exports = { forgotPasswordData, expectedForgotPasswordMessages };
