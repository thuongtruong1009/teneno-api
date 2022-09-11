import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import {
    DiskHealthIndicator,
    HealthCheck,
    HealthCheckResult,
    HealthCheckService,
    MemoryHealthIndicator,
} from '@nestjs/terminus';
import { Public } from './infrastructure/auth/decorators';

@ApiTags('Health')
@Public()
@Controller('health')
export class HealthController {
    constructor(
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private disk: DiskHealthIndicator,
    ) {}

    @Get()
    @ApiOperation({ summary: 'Health check for server system' })
    @HealthCheck()
    async readiness(): Promise<HealthCheckResult> {
        return await this.health.check([
            async () => await this.memory.checkRSS('mem_rss', 768 * 2 ** 20),
            async () =>
                await this.memory.checkHeap('memory_heap', 150 * 1024 * 1024),
            async () =>
                await this.disk.checkStorage('storage', {
                    path: '/',
                    thresholdPercent: 0.5,
                }),
        ]);
    }
}
