import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable() //It says this class is a provider and Nest can register it somewhere like providers of a module.
export class RolesGuard implements CanActivate {
  //This means that this class is a Guard and must provide the canActivate(context: ExecutionContext) method.
  constructor(private reflector: Reflector) {} //The constructor takes a Reflector as dependency injection.
  //private reflector: Reflector means the reflector is stored as a private property in the class and we can read the metadata with it.
  //Why Reflector? Because the @Roles(...) decorator puts the roles as metadata on the method or class and Reflector is built to read that metadata.
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //This is the main Guard method — Nest calls it before executing the controller.
    // The context contains the full information about the current execution (HTTP request, handler function, class, etc.).
    // The method should return a boolean (or Promise<boolean>/Observable<boolean>) to indicate whether the request is allowed to continue.
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    ); //Here we read the 'roles' key from the metadata for the same handler (controller method) with Reflector.
    // context.getHandler() → the function/method that is to be executed (e.g. the create() method in a controller).
    // the output of requiredRoles is usually an array of strings set with the @Roles('superAdmin') decorator.
    if (!requiredRoles) return true;
    //If metadata roles is not present, this route does not require a specific role → permission is granted (true).
    // Reason: The guard is only responsible for checking roles; if no role is required, the guard should not block the request.
    const request = context.switchToHttp().getRequest(); //context.switchToHttp().getRequest() returns a Request (Express request) object — for accessing headers, user, body, etc.
    const user = request.user; //JWT Guard must be set.
    //If user does not exist → access is denied (well, because the role cannot be checked).
    //If user.role is not in the requiredRoles array → access is denied.
    if (!user || !requiredRoles.includes(user.role)) {
      throw new ForbiddenException('Insufficient role');
    }
    return true; //If all checks pass, true is returned and the request execution continues (the handler is executed).
  }
}
