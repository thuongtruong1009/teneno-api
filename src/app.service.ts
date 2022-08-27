import { Injectable } from '@nestjs/common';
import { Logger } from './core/logger/logger.decorator';
import { LoggerService } from './core/logger/logger.service';

@Injectable()
export class AppService {
  constructor(@Logger('AppService') private logger: LoggerService) {}

  getHello(): string {
    this.logger.log('Hello World', '200');
    return 'Hello World from Teneno!';
  }
}
