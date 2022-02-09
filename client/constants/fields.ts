const EMAIL_MAX_LENGTH = 255;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 17;

const PASSWORD_MIN_LENGTH = 4;
const PASSWORD_MAX_LENGTH = 255;

export default {
  email: {
    name: "email",
    type: "email",
    placeholder: "이메일",
    validation: {
      required: "이메일은 필수 입력 항목입니다.",
      maxLength: {
        value: EMAIL_MAX_LENGTH,
        message: "이메일이 너무 깁니다.",
      },
      pattern: {
        value: /^[a-z0-9]+@[a-z0-9]+\.[a-z]{2,3}$/i,
        message: "이메일 형식에 맞게 입력해주세요.",
      },
    },
  },
  name: {
    name: "name",
    type: "text",
    placeholder: "이름",
    validation: {
      required: "이름은 필수 입력 항목입니다.",
      minLength: {
        value: NAME_MIN_LENGTH,
        message: `이름은 최소 ${NAME_MIN_LENGTH}자 이상이어야 합니다.`,
      },
      maxLength: {
        value: NAME_MAX_LENGTH,
        message: `이름은 ${NAME_MAX_LENGTH}자 이하여야 합니다.`,
      },
    },
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "비밀번호",
    validation: {
      required: "비밀번호는 필수 입력 항목입니다.",
      minLength: {
        value: PASSWORD_MIN_LENGTH,
        message: `비밀번호는 최소 ${PASSWORD_MIN_LENGTH}자 이상이어야 합니다.`,
      },
      maxLength: {
        value: PASSWORD_MAX_LENGTH,
        message: `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하여야 합니다.`,
      },
    },
  },
  confirmPassword: {
    name: "confirmPassword",
    type: "password",
    placeholder: "비밀번호 확인",
    validation: {
      required: "비밀번호를 다시 한 번 입력해주세요.",
    },
    match: {
      fieldName: "password",
      message: "비밀번호가 일치하지 않습니다.",
    },
  },
};
