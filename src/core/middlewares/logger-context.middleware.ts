import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerContextMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void): void {
        console.log(`Request ${req}...`);
        console.log(`Response ${res}...`);
        return next();
    }
}
