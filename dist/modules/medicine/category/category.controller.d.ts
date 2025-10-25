import { HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './Dto/createCategory.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        success: boolean;
        data: import("./category.schema").Category[];
    }>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        success: boolean;
        message: string;
        data: import("./category.schema").CategoryDocument;
        status: HttpStatus;
    }>;
}
