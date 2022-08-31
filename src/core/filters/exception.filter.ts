import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  LoggerService,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces/features/arguments-host.interface';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logger: LoggerService) {}

  catch(exception: HttpException | Error, host: ArgumentsHost): void {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const request: Request = ctx.getRequest<Request>();
    const response: Response = ctx.getResponse<Response>();

    this.handleMessage(exception);

    AllExceptionsFilter.handleResponse(request, response, exception);
  }

  private handleMessage(exception: HttpException | Error): void {
    let message = 'Internal Server Error';

    if (exception instanceof HttpException) {
      message = JSON.stringify(exception.getResponse());
    } else if (exception instanceof Error) {
      message = exception.stack.toString();
    }

    this.logger.error(message, exception);
  }

  private static handleResponse(
    request: Request,
    response: Response,
    exception: HttpException | Error,
  ): void {
    let responseBody: any = { message: 'Internal server error' };
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    if (exception instanceof HttpException) {
      responseBody = exception.getResponse();
      statusCode = exception.getStatus();
    } else if (exception instanceof Error) {
      responseBody = {
        statusCode: statusCode,
        timestamp: new Date().toISOString(),
        message: exception.stack,
        path: request.url,
      };
    }

    response.status(statusCode).json(responseBody);
  }
}
