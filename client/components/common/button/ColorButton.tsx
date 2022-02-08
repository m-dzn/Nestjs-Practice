import { styles, Theme } from "@/styles";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonHTMLAttributes, DetailedHTMLProps, memo } from "react";

const DEFAULT_HEIGHT = 4;

interface StyleProps {
  background?: string;
  fontColor?: string;
  wide?: boolean;
}
const setButtonColor = ({
  theme,
  background,
  fontColor,
}: StyleProps & { theme: Theme }) => css`
  background: ${background || theme.color.font};
  color: ${fontColor || theme.color.reverseFont};
`;
const disabledButtonStyle = (theme: Theme) => css`
  cursor: default;
  background: ${theme.color.lightGray};
`;
const StyledButton = styled.button<StyleProps>`
  border: none;

  height: ${DEFAULT_HEIGHT}rem;

  font-size: ${styles.fontSize.h6}rem;

  cursor: pointer;

  ${({ theme, background, fontColor }) =>
    setButtonColor({ theme, background, fontColor })}

  ${({ wide }) => wide && "width: 100%;"}

    ${({ disabled, theme }) => disabled && disabledButtonStyle(theme)}
`;

interface Props
  extends DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    StyleProps {}
const ColorButton = ({
  background,
  fontColor,
  wide,
  children,
  ...rest
}: Props) => {
  return (
    <StyledButton wide={wide} {...rest}>
      {children}
    </StyledButton>
  );
};

export default memo(ColorButton);
