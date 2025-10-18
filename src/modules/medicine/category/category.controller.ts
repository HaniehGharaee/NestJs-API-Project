/*
Managing endpoints and HTTP ingress
*/
import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return this.categoryService.getAllCategories();
  }
}
