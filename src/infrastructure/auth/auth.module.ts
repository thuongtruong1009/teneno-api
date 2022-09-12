import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/abstraction/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        PrismaModule,
        JwtModule,
        // HttpModule,
        // JwtModule.registerAsync({
        //   imports: [ConfigModule],
        //   useFactory: async (configService: ConfigService) => ({
        //     secret: configService.get<string>("APP_SECRET"),
        //     signOptions: { expiresIn: configService.get<string>("EXPIRE_AT_TIME") },
        //   }),
        //   inject: [ConfigService],
        // })
    ],
    controllers: [AuthController],
    providers: [AuthService, AtStrategy, RtStrategy],
    exports: [AuthService],
})
export class AuthModule {}
