#!/usr/bin/env node

const puppeteer = require('puppeteer');
const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('node:process');

const BBVA_URL = 'https://www.bbva.com.ar';
const GLOBAL_POSITION_PATH = '/fnetcore/#/globalposition';
const MOVEMENTS_PATH_FRAGMENT = '/fnetcore/#/private/accounts/myproducts/savingsBanks/';

async function waitForUrlContains(page, fragment, timeout = 120000) {
  await page.waitForFunction(
    (expected) => window.location.href.includes(expected),
    { timeout },
    fragment,
  );
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const rl = readline.createInterface({ input, output });

  try {
    const page = await browser.newPage();
    page.setDefaultTimeout(30000);

    await page.goto(BBVA_URL, { waitUntil: 'domcontentloaded' });

    const bancaOnlineSelector =
      'a.header__access.header__actions__item__link[aria-label="Banca Online"][role="button"]';

    await page.waitForSelector(bancaOnlineSelector, { visible: true });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(bancaOnlineSelector),
    ]);

    console.log('Banca Online opened. Complete login manually in the browser window.');
    await rl.question('After you submit login and reach Global Position, press Enter to continue... ');

    await waitForUrlContains(page, GLOBAL_POSITION_PATH);
    console.log(`Reached: ${page.url()}`);

    const firstProductSelector = 'section.product-content[role="button"]';
    await page.waitForSelector(firstProductSelector, { visible: true });

    await page.click(firstProductSelector);

    await waitForUrlContains(page, MOVEMENTS_PATH_FRAGMENT);

    console.log(`Reached movements page: ${page.url()}`);
  } finally {
    rl.close();
    await browser.close();
  }
})().catch((err) => {
  console.error('Automation failed:', err);
  process.exitCode = 1;
});
