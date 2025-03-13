import { UserService } from './user.service';
import { createUserDto } from './Dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: createUserDto, res: Response): Promise<void>;
}
