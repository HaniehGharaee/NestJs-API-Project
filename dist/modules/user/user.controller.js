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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const swagger_2 = require("../../swagger");
const roles_decorator_1 = require("./schema/roles.decorator");
const create_user_dto_1 = require("./Dto/create-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto, res) {
        try {
            const user = await this.userService.createUser(createUserDto);
            return res.status(common_1.HttpStatus.CREATED).json({
                success: true,
                message: "",
                data: user,
                status: common_1.HttpStatus.CREATED,
            });
        }
        catch (error) {
            if (error instanceof common_1.ConflictException) {
                return res.status(common_1.HttpStatus.CONFLICT).json({
                    success: false,
                    message: error.message,
                    status: common_1.HttpStatus.CONFLICT,
                });
            }
            return res.status(common_1.HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: "",
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            });
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('create'),
    (0, swagger_2.userSwagger)('create'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.createUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.UseGuards)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map