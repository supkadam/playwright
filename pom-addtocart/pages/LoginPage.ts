import { Page, expect } from '@playwright/test';
import { BaseUrl } from '../utils/BaseApi';

/**
 * Page Object Model class representing the Login page.
 * Provides methods to interact with login elements and verify login success.
 */
export class LoginPage {
  private page: Page;

  /**
   * Initializes the LoginPage with a Playwright Page instance.
   * @param page Playwright Page object
   */
  constructor(page: Page) {
    this.page = page;
  }

  /** Locator for the username input field */
  get usernameInput() { return this.page.locator('#user-name'); }

  /** Locator for the password input field */
  get passwordInput() { return this.page.locator('#password'); }

  /** Locator for the login button */
  get loginButton() { return this.page.locator('#login-button'); }

  /** Locator for the product label shown after successful login */
  get productLabel() { return this.page.locator('.product_label'); }

  /**
   * Navigates to the login page.
   */
  async gotoLoginPage() {
    await this.page.goto(BaseUrl.baseurl);
  }

  /**
   * Logs in with the provided username and password.
   * @param username The username to enter
   * @param password The password to enter
   */
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /**
   * Verifies that login was successful by checking if the product label is visible.
   */
  async verifyLogin() {
    await expect(this.productLabel).toBeVisible();
  }
}
