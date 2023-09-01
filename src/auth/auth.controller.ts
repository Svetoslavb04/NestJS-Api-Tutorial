import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    try {
      const user = await this.authService.signup(dto);
      return user;
    } catch (error) {
      return null;
    }
  }

  @Post('signin')
  signin() {
    return 'Sign in';
  }
}
