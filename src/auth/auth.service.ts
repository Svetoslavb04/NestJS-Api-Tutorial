import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';

import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

    return this.signToken(user.id, user.email, user.firstName, user.lastName);
  }

  async signup(dto: AuthDto) {
    const passwordHash = await argon.hash(dto.password);

    const user = await this.prismaService.user.create({
      data: {
        email: dto.email,
        hash: passwordHash,
      },
    });

    return this.signToken(user.id, user.email, user.firstName, user.lastName);
  }

  async signToken(
    id: number,
    email: string,
    firstName: string,
    lastName: string,
  ) {
    const payload = {
      sub: id,
      email,
      firstName,
      lastName,
    };

    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.configService.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
