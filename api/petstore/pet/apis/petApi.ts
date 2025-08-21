import { APIRequestContext } from '@playwright/test';

/**
 * PetAPI provides methods to interact with the Pet endpoints of the API.
 * It allows creating, retrieving, updating, and deleting pets.
 */
export class PetAPI {
  private endpoint: string;

  constructor(baseUrl: string) {
    this.endpoint = `${baseUrl}/pet`;
  }

  /**
   * Retrieves a pet by its ID.
   * @param request - The Playwright APIRequestContext instance used to make the request
   * @param petId - The ID of the pet to retrieve
   * @returns A Promise resolving to the API response
   */
  async getPetById(request: APIRequestContext, petId: number) {
    return request.get(`${this.endpoint}/${petId}`);
  }

  /**
   * Creates a new pet with the provided data.
   * @param request - The Playwright APIRequestContext instance used to make the request
   * @param petData - An object representing the pet's details
   * @returns A Promise resolving to the API response
   */
  async createPet(request: APIRequestContext, petData: object) {
    return request.post(this.endpoint, {
      data: petData,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Updates an existing pet with the provided data.
   * @param request - The Playwright APIRequestContext instance used to make the request
   * @param petData - An object representing the updated pet details
   * @returns A Promise resolving to the API response
   */
  async updatePet(request: APIRequestContext, petData: object) {
    return request.put(this.endpoint, {
      data: petData,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  /**
   * Deletes a pet by its ID.
   * @param request - The Playwright APIRequestContext instance used to make the request
   * @param petId - The ID of the pet to delete
   * @returns A Promise resolving to the API response
   */
  async deletePet(request: APIRequestContext, petId: number) {
    return request.delete(`${this.endpoint}/${petId}`);
  }
}
