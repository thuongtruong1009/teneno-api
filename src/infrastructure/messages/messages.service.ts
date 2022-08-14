import { Injectable } from '@nestjs/common';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class MessagesService {
  conversations = [
    {
      id: '1',
      members: {},
      messages: [
        // {
        //   id: '1',
        //   name: 'John Doe',
        //   text: 'Hello World',
        // },
      ],
    },
    {
      id: '2',
      members: {},
      messages: [
        // {
        //   id: '1',
        //   name: 'Max Mustermann',
        //   text: 'Nice to meet you',
        // },
      ],
    },
  ];

  joinConversation(conversationId: string, senderId: string, clientId: string) {
    this.conversations.find((element) => element.id === conversationId).members[
      clientId
    ] = senderId;
    return Object.values(
      this.conversations.find((element) => element.id === conversationId)
        .members,
    );
  }

  findAllMessages(conversationId: string) {
    return this.conversations.find((element) => element.id === conversationId)
      .messages;
  }

  getMember(conversationId: string, clientId: string) {
    return this.conversations.find((element) => element.id === conversationId)
      .members[clientId];
  }

  createMessage(
    conversationId: string,
    createMessageDto: CreateMessageDto,
    clientId: string,
  ) {
    const message = {
      id: uuid(),
      senderId: this.getMember(conversationId, clientId),
      text: createMessageDto.text,
    };
    this.conversations
      .find((element) => element.id === conversationId)
      .messages.push(message);
    return message;
  }

  updateMessage(updateMessageDto: UpdateMessageDto) {
    this.conversations.forEach((element) => {
      if (element.id === updateMessageDto['conversationId']) {
        element.messages.forEach((item) => {
          if (item.id === updateMessageDto['messageId']) {
            item.text = updateMessageDto['text'];
          }
        });
      }
    });
    return this.findAllMessages(updateMessageDto['conversationId']);
  }

  async remove(message: string) {
    this.conversations.forEach((element) => {
      if (element.id === message['conversationId']) {
        element.messages.forEach((item) => {
          if (item.id === message['messageId']) {
            element.messages.splice(element.messages.indexOf(item), 1);
          }
        });
      }
    });

    return this.findAllMessages(message['conversationId']);
  }
}
