import { HTMLAttributes, memo } from "react";
import { useFormContext } from "react-hook-form";
import styled from "@emotion/styled";

import { CheckBox } from "@/interfaces";
import { styles } from "@/styles";

const DEFAULT_HEIGHT = 2.8;

const Container = styled.div`
  height: ${DEFAULT_HEIGHT}rem;
  font-size: ${styles.fontSize.small}rem;

  display: flex;
  align-items: center;

  label {
    margin-left: ${styles.space.level2}rem;
  }
`;

interface Props extends HTMLAttributes<HTMLInputElement> {
  checkBox: CheckBox;
}
const SimpleCheckBox = ({ checkBox }: Props) => {
  const { name, label, validation } = checkBox;
  const { register } = useFormContext();
  return (
    <Container>
      <input type="checkbox" {...register(name, validation)} />
      <label>{label}</label>
    </Container>
  );
};

export default memo(SimpleCheckBox);
