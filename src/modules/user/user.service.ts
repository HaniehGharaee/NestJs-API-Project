import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { createUserDto } from './Dto/create-user.dto';
import { User } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: createUserDto): Promise<User> {
    const { phone, nationalId, role, firstName, lastName } = createUserDto;
    try {
      const existingUser = await this.userRepository.findExistingUser(
        phone,
        nationalId,
      );
      if (existingUser) {
        throw new ConflictException(
          'کاربر با این شماره موبایل یا کد ملی وجود دارد',
        );
      }
      const user = {
        phone,
        nationalId,
        firstName,
        lastName,
        role,
      };
      return await this.userRepository.create(user);
    } catch (error) {
      this.logger.error('Error creating user', error);
      throw error;
    }
  }
}
