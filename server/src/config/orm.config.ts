import { APP } from "@/constants";
import { ConfigService } from "@nestjs/config";
import { ConnectionOptions, getMetadataArgsStorage } from "typeorm";

export const getOrmConfig = (config: ConfigService): ConnectionOptions => {
  const isDevEnv =
    config.get<string>(APP.ENV.NODE_ENV) === APP.ENV.NODE_ENV_DEVELOPMENT;

  return {
    type: "mysql",
    host: config.get<string>(APP.ENV.DB_HOST),
    port: config.get<number>(APP.ENV.DB_PORT),
    database: config.get<string>(APP.ENV.DB_DATABASE),
    username: config.get<string>(APP.ENV.DB_USERNAME),
    password: config.get<string>(APP.ENV.DB_PASSWORD),
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    synchronize: isDevEnv,
    logging: isDevEnv,
    charset: "utf8mb4_unicode_ci",
  };
};
