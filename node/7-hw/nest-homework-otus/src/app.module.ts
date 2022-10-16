import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    BookmarkModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true, // to access in all serivices (for enstance in PrismaService)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
