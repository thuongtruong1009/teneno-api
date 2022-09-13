import {
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Session,
    Version,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './infrastructure/auth/decorators';

@ApiTags('Home')
@Public()
@Controller({ version: '2', path: '/' })
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Version('1')
    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Teneno homepage' })
    @ApiResponse({
        status: 200,
        description: 'Default server response',
    })
    @ApiResponse({ status: 404, description: 'Not found' })
    getHello(@Session() session: Record<string, any>): any {
        return this.appService.getHello(session);
    }
}
