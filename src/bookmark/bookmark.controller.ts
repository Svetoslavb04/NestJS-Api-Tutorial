import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { User } from '../auth/decorator';
import { CreateBookmarkDto } from './dto';
import { EditBookmarkDto } from './dto/edit-bookmark.dto';

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

  @Patch('/:id')
  @UseGuards(JwtGuard)
  async editBookmark(
    @Param('id') id: number,
    @User() user,
    @Body() dto: EditBookmarkDto,
  ) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid id');
    }

    const bookmark = await this.bookmarkService.getById(Number(id));
    if (!bookmark) {
      throw new BadRequestException('Bookmark not found');
    }

    if (bookmark.userId != user.id) {
      throw new UnauthorizedException();
    }

    return await this.bookmarkService.updateBookmark(Number(id), dto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async deleteById(@Param('id') id: number) {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid id');
    }

    const bookmark = await this.bookmarkService.getById(Number(id));
    if (!bookmark) {
      throw new BadRequestException('Bookmark not found');
    }

    try {
      const bookmark = await this.bookmarkService.deleteBookmark(Number(id));
      return { bookmark };
    } catch (error) {
      throw error;
    }
  }
}
