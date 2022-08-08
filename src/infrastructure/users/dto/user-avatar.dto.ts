import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserAvatarDto {
  @ApiProperty({
    type: String,
    example: 'Avatar example 1 url',
  })
  @IsString()
  avatar: string;
}
