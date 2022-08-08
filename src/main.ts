import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { corsOptions } from './api/cors.config';
import { initSwagger } from './api/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.enableCors(corsOptions);
  initSwagger(app);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');

  await app.listen(port, () => {
    console.log('[⚡ Server] is running on ', config.get<string>('BASE_URL'));
    console.log(
      '[⚡ Swagger] is running on ',
      config.get<string>('BASE_URL') + '/api',
    );
    console.log(
      '[⚡ Web Socket] is running on ',
      config.get<string>('SOCKET_URL'),
    );
  });
}
bootstrap();
