import { OmitType } from '@nestjs/swagger';
import { MessageEntity } from '../../entities/message.entity';

export class DeleteMessageDto extends OmitType(MessageEntity, [
    'type',
    'text',
]) {}
