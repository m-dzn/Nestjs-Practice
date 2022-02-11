import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomWinstonModule } from "@/common";
import { getOrmConfig } from "@/config";
import { modules } from "@/module";
import { APP } from "@/constants";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${
        process.env[APP.ENV.NODE_ENV] || APP.ENV.NODE_ENV_DEVELOPMENT
      }`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: getOrmConfig,
      inject: [ConfigService],
    }),
    CustomWinstonModule,
    ...modules,
  ],
})
export class AppModule {}
