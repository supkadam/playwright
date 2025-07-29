import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test('Launch Chrome browser using Playwright', async () => {
  // Launch Chrome browser (not Chromium)
  const browser = await chromium.launch({
    headless: false, // Set to true for headless mode
    channel: 'chromium', // Important: Launch actual Chrome, not bundled Chromium
  });

  // Test data
  const searchString = "Writing tests";

  // Create a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to a URL
  await page.goto('https://playwright.dev/');

  // Test steps
  await page.locator('.DocSearch-Button-Container').click();
  await page.locator('#docsearch-input').fill(searchString);
  await page.locator('.DocSearch-Hit-Container').first().click();
  
  // Assertion
  const header = page.locator('h1');
  await expect(header).toContainText(searchString);
  const actualTitle = await page.title();
  console.log(actualTitle.includes(searchString));
  expect(actualTitle.includes(searchString)).toBe(false);

  // Close browser
  await browser.close();
});

