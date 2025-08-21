import {
  test,
  Browser,
  BrowserContext,
  Page,
  chromium,
} from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { ProductListPage } from "../pages/ProductListPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import config from "../config.json";

// Test
test("User should be able to add items to the cart", async () => {
  // Launching chrome browser
  const browser: Browser = await chromium.launch({
    headless: config.headless,
    channel: config.channel,
  });

  // Creating new browser context
  const context: BrowserContext = await browser.newContext();

  // Creating new page in the context
  const page: Page = await context.newPage();

  // Test data
  const username: string = config.username;
  const password: string = config.password;
  const productname: string = config.productname;
  const customerFirstName: string = config.customerFirstName;
  const customerLastName: string = config.customerLastName;
  const customerPincode: string = config.customerPincode;

  // Login Test
  // Test Steps
  const login = new LoginPage(page);
  await login.gotoLoginPage();
  await login.login(username, password);
  await login.verifyLogin();

  // Add to cart Test
  // Test Steps
  const product = new ProductListPage(page);
  await product.addToCart(productname);
  await product.verifyItemAddedToCart();

  // Checkout
  // Test Steps
  const order = new CheckoutPage(page);
  await order.checkoutCart(
    customerFirstName,
    customerLastName,
    customerPincode
  );
  await order.verifyOrderPlaced();

  await browser.close();
});
