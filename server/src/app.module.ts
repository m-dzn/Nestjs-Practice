import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CustomWinstonModule } from "@/common";
import { getOrmConfig } from "@/config";
import { modules } from "@/module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV || "development"}`,
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
