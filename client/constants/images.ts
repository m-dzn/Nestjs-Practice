const setImagePrefix = (path: string) => `/images${path}`;

export default {
  logo: setImagePrefix("/temp-logo.png"),
  kakaoLogo: setImagePrefix("/kakao-logo.png"),
  naverLogo: setImagePrefix("/naver-logo.png"),
};
