/*
Separating the data layer from the service logic
*/

import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './Dto/createCategory.dto';
import { CategoryDocument } from './category.schema';

@Injectable() //this is a decorator comes from @nestjs/common.
// It tells Nest that this class is a provider and should be managed by Nest’s Dependency Injection (DI) system.
// This allows you to register it inside the providers array of a module and inject it into services or controllers through the constructor.
//CategoryRepository Injected by CategoryService
export class CategoryRepository {
  constructor(
    //constructor(...) {}
    //NestJS automatically injects the dependency when creating this provider.
    // You don’t need to manually connect to the database or instantiate the model — Nest and Mongoose handle it for you.
    //InjectModel: This decorator comes from @nestjs/mongoose.
    //It tells Nest to inject the Mongoose Model that was previously registered using:
    //This means that categoryModel will be an instance of the corresponding Mongoose Model for the Category collection.
    //private readonly categoryModel: Model<Category>:
    //This defines a private and read-only property that stores the injected Mongoose Model instance.
    //The type Model<Category> (from mongoose) gives access to built-in model methods like find, findOne, create, update, etc.
    @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument>,
  ) {}
  //When you read data from a database (like MongoDB), it is an I/O (input/output) operation and does not return results immediately.
  // Mongoose uses Promises for these operations so that you can get the results after they are completed.
  async findAll(): Promise<Category[]> {
    //This means that this function will return an array of Categories in the future.
    return this.categoryModel.find().lean();
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    try {
      const newCategory = new this.categoryModel({
        ...createCategoryDto, //*!
      });
      console.log('createCategoryDtocreateCategoryDto', createCategoryDto);
      return await newCategory.save();
    } catch (error) {
      if ((error as any)?.code === 11000) {
        // Duplicate key (MongoDB unique index violation)
        throw new ConflictException('Category with this name already exists');
      }
      //this.logger.error('Failed to create category', error.stack); ????
      throw new InternalServerErrorException('Failed to create category');
    }
  }
}
