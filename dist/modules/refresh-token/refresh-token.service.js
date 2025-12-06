"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenService = void 0;
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("mongoose");
const console_1 = require("console");
let RefreshTokenService = class RefreshTokenService {
    constructor(configService, refreshTokenModel) {
        this.configService = configService;
        this.refreshTokenModel = refreshTokenModel;
    }
    async createRefreshToken(userId, userAgent, ipAddress) {
        const token = jwt.sign({ userId }, this.configService.get('JWT_REFRESH_SECRET'), {
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
        });
        const expireAt = new Date();
        const expiresInSeconds = this.convertExpireToSeconds(this.configService.get('JWT_REFRESH_EXPIRES'));
        expireAt.setSeconds(expireAt.getSeconds() + expiresInSeconds);
        const refreshToken = new this.refreshTokenModel({
            user: userId,
            token,
            expireAt,
            userAgent: userAgent || null,
            ipAddress: ipAddress || null,
        });
        return refreshToken.save();
    }
    convertExpireToSeconds(expire) {
        const time = parseInt(expire);
        if (expire.endsWith('H'))
            return time * 3600;
        if (expire.endsWith('m'))
            return time * 60;
        if (expire.endsWith('s'))
            return time;
        return time;
    }
    async validateRefreshToken(token) {
        const refreshToken = await this.refreshTokenModel.findOne({
            token,
            revoked: false,
        });
        if (!refreshToken || new Date() > refreshToken.expireAt) {
            return null;
        }
        return refreshToken;
    }
    async rotateRefreshToken(oldToken, userAgent, ipAddress) {
        const oldRefreshToken = await this.validateRefreshToken(oldToken);
        if (!oldRefreshToken) {
            throw new console_1.error('Invalid or expired refresh token');
        }
        return this.createRefreshToken(oldRefreshToken.user.toString(), userAgent, ipAddress);
    }
};
exports.RefreshTokenService = RefreshTokenService;
exports.RefreshTokenService = RefreshTokenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_1.Model])
], RefreshTokenService);
//# sourceMappingURL=refresh-token.service.js.map