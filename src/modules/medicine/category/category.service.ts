/*
The main business logic
*/
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './Dto/createCategory.dto';
import { CategoryDocument } from './category.schema';

@Injectable()
// @Injectable() is a decorator that tells NestJS:
// This class is a Provider and should be managed in the Dependency Injection (DI) system.
// That is, Nest should be able to instantiate this class and inject it.
//CategoryService Injected by CategoryController.
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepo.findAll();
    return categories;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    try {
      return await this.categoryRepo.createCategory(createCategoryDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Unexpected error while creating category',
      );
    }
  }
}
