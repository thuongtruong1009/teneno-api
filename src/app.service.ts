import {
    CacheInterceptor,
    CACHE_MANAGER,
    Inject,
    Injectable,
    UseInterceptors,
} from '@nestjs/common';
import { Logger } from './core/logger/logger.decorator';
import { LoggerService } from './core/logger/logger.service';
import { Cache } from 'cache-manager';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class AppService {
    constructor(
        @Logger('AppService') private logger: LoggerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    async getHello(session: Record<string, any>): Promise<any> {
        this.logger.log('Hello World', '200');
        session.visits = (await session.visits) ? session.visits + 1 : 1;
        const cacheToken = await this.cacheManager.get(
            'cacheToken' || undefined,
        );
        const console: Object = {
            Views: `You're visited this page ${await session.visits} times`,
            Message: 'Hello World from Teneno!',
            Note: `This view has been cached by Cache-Interceptor in ${process.env.CACHE_TTL} seconds.`,
            Tip: 'Disable cache module in app.module.ts to reset views.',
            CacheToken: cacheToken,
        };
        return console;
    }
}
