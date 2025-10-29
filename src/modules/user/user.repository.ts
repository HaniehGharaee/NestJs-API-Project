import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import path from 'path';
import { CreateUserDto } from './Dto/create-user.dto';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);
  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<UserDocument>,
  ) {}

  async findExistingUser(phone: string): Promise<User | null> {
    try {
      return await this.userModel.findOne({
        $or: [{ phone }],
      });
    } catch (error) {
      this.logger.error('Error finding user', error);
      throw error;
    }
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createUser = new this.userModel(createUserDto);

      return await createUser.save();
    } catch (error) {
      this.logger.error('Error finding user', error);
      throw error;
    }
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
    //The difference between .find() and .find().lean() is an important performance tip in Mongoose.
  }

}
