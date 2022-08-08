import { Module } from '@nestjs/common';
import { AuthModule } from 'src/infrastructure/auth/auth.module';
import { PrismaModule } from 'src/infrastructure/prisma/prisma.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
