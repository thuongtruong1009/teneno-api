import {
    CacheModule,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './infrastructure/auth/auth.module';
import { AtGuard } from './infrastructure/auth/guards';
import { PrismaModule } from './abstraction/prisma/prisma.module';
import { UsersModule } from './infrastructure/users/users.module';
import { FilesModule } from './infrastructure/files/files.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';
import { InterceptorModule } from './core/interceptors/interceptor.module';
import { LoggerContextMiddleware } from './core/middlewares/logger-context.middleware';
import { MessagesModule } from './infrastructure/messages/messages.module';
import { ConversationsModule } from './infrastructure/conversations/conversations.module';
import { PostsModule } from './infrastructure/posts/posts.module';
import { LoggerModule } from './core/logger/logger.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AdminModule } from './infrastructure/admin/admin.module';
import { RolesGuard } from './core/roles';
import { OauthModule } from './infrastructure/oauth/oauth.module';
import { MathModule } from './abstraction/microservices/math/math.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

@Module({
    imports: [
        InterceptorModule,
        PrismaModule,
        TerminusModule,
        ThrottlerModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                ttl: config.get<number>('THROTTLE_TTL'),
                limit: config.get<number>('THROTTLE_LIMIT'),
                ignoreUserAgents: [
                    // Don't throttle request that have 'googlebot' defined in them.
                    // Example user agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
                    /googlebot/gi,
                    // Example user agent: Mozilla/5.0 (compatible; Bingbot/2.0; +http://www.bing.com/bingbot.htm)
                    new RegExp('bingbot', 'gi'),
                ],
            }),
        }),
        CacheModule.register(),
        MathModule,
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            // envFilePath: ['.env'],
            envFilePath: `.env.${process.env.NODE_ENV} || .env`,
        }),
        LoggerModule.forRoot(),
        ServeStaticModule.forRoot({
            rootPath: `${__dirname}/../docs`,
            // rootPath: join(__dirname, '..', 'docs'),
            renderPath: '/',
            // exclude: ['/api*'],
        }),
        AuthModule,
        OauthModule,
        AdminModule,
        UsersModule,
        FilesModule,
        PostsModule,
        ConversationsModule,
        MessagesModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        // the same app.useGlobalGuards(new AtGuard(new Reflector())); in main.ts
        {
            provide: APP_GUARD,
            useClass: AtGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard,
        },
    ],
})
export class AppModule implements NestModule {
    public configure(consumer: MiddlewareConsumer): void {
        consumer.apply(LoggerContextMiddleware).forRoutes('*');
        //   .exclude({ path: 'users', method: RequestMethod.GET }, 'users/(.*)')
        //   .forRoutes(UsersController);
        // .forRoutes('users');
        // .forRoutes({ path: 'auth', method: RequestMethod.GET });  // apply middleware for GET request at router /auth
        // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });  // apply middleware for all requesta matching pattern ab*cd
    }
}
