import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'example@gmail.com',
  })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  username: string;

  @IsString()
  fullName: string;

  @IsNumber()
  age: number;

  @IsString()
  bio: string;

  @IsNumber()
  @ApiPropertyOptional({
    type: String,
    description: 'This is an optional property',
  })
  gender: number;
}
