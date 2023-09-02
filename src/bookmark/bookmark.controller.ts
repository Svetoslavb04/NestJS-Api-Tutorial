import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { User } from '../auth/decorator';
import { CreateBookmarkDto } from './dto';

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Get('all')
  getAll() {
    return this.bookmarkService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid id');
    }

    try {
      const bookmark = await this.bookmarkService.getById(Number(id));
      return { bookmark };
    } catch (error) {
      throw error;
    }
  }

  @Post('/create')
  @UseGuards(JwtGuard)
  async createBookmark(@User() user, @Body() dto: CreateBookmarkDto) {
    try {
      return await this.bookmarkService.createBookmark(user.id, dto);
    } catch (error) {
      throw error;
    }
  }
}
