import { UserRole } from '../schema/user.schema';
export declare class CreateUserDto {
    firstName: string;
    lastName: string;
    phone: string;
    username: string;
    password: string;
    role: UserRole;
    pharmacyId?: string;
}
