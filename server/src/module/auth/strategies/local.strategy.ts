import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "@/module/users";
import { STRATEGY } from "../auth.constant";
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, STRATEGY.LOCAL) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(
    email: string,
    password: string,
    done: CallableFunction
  ): Promise<User> {
    const user = await this.authService.validateLocalUser(email, password);

    return done(null, user);
  }
}
