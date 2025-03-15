import {
  Body,
  Res,
  Controller,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express'
import { ApiTags } from '@nestjs/swagger';
import { userSwagger } from '../../swagger';
import { Roles } from './schema/roles.decorator';
import { createUserDto } from './Dto/create-user.dto';

@Controller('user')
@ApiTags('user')
@UseGuards()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @userSwagger('create')
  @Roles('admin')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createUserDto: createUserDto, @Res() res: Response) {
    try {
      const user = await this.userService.createUser(createUserDto)
      return res.status(HttpStatus.CREATED).json({
        success: true,
        message: "",
        data: user,
        status: HttpStatus.CREATED,
      });
    } catch (error) {
      if (error instanceof ConflictException) {
        return res.status(HttpStatus.CONFLICT).json({
          success: false,
          message: error.message,
          status: HttpStatus.CONFLICT,
        })

      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "",
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }
}
