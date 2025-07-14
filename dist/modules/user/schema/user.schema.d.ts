import { Document, Types } from 'mongoose';
import { UserRole } from './roles.enum';
export type UserDocument = User & Document;
export declare class User extends Document {
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    nationalId: string;
    phone: string;
    role: UserRole;
    pharmacyId: Types.ObjectId;
    address: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, Document<unknown, any, User> & User & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, User, Document<unknown, {}, import("mongoose").FlatRecord<User>> & import("mongoose").FlatRecord<User> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
