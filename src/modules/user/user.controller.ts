import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Roles } from './schema/roles.decorator';
import { CreateUserDto } from './Dto/create-user.dto';
//The Controller only handles input and output. It has no try/catch, no error logic.
@Controller('user')
@ApiTags('User')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @Roles('superAdmin')
  @ApiOperation({ summary: 'Create a new user' })
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return {
      success: true,
      message: 'User created successfully',
      data: user,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('getAllUsers')
  @Roles('superAdmin')
  @ApiOperation({ summary: 'Get all users' })
  async getUsers() {
    const result = await this.userService.getAllUsers();
    return {
      success: true,
      statusCode: HttpStatus.OK,
      message: 'Fetched all users successfully',
      data: result,
    };
  }
}
