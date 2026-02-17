#!/usr/bin/env node

require('dotenv').config();
const puppeteer = require('puppeteer');

const BBVA_URL = 'https://www.bbva.com.ar';

const requiredEnv = ['BBVA_DOCUMENT_NUMBER', 'BBVA_USERNAME', 'BBVA_PASSWORD'];
for (const name of requiredEnv) {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

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

    const documentInputSelector = 'input[aria-label="Número de documento"]';
    const userInputSelector = 'input[aria-label="Usuario"]';
    const passwordInputSelector = 'input[aria-label="Clave"]';

    await page.waitForSelector(documentInputSelector, { visible: true });
    await page.type(documentInputSelector, process.env.BBVA_DOCUMENT_NUMBER);

    await page.waitForSelector(userInputSelector, { visible: true });
    await page.type(userInputSelector, process.env.BBVA_USERNAME);

    await page.waitForSelector(passwordInputSelector, { visible: true });
    await page.type(passwordInputSelector, process.env.BBVA_PASSWORD);

    const ingresarButtonSelector = 'bbva-button-default-sph[type="submit"][text="Ingresar"]';
    await page.waitForSelector(ingresarButtonSelector, { visible: true });

    await Promise.all([
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
      page.click(ingresarButtonSelector),
    ]);

    console.log('Login flow completed.');
  } finally {
    await browser.close();
  }
})().catch((err) => {
  console.error('Automation failed:', err);
  process.exitCode = 1;
});
