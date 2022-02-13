import { CookieOptions } from "express";

export const STRATEGY = {
  LOCAL: "local",
  JWT: "jwt",
  KAKAO: "kakao",
};

export const JWT = {
  ACCESS_TOKEN_EXPIRES_IN: 60 * 60,
  REFRESH_TOKEN_EXPIRES_IN: 60 * 60 * 24 * 14,
};

export const refreshTokenOptions: CookieOptions = {
  domain: "localhost",
  path: "/",
  httpOnly: true,
  maxAge: JWT.REFRESH_TOKEN_EXPIRES_IN,
  signed: true,
  secure: false,
};
