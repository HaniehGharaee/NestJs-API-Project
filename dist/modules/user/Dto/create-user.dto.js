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
exports.createUserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class createUserDto {
}
exports.createUserDto = createUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone number is required' }),
    (0, class_validator_1.IsString)({ message: 'Phone number must be a string' }),
    (0, class_validator_1.Length)(11, 11, {
        message: 'Phone number must be exactly 11 characters long',
    }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'Phone number must contain only digits' }),
    (0, swagger_1.ApiProperty)({
        description: 'Phone number of the user',
        example: '1234567890',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'nationalId is required' }),
    (0, class_validator_1.IsString)({ message: 'nationalId must be a string' }),
    (0, class_validator_1.Matches)(/^[0-9]+$/, { message: 'nationalId must contain only digits' }),
    (0, class_validator_1.Length)(10, 10, { message: 'nationalId must be exactly 10 digits long' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your nationalId',
        example: '0020956071',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "nationalId", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'role must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter role of user',
        example: 'admin',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'firstName is required' }),
    (0, class_validator_1.IsString)({ message: 'firstName must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your firstName',
        example: 'Hanieh',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'lastName is required' }),
    (0, class_validator_1.IsString)({ message: 'lastName must be a string' }),
    (0, swagger_1.ApiProperty)({
        description: 'Enter your lastName',
        example: 'Gharaee',
    }),
    __metadata("design:type", String)
], createUserDto.prototype, "lastName", void 0);
//# sourceMappingURL=create-user.dto.js.map