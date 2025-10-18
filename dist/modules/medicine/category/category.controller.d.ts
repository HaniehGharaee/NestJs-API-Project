import { CategoryService } from './category.service';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    getCategories(): Promise<{
        success: boolean;
        data: import("./category.schema").Category[];
    }>;
}
