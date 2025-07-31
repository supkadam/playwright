import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test('Add to cart functionality', async () => {
    // Launch Chrome browser (not Chromium)
    const browser = await chromium.launch({
        headless: false, // Set to true for headless mode
        channel: 'chrome', // Important: Launch actual Chrome, not bundled Chromium
    });
    
    // Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to a URL
    await page.goto('https://www.saucedemo.com/v1/');

    // Test data
    const username = 'standard_user';
    const password = 'secret_sauce';

    // Test steps
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();

    const itemCount = 3;

    // Get list of inventory items
    const items = page.locator('.inventory_item');

    // Add items to cart
    for (let i = 0; i < itemCount; i++) {
        const item = items.nth(i);
        const button = item.locator('.pricebar button');
        await button.click();
        await expect(button).toHaveText('REMOVE');
    }
 
    // Verify cart count    
    const cartCount = await page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText(String(itemCount));

    // Close browser
    await browser.close();

});