import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "@/module/users";

export const CurrentUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
