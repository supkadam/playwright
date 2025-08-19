// utils/PetUtils.ts
import { Pet, Category, Tag } from "../models/petModel";

export class PetUtils {
  static getRandomId(): number {
    return Math.floor(Math.random() * 1000000);
  }

  static getRandomName(prefix: string = "pet"): string {
    return `${prefix}-${Math.floor(Math.random() * 10000)}`;
  }

  static getRandomStatus(): "available" | "pending" | "sold" {
    const statuses: Array<"available" | "pending" | "sold"> = ["available", "pending", "sold"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  static createRandomCategory(): Category {
    return {
      id: Math.floor(Math.random() * 1000),
      name: "Category-" + Math.floor(Math.random() * 1000),
    };
  }

  static createRandomTag(): Tag {
    return {
      id: Math.floor(Math.random() * 1000),
      name: "Tag-" + Math.floor(Math.random() * 1000),
    };
  }

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
