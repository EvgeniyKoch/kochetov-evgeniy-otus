import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import { EditUserDto } from './dto/edit-user.dto';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard) // check access for user by jwt stratagy, JwtGuard it's like AuthGuard('jwt') from @nestjs/passport
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Patch('edit')
  edituser(@GetUser('id') id: User['id'], @Body() editUserDto: EditUserDto) {
    return this.userService.edit(id, editUserDto);
  }
}
