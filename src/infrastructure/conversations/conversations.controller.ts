import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import {
  CreateConversationDto,
  GetAllConversationDto,
  GetOneConversationDto,
  UpdateConversationDto,
} from './dto';

@ApiBearerAuth()
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

  @Get(':id')
  getConversationById(
    @Param('id') id: string,
    @Body() dto: GetOneConversationDto,
  ) {
    return this.conversationsService.getConversationById(id, dto);
  }

  @Patch(':id')
  updateConversationById(
    @Param('id') id: string,
    @Body() dto: UpdateConversationDto,
  ) {
    return this.conversationsService.updateConversationById(id, dto);
  }

  @Delete(':id')
  deleteConversationById(@Param('id') id: string) {
    return this.conversationsService.deleteConversationById(id);
  }
}
