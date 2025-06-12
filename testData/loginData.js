const loginData = {
  validUser: {
    email: 'smarzazad@gmail.com',
    password: 'Tester2025',
  },
  invalidUser: {
    email: 'sdjfjfj@gmail.com',
    password: 'Wert123!',
  },
  emptyFields: {
    email: '',
    password: '',
  },
  invalidFormat: {
    email: 'sdjfjfjgmail.com',
    password: 'Tester2025',
  },
  longInput: 'a'.repeat(256),
};

const expectedMessages = {
  loginSuccessRedirect: 'http://localhost:8000/licenses',
  invalidCredentials: 'The provided credentials are incorrect.',
  tooManyAttempts: 'Too Many Attempts.',
  emptyEmail: 'Email is required',
  emptyPassword: 'Password is required',
  invalidEmailFormat: 'The Invalid email format',
};

module.exports = { loginData, expectedMessages };
