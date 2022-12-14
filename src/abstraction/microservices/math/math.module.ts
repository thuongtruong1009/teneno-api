import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MATH_SERVICE } from '../constants/math.constant';
import { MathController } from './math.controller';

@Module({
    imports: [
        ClientsModule.register([
            { name: MATH_SERVICE, transport: Transport.TCP },
        ]),
    ],
    controllers: [MathController],
})
export class MathModule {}
