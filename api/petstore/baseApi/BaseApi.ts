import config from '../config.json';
import { PetAPI } from '../pet/apis/petApi';

export class BaseAPI {
  public baseUrl: string;
  public pet: PetAPI;

  constructor() {
    this.baseUrl = config.baseURL;
    this.pet = new PetAPI(this.baseUrl);
  }
}
