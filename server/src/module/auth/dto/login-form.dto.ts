import { PickType } from "@nestjs/swagger";
import { User } from "@/module/users";

export class LoginForm extends PickType(User, ["email", "password"] as const) {}
