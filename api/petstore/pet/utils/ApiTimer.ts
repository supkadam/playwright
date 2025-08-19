import type { APIResponse } from "@playwright/test";

export class ApiTimer {
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