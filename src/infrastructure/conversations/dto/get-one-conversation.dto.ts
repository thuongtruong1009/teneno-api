import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetOneConversationDto {
  @ApiProperty({
    type: String,
    example: 'user-id-123-456-789',
  })
  @IsString()
  @IsNotEmpty()
  id: string;
}
