export * from "./messages";

export const APP = {
  GLOBAL_PREFIX: "api",
  VERSION: "0.0.1",
  SWAGGER: {
    PREFIX: "/docs",
    PREFIX_JSON: "/docs-json",
    TITLE: "VIA - API",
    DESCRIPTION: "VIA Fashion E-Commerce API Docs",
  },
  COOKIE: {
    REFRESH_TOKEN: "refresh_token",
  },
  ENV: {
    NODE_ENV: "NODE_ENV",
    NODE_ENV_DEVELOPMENT: "development",
    NODE_ENV_PRODUCTION: "production",
    DB_HOST: "DB_HOST",
    DB_PORT: "DB_PORT",
    DB_DATABASE: "DB_DATABASE",
    DB_USERNAME: "DB_USERNAME",
    DB_PASSWORD: "DB_PASSWORD",
    ACCESS_TOKEN_SECRET: "ACCESS_TOKEN_SECRET",
    REFRESH_TOKEN_SECRET: "REFRESH_TOKEN_SECRET",
    COOKIE_SECRET: "COOKIE_SECRET",
  },
};
