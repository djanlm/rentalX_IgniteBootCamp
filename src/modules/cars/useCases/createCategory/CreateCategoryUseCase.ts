import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  private categoriesRepository: ICategoriesRepository;

  constructor(categoriesRepository: ICategoriesRepository) {
    this.categoriesRepository = categoriesRepository;
  }
  async execute({ name, description }: IRequest): Promise<void> {

    const categoryAlredyExists = await this.categoriesRepository.findByName(name);

    if (categoryAlredyExists) {
      throw new Error("Category already exists.");
    }

    this.categoriesRepository.create({ name, description });

  }

}

export { CreateCategoryUseCase }