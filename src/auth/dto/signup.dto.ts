import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

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
  username: string;
}
