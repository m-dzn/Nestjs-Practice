import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { Sample } from "./sample.entity";
import { SampleController } from "./sample.controller";
import { SampleService } from "./sample.service";

@Module({
  imports: [TypeOrmModule.forFeature([Sample])],
  providers: [SampleService],
  controllers: [SampleController],
})
export class SampleModule {}
