import { default as images } from "./images";
import { styles } from "@/styles";

export default {
  siteName: "VIA",
  copyright: "© 2022 Kyeongho Yang. All rights reserved.",
  seo: {
    home: {
      title: "홈",
    },
    join: {
      title: "회원가입",
    },
    login: {
      title: "로그인",
    },
  },
  validation: {
    defaultMessage: "잘못된 입력입니다.",
  },
  snsProvider: {
    kakao: {
      logo: images.kakaoLogo,
      background: "#FEE500",
      fontColor: styles.color.black,
      message: {
        login: "카카오 아이디로 로그인",
        join: "카카오 아이디로 회원가입",
      },
    },
    naver: {
      logo: images.naverLogo,
      background: "#03C75A",
      fontColor: styles.color.white,
      message: {
        login: "네이버 아이디로 로그인",
        join: "네이버 아이디로 회원가입",
      },
    },
  },
};
