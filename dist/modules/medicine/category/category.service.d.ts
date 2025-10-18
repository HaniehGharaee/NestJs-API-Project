import { CategoryRepository } from './category.repository';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    getAllCategories(): Promise<{
        success: boolean;
        data: import("./category.schema").Category[];
    }>;
}
