import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable() //This makes the Guard injectable so that NestJS can use it in modules and controllers.
export class JwtAuthGuard implements CanActivate {
  // The Guard class must implement the CanActivate interface.
  // Every Guard must have a canActivate method.
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    //canActivate: This method decides whether the request is allowed or not.
    const request = context.switchToHttp().getRequest<Request>(); // From the ExecutionContext, the actual Express request is taken.
    const authHeader = request.headers['authorization']; //It reads the Authorization header, which is usually in the form of Bearer <token>.
    //Check for headers
    if (!authHeader) throw new UnauthorizedException('No token provided');
    //Splitting Header
    const [bearer, token] = authHeader.split(''); //Splits the string //bearer → "Bearer //token → actual JWT
    //for example: Bearer%20eyJhbGciOiJSUzI....
    if(bearer !== 'Bearer' || !token) throw new UnauthorizedException('Invalid token format')
    //This code is in try because errors may occur:
    //Token is corrupt
    //Signature is not correct
    //Token is expired
    //Token is fake
    //In this case, it enters catch.
    try {
      const payload = this.jwtService.verify(token, {
        //Verify the sent token
        //Calling jwtService.verify : NestJS uses the jsonwebtoken package behind the scenes.
        secret: process.env.JWT_SECRET,
        //Verify it with the JWT_SECRET key (Signature Verification)
        //If valid, return the payload inside the token
      });
      request['user'] = payload; //Save payload in request: so you write in controller req.user.userId
      return true; //Passage permission: If everything is correct, the Guard will allow passage.
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token'); //If: Token is invalid, Expiration date has passed, Signature is incorrect
    }
  }
}
