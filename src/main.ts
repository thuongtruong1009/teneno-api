import { Logger as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { initSwagger, setup } from './core/configs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as fs from 'fs';
import * as morgan from 'morgan';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        cors: {
            origin: true,
            credentials: true,
        },
        bufferLogs: true,
    });

    setup(app);
    initSwagger(app);

    const logStream = fs.createWriteStream('api.log', {
        flags: 'a',
    });
    app.use(morgan('tiny', { stream: logStream }));

    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
        app.enable('trust proxy');
        app.set('trust proxy', 1);
    }

    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.TCP,
        options: { retryAttempts: 5, retryDelay: 3000 },
    });
    await app.startAllMicroservices();

    const config: ConfigService = app.get(ConfigService);
    const port: number = config.get<number>('BASE_PORT');

    await app.listen(port, () => {
        console.log(
            '[⚡ Server] is running on ',
            config.get<string>('BASE_URL'),
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

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(async () => await app.close());
    }
}

void bootstrap();
