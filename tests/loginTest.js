const {test, expected} = require('@playwright/test');
const { loginData, expectedMessages } = require('./loginData');

test.describe('Login feature' , ()=>{

test.beforeEach(async({page}) => {
await page.goto('https://my.fs-code.com/login');
});


test('should login successfully with valid credentials', async({page}) =>{
    await page.fill()
})



















});
