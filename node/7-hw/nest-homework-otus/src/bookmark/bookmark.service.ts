import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {
  }

  async create(userId: number, createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...createBookmarkDto,
      },
    });

    return bookmark;
  }

  findAll(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  findOne(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: { userId, id: bookmarkId },
    });
  }

  async update(
    userId: number,
    bookmarkId: number,
    updateBookmarkDto: UpdateBookmarkDto,
  ) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource id denied');
    }

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: updateBookmarkDto,
    });
  }

  async remove(userId: number, bookmarkId: number) {
    const bookmark = await this.prisma.bookmark.findUnique({
      where: { id: bookmarkId },
    });

    if (!bookmark || bookmark.userId !== userId) {
      throw new ForbiddenException('Access to resource id denied');
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
