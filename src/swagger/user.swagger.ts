import {
  ApiOperation,
  ApiInternalServerErrorResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiConflictResponse,
  ApiBadRequestResponse,
  ApiResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

export function userSwagger(method: 'create') {
  switch (method) {
    case 'create':
      return applyDecorators(
        ApiOperation({ summary: 'Create a new user' }),
        ApiCreatedResponse({
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
              status: HttpStatus.CREATED,
            },
          },
        }),
        ApiConflictResponse({
          description: 'A user with this phone number already exists',
          schema: {
            example: {
              success: false,
              message: 'A user with this phone number already exists.',
              status: HttpStatus.CONFLICT,
            },
          },
        }),
        ApiBadRequestResponse({
          description: 'Invalid data provided',
          schema: {
            example: {
              success: false,
              message: 'Validation failed',
              status: HttpStatus.BAD_REQUEST,
            },
          },
        }),
      );
  }
}
