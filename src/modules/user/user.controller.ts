import {
  Body,
  Res,
  Controller,
  HttpStatus,
  Post,
  Get,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from './schema/roles.decorator';
import { CreateUserDto } from './Dto/create-user.dto';

@Controller('user')
@ApiTags('User')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles('superAdmin')
  @ApiOperation({ summary: 'Create user' })
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      return {
        success: true,
        message: 'User created successfully',
        data: user,
        status: HttpStatus.CREATED,
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        return {
          success: false,
          message: error.message,
          status: HttpStatus.CONFLICT,
        };
      }
      return {
        success: false,
        message: '',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  @Get('getAllUsers')
  @Roles('superAdmin')
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    const result = await this.userService.getAllUsers();
    return { success: true, data: result };
  }
}
