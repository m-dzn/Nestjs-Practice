import { memo } from "react";
import { css, Global, useTheme } from "@emotion/react";
import { styles } from "@/styles";

const GlobalStyles = () => {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap");

        html {
          font-size: 62.5%;
        }

        body {
          margin: 0;
          font-family: "Noto Sans KR";
          font-size: 160%;
          letter-spacing: ${styles.letterSpacing};
          line-height: ${styles.lineHeight.normal};
        }

        body,
        a {
          color: ${theme.color.font};
        }

        #__next {
          min-height: 100vh;
        }

        [class] {
          &,
          &:before,
          &:after {
            box-sizing: border-box;
          }
        }

        a {
          text-decoration: none;
        }

        h1 {
          font-size: ${styles.fontSize.h1}rem;
        }

        h2 {
          font-size: ${styles.fontSize.h2}rem;
        }

        h3 {
          font-size: ${styles.fontSize.h3}rem;
        }

        h4 {
          font-size: ${styles.fontSize.h4}rem;
        }

        h5 {
          font-size: ${styles.fontSize.h5}rem;
        }

        h6 {
          font-size: ${styles.fontSize.h6}rem;
        }
      `}
    />
  );
};

export default memo(GlobalStyles);
