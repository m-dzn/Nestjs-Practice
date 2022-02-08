import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

export interface NavMenuItem {
  path?: string;
  children: ReactNode;
}

export interface Field {
  name: string;
  type: string;
  placeholder: string;
  validation?: RegisterOptions;
  match?: string;
}

export interface CheckBox {
  name: string;
  label: string;
  validation?: RegisterOptions;
}

export type AuthType = "login" | "join";
