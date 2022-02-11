import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

import { APP, messages } from "@/constants";
import { JoinForm, User, UserService, UserSummary } from "@/module/users";
import { JWT } from "./auth.constant";

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

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordValid = await user.checkPassword(password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.UNAUTHORIZED
      );
    }

    return user;
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
        expiresIn: JWT.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    await this.userService.setRefreshToken(user.id, refreshToken);

    return refreshToken;
  }
}
