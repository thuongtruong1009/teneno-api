import { PickType } from '@nestjs/swagger';
import { ConversationEntity } from '../entities/conversation.entity';

export class GetAllConversationDto extends PickType(ConversationEntity, [
    'userId',
]) {}

export class GetOneConversationDto extends PickType(ConversationEntity, [
    'userId',
]) {}
