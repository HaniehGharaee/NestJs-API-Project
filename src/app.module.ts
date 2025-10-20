import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//import configuration from './config/configuration';
//import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseModule } from './database/database.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './modules/rbac/guards/roles.guard';
import { UserModule } from './modules/user/user.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { CategoryModule } from './modules/medicine/category/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      //load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    //UsersModule,
    AuthModule,
    UserModule,
    CategoryModule,
    DashboardModule,
  ],
  providers: [
    //SmsService,
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule {}
