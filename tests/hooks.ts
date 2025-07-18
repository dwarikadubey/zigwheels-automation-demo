import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from 'playwright';

setDefaultTimeout(60 * 1000);

Before(async function () {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  this.browser = browser;
  this.context = context;
  this.page = page;
});

After(async function () {
  await this.page.close();
  await this.context.close();
  await this.browser.close();
});
