# BBVA Puppeteer Script

This repository contains a Puppeteer script that:

1. Opens `https://www.bbva.com.ar`
2. Clicks **Banca Online**
3. Waits for navigation
4. Fills document number, user, and password from environment variables
5. Clicks **Ingresar**
6. Waits for the next navigation

## Setup

```bash
npm install
cp .env.example .env
```

Fill your real credentials in `.env`:

```env
BBVA_DOCUMENT_NUMBER=...
BBVA_USERNAME=...
BBVA_PASSWORD=...
```

> `.env` is ignored via `.gitignore`, so credentials are not committed.

## Run

```bash
npm start
```

## Notes

- Uses standard Puppeteer selectors with `waitForSelector`, `click`, `type`, and `waitForNavigation`.
- If BBVA changes its DOM, selectors may need updates.
