import "@emotion/react";
import { Theme as CustomTheme } from "@/styles";

declare module "@emotion/react" {
  export interface Theme extends CustomTheme {}
}
