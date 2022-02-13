export const USER = {
  EMAIL: {
    MAX_LENGTH: 255,
  },
  NAME: {
    MAX_LENGTH: 17,
  },
  PASSWORD: {
    MAX_LENGTH: 255,
  },
  SNS_ID: {
    MAX_LENGTH: 30,
  },
};

export const AUTH = {
  salt: 10,
};

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export enum SNSProvider {
  LOCAL = "LOCAL",
  KAKAO = "KAKAO",
}
