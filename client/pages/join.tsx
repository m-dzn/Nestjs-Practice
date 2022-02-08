import { AuthForm, Seo } from "@/components";
import { fields, strings } from "@/constants";
import { Field } from "@/interfaces";

const loginFields: Field[] = [
  fields.email,
  fields.name,
  fields.password,
  fields.confirmPassword,
];

const checkBoxes = [
  {
    name: "acceptTerms",
    label: "서비스 이용 약관 (필수)",
    validation: {
      required: "서비스 이용 약관에 동의해주세요.",
    },
  },
  {
    name: "personalInfo",
    label: "개인정보 수집 및 이용 동의 (필수)",
    validation: {
      required: "개인정보 수집 및 이용에 동의해주세요.",
    },
  },
];

const Join = () => {
  const handleSubmit = (form: object) => {
    console.log(form);
  };

  return (
    <section>
      <Seo title={strings.seo.join.title} />
      <AuthForm
        type="join"
        fields={loginFields}
        checkBoxes={checkBoxes}
        onSubmit={handleSubmit}
      />
    </section>
  );
};

export default Join;
