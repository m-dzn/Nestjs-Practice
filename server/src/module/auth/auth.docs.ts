import { applyDecorators } from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
} from "@nestjs/swagger";

import { SwaggerMethodDoc } from "./interfaces";
import { JoinForm, LoginForm, LoginResponse } from "./dto";
import { AuthController } from "./auth.controller";

export const Docs: SwaggerMethodDoc<AuthController> = {
  join(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: "회원가입 양식을 받아 신규 회원으로 등록합니다.",
      }),
      ApiCreatedResponse({ description: "회원가입 성공", type: JoinForm }),
      ApiBadRequestResponse({ description: "잘못된 인증 정보 입력" }),
      ApiInternalServerErrorResponse({ description: "알 수 없는 서버 오류" })
    );
  },

  login(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          "회원의 이메일과 비밀번호를 입력받아 인증 과정을 진행한 후 JWT를 발급합니다.",
      }),
      ApiBody({ type: LoginForm }),
      ApiOkResponse({ description: "로그인 성공", type: LoginResponse }),
      ApiInternalServerErrorResponse({ description: "알 수 없는 서버 오류" })
    );
  },

  refresh(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          "Refresh 토큰이 담긴 쿠키로 Access 토큰을 재발급 요청합니다.",
      }),
      ApiOkResponse({
        description: "Access 토큰 재발급 성공",
        type: LoginResponse,
      })
    );
  },

  kakao(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: "카카오 아이디로 회원가입/로그인을 진행합니다.",
      })
    );
  },

  kakaoCallback(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: "카카오 OAuth 인증 성공 시 실행되는 콜백 API입니다.",
      })
    );
  },
};
