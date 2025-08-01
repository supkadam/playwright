import {test, expect, Browser, Page} from '@playwright/test'
import {chromium, firefox, webkit} from '@playwright/test'

// test
test('Registration test', async()=>{

    // Launch browser
    const browser:Browser = await firefox.launch({headless: false});

    // Open new page
    const page:Page = await browser.newPage();

    // Goto url
    await page.goto('https://naveenautomationlabs.com/opencart/index.php?route=account/register');

    // Fill the registration form
    const firstname:string = 'Daria';
    const lastname:string = 'Zimmermaan';
    const email:string = 'dar@gh3.com';
    const phone:string = '1783299992';
    const password:string = 'p@ssw0rd';
    const confirmPassword:string = 'p@ssw0rd';

    await page.locator("#input-firstname").fill(firstname);
    await page.locator("#input-lastname").fill(lastname);
    await page.locator("#input-email").fill(email);
    await page.locator("#input-telephone").fill(phone);
    await page.locator("#input-password").fill(password);
    await page.locator("#input-confirm").fill(confirmPassword);
    await page.check("[name='agree']")

    await page.locator("[value='Continue']").click();

    // Assertions
    const pageTitle = 'Your Account Has Been Created!'
    await expect(page).toHaveTitle(pageTitle)
    const header = page.locator("#content h1");
    await expect(header).toHaveText(pageTitle);
    await browser.close();

});