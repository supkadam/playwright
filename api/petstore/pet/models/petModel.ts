/**
 * Represents a category that a pet can belong to.
 */
export interface Category {
  id: number;
  name: string;
}

/**
 * Represents a tag that can be associated with a pet.
 */
export interface Tag {
  id: number;
  name: string;
}

/**
 * Represents a pet in the system.
 */
export interface Pet {
  id: number;
  name: string;
  category?: Category;
  photoUrls: string[];
  tags?: Tag[];
  status?: "available" | "pending" | "sold";
}
