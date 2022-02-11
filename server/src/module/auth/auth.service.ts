import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { APP } from "@/constants";
import { JoinForm, User, UserService, UserSummary } from "@/module/users";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  async join(joinForm: JoinForm): Promise<UserSummary> {
    return this.userService.join(joinForm);
  }

  getAccessToken(user: User) {
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: this.config.get(APP.ENV.ACCESS_TOKEN_SECRET),
      }
    );
  }

  async getRefreshToken(user: User) {
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.config.get(APP.ENV.REFRESH_TOKEN_SECRET),
        expiresIn: this.config.get(APP.ENV.REFRESH_TOKEN_EXPIRES_IN),
      }
    );

    await this.userService.setRefreshToken(user.id, refreshToken);

    return refreshToken;
  }
}
