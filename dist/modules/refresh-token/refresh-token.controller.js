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
exports.RefreshTokenController = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_service_1 = require("./refresh-token.service");
let RefreshTokenController = class RefreshTokenController {
    constructor(refreshTokenService) {
        this.refreshTokenService = refreshTokenService;
    }
    async create(req, res) {
        const userId = req.body.userId;
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        try {
            const refreshToken = await this.refreshTokenService.createRefreshToken(userId, userAgent, ipAddress);
            return res.json({ success: true, refreshToken });
        }
        catch (error) {
            return res.status(500).json({ success: false, messagge: error.message });
        }
    }
    async validate(body, res) {
        try {
            const refreshToken = await this.refreshTokenService.validateRefreshToken(body.token);
            if (!refreshToken) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid or expired refresh token',
                });
            }
            return res.json({ success: true, refreshToken });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
    async rotate(body, req, res) {
        const userAgent = req.headers['user-agent'];
        const ipAddress = req.ip;
        try {
            const newRefreshToken = await this.refreshTokenService.rotateRefreshToken(body.oldToken, userAgent, ipAddress);
            return res.json({ success: true, refreshToken: newRefreshToken });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message });
        }
    }
};
exports.RefreshTokenController = RefreshTokenController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('validate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "validate", null);
__decorate([
    (0, common_1.Post)('rotate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], RefreshTokenController.prototype, "rotate", null);
exports.RefreshTokenController = RefreshTokenController = __decorate([
    (0, common_1.Controller)('refresh-token'),
    __metadata("design:paramtypes", [refresh_token_service_1.RefreshTokenService])
], RefreshTokenController);
//# sourceMappingURL=refresh-token.controller.js.map