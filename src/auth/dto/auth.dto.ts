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
  username: string;

  @ApiProperty({
    type: String,
    example: 'Hello ABC',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: Number,
    example: 19,
  })
  @IsNumber()
  age: number;

  @ApiProperty({
    type: String,
    example: 'This is bio of Hello ABC account',
  })
  @IsString()
  bio: string;

  @IsNumber()
  @ApiProperty({
    type: Number,
    description: '1: male, 2: female, 0: other',
    example: 1,
  })
  gender: number;
}
