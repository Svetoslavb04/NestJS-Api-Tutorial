import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    try {
      const user = await this.authService.signup(dto);
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Email not unique');
        }
      }
      throw error;
    }
  }

  @Post('signin')
  async signin(@Body() dto: AuthDto) {
    const user = await this.authService.signin(dto);

    return 'Sign in';
  }
}
