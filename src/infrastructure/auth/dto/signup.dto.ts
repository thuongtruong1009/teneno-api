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
import { passwordValidator, usenameValidator } from 'src/core/validators';

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
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'password123',
  })
  @Length(8, 21)
  @MinLength(7, {
    message: 'Password is too short, must be at least 8 characters!',
  })
  @MaxLength(21, {
    message: 'Password is too long, must be at most 20 characters!',
  })
  @Validate(passwordValidator, {
    message:
      'Password must be at contain at least one number, one uppercase letter and one special character',
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
