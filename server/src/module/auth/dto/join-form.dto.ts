import { PickType } from "@nestjs/swagger";
import { User } from "@/module/users";

export class JoinForm extends PickType(User, [
  "email",
  "name",
  "password",
] as const) {}
