import { Document, Types } from 'mongoose';
export type RefreshTokenDocument = RefreshToken & Document;
export declare class RefreshToken extends Document {
    user: Types.ObjectId;
    token: string;
    expireAt: Date;
    revoked: boolean;
    replacedByToken?: string;
    userAgent?: string;
    ipAddress?: string;
}
export declare const RefreshTokenSchema: import("mongoose").Schema<RefreshToken, import("mongoose").Model<RefreshToken, any, any, any, Document<unknown, any, RefreshToken> & RefreshToken & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, RefreshToken, Document<unknown, {}, import("mongoose").FlatRecord<RefreshToken>> & import("mongoose").FlatRecord<RefreshToken> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
