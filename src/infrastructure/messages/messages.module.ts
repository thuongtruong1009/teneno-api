import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { MessagesService } from './messages.service';

@Module({
    controllers: [MessagesGateway],
    providers: [MessagesGateway, MessagesService],
})
export class MessagesModule {}
