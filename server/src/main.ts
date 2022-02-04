import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app.module";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { APP } from "@/constants";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix(APP.GLOBAL_PREFIX);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(process.env.PORT);
}
bootstrap();
