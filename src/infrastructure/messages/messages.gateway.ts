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
import { CreateMessageDto, UpdateMessageDto } from './dto';
// import { map } from 'rxjs/operators';
// import { from, Observable } from 'rxjs';

@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway {
  @WebSocketServer() server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  // @SubscribeMessage('events')
  // findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
  //   return from([1, 2, 3]).pipe(map(item => ({ event: 'events', data: item })));
  // }

  // @SubscribeMessage('identity')
  // async identity(@MessageBody() data: number): Promise<number> {
  //   return data;
  // }

  @SubscribeMessage('joinConversation')
  joinConversation(
    @MessageBody('conversationId') conversationId: string,
    @MessageBody('senderId') senderId: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.messagesService.joinConversation(
      conversationId,
      senderId,
      client.id,
    );
  }

  @SubscribeMessage('findAllMessages')
  findAllMessages(@MessageBody('conversationId') conversationId: string) {
    return this.messagesService.findAllMessages(conversationId);
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

  // @SubscribeMessage('findOneMessage')
  // findOne(@MessageBody() id: number) {
  //   return this.messagesService.findOne(id);
  // }

  @SubscribeMessage('updateMessage')
  updateMessage(@MessageBody() updateMessageDto: UpdateMessageDto) {
    const refresh = this.messagesService.updateMessage(updateMessageDto);
    this.server.emit('refresh', refresh);
    return refresh;
  }

  @SubscribeMessage('removeMessage')
  async remove(@MessageBody() message: string) {
    const refresh = await this.messagesService.remove(message);
    this.server.emit('refresh', refresh);
    return refresh;
  }
}
