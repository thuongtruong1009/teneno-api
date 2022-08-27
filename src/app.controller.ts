import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Public } from './infrastructure/auth/decorators';

@ApiTags('Home')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Teneno homepage' })
  @ApiResponse({
    status: 200,
    description: '{code: 1, data: {Hello world}, message: ""',
  })
  @ApiResponse({ status: 404, description: 'Not found' })
  getHello(): string {
    return this.appService.getHello();
  }
}
