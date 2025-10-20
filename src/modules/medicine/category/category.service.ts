/*
The main business logic
*/
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

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
}
