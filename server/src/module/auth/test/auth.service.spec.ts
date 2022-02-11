import { Test } from "@nestjs/testing";
import { User, UserService } from "@/module/users";
import { AuthService } from "../auth.service";
import { JwtService } from "@nestjs/jwt";
import { LoginForm } from "@/module/auth/dto";
import { userStub } from "@/module/users/test/stubs";
import { ConfigService } from "@nestjs/config";
import { HttpException, HttpStatus } from "@nestjs/common";
import { messages } from "@/constants";

const mockUserService = () => ({
  getByEmail: jest.fn(),
});

const mockJwtService = () => ({
  sign: jest.fn(() => "signed-token"),
  verify: jest.fn(),
});

describe("AuthService", () => {
  let authService: AuthService;
  let userService;
  let jwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        ConfigService,
        {
          provide: UserService,
          useValue: mockUserService(),
        },
        {
          provide: JwtService,
          useValue: mockJwtService(),
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);

    jest.clearAllMocks();
  });

  describe("이메일 회원 검증", () => {
    const loginForm: LoginForm = {
      email: "test@example.com",
      password: "1111",
    };

    test("비밀번호가 유효하면 User 정보를 반환합니다.", async () => {
      const mockedUser = {
        id: 1,
        ...loginForm,
        checkPassword: jest.fn(() => Promise.resolve(true)),
      };
      userService.getByEmail.mockResolvedValue(mockedUser);

      const result = await authService.validateLocalUser(
        mockedUser.email,
        mockedUser.password
      );

      expect(result.id).toEqual(mockedUser.id);
    });

    test("회원이 존재하지 않으면 BAD REQUEST 예외를 던집니다.", async () => {
      userService.getByEmail.mockResolvedValue(null);

      const exception = new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );

      await expect(
        authService.validateLocalUser(loginForm.email, loginForm.password)
      ).rejects.toThrow(exception);
    });

    test("비밀번호가 일치하지 않으면 BAD REQUEST 예외를 던집니다.", async () => {
      const mockedUser = {
        id: 1,
        ...loginForm,
        checkPassword: jest.fn(() => Promise.resolve(false)),
      };
      userService.getByEmail.mockResolvedValue(mockedUser);

      const exception = new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );

      await expect(
        authService.validateLocalUser(loginForm.email, loginForm.password)
      ).rejects.toThrow(exception);
    });
  });
});
