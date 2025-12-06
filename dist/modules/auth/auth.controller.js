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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res) {
        const { username, password } = req.body;
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        const user = await this.authService.validateUser(username, password);
        if (!user)
            return res
                .status(401)
                .json({ success: false, message: 'Invalid credentials' });
        const tokens = await this.authService.login(user, userAgent, ipAddress);
        console.log('tokenstokenstokenstokens', tokens);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return res.json({ success: true, accessToken: tokens.accessToken });
    }
    async refresh(req, res) {
        const oldToken = req.cookies.refreshToken;
        if (!oldToken) {
            return res
                .status(400)
                .json({ success: false, message: 'No refresh token provided' });
        }
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        const tokens = await this.authService.refreshToken(oldToken, userAgent, ipAddress);
        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        });
        return res.json({ success: true, accessToken: tokens.accessToken });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('Login'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('refresh'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map