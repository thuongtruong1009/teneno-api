import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy],
})
export class AuthModule {}
