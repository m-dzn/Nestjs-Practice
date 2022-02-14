import { SwaggerMethodDoc } from "@/module/auth/interfaces";
import { UserSummary } from "@/module/users";
import { UserController } from "@/module/users/user.controller";
import { applyDecorators } from "@nestjs/common";
import { ApiOkResponse, ApiOperation } from "@nestjs/swagger";

export const Docs: SwaggerMethodDoc<UserController> = {
  getMe(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description:
          "로그인 과정에서 획득한 회원의 Access 토큰으로 회원 본인의 정보를 불러옵니다.",
      }),
      ApiOkResponse({ description: "본인 정보 조회 성공", type: UserSummary })
    );
  },
};
