import { HTMLAttributes, memo } from "react";
import styled from "@emotion/styled";
import { styles } from "@/styles";

const LAYOUT = {
  style: {
    padding: `0 ${styles.space.level3}rem`,
    rowGap: 4,
  },
};

const Container = styled.div`
  min-height: inherit;

  display: flex;
  flex-direction: column;
  row-gap: ${LAYOUT.style.rowGap}rem;
`;

interface Props extends HTMLAttributes<HTMLDivElement> {}
const Layout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default memo(Layout);
