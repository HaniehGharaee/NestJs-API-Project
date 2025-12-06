import { UserRepository } from './user.repository';
import { CreateUserDto } from './Dto/create-user.dto';
import { User } from 'src/modules/user/schema/user.schema';
export declare class UserService {
    private readonly userRepository;
    private readonly logger;
    constructor(userRepository: UserRepository);
    createUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<User[]>;
    findByUsername(username: string): Promise<User>;
    findById(id: string): Promise<User>;
}
