import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';

@Global()
@Module({
    providers: [PrismaService, ConfigModule],
    exports: [PrismaService],
})
export class PrismaModule {}
