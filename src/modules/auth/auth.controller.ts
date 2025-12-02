import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('Login')
  async login(@Req() req: Request, @Res() res: Response) {
    const { username, password } = req.body;
    const userAgent = req.headers['user-agent']; // read from the header
    const ipAddress = req.ip; // Read from the network layer,
    const user = await this.authService.validateUser(username, password);
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: 'Invalid credentials' });
    const tokens = await this.authService.login(
      user,
      userAgent as string,
      ipAddress,
    );
    console.log('tokenstokenstokenstokens', tokens);
    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true, //Security: XSS Prevention , Cause: Hacker cannot extract token from JS
      secure: process.env.NODE_ENV === 'production', //Security: Prevent theft over HTTP, Cause: Send over HTTPS only
      sameSite: 'lax', //Security: Preventing CSRF, Cause: Balancing Security and Usability
    });
    return res.json({ success: true, accessToken: tokens.accessToken });
  }
}
//✔ Service → Returns data
//✔ Controller → Decides whether this data is valid or not
//This method is non-standard in NestJS.
