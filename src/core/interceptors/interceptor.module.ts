import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/core/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/core/interceptors/transform.interceptor';
import { CacheInterceptor } from './cache.interceptor';
import { ErrorsInterceptor } from './errors.interceptor';
import { ExcludeNullInterceptor } from './null.interceptor';
import { TimeoutInterceptor } from './timeout.interceptor';

@Module({
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ExcludeNullInterceptor },
        { provide: APP_INTERCEPTOR, useClass: TimeoutInterceptor },
        { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ErrorsInterceptor },
    ],
})
export class InterceptorModule {}
