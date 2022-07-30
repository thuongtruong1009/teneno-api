import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { usenameValidator } from './validators';

export class SignupDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'password123',
  })
  password: string;

  @ApiProperty({
    type: String,
    example: 'username123',
  })
  @IsString()
  @IsNotEmpty()
  @IsAlphanumeric()
  @Length(3, 20)
  @MinLength(2, {
    message: 'Name is too short, must be at least 3 characters!',
  })
  @MaxLength(21, {
    message: 'Name is too long, must be at most 20 characters!',
  })
  @Validate(usenameValidator, {
    message: 'Username must be not begin with number!',
  })
  username: string;
}
