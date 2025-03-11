import {
  Body,
  Res,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { APP_FILTER } from '@nestjs/core';
import { ApiTags } from '@nestjs/swagger';
import { userSwagger } from '../../swagger';
import { Roles } from './schema/roles.decorator';
import { createUserDto } from './Dto/create-user.dto';

@Controller('user')
@ApiTags('user')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  @userSwagger('create')
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: createUserDto, @Res() res: Response) {
    const user = await this.userService.createUser(createUserDto)
  }
}
