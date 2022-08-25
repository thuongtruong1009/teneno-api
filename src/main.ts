import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './core/filters/http.filter';
import * as cookieParser from 'cookie-parser';
import { corsOptions } from './core/configs/cors.config';
import { initSwagger } from './core/configs/swagger';
import { LoggingInterceptor } from './infrastructure/core/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors(corsOptions);
  app.use(cookieParser());

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
  // app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  initSwagger(app);

  // app.useGlobalInterceptors(new LoggingInterceptor());

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  await app.listen(port, () => {
    console.log('[⚡ Server] is running on ', config.get<string>('BASE_URL'));
    console.log(
      '[⚡ Swagger] is running on ',
      config.get<string>('SWAGGER_URL'),
    );
    console.log(
      '[⚡ Web Socket] is running on ',
      config.get<string>('SOCKET_URL'),
    );
  });
}
bootstrap();
