import { Module } from "@nestjs/common";
import { AppController } from "@/app.controller";
import { AppService } from "@/app.service";
import { CustomWinstonModule } from "@/common";

@Module({
  imports: [CustomWinstonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
