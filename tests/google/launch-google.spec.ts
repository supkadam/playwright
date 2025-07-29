import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test('Launch Chrome browser using Playwright', async () => {
  // Launch Chrome browser (not Chromium)
  const browser = await webkit.launch({
    headless: false, // Set to true for headless mode
    channel: 'webkit', // Important: Launch actual Chrome, not bundled Chromium
  });

  // Create a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to a URL
  await page.goto('https://www.google.com');

  // Check the title
  await expect(page).toHaveTitle(/Google/);

  // Close browser
  await browser.close();
});

