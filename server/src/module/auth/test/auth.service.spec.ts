import { Test } from "@nestjs/testing";
import { HttpStatus } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { getRepositoryToken } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";

import { User, UserSummary } from "@/module/users";

import { JoinForm } from "../dto";
import { AuthService } from "../auth.service";
import { exUserStub, newUserStub } from "./stubs";
import { MockUserRepository, MockJwtService } from "./mocks";

describe("AuthService", () => {
  let authService: AuthService;
  let userRepository: MockUserRepository;
  let jwtService: MockJwtService;

  let exUser: User;
  let newUser: User;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: JwtService,
          useValue: MockJwtService,
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userRepository = module.get(getRepositoryToken(User));
    jwtService = module.get(JwtService);

    exUser = exUserStub();
    newUser = newUserStub();

    jest.clearAllMocks();
  });

  describe("join()", () => {
    let joinForm: JoinForm;

    beforeEach(() => {
      joinForm = {
        email: newUser.email,
        name: newUser.name,
        password: newUser.password,
      };
    });

    test("가입 성공 시 DTO(UserSummary)를 반환합니다.", async () => {
      const result = await authService.join(joinForm);

      const userSummary = new UserSummary(exUserStub());
      expect(result).toStrictEqual(userSummary);
    });

    test("TypeORM 예외 시 INTERNAL SERVER ERROR를 던집니다.", async () => {
      userRepository.save.mockRejectedValue(new Error());

      try {
        await authService.join(joinForm);
      } catch (err) {
        expect(err.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      }
    });

    test("이메일 중복 시 BAD REQUEST 예외를 던집니다.", async () => {
      const joinFormWithDuplicateEmail: JoinForm = {
        email: exUser.email,
        name: exUser.name,
        password: exUser.password,
      };

      expect(authService.join(joinForm)).resolves;
      try {
        await authService.join(joinFormWithDuplicateEmail);
      } catch (err) {
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });

  describe("validateLocalUser()", () => {
    test("비밀번호가 유효하면 User 정보를 반환합니다.", async () => {
      const result = await authService.validateLocalUser(
        exUser.email,
        exUser.password
      );

      expect(result.id).toEqual(exUserStub().id);
    });

    test("회원을 찾을 수 없으면 BAD REQUEST 예외를 던집니다.", async () => {
      try {
        await authService.validateLocalUser(newUser.email, newUser.password);
      } catch (err) {
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });

    test("비밀번호가 일치하지 않으면 BAD REQUEST 예외를 던집니다.", async () => {
      try {
        await authService.validateLocalUser(exUser.email, "");
      } catch (err) {
        expect(err.status).toBe(HttpStatus.BAD_REQUEST);
      }
    });
  });
});
