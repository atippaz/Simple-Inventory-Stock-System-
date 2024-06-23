import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [PassportModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
