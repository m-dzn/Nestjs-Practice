import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import { APP } from "@/constants";
import { User, UserSummary } from "@/module/users";

import { CurrentUser } from "./decorators";
import { LocalAuthGuard, JwtRefreshAuthGuard, KakaoAuthGuard } from "./guards";
import { JoinForm, LoginResponse } from "./dto";
import { Docs } from "./auth.docs";
import { AuthService } from "./auth.service";
import { refreshTokenOptions } from "./auth.constant";

@ApiTags("인증/인가 API")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @Docs.join("회원가입")
  async join(@Body() joinForm: JoinForm): Promise<UserSummary> {
    return this.authService.join(joinForm);
  }

  @Docs.login("로그인")
  @Post("login")
  @UseGuards(LocalAuthGuard)
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<LoginResponse> {
    const accessToken = this.authService.getAccessToken({ id: user.id });
    this.setRefreshTokenCookie(user, res);

    return { accessToken };
  }

  @Docs.refresh("Access 토큰 Refresh 요청")
  @Get("refresh")
  @UseGuards(JwtRefreshAuthGuard)
  refresh(@CurrentUser() user: User): LoginResponse {
    const accessToken = this.authService.getAccessToken({ id: user.id });

    return { accessToken };
  }

  @Docs.kakao("카카오 회원가입/로그인")
  @Get("kakao")
  @UseGuards(KakaoAuthGuard)
  kakao(): void {
    // Passport : 카카오 아이디 로그인 서비스로 리다이렉트
  }

  @Docs.kakaoCallback("카카오 OAuth 콜백")
  @Get("kakao/oauth")
  @UseGuards(KakaoAuthGuard)
  async kakaoCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response
  ): Promise<void> {
    const accessToken = this.authService.getAccessToken({ id: user.id });
    await this.setRefreshTokenCookie(user, res);

    res.redirect(
      `${this.config.get("CLIENT_BASE_URL")}/oauth?token=${accessToken}`
    );
  }

  private async setRefreshTokenCookie(
    user: User,
    res: Response
  ): Promise<void> {
    const refreshToken = await this.authService.getRefreshToken({
      id: user.id,
    });
    console.log(refreshToken);

    res.cookie(APP.COOKIE.REFRESH_TOKEN, refreshToken, refreshTokenOptions);
  }
}
