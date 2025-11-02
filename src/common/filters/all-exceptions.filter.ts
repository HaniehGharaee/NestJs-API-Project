import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

//Any Exception that occurs in the nest (such as ConflictException, BadRequestException, ...) is automatically handled by this filter.
@Catch()
//@Catch() is a class decorator in NestJS that is used to specify an Exception Filter.
//"Whenever an error occurs during the execution of a request (in the controller or service), call this class to determine how to respond to the user."
export class AllExceptionFilter implements ExceptionFilter {
  //Without this filter, it would handle all types of errors (both HttpException and unexpected errors like TypeError, MongoError, etc.).
  catch(exception: any, host: ArgumentsHost) {
    // Only handles HttpExceptions with these filters "exception" and "host"
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as any).message || exception.message
        : 'Internal server error';

    response.status(status).json({
      success: false,
      statusCode: status,
      message,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
//AllExceptionFilter is not supposed to generate errors itself, it just standardizes how to respond to errors.
//This filter just converts its output format to standard JSON:
// {
//   "success": false,
//   "statusCode": 409,
//   "message": "A user with this phone already exists",
//   "path": "/user/create",
//   "timestamp": "2025-11-01T09:30:00.000Z"
// }
