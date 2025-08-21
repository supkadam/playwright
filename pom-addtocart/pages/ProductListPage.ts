import { Locator, Page, expect } from '@playwright/test';

/**
 * Page Object Model class representing the Product Listing page.
 * Provides methods to add a product to the cart and verify the cart count.
 */
export class ProductListPage {
  private page: Page;

  /**
   * Initializes the ProductListPage with a Playwright Page instance.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /** Locator for the list of all products */
  get productList() { return this.page.locator('//div[@class="inventory_item"]'); }

  /** Locator for the product title inside each product */
  get productTitle() { return this.page.locator('//div[@class="inventory_item_name"]'); }

  /** Locator for the 'Add to Cart' button */
  get addToCartBtn() { return this.page.locator('.btn_primary.btn_inventory'); }

  /** Locator for the cart item count badge */
  get cartCountLocator() { return this.page.locator('.shopping_cart_badge'); }

  /** Expected cart count after adding one product */
  get expectedCartCount() { return '1'; }

  /**
   * Adds a product to the cart by its name.
   * @param productName The name of the product to add
   */
  async addToCart(productName: string) {
    const products: Locator = this.productList;
    const count: number = await products.count();

    for (let i = 0; i < count; i++) {
      const product = products.nth(i);
      const prodName = await product.locator('//div[@class="inventory_item_name"]').textContent();

      if (prodName === productName) {
        await product.locator('.btn_primary.btn_inventory').click();
        break;
      }
    }
  }

  /**
   * Verifies that the product has been added to the cart
   * by checking the cart badge count.
   */
  async verifyItemAddedToCart() {
    const count = await this.cartCountLocator.textContent();
    expect(count).toBe(this.expectedCartCount);
  }
}
