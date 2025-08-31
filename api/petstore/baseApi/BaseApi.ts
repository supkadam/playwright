import config from "../config.json";
import { PetAPI } from "../pet/apis/petApi";

/**
 * BaseAPI serves as a base class for initializing API modules.
 * It holds the common configuration, like the base URL, and provides methods
 * to access different API endpoints such as PetAPI.
 */
export class BaseAPI {
  public baseUrl: string;
  
  constructor() {
    this.baseUrl = config.baseURL;
  }

  /**
   * Creates and returns a new instance of PetAPI.
   * @returns {PetAPI} A new PetAPI instance initialized with the base URL
   */
  public petAPI() {
    return new PetAPI(this.baseUrl);
  }
}
