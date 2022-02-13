import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-kakao";

import { AuthService } from "../auth.service";
import { STRATEGY } from "../auth.constant";
import { SNSProvider } from "@/module/users";
import { OAuthRequest } from "@/module/auth/dto";

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, STRATEGY.KAKAO) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      clientID: config.get("KAKAO_REST_API_KEY"),
      clientSecret: config.get("KAKAO_CLIENT_SECRET"),
      callbackURL: config.get("KAKAO_CALLBACK_URL"),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, username, _json } = profile;
    const { email } = _json.kakao_account;

    const oAuthRequest: OAuthRequest = {
      email,
      name: username,
      provider: SNSProvider.KAKAO,
      snsId: id,
    };

    console.log(oAuthRequest);

    // 카카오 아이디와 연동된 계정이 있는지 검사합니다
    let user = await this.authService.validateOAuthUser(
      email,
      oAuthRequest.provider,
      oAuthRequest.snsId
    );

    // 연동된 계정이 없으면 OAuth 회원가입을 진행합니다
    if (!user) {
      user = await this.authService.oauthJoin(oAuthRequest);
    }

    return user;
  }
}
