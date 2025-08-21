import { Page, expect } from "@playwright/test";

/**
 * Page Object Model class representing the Checkout process.
 * Provides methods to perform checkout and verify successful order placement.
 */
export class CheckoutPage {
  private page: Page;

  /**
   * Initializes the CheckoutPage with a Playwright Page instance.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /** Locator for the shopping cart icon */
  get addtoCartIcon() { return this.page.locator(".shopping_cart_link"); }

  /** Locator for the checkout button */
  get checkoutButton() { return this.page.locator(".btn_action.checkout_button"); }

  /** Locator for the first name input field */
  get firstName() { return this.page.locator("#first-name"); }

  /** Locator for the last name input field */
  get lastName() { return this.page.locator("#last-name"); }

  /** Locator for the postal code input field */
  get postalCode() { return this.page.locator("#postal-code"); }

  /** Locator for the continue button */
  get continueBtn() { return this.page.locator(".btn_primary.cart_button"); }

  /** Locator for the finish button */
  get finishBtn() { return this.page.locator(".btn_action.cart_button"); }

  /** Locator for the order confirmation container */
  get orderConfirmation() { return this.page.locator("#checkout_complete_container"); }

  /**
   * Performs checkout by filling customer details and completing the order.
   * @param firstname Customer's first name
   * @param lastname Customer's last name
   * @param pincode Customer's postal code
   */
  async checkoutCart(firstname: string, lastname: string, pincode: string) {
    await this.addtoCartIcon.click();
    await this.checkoutButton.click();
    await this.firstName.fill(firstname);
    await this.lastName.fill(lastname);
    await this.postalCode.fill(pincode);
    await this.continueBtn.click();
    await this.finishBtn.click();
  }

  /**
   * Verifies that the order has been placed successfully
   * by checking if the confirmation container is visible.
   */
  async verifyOrderPlaced() {
    await expect(this.orderConfirmation).toBeVisible();
  }
}
