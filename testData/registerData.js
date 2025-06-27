const { faker } = require("@faker-js/faker");

const registerData = {
 ValidUser:{
    firstName:'Tester',
    lastName:'qatest',
    email:faker.internet.email(),
    password:'Password12!',
    confirmPassword:'Password12!'
 },
emptyFields:{
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:''
},
tooShort:{
    firstName:'Qa',
    lastName:'QA',
    email:'qa',
    password:'123',
    confirmPassword:'123'
},
invalidFormat: {
   firstName:'b',
   lastName:'a',
   email:'mailgmail.com',
   password:'P',
   confirmPassword:'P'
  },
  longInput:{ 
    firstName:'a'.repeat(256),
    lastName:'b'.repeat(256),
    email:faker.internet.email(),
    password: 'Password12!',
    confirmPassword: 'Password12!'
  },
  emailExists:{
    email:'smarzazad@gmail.com'
  },
  passwordsMismatch:{
    confirmPassword:'Qasdfvgk!12'
  },
  passwordNeedsNumber:{
    password:'Password!@#$$',
    confirmPassword:'Password!@#$$'
  },
  passwordNeedsUppercase:{
    password:'1assword!@#$$',
    confirmPassword:'1assword!@#$$'
  }
};

const expectedMessages ={
 loginSuccessRedirect: 'http://localhost:8000/verify-email',
  tooManyAttempts: 'Too Many Attempts.',
  emptyEmail: 'Email is required',
  emptyPassword: 'Password is required',
  invalidEmailFormat: 'Invalid email format',
  firstNameRequired: 'First name is required',
  firstNameTooShort: 'First name must be at least 3 characters long',
  lastNameRequired: 'Last name is required',
  lastNameTooShort: 'Last name must be at least 3 characters long',
  emailExists: 'Email already exists',
  passwordsMismatch: "Passwords don't match",
  passwordTooShort: 'Password must be at least 8 characters long',
  passwordNeedsNumber: 'Password must contain at least one number',
  passwordNeedsUppercase: 'Password must contain at least one uppercase letter',
  confirmPasswordRequired: 'Confirm Password is required'
}

module.exports = {
  registerData, expectedMessages
};