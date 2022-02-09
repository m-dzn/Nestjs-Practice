const getApiPath = (path: string) => `/api${path}`;

export default {
  api: {
    join: getApiPath("/users"),
  },
  client: {
    home: "/",
    join: "/join",
    login: "/login",
  },
};
