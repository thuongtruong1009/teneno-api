import { PartialType, PickType } from '@nestjs/swagger';
import { ConversationEntity } from '../entities/conversation.entity';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(ConversationEntity) {
    name?: string;
    description?: string;
    avatar?: string;
}

export class UpdateMembersConversationDto extends PickType(ConversationEntity, [
    'members',
]) {}

export class DeleteOneAdminConversationDto extends PickType(
    CreateConversationDto,
    ['creator', 'userId'],
) {}

export class UpdateRolesConversationDto extends PickType(
    CreateConversationDto,
    ['admins', 'members', 'creator'],
) {}
