import { PickType } from "@nestjs/swagger";
import { User } from "../user.entity";

export class JoinForm extends PickType(User, [
  "email",
  "name",
  "password",
] as const) {}
