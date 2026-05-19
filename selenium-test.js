const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function runTest() {
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless()) // REQUIRED for CI
    .build();

  try {
    await driver.get("http://127.0.0.1:8080/");

    await driver.wait(until.elementLocated(By.id("name")), 10000);
    await driver.findElement(By.id("name")).sendKeys("Test User");

    await driver.findElement(By.id("mobile")).sendKeys("123"); // invalid mobile
    await driver.findElement(By.id("pan")).sendKeys("WRONGPAN123");

    await driver.findElement(By.id("submit")).click();

    const errorEl = await driver.wait(
      until.elementLocated(By.css(".error")),
      10000
    );

    const text = await errorEl.getText();

    if (!text.includes("Invalid Mobile Number")) {
      throw new Error("Validation failed");
    }

    console.log("✅ Test Passed");

  } catch (err) {
    console.error("❌ Test Failed:", err);
    process.exit(1); // 🔥 IMPORTANT: stops deploy
  } finally {
    await driver.quit();
  }
}

runTest();