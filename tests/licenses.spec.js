const { test, expect } = require('@playwright/test');
const { Licences } = require('../pages/licenses.js');

test.describe('Licenses feature', () => {
  let licenses;

  test.beforeEach(async ({ page }) => {
    licenses = new Licences(page);
    await licenses.goto();
  });

  test('test1 - successful licenses view ', async ({page}) => {
    await licenses.login('smarzazad@gmail.com', 'Tester2025');
    await expect(page).toHaveURL('http://localhost:8000/licenses');
  });

 /*+  test('test2 - toggle license product visibility', async ({ page }) => {
  await licenses.login('smarzazad@gmail.com', 'Tester2025');
  await licenses.toggleProductVisibility();

  const licenseKeys = await licenses.getLicenseKeyTexts();

  // Hər iki license kodunun bir hissəsini yoxlayırıq
  expect(licenseKeys[0]).toContain('d8c8fbdb');
 // expect(licenseKeys[1]).toContain('c8c8fbdb');
});*/

test('Search Input Filters License List by License Code	', async({})=>{
 await licenses.login('smarzazad@gmail.com', 'Tester2025');
 await licenses.searchInput()
});


});