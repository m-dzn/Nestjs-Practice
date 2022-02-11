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
    ACCESS_TOKEN_SECRET: "ACCESS_TOKEN_SECRET",
    REFRESH_TOKEN_SECRET: "REFRESH_TOKEN_SECRET",
    COOKIE_SECRET: "COOKIE_SECRET",
  },
};
