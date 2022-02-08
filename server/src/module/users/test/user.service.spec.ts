import { Test } from "@nestjs/testing";
import { HttpException, HttpStatus } from "@nestjs/common";

import { messages } from "@/constants";
import { JoinForm, UserSummary } from "../dto";
import { UserService } from "../user.service";
import { UserRepository } from "../user.repository";
import { userStub } from "./stubs";

jest.mock("../user.repository");

type MockRepository<T> = Partial<Record<keyof T, jest.Mock>>;

describe("UserService", () => {
  let userService: UserService;
  let userRepository: MockRepository<UserRepository>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get(UserRepository);

    jest.clearAllMocks();
  });

  describe("회원가입", () => {
    describe("given: 새 이메일로", () => {
      let joinForm: JoinForm;
      let tempFindOne;

      beforeEach(() => {
        const user = userStub();
        joinForm = {
          email: user.email,
          name: user.name,
          password: user.password,
        };

        tempFindOne = userRepository.findOne;
        userRepository.findOne = jest.fn().mockResolvedValue(null);
      });

      afterEach(() => {
        userRepository.findOne = tempFindOne;
      });

      describe("when: 회원가입을 하면", () => {
        test("then: 비밀번호 없는 UserSummary DTO를 반환합니다.", async () => {
          const result = await userService.join(joinForm);

          const userSummary = new UserSummary(userStub());
          expect(result).toStrictEqual(userSummary);
        });
      });

      describe("when: 회원 정보 저장 중 TypeORM 예외가 발생하면", () => {
        let tempSave;

        beforeAll(() => {
          tempSave = userRepository.save;

          userRepository.save = jest.fn().mockRejectedValue(new Error());
        });

        afterAll(() => {
          userRepository.save = tempSave;
        });

        test("then: INTERNAL SERVER ERROR 예외를 던집니다.", async () => {
          const exception = new HttpException(
            messages.user.joinError,
            HttpStatus.INTERNAL_SERVER_ERROR
          );
          await expect(userService.join(joinForm)).rejects.toThrow(exception);
        });
      });
    });

    describe("given: 이미 가입된 이메일로", () => {
      let joinForm: JoinForm;

      beforeEach(async () => {
        const user = userStub();

        joinForm = {
          email: user.email,
          name: user.name,
          password: user.password,
        };
      });

      describe("when: 회원가입을 하면", () => {
        test("then: BAD REQUEST 예외를 던집니다.", async () => {
          const exception = new HttpException(
            messages.user.duplicateEmail,
            HttpStatus.BAD_REQUEST
          );

          await expect(userService.join(joinForm)).rejects.toThrow(exception);
        });
      });
    });
  });
});
