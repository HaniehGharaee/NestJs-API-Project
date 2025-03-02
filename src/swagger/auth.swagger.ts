import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export function authSwagger(method: 'login' | 'logout') {
  switch (method) {
    case 'login':
      return applyDecorators(
        ApiOperation({ summary: 'User login' }),
        ApiBody({
          //type: loginDto,
          description: 'Enter the phone number and password.',
        }),
        ApiResponse({
          status: 200,
          description: 'Login successful',
          schema: {
            example: {
              success: true,
              message: 'ورود با موفقیت انجام شد',
              status: 200,
            },
          },
        }),
        ApiResponse({
          status: 401,
          description: 'Login failed',
          schema: {
            example: {
              success: false,
              message: 'اعتبار سنجی ناموفق',
              status: 401,
            },
          },
        }),
      );

    case 'logout':
      return applyDecorators(
        ApiOperation({ summary: 'User logout' }),
        ApiResponse({
          status: 200,
          description: 'Logout successful',
          schema: {
            example: {
              success: true,
              message: 'خروج با موفقیت انجام شد',
              status: 200,
            },
          },
        }),
        ApiResponse({
          status: 400,
          description: 'Token not found',
          schema: {
            example: {
              success: false,
              message: 'توکنی یافت نشد',
              status: 400,
            },
          },
        }),
        ApiResponse({
          status: 401,
          description: 'Invalid or expired token',
          schema: {
            example: {
              success: false,
              message: 'توکن نامعتبر است',
              status: 401,
            },
          },
        }),
      );
  }
}
