import { styles } from "@/styles";

const { color } = styles;

const globalTheme = {
  color,
};

export const lightTheme = {
  ...globalTheme,
  color: {
    ...globalTheme.color,
    font: color.black,
    reverseFont: color.white,
    error: color.red,
  },
};

export type Theme = typeof lightTheme;
