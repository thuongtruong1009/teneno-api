import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Req,
    Res,
    Session,
    UseGuards,
    Version,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AppService } from './app.service';
import { ThrottlerBehindProxyGuard } from './core/security/throttle-proxy.guard';
import { Public } from './infrastructure/auth/decorators';
import { Request, Response } from 'express';

@ApiTags('Home')
@UseGuards(ThrottlerBehindProxyGuard)
@SkipThrottle()
@Public()
@Controller({ version: '2', path: '/' })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @SkipThrottle(false)
    dontSkip() {
        return 'List users work with Rate limiting.';
    }

    doSkip() {
        return 'List users work without Rate limiting.';
    }

    @Version('1')
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Teneno homepage' })
    @ApiResponse({
        status: 200,
        description: 'Default server response',
    })
    @ApiResponse({ status: 404, description: 'Not found' })
    async getHello(@Session() session: Record<string, any>): Promise<any> {
        return this.appService.getHello(session);
    }

    @Get('cookie/server')
    requestCookie(@Req() request: Request) {
        console.log(`Cookies: ${request.session.cookie}`);
        console.log(`Signed cookies: ${request.signedCookies}`);
        return `Cookies: ${request.session.cookie} Signed cookies: ${request.signedCookies}`;
    }

    @Get('cookie/custom')
    responseCookie(@Res() response: Response) {
        // console.log(response.cookie('key', 'value'));
        console.log(response.getHeader('Set-Cookie'));
    }
}
