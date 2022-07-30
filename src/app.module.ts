import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AtGuard } from './auth/common/guards';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, FileModule],
  controllers: [AppController],
  providers: [
    AppService,
    // tuong tự dòng app.useGlobalGuards(new AtGuard(new Reflector())); trong main.ts
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
