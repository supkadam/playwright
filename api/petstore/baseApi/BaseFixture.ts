import { test as base } from '@playwright/test';
import { BaseAPI } from './BaseApi';

/**
 * Custom fixture types for Playwright tests.
 * Extends the base Playwright test object with a `baseAPI` fixture.
 */
type MyFixtures = {
  baseAPI: BaseAPI;
};

/**
 * Extended Playwright test object with custom fixtures.
 * Adds a `baseAPI` fixture that provides an initialized BaseAPI instance for each test.
 */
export const test = base.extend<MyFixtures>({
  /**
   * Provides an initialized BaseAPI instance to tests.
   * @param _params - Built-in Playwright fixtures (not used here)
   * @param use - Function to make the fixture available in the test
   */
  baseAPI: async ({}, use) => {
    const baseAPI = new BaseAPI(); // create once per test
    await use(baseAPI);            // make it available to the test
  },
});

export { expect } from '@playwright/test';
