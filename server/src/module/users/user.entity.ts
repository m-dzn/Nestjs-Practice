import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcryptjs";

import { DateAudit } from "@/common";
import { USER, UserRole, AUTH } from "./user.constant";
import { IsEmail, IsNotEmpty } from "class-validator";
import { messages } from "@/constants";

@Index("email", ["email"], { unique: true })
@Entity()
export class User extends DateAudit {
  @ApiProperty({
    example: "101",
    description: "식별자",
    required: true,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: "test@example.com",
    description: "이메일",
    required: true,
  })
  @IsEmail({}, { message: messages.user.validation.email.isEmail })
  @IsNotEmpty({ message: messages.user.validation.email.isNotEmpty })
  @Column({
    unique: true,
    length: USER.EMAIL.MAX_LENGTH,
  })
  email: string;

  @ApiProperty({
    example: "홍길동",
    description: "회원의 실명",
    required: true,
  })
  @IsNotEmpty({ message: messages.user.validation.name.isNotEmpty })
  @Column({
    length: USER.NAME.MAX_LENGTH,
  })
  name: string;

  @ApiProperty({
    example: "1234",
    description: "비밀번호",
    required: true,
  })
  @Column({
    length: USER.PASSWORD.MAX_LENGTH,
    nullable: true,
    select: false,
  })
  password?: string;

  @ApiProperty({
    example: "USER",
    description: "회원 권한",
    required: true,
  })
  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @Column({
    nullable: true,
    select: false,
  })
  refreshToken?: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?(): Promise<void> {
    if (this.password) {
      try {
        this.password = await bcrypt.hash(this.password, AUTH.salt);
      } catch (err) {
        throw new InternalServerErrorException();
      }
    }
  }
}
