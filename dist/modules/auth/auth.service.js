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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const refresh_token_service_1 = require("./../refresh-token/refresh-token.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, refreshTokenService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
        this.configService = configService;
    }
    async validateUser(username, password) {
        const user = await this.userService.findByUsername(username);
        const dummyPasswordHash = '$2b$10$CQo2jCAWiODR4/1yJfxzoOAmq2VTl8UeV6wH4WM/F7kuDKUNrS/QK';
        const hashedPassword = user ? user.password : dummyPasswordHash;
        const isMatch = await bcrypt.compare(password, hashedPassword);
        if (!isMatch || !user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        return user;
    }
    async login(user, userAgent, ipAddress) {
        const payload = { sub: user._id.toString(), role: user.role };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
        });
        const refreshToken = await this.refreshTokenService.createRefreshToken(user._id.toString(), userAgent, ipAddress);
        return { accessToken, refreshToken };
    }
    async refreshToken(oldRefreshToken, userAgent, ipAddress) {
        const tokenDoc = await this.refreshTokenService.validateRefreshToken(oldRefreshToken);
        console.log("tokenDoctokenDoctokenDoctokenDoctokenDoc", tokenDoc);
        if (!tokenDoc)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const newRefresh = await this.refreshTokenService.rotateRefreshToken(oldRefreshToken, userAgent, ipAddress);
        const user = this.userService.findById(tokenDoc.user.toString());
        if (!user)
            throw new common_1.BadRequestException('user not found');
        const payload = { sub: user.toString(), role: user };
        const accessToken = this.jwtService.sign(payload, {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: this.configService.get('JWT_EXPIRES'),
        });
        return { accessToken, refreshToken: newRefresh };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        refresh_token_service_1.RefreshTokenService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map