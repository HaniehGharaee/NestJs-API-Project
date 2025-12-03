import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { RefreshTokenDocument } from './schema/refresh-token.schema';
import { promises } from 'dns';
import { error } from 'console';

@Injectable()
export class RefreshTokenService {
  constructor(
    private configService: ConfigService,
    private refreshTokenModel: Model<RefreshTokenDocument>,
  ) {}

  //createRefreshToken used just when login
  async createRefreshToken(
    userId: string,
    userAgent?: string,
    ipAddress?: string,
  ) {
    // Create token with SECRET and expiration time from ENV
    const token = jwt.sign(
      { userId },
      this.configService.get('JWT_REFRESH_SECRET'),
      {
        expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
      },
    );
    // Create expiration time to store in DB
    const expireAt = new Date();
    const expiresInSeconds = this.convertExpireToSeconds(
      this.configService.get<string>('JWT_REFRESH_EXPIRES'),
    );
    expireAt.setSeconds(expireAt.getSeconds() + expiresInSeconds);

    const refreshToken = new this.refreshTokenModel({
      user: userId,
      token,
      expireAt,
      userAgent: userAgent || null,
      ipAddress: ipAddress || null,
    });
    return refreshToken.save();
  }

  private convertExpireToSeconds(expire: string) {
    const time = parseInt(expire);
    if (expire.endsWith('H')) return time * 3600;
    if (expire.endsWith('m')) return time * 60;
    if (expire.endsWith('s')) return time;
    return time;
  }

  async validateRefreshToken(
    token: string,
  ): Promise<RefreshTokenDocument | null> {
    const refreshToken = await this.refreshTokenModel.findOne({
      token,
      revoked: false,
    });
    if (!refreshToken || new Date() > refreshToken.expireAt) {
      return null; //The token has expired or been revoked.
    }
    return refreshToken;
  }

  //To rotate an old Refresh Token with a new token. The system always remains in a safe and optimal state.
  async rotateRefreshToken(
    oldToken: string,
    userAgent: string,
    ipAddress: string,
  ) {
    const oldRefreshToken = await this.validateRefreshToken(oldToken);
    if (!oldRefreshToken) {
      throw new error('Invalid or expired refresh token');
    }
    //If a new token is created, the old token must be revoked.

    return this.createRefreshToken(
      oldRefreshToken.user.toString(),
      userAgent,
      ipAddress,
    );
  }
}
