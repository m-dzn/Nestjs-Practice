import { UserSummary } from "@/module/users";
import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
  @ApiProperty({
    description: "요약된 회원 정보",
    required: true,
    type: UserSummary,
  })
  user: UserSummary;

  @ApiProperty({
    example: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9",
    description: "JWT Access 토큰",
    required: true,
  })
  accessToken: string;
}
