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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const user_schema_1 = require("../schema/user.schema");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'firstName is required' }),
    (0, class_validator_1.IsString)({ message: 'firstName must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your firstName',
        example: 'Hanieh',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lastName is required' }),
    (0, class_validator_1.IsString)({ message: 'lastName must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your lastName',
        example: 'Gharaee',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    (0, class_validator_1.Length)(11, 11, {
        message: 'Phone number must be exactly 11 characters long',
    }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the user',
        example: '09128439793',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'username is required' }),
    (0, class_validator_1.IsString)({ message: 'username must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your username',
        example: 'admin@pharmacy',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'password is required' }),
    (0, class_validator_1.IsString)({ message: 'password must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your password',
        example: 'StrongPass@123',
    }),
    (0, class_validator_1.MinLength)(6),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'role is required' }),
    (0, swagger_1.ApiProperty)({
        enum: user_schema_1.UserRole,
        example: user_schema_1.UserRole.SUPER_ADMIN,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'pharmacyId must be a string' }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '676c91d9e6a30b78d3c4e412',
        required: false,
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "pharmacyId", void 0);
//# sourceMappingURL=create-user.dto.js.map