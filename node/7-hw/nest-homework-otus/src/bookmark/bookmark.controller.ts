import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Controller,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  create(
    @GetUser('id') userId: User['id'],
    @Body() createBookmarkDto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(userId, createBookmarkDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll(@GetUser('id') userId: User['id']) {
    return this.bookmarkService.findAll(userId);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  findOne(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.findOne(userId, bookmarkId);
  }

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  update(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(userId, bookmarkId, updateBookmarkDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(
    @GetUser('id') userId: User['id'],
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.remove(userId, bookmarkId);
  }
}
