import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import {
    ApiConflictResponse,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiOperation,
    ApiRequestTimeoutResponse,
    ApiTags,
    ApiTooManyRequestsResponse,
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { STATUS_MESSAGE, SYSTEM_ERROR } from 'src/core/constants';
import { Public } from 'src/infrastructure/auth/decorators';
import { MATH_SERVICE } from '../constants/math.constant';

@ApiTags('Microservices')
@ApiRequestTimeoutResponse({ description: SYSTEM_ERROR.REQUEST_TIMEOUT })
@ApiConflictResponse({
    description: SYSTEM_ERROR.CONFLICT,
})
@ApiTooManyRequestsResponse({ description: SYSTEM_ERROR.TOO_MANY_REQUESTS })
@ApiInternalServerErrorResponse({
    description: SYSTEM_ERROR.INTERNAL_SERVER_ERROR,
})
@Public()
@Controller('math')
export class MathController {
    constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: STATUS_MESSAGE.SUCCESS })
    @ApiOperation({ summary: 'Calculate check sum pattern' })
    execute(): Observable<number> {
        const pattern = { cmd: 'sum' };
        const data = [1, 2, 3, 4, 5];
        return this.client.send<number>(pattern, data);
    }

    @MessagePattern({ cmd: 'sum' })
    sum(data: number[]): number {
        return (data || []).reduce((a, b) => a + b);
    }
}
