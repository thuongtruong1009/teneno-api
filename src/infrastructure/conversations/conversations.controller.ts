import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { CreateConversationDto, UpdateConversationDto } from './dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async createConversation(@Body() dto: CreateConversationDto) {
    return await this.conversationsService.createConversation(dto);
  }

  @Get()
  findAllConversations() {
    return this.conversationsService.findAllConversations();
  }

  @Get(':id')
  findConversationById(@Param('id') id: string) {
    return this.conversationsService.findOne(id);
  }

  @Patch(':id')
  updateConversationById(
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationsService.updateConversationById(
      id,
      updateConversationDto,
    );
  }

  @Delete(':id')
  deleteConversationById(@Param('id') id: string) {
    return this.conversationsService.deleteConversationById(id);
  }
}
