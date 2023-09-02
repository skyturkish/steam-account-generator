const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Users/goktu/AppData/Local/Chromium/Application/chrome.exe",
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // userDataDir: "C:/Users/goktu/AppData/Local/Google/Chrome/User Data",
    // args: [
    //   "--proxy-server=http://162.23.125.34:8080" bunu da yap
    // ] https://www.youtube.com/watch?v=nl3ZuHXHVSU&t=39s
  });

  const page = await browser.newPage();

  await page.goto("https://tempail.com/");

  await page.content();

  await page.screenshot({ path: "test.png", fullPage: true });

  // await browser.close();
})();
