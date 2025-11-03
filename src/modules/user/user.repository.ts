import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  async findByPhone(phone: string): Promise<User | null> {
    return await this.userModel.findOne({ phone }).exec();
    //$or: [{ phone }], //$or is used when you want to have multiple alternative conditions
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }
  
  async findAll(): Promise<User[]> {
    return this.userModel.find().lean();
    //The difference between .find() and .find().lean() is an important performance tip in Mongoose.
  }
}
