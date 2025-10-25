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
exports.CreateCategoryDto = exports.categoryStatus = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
var categoryStatus;
(function (categoryStatus) {
    categoryStatus["ACTIVE"] = "active";
    categoryStatus["INACTIVE"] = "inactive";
})(categoryStatus || (exports.categoryStatus = categoryStatus = {}));
class CreateCategoryDto {
}
exports.CreateCategoryDto = CreateCategoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Name of category',
        example: 'Tablet',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Category name is required' }),
    (0, class_validator_1.IsString)({ message: 'Category name must be a string' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'type of category',
        example: 'Drug',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Type is required' }),
    (0, class_validator_1.IsString)({ message: 'Type must be a string' }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'code of category',
        example: '0020',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'code is required' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false, maxDecimalPlaces: 0 }, { message: 'code must be a number' }),
    __metadata("design:type", Number)
], CreateCategoryDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'status of category',
        example: 'active',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'status is required' }),
    (0, class_validator_1.IsIn)(Object.values(categoryStatus), {
        message: 'Status must be either "active" or "inactive"',
    }),
    __metadata("design:type", String)
], CreateCategoryDto.prototype, "status", void 0);
//# sourceMappingURL=createCategory.dto.js.map