import {
    WebSocketGateway,
    SubscribeMessage,
    MessageBody,
    WebSocketServer,
    ConnectedSocket,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server } from 'http';
import { Socket } from 'socket.io';
import { CreateMessageDto } from './dto';
import { WsThrottlerGuard } from 'src/core/security/throttle-websocket.guard';
import { UseGuards } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@UseGuards(WsThrottlerGuard)
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
    @WebSocketServer() server: Server;
    constructor(private readonly messagesService: MessagesService) {}

    @SubscribeMessage('findAllMessages')
    async getAllMessages(
        @MessageBody('conversationId') conversationId: string,
    ) {
        return this.messagesService.getAllMessages(conversationId);
    }

    @SubscribeMessage('createMessage')
    async createMessage(
        @MessageBody('conversationId') conversationId: string,
        @MessageBody() createMessageDto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.messagesService.createMessage(
            conversationId,
            createMessageDto,
            client.id,
        );
        this.server.emit('message', message);
        return message;
    }

    @SubscribeMessage('typing')
    async typing(
        @MessageBody('conversationId') conversationId: string,
        @MessageBody('isTyping') isTyping: boolean,
        @ConnectedSocket() client: Socket,
    ) {
        const name = await this.messagesService.getMember(
            conversationId,
            client.id,
        );

        client.broadcast.emit('typing', { senderId: name, isTyping });
    }

    @SubscribeMessage('removeMessage')
    async remove(@MessageBody() message: string) {
        const refresh = await this.messagesService.remove(message);
        this.server.emit('refresh', refresh);
        return refresh;
    }
}
