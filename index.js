const proxyChain = require("proxy-chain");
const puppeteer = require("puppeteer-extra");

const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteer.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "your-token", // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true,
  })
);

(async () => {
  const oldProxyUrl = "http://username:password@proxy-ip:port";
  const newProxyUrl = await proxyChain.anonymizeProxy(oldProxyUrl);

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:/Users/goktu/AppData/Local/Chromium/Application/chrome.exe",
    // executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    // userDataDir: "C:/Users/goktu/AppData/Local/Google/Chrome/User Data",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      `--proxy-server=${newProxyUrl}`,
    ],
  });

  const page = await browser.newPage();

  await page.goto("https://tempail.com/");

  await page.content();

  await page.solveRecaptchas();

  const email = await page.$eval("#eposta_adres", (el) => el.value);

  console.log(email);

  const steamPage = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
  );

  // Tarayıcı dili ayarlarını özelleştirme
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
  });

  await steamPage.goto("https://store.steampowered.com/join/");

  await steamPage.content();

  await steamPage.type("#email", email);

  await steamPage.type("#reenter_email", email);

  await steamPage.click("#i_agree_check");

  setTimeout(async function () {
    await steamPage.solveRecaptchas();

    await steamPage.click("#createAccountButton");
  }, 10000);
})();
