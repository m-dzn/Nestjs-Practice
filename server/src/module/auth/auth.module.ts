import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { UserModule } from "@/module/users";
import { APP } from "@/constants";

import { LocalStrategy } from "./strategies";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JWT } from "./auth.constant";
import { PassportModule } from "@nestjs/passport";

@Module({
  imports: [
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
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
