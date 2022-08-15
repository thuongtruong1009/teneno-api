import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { passwordValidator, usenameValidator } from 'src/core/validators';

export class CreateConversationDto {
  @ApiProperty({
    type: String,
    example: 'group01',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  @MinLength(2, {
    message: 'Name is too short, must be at least 3 characters!',
  })
  @MaxLength(21, {
    message: 'Name is too long, must be at most 20 characters!',
  })
  @Validate(usenameValidator, {
    message: 'Name must be not begin with number!',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'group01',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 120)
  @MinLength(2, {
    message: 'Description is too short, must be at least 3 characters!',
  })
  @MaxLength(121, {
    message: 'Description is too long, must be at most 120 characters!',
  })
  @Validate(usenameValidator, {
    message: 'Description must be not begin with number!',
  })
  description: string;

  @ApiProperty({
    type: String,
    example: ['user01', 'user02'],
  })
  @IsArray()
  members: string[];

  @ApiProperty({
    type: String,
    example: ['admin01', 'admin02'],
  })
  @IsArray()
  admins: string[];

  @ApiProperty({
    type: String,
    example: 'creator01',
  })
  @IsString()
  creator: string;
}
