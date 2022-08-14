import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateConversationDto, UpdateConversationDto } from './dto';
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

  async findAllConversations() {
    const conversation = await this.prismaService.conversation.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return conversation;
  }

  findOne(id: string) {
    return `This action returns a #${id} conversation`;
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
