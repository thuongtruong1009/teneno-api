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
import {
    CustomHttpExceptionResponse,
    HttpExceptionResponse,
} from './model/http-exception-response.interface';
import * as fs from 'fs';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private logger: LoggerService) {}

    catch(exception: HttpException | Error, host: ArgumentsHost): void {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const request: Request = ctx.getRequest<Request>();
        const response: Response = ctx.getResponse<Response>();

        this.handleMessageLog(exception);

        AllExceptionsFilter.handleMessageResponse(request, response, exception);
    }

    private handleMessageLog(exception: HttpException | Error): void {
        let message = 'Internal Server Error';

        if (exception instanceof HttpException) {
            message = JSON.stringify(exception.getResponse());
        } else if (exception instanceof Error) {
            message = exception.stack.toString();
        }

        this.logger.error(message, exception);
    }

    private static handleMessageResponse(
        request: Request,
        response: Response,
        exception: HttpException | Error,
    ): void {
        let responseBody: any = {
            message: 'Critical internal server error occurred!',
        };
        let statusCode: HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof HttpException) {
            const errorResponse = exception.getResponse();
            statusCode = exception.getStatus();
            responseBody =
                (errorResponse as HttpExceptionResponse).error ||
                exception.message;
        } else if (exception instanceof Error) {
            statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        const errorResponse = this.getErrorResponse(
            statusCode,
            exception.stack.toString(),
            responseBody,
        );
        const errorLog = this.getErrorLog(errorResponse, request, exception);
        this.writeErrorLogToFile(errorLog);
        response.status(statusCode).json(responseBody);
    }

    private static getErrorResponse = (
        statusCode: HttpStatus,
        errorMessage: string,
        request: Request,
    ): CustomHttpExceptionResponse => ({
        statusCode: statusCode,
        error: errorMessage,
        path: request.url,
        method: request.method,
        timeStamp: new Date(),
    });

    private static getErrorLog = (
        errorResponse: CustomHttpExceptionResponse,
        request: Request,
        exception: unknown,
    ): string => {
        const { statusCode, error } = errorResponse;
        const { method, url } = request;
        const errorLog = `Response Code: ${statusCode} - Method: ${method} - URL: ${url}\n
        ${JSON.stringify(errorResponse)}\n
        User: ${JSON.stringify(request.user ?? 'Not signed in')}\n
        ${exception instanceof HttpException ? exception.stack : error}\n`;
        return errorLog;
    };

    private static writeErrorLogToFile = (errorLog: string): void => {
        fs.appendFile('error.log', errorLog, 'utf8', (err) => {
            if (err) throw err;
        });
    };
}
