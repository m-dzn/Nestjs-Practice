import { css } from "@emotion/react";
import { styles } from "@/styles";

export const grid = (
  cols = styles.grid.column,
  rowGap = styles.grid.rowGap,
  colGap = styles.grid.gutter
) => css`
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  column-gap: ${colGap}rem;
  row-gap: ${rowGap}rem;
`;

export const aspectRatio = (v: number, h: number) => {
  return css`
    position: relative;
    padding-top: ${Number((v / h) * 100)}%;
    overflow: hidden;

    & > img {
      width: 100%;
      height: 100%;

      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;

      object-fit: cover;
    }
  `;
};

export const ellipsis = (lineHeight: number, lines = 1) => {
  return css`
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;

    /* Chrome, Safari, Edge, Opera */
    display: -webkit-box;
    -webkit-line-clamp: ${lines};
    -webkit-box-orient: vertical;

    /* Cross Browsing */
    line-height: ${lineHeight}rem;
    max-height: ${lineHeight * lines}rem;
  `;
};
