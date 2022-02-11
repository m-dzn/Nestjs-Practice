import { messages } from "@/constants";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { JoinForm, UserSummary } from "./dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async setRefreshToken(userId: number, refreshToken: string) {
    await this.userRepository.update(userId, {
      refreshToken,
    });
  }
}
