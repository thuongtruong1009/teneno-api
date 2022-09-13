import {
    ValidationPipe,
    INestApplication,
    HttpStatus,
    VersioningType,
} from '@nestjs/common';
import { repl } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import helmet from 'helmet';
import * as passport from 'passport';
import { AppModule } from 'src/app.module';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';
import { AllExceptionsFilter } from '../filters/exception.filter';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { LoggerService } from '../logger/logger.service';
import { corsOptions } from './cors.config';
import { v4 as uuid } from 'uuid';
import * as csurf from 'csurf';

export async function setup(app: INestApplication): Promise<INestApplication> {
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
            forbidNonWhitelisted: true,
            transformOptions: { enableImplicitConversion: true },
            errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    );

    app.use(cookieParser(process.env.APP_SECRET));

    const hour = 3600000;
    app.use(
        session({
            genid: () => uuid(),
            secret: process.env.APP_SECRET,
            resave: false,
            saveUninitialized: false,
            store: new session.MemoryStore(),
            cookie: {
                httpOnly: true,
                signed: true,
                sameSite: 'strict',
                expires: new Date(Date.now() + hour),
                maxAge: hour,
                secure: process.env.NODE_ENV === 'production',
            },
        }),
    );

    // app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(
        new AllExceptionsFilter(await app.resolve(LoggerService)),
    );

    app.useGlobalInterceptors(new LoggingInterceptor());

    function shouldCompress(req: any, res: any) {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    }
    app.use(compression({ filter: shouldCompress }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.enableCors(corsOptions);
    // app.enableCors({
    //     origin: process.env.ALLOWED_ORIGINS?.split(/\s*,\s*/) ?? '*',
    //     credentials: true,
    //     exposedHeaders: ['Authorization'],
    // });

    await repl(AppModule);

    app.use(csurf());

    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);

    const isProduction = process.env.NODE_ENV === 'production';
    app.use(
        helmet({
            contentSecurityPolicy: isProduction ? true : false,
            crossOriginEmbedderPolicy: isProduction ? true : false,
        }),
    );
    useContainer(app.select(AppModule), { fallbackOnErrors: true });

    // custome version api
    const extractor = (request: Request): string | string[] =>
        [request.headers['custom-versioning-field'] ?? '']
            .flatMap((v) => v.split(','))
            .filter((v) => !!v)
            .sort()
            .reverse();

    app.enableVersioning({
        type: VersioningType.CUSTOM,
        extractor,
    });

    return app;
}
