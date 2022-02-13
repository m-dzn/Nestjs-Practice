import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
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

    let responseEntity: ResponseEntity;
    const commonProps = {
      success: false,
      code: status,
    };

    if (
      typeof error !== "string" &&
      error.statusCode === HttpStatus.BAD_REQUEST
    ) {
      responseEntity = {
        ...commonProps,
        data: error.message,
      };
    } else {
      responseEntity = {
        ...commonProps,
        data: error,
      };
    }

    res.status(status).json(responseEntity);
  }
}
