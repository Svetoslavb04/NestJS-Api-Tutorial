import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getAll() {
    return this.prisma.bookmark.findMany();
  }

  getById(id: number) {
    return this.prisma.bookmark.findUnique({
      where: {
        id,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        title: dto.title,
        description: dto.description,
        link: dto.link,
        userId,
      },
    });

    return bookmark;
  }
}
