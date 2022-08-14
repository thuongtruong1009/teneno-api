import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateConversationDto,
  GetAllConversationDto,
  GetOneConversationDto,
  UpdateConversationDto,
} from './dto';
import { v4 as uuid } from 'uuid';

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
      },
    });
    return newConversation;
  }

  async getAllConversations(dto: GetAllConversationDto) {
    const list = await this.prismaService.conversation.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        members: true,
      },
    });
    const conversation = list.filter((item) =>
      item.members.includes(dto.userId),
    );
    return conversation;
  }

  async getConversationById(id: string, dto: GetOneConversationDto) {
    const identify = await this.prismaService.conversation.findUnique({
      where: {
        id: id,
      },
    });
    if (!identify) return null;

    const conversation = identify.members.includes(dto.userId);

    if (!conversation) return null;

    return identify;
  }

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

  deleteConversationById(id: string) {
    return `This action removes a #${id} conversation`;
  }
}
