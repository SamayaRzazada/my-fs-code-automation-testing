const loginData = {
  validUser: {
    username: 'testuser',
    password: 'securePassword123'
  },
  invalidUser: {
    username: 'testuser',
    password: 'wrongPassword'
  },
  emptyFields: {
    username: '',
    password: ''
  }
};

const expectedMessages = {
  loginSuccess: 'Welcome, testuser!',
  loginFailure: 'Invalid username or password',
  emptyFieldsError: 'Username and password are required'
};

module.exports = { loginData, expectedMessages };
