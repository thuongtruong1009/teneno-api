import { Injectable } from '@nestjs/common';
import { CreateMessageDto, DeleteMessageDto } from './dto';
import { v4 as uuid } from 'uuid';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prismaService: PrismaService) {}

    async getAllMessages(conversationId: string) {
        const identify = await this.prismaService.conversation.findUnique({
            where: { id: conversationId },
            select: { messages: true },
        });
        return identify.messages;
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
        const senderName = await this.getUserName(dto.senderId);
        await this.prismaService.message.create({
            data: {
                type: dto.type,
                text: dto.text,
                conversationId: dto.conversationId,
                senderId: `${dto.senderId}:${senderName}`,
            },
        });
        return await this.getAllMessages(dto.conversationId);
    }

    async removeMessage(dto: DeleteMessageDto) {
        await this.prismaService.message.delete({
            where: {
                id: dto.id,
            },
        });

        return this.getAllMessages(dto.conversationId);
    }
}
