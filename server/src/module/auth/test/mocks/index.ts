import { exUserStub } from "../stubs";

export class MockUserRepository {
  create = jest.fn();

  save = jest.fn().mockResolvedValue(exUserStub());

  update = jest.fn();

  async findOne({ id, email }: { id?: number; email?: string }) {
    const user = exUserStub();
    if (id === user.id || email === user.email) {
      return user;
    } else {
      return null;
    }
  }
}

export class MockJwtService {
  sign = jest.fn(() => "signed-token");
  verify = jest.fn();
}
