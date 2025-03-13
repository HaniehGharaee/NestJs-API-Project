import { UserRepository } from './user.repository';
import { createUserDto } from './Dto/create-user.dto';
import { User } from 'src/modules/user/schema/user.schema';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: createUserDto): Promise<User>;
}
