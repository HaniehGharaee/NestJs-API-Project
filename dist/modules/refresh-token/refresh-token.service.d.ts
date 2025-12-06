import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { RefreshTokenDocument } from './schema/refresh-token.schema';
export declare class RefreshTokenService {
    private configService;
    private refreshTokenModel;
    constructor(configService: ConfigService, refreshTokenModel: Model<RefreshTokenDocument>);
    createRefreshToken(userId: string, userAgent?: string, ipAddress?: string): Promise<import("mongoose").Document<unknown, {}, RefreshTokenDocument> & import("./schema/refresh-token.schema").RefreshToken & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    private convertExpireToSeconds;
    validateRefreshToken(token: string): Promise<RefreshTokenDocument | null>;
    rotateRefreshToken(oldToken: string, userAgent: string, ipAddress: string): Promise<import("mongoose").Document<unknown, {}, RefreshTokenDocument> & import("./schema/refresh-token.schema").RefreshToken & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
