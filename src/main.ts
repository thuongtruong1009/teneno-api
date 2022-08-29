import { ValidationPipe, Logger as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { corsOptions } from './core/configs/cors.config';
import { initSwagger } from './core/configs/swagger';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';
import { LoggerService } from './core/logger/logger.service';
import { AllExceptionsFilter } from './core/filters/exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { helmetMiddleware } from './core/middlewares/helmet.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  app.enableCors(corsOptions);
  app.use(cookieParser());

  const isProduction = process.env.NODE_ENV === 'production';
  if (isProduction) {
    app.enable('trust proxy');
  }
  helmetMiddleware(app);

  initSwagger(app);

  await repl(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalFilters(
    new AllExceptionsFilter(await app.resolve(LoggerService)),
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalInterceptors(new LoggingInterceptor());

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('BASE_PORT');

  await app.listen(port, () => {
    console.log('[⚡ Server] is running on ', config.get<string>('BASE_URL'));
    console.log(
      '[⚡ Documentation] is running on ',
      config.get<string>('DOCUMENTATION_URL'),
    );
    console.log(
      '[⚡ Swagger] is running on ',
      config.get<string>('SWAGGER_URL'),
    );
    console.log(
      '[⚡ Web Socket] is running on ',
      config.get<string>('SOCKET_URL'),
    );
    console.log(
      '[⚡ Database adminer] is running on ',
      config.get<string>('ADMINER_URL'),
    );
  });
}

void bootstrap();
