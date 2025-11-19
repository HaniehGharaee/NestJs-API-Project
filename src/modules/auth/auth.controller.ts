import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { User } from '../user/schema/user.schema';
import { use } from 'passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const userAgent = req.headers['user-agent'];
    const ipAddress = req.ip;
    const user = await this.authService.validateUser(username, password);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    
  }
}
