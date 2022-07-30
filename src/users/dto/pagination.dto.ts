import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PaginationDto {
  @IsString()
  @ApiProperty({ type: Number, example: 1 })
  current: string;

  @IsString()
  @ApiProperty({ type: Number, example: 3 })
  limit: string;

  @IsString()
  @ApiProperty({ type: String, description: 'asc, desc', example: 'asc' })
  order: string;
}
