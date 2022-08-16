import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateConversationDto } from './create-conversation.dto';

export class UpdateConversationDto extends PartialType(CreateConversationDto) {
  name?: string;
  description?: string;
  avatar?: string;
}

export class UpdateMembersConversationDto extends PartialType(
  CreateConversationDto,
) {
  members: string[];
}

export class DeleteOneAdminConversationDto extends PartialType(
  CreateConversationDto,
) {
  creator: string;
  @ApiProperty({
    type: String,
    example: 'user-id-123-456-789',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
