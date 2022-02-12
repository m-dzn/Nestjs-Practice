const getApiPath = (path: string) => `/api${path}`;

export default {
  api: {
    join: getApiPath("/auth/join"),
  },
  client: {
    home: "/",
    join: "/join",
    login: "/login",
  },
};
