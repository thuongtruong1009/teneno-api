import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class UserProfileDto {
  @ApiProperty({
    type: String,
    example: 'Hello ABC',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'Address A, City B, Country C',
  })
  @IsString()
  address: string;

  @ApiProperty({
    type: String,
    example: '09999999999',
  })
  @IsString()
  phone: string;

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

  @ApiProperty({
    type: Number,
    description: '1: male, 2: female, 0: other',
    example: 1,
  })
  @IsNumber()
  gender: number;
}
