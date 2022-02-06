import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ResponseEntity, ErrorResponse } from "../interfaces";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | ErrorResponse;

    const responseEntity: ResponseEntity = {
      success: false,
      status,
    };

    if (typeof error === "string") {
      responseEntity.message = error;
    } else {
      Object.assign(responseEntity, error);
    }

    res.status(status).json(responseEntity);
  }
}
