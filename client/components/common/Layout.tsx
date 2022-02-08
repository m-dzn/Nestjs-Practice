import { HTMLAttributes, memo } from "react";
import styled from "@emotion/styled";
import { Header } from "./Header";
import { styles } from "@/styles";

const Container = styled.div`
  min-height: inherit;

  display: flex;
  flex-direction: column;
  row-gap: ${styles.space.level7}rem;

  & > header,
  & > main > section {
    width: ${styles.maxWidth}rem;
    margin: 0 auto;
    padding: 0 ${styles.grid.gutter / 2}rem;
  }
`;

const Main = styled.main`
    gap: 12rem;

    display: flex;
    flex-direction: column;
`;

interface Props extends HTMLAttributes<HTMLDivElement> {}
const Layout = ({ children }: Props) => {
  return (
    <Container>
      <Header />
      <Main>{children}</Main>
    </Container>
  );
};

export default memo(Layout);
