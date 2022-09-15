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
        console.log(identify);
        return identify[clientId];
    }

    async createMessage(
        conversationId: string,
        dto: CreateMessageDto,
        clientId: string,
    ) {
        const message = {
            senderId: this.getMember(conversationId, clientId),
            text: dto.text,
            type: dto.type,
        };

        console.log(message); // { senderId: '7kavCeveVfbsGqrIAAAJ', text: 'okee', type: 'text' }
        console.log(await this.getAllMessages(conversationId));
        // {
        //   messages: [
        //     {
        //       id: '7a6f92fd-3324-45d6-a218-5be4086b877e',
        //       type: 'text',
        //       text: 'dedede',
        //       reactions: [],
        //       description: '',
        //       createdAt: 2022-09-14T17:14:44.000Z,
        //       updatedAt: 2022-09-14T17:14:44.000Z,
        //       conversationId: '8f8475db-5088-4777-9eb9-c9ea8303984a',
        //       senderId: 'JXoCZ95tMH2ALOhFAAAB'
        //     }
        //   ]
        // }

        // this.conversations
        //     .find((element) => element.id === conversationId)
        //     .messages.push(message);

        // await this.prismaService.conversation.update({
        //     where: { id: conversationId },
        //     data: {
        //         messages: (
        //             await this.getAllMessages(conversationId)
        //         ).messages.push(message),
        //     },
        // });

        return message;
        // await this.prismaService.message.create({
        //     data: {
        //         senderId: clientId,
        //         type: dto.type,
        //         text: dto.text,
        //         conversation: {
        //             connect: {
        //                 id: conversationId,
        //             },
        //         },
        //     },
        // });
        // return await this.getAllMessages(conversationId);
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
