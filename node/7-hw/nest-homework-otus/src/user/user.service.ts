import { Injectable, Post } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async edit(id: number, editUserDto: EditUserDto) {
    const editedUser = await this.prisma.user.update({
      where: { id },
      data: {
        email: editUserDto.email,
        firstName: editUserDto.firstName,
        lastName: editUserDto.lastName,
      },
    });

    return editedUser;
  }
}
