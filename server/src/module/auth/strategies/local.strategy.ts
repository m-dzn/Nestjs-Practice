import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { User } from "@/module/users";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<User> {
    return this.authService.validateLocalUser(email, password);
  }
}
