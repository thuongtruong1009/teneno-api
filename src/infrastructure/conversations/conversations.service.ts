import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../abstraction/prisma/prisma.service';
import {
    CreateConversationDto,
    DeleteConversationDto,
    DeleteOneAdminConversationDto,
    GetOneConversationDto,
    UpdateConversationDto,
    UpdateMembersConversationDto,
    UpdateRolesConversationDto,
} from './dto';
import { v4 as uuid } from 'uuid';
import { CONVERSATION_ERROR } from 'src/core/constants';

@Injectable()
export class ConversationsService {
    constructor(private prismaService: PrismaService) {}

    async createConversation(dto: CreateConversationDto) {
        const newConversation = await this.prismaService.conversation.create({
            data: {
                id: uuid(),
                name: dto.name,
                description: dto.description,
                avatar: '',
                members: dto.members,
                admins: dto.admins,
                creator: dto.creator,
            },
        });
        return newConversation;
    }

    async getAllConversations(userId: string) {
        const list = await this.prismaService.conversation.findMany({
            where: {
                OR: [
                    {
                        creator: userId,
                    },
                    {
                        admins: {
                            has: userId,
                        },
                    },
                    {
                        members: {
                            has: userId,
                        },
                    },
                ],
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                messages: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                    take: 1,
                    select: {
                        type: true,
                        text: true,
                        updatedAt: true,
                        senderId: true,
                    },
                },
            },
        });
        return { userId, list };
    }

    async getConversationById(id: string, dto: GetOneConversationDto) {
        return await this.prismaService.conversation.findMany({
            where: {
                OR: [
                    {
                        creator: dto.userId,
                    },
                    {
                        admins: {
                            has: dto.userId,
                        },
                    },
                    {
                        members: {
                            has: dto.userId,
                        },
                    },
                ],
                AND: {
                    id: id,
                },
            },
        });
    }

    // async getConversationParticipants(conversationId: string) {
    //     return await this.prismaService.conversation.findMany({
    //         where: {
    //             id: conversationId,
    //         },
    //         select: {
    //             members: true,
    //         },
    //     });
    // }

    updateConversationById(id: string, dto: UpdateConversationDto) {
        const updated = this.prismaService.conversation.update({
            where: {
                id: id,
            },
            data: {
                name: dto.name,
                description: dto.description,
                avatar: dto.avatar,
                members: dto.members,
            },
        });
        return updated;
    }

    async deleteConversationById(id: string, dto: DeleteConversationDto) {
        const list = await this.prismaService.conversation.findUnique({
            where: {
                id: id,
            },
        });
        if (list['creator'] === dto.userId) {
            await this.prismaService.conversation.delete({
                where: {
                    id: id,
                },
            });
            return '';
        }
        return false;
    }

    async updateMembersConversation(
        conversationId: string,
        dto: UpdateMembersConversationDto,
    ) {
        const updated = await this.prismaService.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                members: dto.members,
            },
        });
        return updated;
    }

    async deleteOneAdminConversation(
        conversationId: string,
        dto: DeleteOneAdminConversationDto,
    ) {
        const list = await this.prismaService.conversation.findMany({
            where: {
                OR: [
                    {
                        creator: dto.creator,
                    },
                ],
                AND: {
                    id: conversationId,
                },
            },
        });

        if (list.length === 0) {
            return CONVERSATION_ERROR.NOT_CREATOR;
        }
        const updated = list[0]['admins'].filter(
            (admin) => admin !== dto.userId,
        );

        await this.prismaService.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                admins: updated,
            },
        });
        return updated;
    }

    async updateRolesConversation(
        conversationId: string,
        dto: UpdateRolesConversationDto,
    ) {
        const list = await this.prismaService.conversation.findMany({
            where: {
                OR: [
                    {
                        creator: dto.creator,
                    },
                ],
                AND: {
                    id: conversationId,
                },
            },
        });
        if (list.length === 0) {
            return CONVERSATION_ERROR.NOT_CREATOR;
        }

        const updated = await this.prismaService.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                admins: dto.admins,
                members: dto.members,
            },
        });
        return updated;
    }
}
