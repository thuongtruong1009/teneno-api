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
import { AtGuard } from './infrastructure/auth/guards';
import { PrismaModule } from './infrastructure/prisma/prisma.module';
import { UsersModule } from './infrastructure/users/users.module';
import { FilesModule } from './infrastructure/files/files.module';
import { ConfigModule } from '@nestjs/config';
import { InterceptorModule } from './core/interceptors/interceptor.module';
import { LoggerMiddleware } from './core/middleware/logger.middleware';
import { UsersController } from './infrastructure/users/users.controller';
import { MessagesModule } from './infrastructure/messages/messages.module';
import { ConversationsModule } from './infrastructure/conversations/conversations.module';
import { PostsModule } from './infrastructure/posts/posts.module';
import { LoggerModule } from './core/logger/logger.module';

@Module({
  imports: [
    InterceptorModule,
    AuthModule,
    PrismaModule,
    UsersModule,
    FilesModule,
    PostsModule,
    ConversationsModule,
    MessagesModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env'],
    }),
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // the same app.useGlobalGuards(new AtGuard(new Reflector())); in main.ts
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
    //.forRoutes({ path: 'auth', method: RequestMethod.GET });  // apply middleware for GET request at router /auth
    //.forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });  // apply middleware for all requesta matching pattern ab*cd
  }
}
