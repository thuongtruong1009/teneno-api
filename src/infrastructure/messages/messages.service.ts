import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prismaService: PrismaService) {}
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

    async getAllMessages(conversationId: string) {
        return await this.prismaService.conversation.findUnique({
            where: { id: conversationId },
            select: { messages: true },
        });
    }

    getMember(conversationId: string, clientId: string) {
        const identify = this.prismaService.conversation.findUnique({
            where: { id: conversationId },
            select: { members: true },
        });
        return identify[clientId];
    }

    async getUserName(clientId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { id: clientId },
            select: { username: true },
        });
        return user.username;
    }

    async createMessage(dto: CreateMessageDto, clientId: string) {
        await this.prismaService.message.create({
            data: {
                type: dto.type,
                text: dto.text,
                conversationId: dto.conversationId,
                senderId: await this.getUserName(dto.senderId),
            },
        });
        return await this.getAllMessages(dto.conversationId);
    }

    async remove(message: string) {
        this.conversations.forEach((element) => {
            if (element.id === message['conversationId']) {
                element.messages.forEach((item) => {
                    if (item.id === message['messageId']) {
                        element.messages.splice(
                            element.messages.indexOf(item),
                            1,
                        );
                    }
                });
            }
        });

        return this.getAllMessages(message['conversationId']);
    }
}
