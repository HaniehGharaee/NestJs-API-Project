/*
Managing endpoints and HTTP ingress
*/
import { Controller, Get, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('getAll')
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({
    status: 200,
    description: 'List of all categories retrieved successfully',
  })
  async getCategories() {
    const result = await this.categoryService.getAllCategories();
    return { success: true, data: result };
  }
}
