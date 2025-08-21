import type { APIResponse } from "@playwright/test";

/**
 * Utility class for measuring API response times.
 */
export class ApiTimer {
  /**
   * Measures the time taken for an API request to complete.
   *
   * @param requestFn - A function that returns a Promise resolving to an APIResponse.
   *                    Typically, this is a call to Playwright's request methods.
   * @returns A Promise that resolves to an object containing:
   *          - `response`: the API response returned by `requestFn`
   *          - `duration`: time taken in milliseconds to receive the response
   *
   */
  static async measureResponseTime(
    requestFn: () => Promise<APIResponse>
  ): Promise<{ response: APIResponse; duration: number }> {
    const startTime = Date.now();
    const response = await requestFn();
    const endTime = Date.now();
    const duration = endTime - startTime;
    return { response, duration };
  }
}
