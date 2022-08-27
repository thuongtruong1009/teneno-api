import { DynamicModule } from '@nestjs/common';
import { createLoggerProviders } from './logger.provider';
import { LoggerService } from './logger.service';

export class LoggerModule {
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders = createLoggerProviders();
    return {
      module: LoggerModule,
      providers: [LoggerService, ...prefixedLoggerProviders],
      exports: [LoggerService, ...prefixedLoggerProviders],
    };
  }
}
