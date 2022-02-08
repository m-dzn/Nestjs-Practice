import { UserRole } from "../../user.constant";
import { User } from "../../user.entity";

export const userStub = (): User => ({
  id: 1,
  email: "test@example.com",
  name: "테스터",
  password: "1111",
  role: UserRole.USER,
});
