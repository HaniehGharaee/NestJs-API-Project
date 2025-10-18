/*
Separating the data layer from the service logic
*/

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './category.schema';
import { Model } from 'mongoose';

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
    @InjectModel(Category.name) private readonly categoryModel: Model<Category>,
  ) {}
  //When you read data from a database (like MongoDB), it is an I/O (input/output) operation and does not return results immediately.
  // Mongoose uses Promises for these operations so that you can get the results after they are completed.
  async findAll(): Promise<Category[]> {
    //This means that this function will return an array of Categories in the future.
    return this.categoryModel.find().lean();
  }
}
