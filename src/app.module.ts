import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AtGuard } from './infrastructure/auth/common/guards';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UsersModule } from './infrastructure/users/users.module';
import { FilesModule } from './infrastructure/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './infrastructure/core/core.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { UsersController } from './infrastructure/users/users.controller';
import { MessagesModule } from './infrastructure/messages/messages.module';
import { ConversationsModule } from './infrastructure/conversations/conversations.module';
import { OauthModule } from './infrastructure/oauth/oauth.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    OauthModule,
    PrismaModule,
    UsersModule,
    FilesModule,
    ConversationsModule,
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'],
    }),
  ],
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude({ path: 'users', method: RequestMethod.GET }, 'users/(.*)')
      .forRoutes(UsersController);
    //.forRoutes('users');
    //.forRoutes({ path: 'auth', method: RequestMethod.GET });  // apply middleware cho GET request tại router /auth
    //.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });  // apply middleware cho tất cả request khớp pattern ab*cd
  }
}
