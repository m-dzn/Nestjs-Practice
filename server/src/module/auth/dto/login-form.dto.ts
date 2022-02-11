import { User } from "@/module/users";
import { PickType } from "@nestjs/swagger";

export class LoginForm extends PickType(User, ["email", "password"] as const) {}
