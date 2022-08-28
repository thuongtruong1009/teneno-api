import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotAcceptableResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ConversationsService } from './conversations.service';
import {
  CreateConversationDto,
  DeleteConversationDto,
  DeleteOneAdminConversationDto,
  GetAllConversationDto,
  GetOneConversationDto,
  UpdateConversationDto,
  UpdateMembersConversationDto,
  UpdateRolesConversationDto,
} from './dto';
import { ConversationEntity } from './entities';

@ApiTags('Conversations')
@ApiBearerAuth()
@ApiForbiddenResponse({ description: 'Forbidden.' })
@ApiNotFoundResponse({
  description: 'Not Found.',
})
@ApiNotAcceptableResponse({
  description: 'Provided inputs are not in correct form.',
})
@Controller('conversations')
// https://www.youtube.com/watch?v=LMjj1_EK4y8&ab_channel=Prisma
export class ConversationsController {
  constructor(private conversationsService: ConversationsService) {
    this.conversationsService = conversationsService;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new conversation (user)' })
  @ApiOkResponse({
    description: 'Success.',
  })
  @ApiCreatedResponse({
    type: ConversationEntity,
    description: 'The new conversation has been created.',
  })
  async createConversation(@Body() dto: CreateConversationDto) {
    return await this.conversationsService.createConversation(dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all conversations of current user (user)' })
  @ApiOkResponse({
    type: ConversationEntity,
    isArray: true,
    description: 'Success.',
  })
  async getAllConversations(@Body() dto: GetAllConversationDto) {
    return this.conversationsService.getAllConversations(dto);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get one conversation information of current user (user)',
  })
  @ApiOkResponse({
    type: ConversationEntity,
    description: 'Success.',
  })
  async getConversationById(
    @Param('id') id: string,
    @Body() dto: GetOneConversationDto,
  ) {
    return this.conversationsService.getConversationById(id, dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update one conversation information of current user (user)',
  })
  @ApiOkResponse({
    description: 'Success.',
  })
  updateConversationById(
    @Param('id') id: string,
    @Body() dto: UpdateConversationDto,
  ) {
    return this.conversationsService.updateConversationById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete one conversation by creator-conversation (user)',
  })
  @ApiOkResponse({
    description: 'Success.',
  })
  async deleteConversationById(
    @Param('id') id: string,
    @Body() dto: DeleteConversationDto,
  ) {
    return this.conversationsService.deleteConversationById(id, dto);
  }

  @Patch(':conversationId/updateMembers')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update members list of current conversation (user)',
  })
  @ApiOkResponse({
    description: 'Success.',
  })
  async updateMembersConversation(
    @Param('conversationId') conversationId: string,
    @Body() dto: UpdateMembersConversationDto,
  ) {
    return this.conversationsService.updateMembersConversation(
      conversationId,
      dto,
    );
  }

  @Patch(':conversationId/deleteAdmins')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Delete one admin of current conversation by creator-conversation (user)',
  })
  @ApiOkResponse({
    description: 'Success.',
  })
  async deleteOneAdminConversation(
    @Param('conversationId') conversationId: string,
    @Body() dto: DeleteOneAdminConversationDto,
  ) {
    return this.conversationsService.deleteOneAdminConversation(
      conversationId,
      dto,
    );
  }

  @Patch(':conversationId/updateRoles')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Change role of any member of current conversation by creator-conversation (user)',
  })
  @ApiOkResponse({
    description: 'Success.',
  })
  async updateRolesConversation(
    @Param('conversationId') conversationId: string,
    @Body() dto: UpdateRolesConversationDto,
  ) {
    return this.conversationsService.updateRolesConversation(
      conversationId,
      dto,
    );
  }
}
