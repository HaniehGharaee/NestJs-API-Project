import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './Dto/createCategory.dto';
import { CategoryDocument } from './category.schema';
export declare class CategoryRepository {
    private readonly categoryModel;
    constructor(categoryModel: Model<CategoryDocument>);
    findAll(): Promise<Category[]>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<CategoryDocument>;
}
