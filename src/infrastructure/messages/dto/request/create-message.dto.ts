import { ApiExtraModels, PickType } from '@nestjs/swagger';
import { MessageEntity } from '../../entities/message.entity';

@ApiExtraModels()
export class CreateMessageDto extends PickType(MessageEntity, [
    'type',
    'text',
    'conversationId',
    'senderId',
]) {}
