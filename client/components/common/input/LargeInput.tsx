import { HTMLAttributes, memo } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { FieldError, FieldErrors, useFormContext } from "react-hook-form";

import { strings } from "@/constants";
import { Field } from "@/interfaces";
import { styles, Theme } from "@/styles";

const DEFAULT_HEIGHT = 4.8;

const Container = styled.div``;

const setInvalidStyles = (invalid: boolean, theme: Theme) => css`
  border-color: ${invalid ? theme.color.error : theme.color.gray};
`;

interface InvalidProp {
  invalid: boolean;
}
const Input = styled.input<InvalidProp>`
  width: 100%;
  height: ${DEFAULT_HEIGHT}rem;
  padding: 0 ${styles.space.level4}rem;

  border: ${styles.border.level1}rem solid;
  ${({ invalid, theme }) => setInvalidStyles(invalid, theme)};
`;

const MessageBox = styled.div`
  margin: ${styles.space.level1}rem 0 0 0;

  color: ${({ theme }) => theme.color.error};
  font-size: ${styles.fontSize.small}rem;
`;

interface Props extends HTMLAttributes<HTMLInputElement> {
  field: Field;
  errors: FieldErrors;
}
const LargeInput = ({ field, errors, style }: Props) => {
  const { name, type, placeholder, validation } = field;
  const { register, getValues } = useFormContext();

  const error: FieldError = errors[name];

  const validate = {
    message: (value: any) =>
      (field.match && value === getValues()[field.match.fieldName]) ||
      field.match?.message ||
      strings.validation.defaultMessage,
  };

  const registerProps = field.match
    ? register(name, { ...validation, validate })
    : register(name, validation);

  return (
    <Container style={style}>
      <Input
        type={type}
        placeholder={placeholder}
        invalid={!!error}
        {...registerProps}
      />
      <MessageBox>
        {error && (error.message || strings.validation.defaultMessage)}
      </MessageBox>
    </Container>
  );
};

export default memo(LargeInput);
