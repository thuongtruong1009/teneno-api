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
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiForbiddenResponse,
    ApiInternalServerErrorResponse,
    ApiMethodNotAllowedResponse,
    ApiNotAcceptableResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiRequestTimeoutResponse,
    ApiTags,
    ApiTooManyRequestsResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { STATUS_MESSAGE, SYSTEM_ERROR } from 'src/core/constants';
import { GetCurrentUserId } from '../auth/decorators';
import { ConversationsService } from './conversations.service';
import {
    CreateConversationDto,
    DeleteConversationDto,
    DeleteOneAdminConversationDto,
    GetOneConversationDto,
    UpdateConversationDto,
    UpdateMembersConversationDto,
    UpdateRolesConversationDto,
} from './dto';
import { ConversationEntity } from './entities/conversation.entity';

@ApiTags('Conversations')
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: SYSTEM_ERROR.UNAUTHORIZED })
@ApiForbiddenResponse({ description: SYSTEM_ERROR.FORBIDDEN })
@ApiNotFoundResponse({
    description: SYSTEM_ERROR.NOT_FOUND,
    type: Error,
})
@ApiMethodNotAllowedResponse({ description: SYSTEM_ERROR.METHOD_NOT_ALLOWED })
@ApiNotAcceptableResponse({
    description: SYSTEM_ERROR.NOT_ACCEPTABLE,
})
@ApiRequestTimeoutResponse({ description: SYSTEM_ERROR.REQUEST_TIMEOUT })
@ApiConflictResponse({
    description: SYSTEM_ERROR.CONFLICT,
})
@ApiTooManyRequestsResponse({ description: SYSTEM_ERROR.TOO_MANY_REQUESTS })
@ApiInternalServerErrorResponse({
    description: SYSTEM_ERROR.INTERNAL_SERVER_ERROR,
})
@Controller('conversations')
// https://www.youtube.com/watch?v=LMjj1_EK4y8&ab_channel=Prisma
export class ConversationsController {
    constructor(private readonly conversationsService: ConversationsService) {
        this.conversationsService = conversationsService;
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new conversation (user)' })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
    })
    async getAllConversations(@GetCurrentUserId() userId: string) {
        return this.conversationsService.getAllConversations(userId);
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Get one conversation information of current user (user)',
    })
    @ApiOkResponse({
        type: ConversationEntity,
        description: STATUS_MESSAGE.SUCCESS,
    })
    async getConversationById(
        @Param('id') id: string,
        @Body() dto: GetOneConversationDto,
    ) {
        return this.conversationsService.getConversationById(id, dto);
    }

    // @Get(':id/participants')
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({
    //     summary: 'Get all participants of current conversation (user)',
    // })
    // @ApiOkResponse({
    //     type: ConversationEntity,
    //     description: STATUS_MESSAGE.SUCCESS,
    // })
    // async getConversationParticipants(@Param('id') id: string) {
    //     return this.conversationsService.getConversationParticipants(id);
    // }

    @Patch(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({
        summary: 'Update one conversation information of current user (user)',
    })
    @ApiOkResponse({
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
        description: STATUS_MESSAGE.SUCCESS,
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
