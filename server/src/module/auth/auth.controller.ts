import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { Response } from "express";

import { apiDocs, APP } from "@/constants";
import { JoinForm, User, UserSummary } from "@/module/users";

import { CurrentUser } from "./decorators";
import { LocalAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { refreshTokenOptions } from "./auth.constant";
import { LoginForm, LoginResponse } from "./dto";

@ApiTags("인증/인가 API")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation(apiDocs.user.join.operation)
  @ApiResponse({ ...apiDocs.user.join.response.ok, type: JoinForm })
  @ApiResponse(apiDocs.user.join.response.badRequest)
  @ApiResponse(apiDocs.user.join.response.internalServerError)
  @Post()
  async join(@Body() joinForm: JoinForm): Promise<UserSummary> {
    return this.authService.join(joinForm);
  }

  @ApiOperation(apiDocs.user.login.operation)
  @ApiBody({ type: LoginForm })
  @ApiResponse({ ...apiDocs.user.login.response.ok, type: LoginResponse })
  @ApiResponse(apiDocs.user.login.response.internalServerError)
  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponse> {
    const accessToken = this.authService.getAccessToken(user);
    const refreshToken = await this.authService.getRefreshToken(user);

    res.cookie(APP.COOKIE.REFRESH_TOKEN, refreshToken, refreshTokenOptions);

    const userSummary: UserSummary = new UserSummary(user);
    return {
      user: userSummary,
      accessToken,
    };
  }
}
