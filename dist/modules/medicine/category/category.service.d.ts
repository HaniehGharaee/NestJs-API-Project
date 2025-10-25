import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './Dto/createCategory.dto';
import { CategoryDocument } from './category.schema';
export declare class CategoryService {
    private readonly categoryRepo;
    constructor(categoryRepo: CategoryRepository);
    getAllCategories(): Promise<import("./category.schema").Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument>;
}
