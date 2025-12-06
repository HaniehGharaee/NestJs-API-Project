import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './../refresh-token/refresh-token.service';
export declare class AuthService {
    private userService;
    private readonly jwtService;
    private readonly refreshTokenService;
    private readonly configService;
    constructor(userService: UserService, jwtService: JwtService, refreshTokenService: RefreshTokenService, configService: ConfigService);
    validateUser(username: string, password: string): Promise<import("../user/schema/user.schema").User>;
    login(user: any, userAgent?: string, ipAddress?: string): Promise<{
        accessToken: string;
        refreshToken: import("mongoose").Document<unknown, {}, import("../refresh-token/schema/refresh-token.schema").RefreshTokenDocument> & import("../refresh-token/schema/refresh-token.schema").RefreshToken & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    refreshToken(oldRefreshToken: string, userAgent: string, ipAddress: string): Promise<{
        accessToken: string;
        refreshToken: import("mongoose").Document<unknown, {}, import("../refresh-token/schema/refresh-token.schema").RefreshTokenDocument> & import("../refresh-token/schema/refresh-token.schema").RefreshToken & import("mongoose").Document<unknown, any, any> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
}
