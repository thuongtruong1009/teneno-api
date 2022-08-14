import { PartialType } from '@nestjs/swagger';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
  name?: string;
  description?: string;
  avatar?: string;
  members?: string[];
}
