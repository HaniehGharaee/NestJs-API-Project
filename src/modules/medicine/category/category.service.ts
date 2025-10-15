/*
The main business logic
*/
import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepo: CategoryRepository) {}

  async getAllCategories() {
    const categories = await this.categoryRepo.findAll();
    return {
      success: true,
      data: categories,
    };
  }
}
