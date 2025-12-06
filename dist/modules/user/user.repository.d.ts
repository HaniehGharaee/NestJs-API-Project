import { CreateUserDto } from './Dto/create-user.dto';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';
export declare class UserRepository {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: PaginateModel<UserDocument>);
    findByPhone(phone: string): Promise<User | null>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findByUsername(username: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
