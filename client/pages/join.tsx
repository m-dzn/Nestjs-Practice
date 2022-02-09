import { AuthForm, Seo } from "@/components";
import { fields, paths, strings } from "@/constants";
import { AnyForm, Field } from "@/interfaces";
import { userAPI } from "@/lib";
import { useRouter } from "next/router";

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
  const router = useRouter();

  const handleSubmit = async (form: AnyForm) => {
    const response = await userAPI.join({
      email: form.email,
      name: form.name,
      password: form.password,
    });

    if (response.message) {
      alert(response.message);
    }

    if (response.success) {
      router.push(paths.client.home);
    }
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
