import { APP } from "@/constants";
import { ConfigService } from "@nestjs/config";
import { ConnectionOptions, getMetadataArgsStorage } from "typeorm";

export const getOrmConfig = (config: ConfigService): ConnectionOptions => {
  const isDevEnv = config.get<string>("NODE_ENV") === APP.NODE_ENV.DEVELOPMENT;

  return {
    type: "mysql",
    host: config.get<string>("DB_HOST"),
    port: config.get<number>("DB_PORT"),
    database: config.get<string>("DB_DATABASE"),
    username: config.get<string>("DB_USERNAME"),
    password: config.get<string>("DB_PASSWORD"),
    entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    synchronize: isDevEnv,
    logging: isDevEnv,
    charset: "utf8mb4_unicode_ci",
  };
};
