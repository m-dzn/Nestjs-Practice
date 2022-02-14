import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { APP } from "@/constants";
import { JWTPayload } from "../interfaces";
import { STRATEGY } from "../auth.constant";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  STRATEGY.JWT_REFRESH
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies && req.cookies[APP.COOKIE.REFRESH_TOKEN];
        },
      ]),
      secretOrKey: config.get("REFRESH_TOKEN_SECRET"),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JWTPayload) {
    return this.authService.validateJwtUser(payload);
  }
}
