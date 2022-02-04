import { Controller, Get, Inject, LoggerService } from "@nestjs/common";
import { AppService } from "@/app.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    private readonly appService: AppService,
    private readonly config: ConfigService
  ) {}

  @Get()
  getHello(): string {
    this.logger.log(this.config.get<string>("TEST_ENV_CONFIG"));

    return this.appService.getHello();
  }
}
