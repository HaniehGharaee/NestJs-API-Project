import { Module } from '@nestjs/common';
//import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
//import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    //ConfigModule.forRoot(),
    //DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
