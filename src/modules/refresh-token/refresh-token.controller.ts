import { Controller, Post, Req, Res } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { Request, Response } from 'express';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Post('create')
  async creat(@Req() req: Request, @Res() res: Response) {
    //Should we use @Res()? yes, Need to control cookies, headers, and remove refresh tokens
    const userId = req.body.userId; //Specifies which user this token belongs to.
    const userAgent = req.headers['user-agent']; // Identify the user's device and browser.
    const ipAddress = req.ip; // Security control to prevent token theft.

    //Because you are using @Res() and the Exception Filter is no longer applied.
    try {
      const refreshToken = await this.refreshTokenService.creatRefreshToken(
        userId,
        userAgent,
        ipAddress,
      );
      return res.json({ success: true, refreshToken });
    } catch (error) {
      return res.status(500).json({ success: false, messagge: error.message });
    }
  }
}
