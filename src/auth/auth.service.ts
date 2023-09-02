import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';

import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signin(dto: AuthDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Incorrect Credentials');
    }

    const isPasswordCorrect = await argon.verify(user.hash, dto.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Incorrect Credentials');
    }

    delete user.hash;

    return user;
  }

  async signup(dto: AuthDto) {
    const passwordHash = await argon.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash: passwordHash,
      },
    });

    delete user.hash;
    delete user.updatedAt;

    return user;
  }
}
