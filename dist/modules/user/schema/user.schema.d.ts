import { Document, Types } from 'mongoose';
export type UserDocument = User & Document;
export declare enum UserRole {
    SUPER_ADMIN = "superAdmin",
    PHARMACY_ADMIN = "pharmacyAdmin",
    PHARMACIST = "pharmacist",
    ACCOUNTANT = "accountant"
}
export declare class User extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    nationalId: string;
    phone: string;
    role: UserRole;
    pharmacyId: Types.ObjectId;
    address: string;
    refreshToken?: Types.ObjectId[];
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
