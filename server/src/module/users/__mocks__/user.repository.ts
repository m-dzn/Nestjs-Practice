import { userStub } from "../test/stubs";

export const UserRepository = jest.fn().mockReturnValue({
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue(userStub()),
  findWithPassword: jest.fn(),
});
