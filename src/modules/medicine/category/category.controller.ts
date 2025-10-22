/*
Managing endpoints and HTTP ingress
*/
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateCategoryDto } from './Dto/createCategory.dto';

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

  // @Res() is commonly used in NestJS to manually control the Response, but the official NestJS recommendation is to use it only in special cases.
  // Normally it is better to return and let NestJS construct the response itself.
  //Controller should not have too many try/catch ❌
  //Because NestJS automatically handles Exceptions.
  @Post('create')
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const createCategory =
      await this.categoryService.createCategory(createCategoryDto);
    return {
      //Writing res.status(HttpStatus.CREATED) is correct and standard.
      success: true,
      message: 'Category created successfully',
      data: createCategory,
      status: HttpStatus.CREATED,
    };
  }
}
