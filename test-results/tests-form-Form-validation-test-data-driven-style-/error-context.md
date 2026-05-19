# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\form.spec.js >> Form validation test (data-driven style)
- Location: tests\form.spec.js:3:1

# Error details

```
Error: expect(received).toContain(expected) // indexOf

Expected substring: "Submitted"
Received string:    "Invalid PAN Number"
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - heading "Registration Form" [level=2] [ref=e2]
  - generic [ref=e4]: Invalid PAN Number
  - textbox "Enter Name" [ref=e5]: Test User
  - textbox "Enter Mobile" [ref=e6]: "9865956967"
  - textbox "Enter PAN Number" [ref=e7]: ABCDE1234
  - button "Submit" [active] [ref=e8]
```

# Test source

```ts
  1  | const { test, expect } = require('@playwright/test');
  2  | 
  3  | test('Form validation test (data-driven style)', async ({ page }) => {
  4  | 
  5  |   await page.goto('http://127.0.0.1:8080/');
  6  | 
  7  |   // 👉 INPUT DATA (change only this part)
  8  |   const testData = {
  9  |     name: 'Test User',
  10 |     mobile: '9865956967',   // change to invalid like 123 to fail mobile validation
  11 |     pan: 'ABCDE1234'       // change to WRONGPAN123 to fail PAN validation
  12 |   };
  13 | 
  14 |   await page.fill('#name', testData.name);
  15 |   await page.fill('#mobile', testData.mobile);
  16 |   await page.fill('#pan', testData.pan);
  17 | 
  18 |   await page.click('#submit');
  19 | 
  20 |   const message = page.locator('#message');
  21 | 
  22 |   // 👉 ASSERTION (based on expected outcome)
  23 |   await expect(message).toBeVisible();
  24 | 
  25 |   const text = await message.textContent();
  26 | 
  27 |   console.log("UI Message:", text);
  28 | 
  29 |   // 👉 You control pass/fail expectation here
> 30 |   expect(text).toContain('Submitted'); 
     |                ^ Error: expect(received).toContain(expected) // indexOf
  31 | });
```