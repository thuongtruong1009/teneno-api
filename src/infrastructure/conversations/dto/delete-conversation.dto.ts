import { PickType } from '@nestjs/swagger';
import { ConversationEntity } from '../entities/conversation.entity';

export class DeleteConversationDto extends PickType(ConversationEntity, [
    'userId',
]) {}
