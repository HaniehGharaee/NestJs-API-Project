import { createUserDto } from './Dto/create-user.dto';
import { PaginateModel } from 'mongoose';
import { User, UserDocument } from 'src/modules/user/schema/user.schema';
export declare class UserRepository {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: PaginateModel<UserDocument>);
    findExistingUser(phone: string, nationalId: string): Promise<User | null>;
    create(createUserDto: createUserDto): Promise<User>;
}
