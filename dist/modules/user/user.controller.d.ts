import { HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './Dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        success: boolean;
        message: string;
        data: import("./schema/user.schema").User;
        statusCode: HttpStatus;
    }>;
    getUsers(): Promise<{
        success: boolean;
        statusCode: HttpStatus;
        message: string;
        data: import("./schema/user.schema").User[];
    }>;
}
