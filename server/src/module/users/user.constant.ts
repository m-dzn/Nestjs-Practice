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
};

export enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

export const AUTH = {
  salt: 10,
};
