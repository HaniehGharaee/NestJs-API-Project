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
    const tokens = await this.authService.login(user, userAgent, ipAddress);
    console.log('tokenstokenstokenstokens', tokens);
    res.cookie('refreshToken', tokens.refreshToken);
    return res.json({ success: true, accessToken: tokens.accessToken });
  }
}
//✔ Service → Returns data
//✔ Controller → Decides whether this data is valid or not
//This method is non-standard in NestJS.
