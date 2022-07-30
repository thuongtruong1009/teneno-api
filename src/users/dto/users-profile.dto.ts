import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsDate,
  IsNumber,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
  Validate,
} from 'class-validator';
import { fullNameValidator, phoneNumberValidator } from './validators';

export class UserProfileDto {
  @ApiProperty({
    type: String,
    example: 'Hello ABC',
  })
  @IsString()
  @Length(3, 45)
  @MinLength(2, {
    message: 'Full name is too short, must be at least 3 characters!',
  })
  @MaxLength(46, {
    message: 'Name is too long, must be at most 45 characters!',
  })
  @Validate(fullNameValidator, {
    message: 'Full name must be not begin with number!',
  })
  fullName: string;

  @ApiProperty({
    type: String,
    example: 'Avatar example 1 url',
  })
  @IsString()
  avatar: string;

  @ApiProperty({
    type: String,
    example: '123, Address A, City B, Country C',
  })
  @IsString()
  @MaxLength(101, {
    message: 'Address is too long, must be at most 100 characters!',
  })
  address: string;

  @ApiProperty({
    type: String,
    example: '09999999999',
  })
  @IsString()
  @Validate(phoneNumberValidator, { message: 'Phone number is invalid!' })
  phone: string;

  @ApiProperty({ example: '2021-07-02T05:01:03.938Z' })
  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @ApiProperty({
    type: Number,
    example: 19,
  })
  @IsNumber()
  @Min(17, {
    message: 'You must be at least 18 years old!',
  })
  @Max(101, {
    message: 'You must be at most 100 years old!',
  })
  age: number;

  @ApiProperty({
    type: String,
    example: 'This is bio of Hello ABC account',
  })
  @IsString()
  @MaxLength(151, {
    message: 'Bio is too long, must be at most 150 characters!',
  })
  bio: string;

  @ApiProperty({
    type: Number,
    description: '1: male, 2: female, 0: other',
    example: 1,
  })
  @IsNumber()
  @Min(0)
  @Max(2)
  gender: number;
}
