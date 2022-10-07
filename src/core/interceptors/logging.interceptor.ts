import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const userAgent = context.switchToHttp().getRequest().headers[
            'user-agent'
        ];

        console.log('Connecting ' + context.getClass().name);
        const now = Date.now();
        return next.handle().pipe(
            tap((data) =>
                console.log(`After... ${Date.now() - now}ms`, data, userAgent),
            ),
            catchError((err) => {
                console.log(
                    'err caught in interceptor, you can log it in logger or send it to newrelic or similar',
                    err,
                );
                throw err;
            }),
        );
    }
}
