import styled from "@emotion/styled";
import { HTMLAttributes, memo } from "react";

const Container = styled.div`
  min-height: inherit;
`;

interface Props extends HTMLAttributes<HTMLDivElement> {}
const Layout = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default memo(Layout);
