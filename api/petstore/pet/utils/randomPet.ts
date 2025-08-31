
import { Pet, Category, Tag } from "../models/petModel";

/**
 * Utility class for generating random Pet.
 * Provides helper methods to create random IDs, names, statuses, categories, tags, and full Pet objects.
 */
export class PetUtils {
  /**
   * Generates a random numeric ID.
   * @returns A random number between 0 and 999,999.
   */
  static getRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  /**
   * Generates a random name with an optional prefix.
   * @param prefix - A string prefix for the name. Defaults to "pet".
   * @returns A random name string like "pet-1234".
   */
  static getRandomName(prefix: string = "pet"): string {
    return `${prefix}-${Math.floor(Math.random() * 10000)}`;
  }

  /**
   * Returns a random pet status.
   * @returns One of "available", "pending", or "sold".
   */
  static getRandomStatus(): "available" | "pending" | "sold" {
    const statuses: Array<"available" | "pending" | "sold"> = ["available", "pending", "sold"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  /**
   * Creates a random Category object.
   * @returns A Category object with random id and name.
   */
  static createRandomCategory(): Category {
    return {
      id: Math.floor(Math.random() * 1000),
      name: "Category-" + Math.floor(Math.random() * 1000),
    };
  }

  /**
   * Creates a random Tag object.
   * @returns A Tag object with random id and name.
   */
  static createRandomTag(): Tag {
    return {
      id: Math.floor(Math.random() * 1000),
      name: "Tag-" + Math.floor(Math.random() * 1000),
    };
  }

  /**
   * Creates a complete random Pet object.
   * @returns A Pet object with random id, name, category, photoUrls, tags, and status.
   */
  static createRandomPet(): Pet {
    return {
      id: this.getRandomId(),
      name: this.getRandomName(),
      category: this.createRandomCategory(),
      photoUrls: [`https://example.com/photo-${Math.floor(Math.random() * 1000)}.jpg`],
      tags: [this.createRandomTag()],
      status: this.getRandomStatus(),
    };
  }
}
