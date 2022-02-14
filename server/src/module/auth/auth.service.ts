import {
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  UseGuards,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";

import { messages } from "@/constants";
import { AUTH, SNSProvider, User, UserSummary } from "@/module/users";

import { JWT } from "./auth.constant";
import { JoinForm, OAuthRequest } from "./dto";
import { JWTPayload } from "./interfaces";
import { CurrentUser, JwtAuthGuard } from "@/module/auth";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

  @Get("/me")
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: User) {
    return new UserSummary(user);
  }

  async join({ email, name, password }: JoinForm): Promise<UserSummary> {
    const exUser = await this.userRepository.findOne({ email });

    if (exUser) {
      throw new HttpException(
        messages.user.duplicateEmail,
        HttpStatus.BAD_REQUEST
      );
    }

    try {
      const newUser = await this.userRepository.save(
        this.userRepository.create({
          email,
          name,
          password: await bcrypt.hash(password, AUTH.salt),
        })
      );

      return new UserSummary(newUser);
    } catch (err) {
      throw new HttpException(
        messages.user.joinError,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async validateLocalUser(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  async validateJwtUser({ id }: JWTPayload): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  async validateOAuthUser(
    email: string,
    provider: SNSProvider,
    snsId: string
  ): Promise<User> {
    const user = await this.userRepository.findOne({ email });

    if (!user) return null;

    // SNS ID까지 비교하는 것이 리소스 낭비가 될지 고민해보기
    if (user.provider !== provider.toUpperCase() || user.snsId != snsId) {
      throw new HttpException(
        messages.user.linkedAnotherSNS,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  async oauthJoin(oauthJoinForm: OAuthRequest): Promise<User> {
    return this.userRepository.save(oauthJoinForm);
  }

  getAccessToken(payload: JWTPayload) {
    return this.jwtService.sign(payload, {
      secret: this.config.get("ACCESS_TOKEN_SECRET"),
    });
  }

  async getRefreshToken(payload: JWTPayload) {
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.config.get("REFRESH_TOKEN_SECRET"),
      expiresIn: JWT.REFRESH_TOKEN_EXPIRES_IN,
    });

    await this.userRepository.update(payload.id, {
      refreshToken,
    });

    return refreshToken;
  }
}
