import { ValidationPipe, INestApplication } from '@nestjs/common';
import { repl } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
import { AllExceptionsFilter } from '../filters/exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { LoggerService } from '../logger/logger.service';
import { helmetMiddleware } from '../middlewares/helmet.middleware';
import { corsOptions } from './cors.config';
import { initSwagger } from './swagger.config';

export async function setup(app: INestApplication): Promise<INestApplication> {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
        }),
    );

    app.use(cookieParser(process.env.APP_SECRET));

    app.use(
        session({
            secret: process.env.APP_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new session.MemoryStore(),
            cookie: {
                httpOnly: true,
                signed: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
            },
        }),
    );

    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(
        new AllExceptionsFilter(await app.resolve(LoggerService)),
    );

    app.useGlobalInterceptors(new LoggingInterceptor());

    app.use(passport.initialize());
    app.use(passport.session());

    app.enableCors(corsOptions);
    // app.enableCors({
    //     origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    //     credentials: true,
    //     exposedHeaders: ['Authorization'],
    // });

    await repl(AppModule);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    helmetMiddleware(app);

    initSwagger(app);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    return app;
}
