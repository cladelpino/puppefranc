# BBVA Puppeteer Script

This repository contains a Puppeteer script that:

1. Opens `https://www.bbva.com.ar`
2. Clicks **Banca Online**
3. Waits for navigation to the online banking login
4. Pauses so you can manually complete login in the browser
5. Verifies URL includes `https://online.bbva.com.ar/fnetcore/#/globalposition`
6. Clicks the first account card (`section.product-content`)
7. Verifies URL changes to the movements route (`.../private/accounts/myproducts/savingsBanks/.../lastMovements`)

## Setup

```bash
npm install
```

## Run

```bash
npm start
```

When prompted in terminal, finish login in the browser and press Enter.

## Notes

- This flow is intentionally manual for credentials (no env vars used for username/password filling).
- Uses standard Puppeteer selectors and URL checks via `window.location.href.includes(...)`.
- If BBVA changes DOM structure or URL fragments, selectors/path fragments may need updates.
