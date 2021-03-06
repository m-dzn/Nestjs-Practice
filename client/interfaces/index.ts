import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

export interface ApiResponse {
  success: boolean;
  status: number;
  data?: any;
  message?: string;
}

export interface NavMenuItem {
  path?: string;
  children: ReactNode;
}

export interface Field {
  name: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  match?: {
    fieldName: string;
    message: string;
  };
}

export interface CheckBox {
  name: string;
  label: string;
  validation?: RegisterOptions;
}

export interface SNSProvider {
  logo: string;
  background: string;
  fontColor: string;
  message: {
    login: string;
    join: string;
  };
}

export type AuthType = "login" | "join";

export interface AnyForm {
  [x: string]: any;
}

export interface JoinForm {
  email: string;
  name: string;
  password: string;
}
