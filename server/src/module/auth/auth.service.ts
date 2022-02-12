import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";

import { APP, messages } from "@/constants";
import { User, UserSummary } from "@/module/users";

import { JWT } from "./auth.constant";
import { JoinForm } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}

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
          password,
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

    const isPasswordValid = await user.checkPassword(password);
    delete user.password;

    if (!isPasswordValid) {
      throw new HttpException(
        messages.user.badLoginRequest,
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }

  getAccessToken(user: User) {
    return this.jwtService.sign(
      { id: user.id },
      {
        secret: this.config.get(APP.ENV.ACCESS_TOKEN_SECRET),
      }
    );
  }

  async getRefreshToken(user: User) {
    const refreshToken = this.jwtService.sign(
      { id: user.id },
      {
        secret: this.config.get(APP.ENV.REFRESH_TOKEN_SECRET),
        expiresIn: JWT.REFRESH_TOKEN_EXPIRES_IN,
      }
    );

    await this.userRepository.update(user.id, {
      refreshToken,
    });

    return refreshToken;
  }
}
