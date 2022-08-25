import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto {
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
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'This is a required property',
    example: 'password123',
  })
  newPassword: string;
}
