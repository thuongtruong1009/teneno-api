import { OmitType } from '@nestjs/swagger';
import { ConversationEntity } from '../entities/conversation.entity';

export class CreateConversationDto extends OmitType(ConversationEntity, [
    'id',
]) {}
