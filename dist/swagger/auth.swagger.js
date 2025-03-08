"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSwagger = authSwagger;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
function authSwagger(method) {
    switch (method) {
        case 'login':
            return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User login' }), (0, swagger_1.ApiBody)({
                description: 'Enter the phone number and password.',
            }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Login successful',
                schema: {
                    example: {
                        success: true,
                        message: 'ورود با موفقیت انجام شد',
                        status: 200,
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 401,
                description: 'Login failed',
                schema: {
                    example: {
                        success: false,
                        message: 'اعتبار سنجی ناموفق',
                        status: 401,
                    },
                },
            }));
        case 'logout':
            return (0, common_1.applyDecorators)((0, swagger_1.ApiOperation)({ summary: 'User logout' }), (0, swagger_1.ApiResponse)({
                status: 200,
                description: 'Logout successful',
                schema: {
                    example: {
                        success: true,
                        message: 'خروج با موفقیت انجام شد',
                        status: 200,
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 400,
                description: 'Token not found',
                schema: {
                    example: {
                        success: false,
                        message: 'توکنی یافت نشد',
                        status: 400,
                    },
                },
            }), (0, swagger_1.ApiResponse)({
                status: 401,
                description: 'Invalid or expired token',
                schema: {
                    example: {
                        success: false,
                        message: 'توکن نامعتبر است',
                        status: 401,
                    },
                },
            }));
    }
}
//# sourceMappingURL=auth.swagger.js.map