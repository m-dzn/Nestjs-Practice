import { Controller, Get, UseGuards } from "@nestjs/common";

import { CurrentUser, JwtAuthGuard } from "@/module/auth";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { UserSummary } from "@/module/users";
import { Docs } from "./user.docs";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("회원 API")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Docs.getMe("회원 본인 정보 조회")
  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserSummary(user);
  }
}
