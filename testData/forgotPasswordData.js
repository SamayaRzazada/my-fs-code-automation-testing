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
  validRedirectUrl: 'https://my.fs-code.com/forgot-password',
  loginRedirectUrl: 'https://my.fs-code.com/login'
};

module.exports = { forgotPasswordData, expectedForgotPasswordMessages };
