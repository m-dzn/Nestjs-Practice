import { NestFactory } from "@nestjs/core";
import { Logger, ValidationPipe } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { NestExpressApplication } from "@nestjs/platform-express";
import * as cookieParser from "cookie-parser";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";

import { APP } from "@/constants";
import { HttpExceptionFilter, SuccessInterceptor } from "@/common";
import { AppModule } from "./app.module";

class Application {
  private logger = new Logger(Application.name);
  private DEV_MODE: boolean;
  private PORT: string;

  constructor(private app: NestExpressApplication) {
    this.app = app;
    this.DEV_MODE = process.env.NODE_ENV === APP.NODE_ENV.DEVELOPMENT;
    this.PORT = process.env.PORT;
  }

  private setUpOpenAPIMiddleware() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(APP.SWAGGER.TITLE)
      .setDescription(APP.SWAGGER.DESCRIPTION)
      .setVersion(APP.VERSION)
      .addBearerAuth(
        {
          type: "http",
          description:
            "Http Request의 Authorization 헤더로 넘어올 JWT access 토큰을 넣어주세요",
        },
        "Access Token"
      )
      .addSecurityRequirements("Access Token")
      .build();

    SwaggerModule.setup(
      APP.SWAGGER.PREFIX,
      this.app,
      SwaggerModule.createDocument(this.app, swaggerConfig)
    );

    this.app.use(
      [APP.SWAGGER.PREFIX, APP.SWAGGER.PREFIX_JSON],
      expressBasicAuth({
        challenge: true,
        users: {
          [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD,
        },
      })
    );
  }

  private async setUpGlobalMiddleware() {
    const corsOriginList: string[] =
      process.env.NODE_ENV === APP.NODE_ENV.DEVELOPMENT
        ? ["*"]
        : process.env.CORS_ORIGIN_LIST.split(",").map((origin) =>
            origin.trim()
          );

    this.app.enableCors({
      origin: corsOriginList,
      credentials: true,
    });
    this.app.use(cookieParser(process.env.COOKIE_SECRET));

    this.app.useGlobalPipes(new ValidationPipe({ transform: true }));
    this.app.useGlobalInterceptors(new SuccessInterceptor());
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useLogger(this.app.get(WINSTON_MODULE_NEST_PROVIDER));

    this.setUpOpenAPIMiddleware();
  }

  startLog() {
    if (this.DEV_MODE) {
      this.logger.log(`✅ Server on http://localhost:${this.PORT}`);
    } else {
      this.logger.log(`✅ Server on port ${this.PORT}...`);
    }
  }

  async bootstrap() {
    this.app.setGlobalPrefix(APP.GLOBAL_PREFIX);
    await this.setUpGlobalMiddleware();
    await this.app.listen(this.PORT);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const app = new Application(server);
  await app.bootstrap();
  app.startLog();
}

init();
