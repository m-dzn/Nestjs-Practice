import { NestFactory } from "@nestjs/core";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";

import { APP } from "@/constants";
import { HttpExceptionFilter, SuccessInterceptor } from "@/common";
import { AppModule } from "./app.module";

class Application {
  private ADMIN_USER: string;
  private ADMIN_PASSWORD: string;

  constructor(private app: NestExpressApplication) {
    this.app = app;

    this.ADMIN_USER = process.env.ADMIN_USER;
    this.ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  }

  private setUpBasicAuth() {
    this.app.use(
      [APP.SWAGGER.PREFIX, APP.SWAGGER.PREFIX_JSON],
      expressBasicAuth({
        challenge: true,
        users: {
          [this.ADMIN_USER]: this.ADMIN_PASSWORD,
        },
      })
    );
  }

  private setUpOpenAPIMiddleware() {
    SwaggerModule.setup(
      APP.SWAGGER.PREFIX,
      this.app,
      SwaggerModule.createDocument(
        this.app,
        new DocumentBuilder()
          .setTitle(APP.SWAGGER.TITLE)
          .setDescription(APP.SWAGGER.DESCRIPTION)
          .setVersion(APP.VERSION)
          .build()
      )
    );
  }

  private async setUpGlobalMiddleware() {
    this.setUpBasicAuth();
    this.setUpOpenAPIMiddleware();

    this.app.useGlobalInterceptors(new SuccessInterceptor());
    this.app.useGlobalFilters(new HttpExceptionFilter());
    this.app.useLogger(this.app.get(WINSTON_MODULE_NEST_PROVIDER));
  }

  async bootstrap() {
    this.app.setGlobalPrefix(APP.GLOBAL_PREFIX);
    await this.setUpGlobalMiddleware();
    await this.app.listen(process.env.PORT);
  }
}

async function init(): Promise<void> {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const app = new Application(server);
  await app.bootstrap();
}

init();
