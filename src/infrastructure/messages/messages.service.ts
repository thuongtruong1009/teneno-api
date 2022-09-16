import { Injectable } from '@nestjs/common';
import { CreateMessageDto, DeleteMessageDto } from './dto/request';
import { PrismaService } from 'src/abstraction/prisma/prisma.service';
import { ICreateMessage, IGetAllMessages } from './dto/response';

@Injectable()
export class MessagesService {
    constructor(private prismaService: PrismaService) {}

    async getAllMessages(conversationId: string): Promise<IGetAllMessages> {
        const identify = await this.prismaService.conversation.findUnique({
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

    async getClientName(clientId: string): Promise<string> {
        const user = await this.prismaService.user.findUnique({
            where: { id: clientId },
            select: { username: true },
        });
        return user.username;
    }

    async createMessage(
        dto: CreateMessageDto,
        clientId: string,
    ): Promise<ICreateMessage> {
        const senderName = await this.getClientName(dto.senderId);
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

    async removeMessage(dto: DeleteMessageDto): Promise<IGetAllMessages> {
        await this.prismaService.message.delete({
            where: {
                id: dto.id,
            },
        });

        return this.getAllMessages(dto.conversationId);
    }
}
