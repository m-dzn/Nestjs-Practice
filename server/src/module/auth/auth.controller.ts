import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { apiDocs } from "@/constants";
import { JoinForm, UserSummary } from "@/module/users";
import { AuthService } from "@/module/auth/auth.service";

@ApiTags("인증/인가 API")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(apiDocs.user.join.operation)
  @ApiResponse(apiDocs.user.join.response.ok)
  @ApiResponse(apiDocs.user.join.response.badRequest)
  @ApiResponse(apiDocs.user.join.response.internalServerError)
  @Post()
  async join(@Body() joinForm: JoinForm): Promise<UserSummary> {
    return this.authService.join(joinForm);
  }
}
