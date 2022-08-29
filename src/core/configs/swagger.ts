import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ISwaggerOptions } from './interfaces/option.interface';

export const initSwagger = (app: INestApplication) => {
  const config: ConfigService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Teneno API')
    .setDescription(
      `This is CRUD Rest API endpoints for Teneno - the webapp project builded with NestJS. View the documentation at <a href=${process.env.DOCUMENTATION_URL}>Teneno-API documentation</a>`,
    )
    .setContact(
      'Thuong Truong',
      'https://github.com/thuongtruong1009',
      'ititiu19228@student.hcmiu.edu.vn',
    )
    .addServer(config.get<string>('BASE_URL'))
    .addServer(config.get<string>('HOST_URL'))
    .setVersion('1.4')
    .addTag('cats', 'default description')
    .addBearerAuth({
      type: 'http',
      scheme: 'Bearer',
      bearerFormat: 'JWT',
      description: 'Paste a valid access token here.',
      in: 'Header',
    })
    .addBasicAuth()
    .addSecurity('api_key', {
      type: 'apiKey',
      name: 'api_key',
      in: 'header',
    })
    .build();

  const options: ISwaggerOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, options);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};
