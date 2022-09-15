import { PickType } from '@nestjs/swagger';
import { MessageEntity } from '../entities/message.entity';

export class DeleteMessageDto extends PickType(MessageEntity, [
    'id',
    'senderId',
    'conversationId',
]) {}
