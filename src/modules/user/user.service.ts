import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from 'src/modules/user/schema/user.schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByPhone(
      createUserDto.phone,
    );
    if (existingUser) {
      throw new ConflictException('A user with this phone already exists');
    }
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      this.logger.error('Database error while creating user', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      this.logger.error('Database error while fetching users', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }

  async findByUsername(username: string) {
    return this.userRepository.findByUsername(username)
  }

  async findById(id: string){
    return this.userRepository.findById(id)
  }
}
