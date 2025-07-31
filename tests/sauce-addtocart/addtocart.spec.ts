import { test, expect, chromium, firefox, webkit } from '@playwright/test';

test('Add to cart functionality', async () => {
    // Launch browser
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

    // Login steps
    await page.locator('#user-name').fill(username);
    await page.locator('#password').fill(password);
    await page.locator('#login-button').click();

    // Get list of inventory items
    const items = page.locator('.inventory_item');

    // Add items to cart
    const itemCount = 2;
    for (let i = 0; i < itemCount; i++) {
        const item = items.nth(i);
        const button = item.locator('.pricebar button');
        await button.click();
        await expect(button).toHaveText('REMOVE');
    }
 
    // Verify cart count    
    const cartCount = await page.locator('.shopping_cart_badge');
    await expect(cartCount).toHaveText(String(itemCount));

    // Go to cart and checkout
    await page.locator('.shopping_cart_link').click();
    await page.locator('.checkout_button').click();

    // Fill details for checkout
    const firstname = 'abc';
    const lastname = 'def';
    const zipcode = '1334';

    await page.locator('#first-name').fill(firstname);
    await page.locator('#last-name').fill(lastname);
    await page.locator('#postal-code').fill(zipcode);
    await page.locator('.cart_button').click();

    // Confirm checkout
    await page.locator('.cart_button:has-text("FINISH")').click();
    const confirmationText = 'THANK YOU FOR YOUR ORDER';
    await expect(page.locator('.complete-header')).toHaveText(confirmationText);

    // Close browser
    await browser.close();

});