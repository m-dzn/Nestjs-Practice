import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

import { JWTPayload } from "../interfaces";
import { AuthService } from "../auth.service";
import { STRATEGY } from "../auth.constant";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, STRATEGY.JWT) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get("ACCESS_TOKEN_SECRET"),
    });
  }

  async validate(payload: JWTPayload) {
    return this.authService.validateJwtUser(payload);
  }
}
