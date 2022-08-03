import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserCoverDto {
  @ApiProperty({
    type: String,
    example: 'Cover example 1 url',
  })
  @IsString()
  cover: string;
}
