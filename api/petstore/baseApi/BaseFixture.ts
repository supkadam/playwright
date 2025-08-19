import { test as base } from '@playwright/test';
import { BaseAPI } from './BaseApi';

// extend the Playwright test object
type MyFixtures = {
  baseAPI: BaseAPI;
};

export const test = base.extend<MyFixtures>({
  baseAPI: async ({}, use) => {
    const baseAPI = new BaseAPI(); // create once per test
    await use(baseAPI);           // make it available to the test
  },
});

export { expect } from '@playwright/test';