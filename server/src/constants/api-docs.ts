import { HttpStatus } from "@nestjs/common";

export const apiDocs = {
  user: {
    join: {
      operation: {
        summary: "회원가입",
        description: "회원가입 양식을 받아 신규 회원으로 등록합니다.",
      },
      response: {
        ok: {
          status: HttpStatus.CREATED,
          description: "회원가입 성공",
        },
        badRequest: {
          status: HttpStatus.BAD_REQUEST,
          description: "잘못된 인증 정보 입력",
        },
        internalServerError: {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          description: "알 수 없는 서버 오류",
        },
      },
    },
  },
};