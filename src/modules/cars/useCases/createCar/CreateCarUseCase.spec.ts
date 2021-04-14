import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsReposirotyInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"


let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create car", () => {

  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("it should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name Car test",
      description: "Description car test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand test",
      category_id: "category test"
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with the same license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "Name Car test",
        description: "Description car test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand test",
        category_id: "category test"
      });

      await createCarUseCase.execute({
        name: "Name Car2 test",
        description: "Description car test",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand test",
        category_id: "category test"
      });
    }).rejects.toBeInstanceOf(AppError);
  });


  it("should be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car available test",
      description: "Description car test",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand test",
      category_id: "category test"
    });

    expect(car.available).toBe(true);
  });


})