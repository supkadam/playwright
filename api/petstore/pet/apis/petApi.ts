import { APIRequestContext } from '@playwright/test';
//import { Pet } from '../models/PetModel';

export class PetAPI {
  private endpoint: string;

  constructor(baseUrl: string) {
    this.endpoint = `${baseUrl}/pet`;
  }

  async getPetById(request: APIRequestContext, petId: number) {
    return request.get(`${this.endpoint}/${petId}`);
  }

  async createPet(request: APIRequestContext, petData: object) {
    return request.post(this.endpoint, {
      data: petData,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async updatePet(request: APIRequestContext, petData: object) {
    return request.put(this.endpoint, {
      data: petData,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async deletePet(request: APIRequestContext, petId: number) {
    return request.delete(`${this.endpoint}/${petId}`);
  }

  
}
