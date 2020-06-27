import { getRepository } from 'typeorm';

import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<string> {
    //
    const categoriesRepository = getRepository(Category);

    const categoryExists = await categoriesRepository.findOne({
      where: {
        title,
      },
    });

    if (!categoryExists) {
      const category = categoriesRepository.create({
        title,
      });

      await categoriesRepository.save(category);
      return category.id;
    }
    return categoryExists.id;
  }
}

export default CreateCategoryService;
