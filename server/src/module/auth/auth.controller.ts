import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { Response } from "express";

import { APP } from "@/constants";
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

  @ApiOperation({
    summary: "회원가입",
    description: "회원가입 양식을 받아 신규 회원으로 등록합니다.",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "회원가입 성공",
    type: JoinForm,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: "잘못된 인증 정보 입력",
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "알 수 없는 서버 오류",
  })
  @Post()
  async join(@Body() joinForm: JoinForm): Promise<UserSummary> {
    return this.authService.join(joinForm);
  }

  @ApiOperation({
    summary: "로그인",
    description:
      "회원의 이메일과 비밀번호를 입력받아 인증 과정을 진행한 후 JWT를 발행합니다.",
  })
  @ApiBody({ type: LoginForm })
  @ApiResponse({
    status: HttpStatus.OK,
    description: "로그인 성공",
    type: LoginResponse,
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: "알 수 없는 서버 오류",
  })
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
