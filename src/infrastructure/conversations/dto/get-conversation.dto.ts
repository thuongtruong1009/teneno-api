import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllConversationDto {
  @ApiProperty({
    type: String,
    example: 'user-id-123-456-789',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class GetOneConversationDto extends GetAllConversationDto {}
