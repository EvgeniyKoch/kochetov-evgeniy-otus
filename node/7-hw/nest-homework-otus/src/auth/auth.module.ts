import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports: [JwtModule.register({})], // register jwt module for auth.service, if you want use jwt anywhere you need use @Global or isGlobal: ture in CoreModule, then import CoreModule once, in your AppModule.
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], //The main idea of a provider is that it can be injected as a dependency
})
export class AuthModule {}
