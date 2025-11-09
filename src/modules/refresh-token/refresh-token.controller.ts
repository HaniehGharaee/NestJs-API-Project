import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { Request, Response } from 'express';

@Controller('refresh-token')
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  //Create Refresh Token
  @Post('create')
  async creat(@Req() req: Request, @Res() res: Response) {
    //@Req: When you want to access low-level HTTP information like IP, header, cookie, etc., the entire HTTP request (body, headers, cookies, ip, params...), example: req.ip, req.headers['user-agent'], req.cookies
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

  //Low-Level: HTTP Technical Details : Dependency: To framework or web
  //High-Level: Business logic : Dependency: To the project Domain

  //Refresh Token Verification and Validation
  @Post('validate')
  async validate(@Body() body: { token: string }, @Res() res: Response) {
    //@Body: Only data that is in the POST/PUT request body, When you only need form input data or JSON
    try {
      const refreshToken = await this.refreshTokenService.validateRefreshToken(
        body.token,
      );
      if (!refreshToken) {
        return res.status(400).json({
          success: false,
          message: 'Invalid or expired refresh token',
        });
      }
      return res.json({ success: true, refreshToken });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}
