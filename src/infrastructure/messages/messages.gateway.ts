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
import { CreateMessageDto, DeleteMessageDto } from './dto/request';
import { SkipThrottle } from '@nestjs/throttler';
import { ICreateMessage, IGetAllMessages } from './dto/response';
import { Controller } from '@nestjs/common';

@SkipThrottle()
// @UseGuards(WsThrottlerGuard)
@Controller('messages')
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
    @WebSocketServer() server: Server;
    constructor(private readonly messagesService: MessagesService) {}

    @SubscribeMessage('findAllMessages')
    async getAllMessages(
        @MessageBody('conversationId') conversationId: string,
    ): Promise<IGetAllMessages> {
        return this.messagesService.getAllMessages(conversationId);
    }

    @SubscribeMessage('createMessage')
    async createMessage(
        @MessageBody() dto: CreateMessageDto,
        @ConnectedSocket() client: Socket,
    ): Promise<ICreateMessage> {
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
    ): Promise<void> {
        const name = await this.messagesService.getClientName(senderId);

        client.broadcast.emit('typing', { senderId: name, isTyping });
    }

    @SubscribeMessage('removeMessage')
    async removeMessage(
        @MessageBody() dto: DeleteMessageDto,
    ): Promise<IGetAllMessages> {
        const remove = await this.messagesService.removeMessage(dto);
        this.server.emit('remove', remove);
        return remove;
    }
}
