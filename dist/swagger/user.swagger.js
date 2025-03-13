"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSwagger = userSwagger;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
function userSwagger(method) {
    switch (method) {
        case 'create':
            return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'Create a new user' }), (0, swagger_1.ApiCreatedResponse)({
                description: 'User successfully created',
                schema: {
                    example: {
                        success: true,
                        message: 'User created successfully',
                        data: {
                            id: '1234567890',
                            phoneNumber: '+1234567890',
                            name: 'John Doe',
                            email: 'john.doe@example.com',
                        },
                        status: common_2.HttpStatus.CREATED,
                    },
                },
            }), (0, swagger_1.ApiConflictResponse)({
                description: 'A user with this phone number already exists',
                schema: {
                    example: {
                        success: false,
                        message: 'A user with this phone number already exists.',
                        status: common_2.HttpStatus.CONFLICT,
                    },
                },
            }), (0, swagger_1.ApiBadRequestResponse)({
                description: 'Invalid data provided',
                schema: {
                    example: {
                        success: false,
                        message: 'Validation failed',
                        status: common_2.HttpStatus.BAD_REQUEST,
                    },
                },
            }));
    }
}
//# sourceMappingURL=user.swagger.js.map