import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { Response } from "express";

import { APP } from "@/constants";
import { User, UserSummary } from "@/module/users";

import { CurrentUser } from "./decorators";
import { LocalAuthGuard, KakaoAuthGuard } from "./guards";
import { AuthService } from "./auth.service";
import { refreshTokenOptions } from "./auth.constant";
import { JoinForm, LoginForm, LoginResponse } from "./dto";
import { ConfigService } from "@nestjs/config";

@ApiTags("인증/인가 API")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {}

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
    this.setRefreshTokenCookie(user, res);

    return this.getLoginResponse(user);
  }

  @Get("kakao")
  @UseGuards(KakaoAuthGuard)
  kakao() {
    // Passport : 카카오 아이디 로그인 서비스로 리다이렉트
  }

  @Get("kakao/oauth")
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ) {
    const accessToken = this.authService.getAccessToken({ id: user.id });
    this.setRefreshTokenCookie(user, res);

    res.redirect(
      `${this.config.get("CLIENT_BASE_URL")}/oauth?token=${accessToken}`
    );
  }

  private async setRefreshTokenCookie(user: User, res: Response) {
    const refreshToken = await this.authService.getRefreshToken({
      id: user.id,
    });

    res.cookie(APP.COOKIE.REFRESH_TOKEN, refreshToken, refreshTokenOptions);
  }

  private getLoginResponse(user: User): LoginResponse {
    const accessToken = this.authService.getAccessToken({ id: user.id });

    return { accessToken };
  }
}
