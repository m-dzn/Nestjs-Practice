import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { User } from "@/module/users";
import { APP } from "@/constants";

import { LocalStrategy } from "./strategies";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWT } from "./auth.constant";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get(APP.ENV.ACCESS_TOKEN_SECRET),
        signOptions: {
          expiresIn: JWT.ACCESS_TOKEN_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
