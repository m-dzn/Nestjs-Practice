import { Injectable } from "@nestjs/common";

import { JoinForm, UserService, UserSummary } from "@/module/users";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async join(joinForm: JoinForm): Promise<UserSummary> {
    return this.userService.join(joinForm);
  }
}
