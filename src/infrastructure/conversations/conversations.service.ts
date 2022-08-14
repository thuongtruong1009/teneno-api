import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateConversationDto,
  GetAllConversationDto,
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
        members: true,
      },
    });
    const conversation = list.filter((item) =>
      item.members.includes(dto.userId),
    );
    return conversation;
  }

  async getConversationById(id: string) {
    const conversation = await this.prismaService.conversation.findUnique({
      where: {
        id: id,
      },
    });
    if (!conversation) {
      return null;
    }
    return conversation;
  }

  updateConversationById(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ) {
    return `This action updates a #${id} conversation`;
  }

  deleteConversationById(id: string) {
    return `This action removes a #${id} conversation`;
  }
}
