import { ConfigService } from "@nestjs/config";
import { ConnectionOptions, getMetadataArgsStorage } from "typeorm";

export const getOrmConfig = (config: ConfigService): ConnectionOptions => ({
  type: "mysql",
  host: config.get<string>("TYPEORM_HOST"),
  port: config.get<number>("TYPEORM_PORT"),
  database: config.get<string>("TYPEORM_DATABASE"),
  username: config.get<string>("TYPEORM_USERNAME"),
  password: config.get<string>("TYPEORM_PASSWORD"),
  entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
  synchronize: true,
  logging: true,
  charset: "utf8mb4_unicode_ci",
});
