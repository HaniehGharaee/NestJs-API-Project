import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable() //This makes the Guard injectable so that NestJS can use it in modules and controllers.
export class JwtAuthGuard implements CanActivate {
  // The Guard class must implement the CanActivate interface.
  // Every Guard must have a canActivate method.
  constructor(){}
  canActivate(context: ExecutionContext): boolean { //canActivate: This method decides whether the request is allowed or not.
      const request = context.switchToHttp().getRequest<Request>(); // From the ExecutionContext, the actual Express request is taken.
      const authHeader = request.headers['authorization']
  }
}
