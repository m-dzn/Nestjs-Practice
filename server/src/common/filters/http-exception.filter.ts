import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Response } from "express";
import { ErrorResponse } from "../interfaces";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | ErrorResponse;

    const commonResponse = {
      success: false,
      status,
    };

    if (typeof error === "string") {
      res.status(status).json({
        ...commonResponse,
        message: error,
      });
    } else {
      res.status(status).json({ ...commonResponse, ...error });
    }
  }
}
