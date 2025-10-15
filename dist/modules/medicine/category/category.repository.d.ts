import { Category } from './category.schema';
import { Model } from 'mongoose';
export declare class CategoryRepository {
    private readonly categoryModel;
    constructor(categoryModel: Model<Category>);
    findAll(): Promise<Category[]>;
}
