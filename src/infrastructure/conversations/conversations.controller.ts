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
import {
  CreateConversationDto,
  GetAllConversationDto,
  UpdateConversationDto,
} from './dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {}

  @Post()
  async createConversation(@Body() dto: CreateConversationDto) {
    return await this.conversationsService.createConversation(dto);
  }

  @Get()
  getAllConversations(@Body() dto: GetAllConversationDto) {
    return this.conversationsService.getAllConversations(dto);
  }

  @Get(':userId')
  getConversationById(@Param('userId') userId: string) {
    return this.conversationsService.getConversationById(userId);
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
