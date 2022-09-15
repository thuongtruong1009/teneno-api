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
import { CreateMessageDto, DeleteMessageDto } from './dto';
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
        @MessageBody() dto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ) {
        const message = await this.messagesService.createMessage(
            dto,
            client.id,
        );
        this.server.emit('message', message);
        return message;
    }

    @SubscribeMessage('typing')
    async typing(
        @MessageBody('senderId') senderId: string,
        @MessageBody('isTyping') isTyping: boolean,
        @ConnectedSocket() client: Socket,
    ) {
        const name = await this.messagesService.getUserName(senderId);

        client.broadcast.emit('typing', { senderId: name, isTyping });
    }

    @SubscribeMessage('removeMessage')
    async removeMessage(@MessageBody() dto: DeleteMessageDto) {
        const remove = await this.messagesService.removeMessage(dto);
        this.server.emit('remove', remove);
        return remove;
    }
}
