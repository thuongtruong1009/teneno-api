import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AtGuard } from './infrastructure/auth/common/guards';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UsersModule } from './infrastructure/users/users.module';
import { FilesModule } from './infrastructure/files/files.module';

@Module({
  imports: [AuthModule, PrismaModule, UsersModule, FilesModule],
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
