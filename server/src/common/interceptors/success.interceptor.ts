import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ResponseEntity } from "../interfaces";

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const status: number = ctx.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(
      map(
        (data): ResponseEntity => ({
          success: true,
          status,
          data,
        })
      )
    );
  }
}
