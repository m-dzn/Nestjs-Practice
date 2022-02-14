import { applyDecorators, HttpStatus } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";

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
      ApiResponse({
        status: HttpStatus.CREATED,
        description: "회원가입 성공",
        type: JoinForm,
      }),
      ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: "잘못된 인증 정보 입력",
      }),
      ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "알 수 없는 서버 오류",
      })
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
      ApiResponse({
        status: HttpStatus.OK,
        description: "로그인 성공",
        type: LoginResponse,
      }),
      ApiResponse({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        description: "알 수 없는 서버 오류",
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
