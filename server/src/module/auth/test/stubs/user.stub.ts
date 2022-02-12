import { User, UserRole } from "@/module/users";

const checkPassword = function (rawPassword: string) {
  return Promise.resolve(rawPassword === this.password);
};

export function exUserStub() {
  const user: User = {
    id: 1,
    email: "exUser@example.com",
    name: "기존 회원",
    password: "1111",
    role: UserRole.USER,
    checkPassword,
  };

  return user;
}

export const newUserStub = (): User => ({
  id: 2,
  email: "newUser@example.com",
  name: "새 회원",
  password: "2222",
  role: UserRole.USER,
  checkPassword,
});
