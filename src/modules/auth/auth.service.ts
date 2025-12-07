import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenService } from './../refresh-token/refresh-token.service';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    // Password to compare against (Real password OR Dummy)
    // Dummy hash: prevents timing attack & user enumeration
    const dummyPasswordHash =
      '$2b$10$CQo2jCAWiODR4/1yJfxzoOAmq2VTl8UeV6wH4WM/F7kuDKUNrS/QK';
    // bcrypt hash for: "dummyPassword123"
    const hashedPassword = user ? user.password : dummyPasswordHash;
    // Step 3: Always compare passwords (user found or not)
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  //✔ Service → Responsible for validation
  //✔ Controller → Only takes input and gives output
  //❗ Using NestJS Exception filters
  async login(user, userAgent?: string, ipAddress?: string) {
    // 1. build JWT payload
    const payload = { sub: user._id.toString(), role: user.role };
    // 2. sign an access token (short-lived JWT)
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES'),
    });
    const refreshToken = await this.refreshTokenService.createRefreshToken(
      user._id.toString(),
      userAgent,
      ipAddress,
    );
    return { accessToken, refreshToken };
  }

  async refreshToken(
    oldRefreshToken: string,
    userAgent: string,
    ipAddress: string,
  ) {
    //First, we need to validate the previous token to see if it is valid.
    const tokenDoc =
    //*****old token exist in DB, Check if it is not revoked (revoked === false), Check if it is not expired
      await this.refreshTokenService.validateRefreshToken(oldRefreshToken);
      console.log("tokenDoctokenDoctokenDoctokenDoctokenDoc", tokenDoc)
    if (!tokenDoc) throw new UnauthorizedException('Invalid refresh token');
    //rotate : Create a new Refresh Token
    //Invalidate the old token
    //Replace the new token
    const newRefresh = await this.refreshTokenService.rotateRefreshToken(
      oldRefreshToken,
      userAgent,
      ipAddress,
    );
    //*****Check which user it belongs to
    const user = this.userService.findById(tokenDoc.user.toString())
    if(!user) throw new BadRequestException('user not found')

    // 1. build JWT payload
    const payload = { sub: user.toString(), role: user };
    // 2. sign an access token (short-lived JWT)
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRES'),
    });

    return { accessToken, refreshToken:newRefresh };//?.token
  }

  async logout (refreshToken: string){
    return this.refreshTokenService.revokeRefreshToken(refreshToken)
  }
  
}
