import {
  Controller,
  Get,
  Inject,
  LoggerService,
  NotFoundException,
} from "@nestjs/common";
import { AppService } from "@/app.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly appService: AppService
  ) {}

  @Get()
  getHello(): string {
    try {
      this.logger.log("테스트 info 로그", "TypeORM", false);
      this.logger.warn("테스트 warn 로그");
      throw new NotFoundException();
    } catch (err) {
      this.logger.error(err);
    }
    return this.appService.getHello();
  }
}
