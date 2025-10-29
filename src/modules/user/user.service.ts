import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepository.findExistingUser(
        createUserDto.phone,
      );
      if (existingUser) {
        throw new ConflictException(
          'کاربر با این شماره موبایل یا کد ملی وجود دارد',
        );
      }
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }
  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
}
