import { FormEvent } from "react";
import styled from "@emotion/styled";
import { FieldError, FormProvider, useForm } from "react-hook-form";

import { AnyForm, AuthType, CheckBox, Field, JoinForm } from "@/interfaces";
import { strings } from "@/constants";
import { ColorButton, LargeInput, SimpleCheckBox } from "@/components";
import { styles } from "@/styles";

import OAuthButtonContainer from "./OAuthButtonContainer";

const WIDTH = 37.6;
const VERTICAL_MARGIN = 6.4;
const AUTH_FORM_ROW_GAP = styles.space.level6;

const FORM_BODY_ROW_GAP = styles.space.level3;

const Section = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: ${WIDTH}rem;
  margin: ${VERTICAL_MARGIN}rem 0;

  display: flex;
  flex-direction: column;
  row-gap: ${AUTH_FORM_ROW_GAP}rem;
`;

const Title = styled.h2`
  margin: 0;

  text-transform: capitalize;
  font-family: "Playfair Display";
  text-align: center;
`;

const FormBody = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${FORM_BODY_ROW_GAP}rem;
`;

interface Props {
  type: AuthType;
  fields: Field[];
  checkBoxes: CheckBox[];
  onSubmit: (form: AnyForm) => void;
}
const AuthForm = ({ type, fields, checkBoxes, onSubmit }: Props) => {
  const formMethods = useForm({
    mode: "onTouched",
  });

  const { errors } = formMethods.formState;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    formMethods.handleSubmit(onSubmit)(e);

    for (const field of [...fields, ...checkBoxes]) {
      const error: FieldError = errors[field.name];
      if (error) {
        alert(error.message);
        formMethods.setFocus(field.name);
        break;
      }
    }
  };

  return (
    <Section>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit}>
          <Wrapper>
            <Title>{type}</Title>
            <FormBody>
              {fields.map((field) => (
                <LargeInput key={field.name} field={field} errors={errors} />
              ))}
              <div>
                {checkBoxes.map((checkBox) => (
                  <SimpleCheckBox key={checkBox.name} checkBox={checkBox} />
                ))}
              </div>
              <ColorButton type="submit">{strings.seo[type].title}</ColorButton>
            </FormBody>
            <OAuthButtonContainer type={type} />
          </Wrapper>
        </form>
      </FormProvider>
    </Section>
  );
};

export default AuthForm;
