import { styles } from "@/styles";
import styled from "@emotion/styled";
import { memo, ReactNode } from "react";

const Container = styled.div`
  border-color: ${({ theme }) => theme.color.font};
  border-bottom: ${styles.border.level1} solid;
  margin: 0 0 ${styles.space.level5}rem 0;

  font-family: "Playfair Display", serif;
  font-size: ${styles.fontSize.h1}rem;
  font-weight: ${styles.fontWeight.bold};
  text-transform: capitalize;
`;

interface Props {
  children: ReactNode;
}

const SectionHeadline = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default memo(SectionHeadline);
