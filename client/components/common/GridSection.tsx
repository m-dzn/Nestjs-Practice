import { HTMLAttributes, memo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";

import { mixins } from "@/styles";
import SectionHeadline from "./SectionHeadline";

const StyledSection = styled.section``;

interface GridProps {
  cols?: number;
  span?: number;
}
const setGridStyle = ({ cols, span }: GridProps) => css`
  ${mixins.grid(cols)}

  & > * {
    grid-column: auto / span ${span};
  }
`;
const Grid = styled.div<GridProps>`
  ${({ cols, span }) => setGridStyle({ cols, span })}
`;

interface Props extends HTMLAttributes<HTMLElement>, GridProps {
  title?: string;
}

const GridSection = ({ title, cols = 12, span = 1, children }: Props) => {
  return (
    <StyledSection>
      {title && <SectionHeadline>{title}</SectionHeadline>}
      <Grid cols={cols} span={span}>
        {children}
      </Grid>
    </StyledSection>
  );
};

export default memo(GridSection);
