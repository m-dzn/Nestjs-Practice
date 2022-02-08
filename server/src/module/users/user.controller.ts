import { apiDocs } from "@/constants";
import { Body, Controller, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { JoinForm, UserSummary } from "./dto";
import { UserService } from "./user.service";

@ApiTags("회원 API")
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation(apiDocs.user.join.operation)
  @ApiResponse(apiDocs.user.join.response.ok)
  @ApiResponse(apiDocs.user.join.response.badRequest)
  @ApiResponse(apiDocs.user.join.response.internalServerError)
  @Post()
  async join(@Body() joinForm: JoinForm): Promise<UserSummary> {
    return this.userService.join(joinForm);
  }
}
