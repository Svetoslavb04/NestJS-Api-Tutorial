import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto/';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@User() user) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('edit')
  edit(@User() user, @Body() dto: EditUserDto) {
    return this.userService.editUser(user.id, dto);
  }
}
