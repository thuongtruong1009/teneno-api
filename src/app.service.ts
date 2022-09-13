import { CacheInterceptor, Injectable, UseInterceptors } from '@nestjs/common';
import { Logger } from './core/logger/logger.decorator';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
@UseInterceptors(CacheInterceptor)
export class AppService {
    constructor(@Logger('AppService') private logger: LoggerService) {}

    getHello(session: Record<string, any>): any {
        this.logger.log('Hello World', '200');
        session.visits = session.visits ? session.visits + 1 : 1;
        return {
            views: `You visited this site ${session.visits} times`,
            message: 'Hello World from Teneno!',
        };
    }
}
