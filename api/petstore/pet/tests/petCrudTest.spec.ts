import { BaseAPI } from "../../baseApi/BaseApi";
import { test, expect } from "../../baseApi/BaseFixture";
import { PetUtils } from "../utils/randomPet";
import { ApiTimer } from "../utils/ApiTimer";
import { StatusCodes } from 'http-status-codes';
import config from '../../config.json';

test.describe("Pet CRUD API Tests", () => {

  // Post request
  test("Should able to create a new Pet", async ({ request, baseAPI }) => {

    const newPet = PetUtils.createRandomPet();

    // Calling helper method which hits the API endpoint and calculates response time 
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.petAPI().createPet(request, newPet)
    );

    expect(duration).toBeLessThan(config.standardApiResponseTimeout);
    expect(response.status()).toBe(StatusCodes.OK);
    const petDetails = await response.json();
    expect(petDetails.id).toBe(newPet.id);
    expect(petDetails.name).toBe(newPet.name);
  }); 

  // Get request
  test("Should return pet details for given pet id", async ({ request, baseAPI }) => {

    const pet = PetUtils.createRandomPet();
    await baseAPI.petAPI().createPet(request, pet);

    // Calling helper method which hits the API endpoint and calculates response time 
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.petAPI().getPetById(request,pet.id)
    );

    expect(duration).toBeLessThan(config.standardApiResponseTimeout);
    expect(response.status()).toBe(StatusCodes.OK);
    const petDetails = await response.json();
    expect(petDetails).toHaveProperty('id', pet.id);
    expect(petDetails).toHaveProperty('name', pet.name);
  });

  // Put request
  test("Should able to update details of an existing pet", async ({ request, baseAPI }) => {

    const pet = PetUtils.createRandomPet();
    await baseAPI.petAPI().createPet(request, pet);

    // Calling helper method which hits the API endpoint and calculates response time 
    const updatedPet = {...pet, name:PetUtils.getRandomName(), status: PetUtils.getRandomStatus()}
    
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.petAPI().updatePet(request, updatedPet)
    );

    expect(duration).toBeLessThan(config.standardApiResponseTimeout);
    expect(response.status()).toBe(StatusCodes.OK);
    const apiResponse = await baseAPI.petAPI().getPetById(request, pet.id);
    const petDetails = await apiResponse.json();
    expect(petDetails.name).toBe(pet.name);
    expect(petDetails.status).toBe(pet.status);
  }); 

  // Delete request
  test("Should able to delete existing pet", async ({ request, baseAPI }) => {

    const pet = PetUtils.createRandomPet();
    await baseAPI.petAPI().createPet(request, pet);
    
    // Calling helper method which hits the API endpoint and calculates response time  ̰
    const { response, duration } = await ApiTimer.measureResponseTime(
      () => baseAPI.petAPI().deletePet(request, pet.id)
    );

    expect(duration).toBeLessThan(config.standardApiResponseTimeout);
    expect(response.status()).toBe(StatusCodes.OK);
    const getResponse = await baseAPI.petAPI().getPetById(request, pet.id);
    expect(getResponse.status()).toBe(StatusCodes.NOT_FOUND);
  }); 
});
