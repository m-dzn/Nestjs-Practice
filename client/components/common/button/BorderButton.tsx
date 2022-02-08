import { styles } from "@/styles";
import styled from "@emotion/styled";
import { HTMLAttributes, memo } from "react";

interface ButtonProps {
  color?: string;
}
const StyledButton = styled.button<ButtonProps>`
  background: transparent;
  border-color: ${({ color, theme }) => color || theme.color.font};
  color: ${({ color, theme }) => color || theme.color.font};

  border-width: ${styles.border.level1}rem solid;
  cursor: pointer;
`;

interface Props extends HTMLAttributes<HTMLButtonElement> {}
const BorderButton = ({ color, children }: Props) => {
  return <StyledButton color={color}>{children}</StyledButton>;
};

export default memo(BorderButton);
