import { ApiExtraModels, OmitType } from '@nestjs/swagger';
import { MessageEntity } from '../../entities/message.entity';

@ApiExtraModels()
export class CreateMessageDto extends OmitType(MessageEntity, ['id']) {}
