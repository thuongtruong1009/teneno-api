import { Injectable } from '@nestjs/common';
import { CreateMessageDto, DeleteMessageDto } from './dto';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private prismaService: PrismaService) {}

    async getAllMessages(conversationId: string) {
        const identify = this.prismaService.conversation.findUnique({
            where: {
                id: conversationId,
            },
            select: {
                id: true,
                name: true,
                description: true,
                avatar: true,
                createdAt: true,
                messages: true,
                members: true,
                admins: true,
                creator: true,
            },
        });
        return identify;
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
