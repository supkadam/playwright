import { BaseAPI } from "../../baseApi/BaseApi";
import { test, expect } from "../../baseApi/BaseFixture";
import { PetUtils } from "../utils/randomPet";
import { ApiTimer } from "../utils/ApiTimer";

test.describe("Pet CRUD API Tests", () => {

  // Post request
  test("Should able to create a new Pet", async ({ request, baseAPI }) => {

    // Test data/ Pre-conditions
    const newPet = PetUtils.createRandomPet();

    // Test Steps
    // Calling helper method which hits the API endpoint and calculates response time 
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.pet.createPet(request, newPet)
    );

    // Assert response time
    expect(duration).toBeLessThan(1000);

    // Verify successful creation
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.id).toBe(newPet.id);
    expect(body.name).toBe(newPet.name);
  }); 

  // Get request
  test("Should return pet details for given pet id", async ({ request, baseAPI }) => {

    // Test data/ Pre-conditions
    const pet = PetUtils.createRandomPet();
    await baseAPI.pet.createPet(request, pet);

    // Test Steps
    // Calling helper method which hits the API endpoint and calculates response time 
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.pet.getPetById(request,pet.id)
    );

    // Assert response time
    expect(duration).toBeLessThan(1000);
    
    // Verify pet details
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('id', pet.id);
    expect(data).toHaveProperty('name', pet.name);
  });

  // Put request
  test("Should able to update details of an existing pet", async ({ request, baseAPI }) => {
    // Test data / Pre-conditions
    const pet = PetUtils.createRandomPet();
    await baseAPI.pet.createPet(request, pet);

    // Test Steps
    // Calling helper method which hits the API endpoint and calculates response time 
    const updatedPet = {...pet, name:PetUtils.getRandomName(), status: PetUtils.getRandomStatus()}
    
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.pet.updatePet(request, updatedPet)
    );

    // Assert response time
    expect(duration).toBeLessThan(1000);

    // Verify successful updation
    expect(response.status()).toBe(200);
    const getResponse = await baseAPI.pet.getPetById(request, pet.id);
    const body = await getResponse.json();
    expect(body.name).toBe(pet.name);
    expect(body.status).toBe(pet.status);
  }); 

  // Delete request
  test("Should able to delete existing pet", async ({ request, baseAPI }) => {
    // Test data / Pre-conditions
    const pet = PetUtils.createRandomPet();
    await baseAPI.pet.createPet(request, pet);
    
    // Test Steps
    // Calling helper method which hits the API endpoint and calculates response time  ̰
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.pet.deletePet(request, pet.id)
    );

    // Assert response time
    expect(duration).toBeLessThan(1000);

    // Verify successful delete
    expect(response.status()).toBe(200);
    const getResponse = await baseAPI.pet.getPetById(request, pet.id);
    expect(getResponse.status()).toBe(404);
  }); 
});
