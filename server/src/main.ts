import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { APP } from "@/constants";
import { HttpExceptionFilter, SuccessInterceptor } from "@/common";
import { NestExpressApplication } from "@nestjs/platform-express";

class Application {
  constructor(private app: NestExpressApplication) {
    this.app = app;
  }

  private async setUpGlobalMiddleware() {
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
