const { test, expect } = require('@playwright/test');

test('Form validation test (data-driven style)', async ({ page }) => {

  await page.goto('http://127.0.0.1:8080/');

  // 👉 INPUT DATA (change only this part)
  const testData = {
    name: 'Test User',
    mobile: '9865956967',   // change to invalid like 123 to fail mobile validation
    pan: 'ABCDE1234F'       // change to WRONGPAN123 to fail PAN validation
  };

  await page.fill('#name', testData.name);
  await page.fill('#mobile', testData.mobile);
  await page.fill('#pan', testData.pan);

  await page.click('#submit');

  const message = page.locator('#message');

  // 👉 ASSERTION (based on expected outcome)
  await expect(message).toBeVisible();

  const text = await message.textContent();

  console.log("UI Message:", text);

  // 👉 You control pass/fail expectation here
  expect(text).toContain('Submitted'); 
});