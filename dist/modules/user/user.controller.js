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
const roles_decorator_1 = require("./schema/roles.decorator");
const create_user_dto_1 = require("./Dto/create-user.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        const user = await this.userService.createUser(createUserDto);
        return {
            success: true,
            message: 'User created successfully',
            data: user,
            statusCode: common_1.HttpStatus.CREATED,
        };
    }
    async getUsers() {
        const result = await this.userService.getAllUsers();
        return {
            success: true,
            statusCode: common_1.HttpStatus.OK,
            message: 'Fetched all users successfully',
            data: result,
        };
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('create'),
    (0, roles_decorator_1.Roles)('superAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('getAllUsers'),
    (0, roles_decorator_1.Roles)('superAdmin'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.UseGuards)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map