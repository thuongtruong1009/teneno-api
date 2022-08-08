import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const initSwagger = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Teneno API')
    .setDescription(
      "This is CRUD API for Teneno - the webapp project builded with NestJS. View the source at <a href='https://github.com/thuongtruong1009/teneno-api'>teneno-api</a>",
    )
    .addServer('http://127.0.0.1:5500')
    .addServer('http://localhost:5500')
    .setVersion('1.0')
    .addTag('cats', 'default description')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        name: 'Authorization',
        // bearerFormat: 'JWT',
        bearerFormat: 'Bearer',
        description: 'Paste a valid access token here.',
        in: 'Header',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);
};
