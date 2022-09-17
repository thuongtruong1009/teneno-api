import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    Length,
    Max,
    MaxLength,
    Min,
    MinLength,
    Validate,
} from 'class-validator';
import { EMaritalStatus } from 'src/core/constants';
import { fullNameValidator, phoneNumberValidator } from 'src/core/validators';

export class ProfileEntity {
    @ApiProperty({
        type: String,
        example: 'Hello ABC',
        description: 'The full name of the user',
    })
    @IsString({
        message: 'Full name must be a string',
    })
    @IsNotEmpty({
        message: 'Full name is required',
    })
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

    @ApiPropertyOptional({
        type: String,
        example: 'Avatar example 1 url',
        description: 'The avatar of the user',
    })
    @IsOptional({
        message: 'Avatar is optional',
    })
    @IsString({
        message: 'Avatar must be a string',
    })
    avatar: string;

    @ApiPropertyOptional({
        type: String,
        example: 'Cover example 1 url',
        description: 'The cover of the user',
    })
    @IsString({
        message: 'Cover must be a string',
    })
    @IsOptional({
        message: 'Cover is optional',
    })
    cover: string;

    @ApiPropertyOptional({
        type: String,
        example: 'Single',
        description:
            'The relationship status of the user [single, married, divorced]',
    })
    @IsOptional({
        message: 'Relationship status is optional',
    })
    @IsString({
        message: 'Relationship status must be a string',
    })
    marriageStatus: EMaritalStatus;

    @ApiPropertyOptional({
        type: Array<String>,
        example: ['Music', 'Sport', 'Travel'],
        description: 'The hobbies of the user',
    })
    @IsArray({
        message: 'Hobbies must be an array',
    })
    @IsOptional({
        message: 'Hobbies is optional',
    })
    interests: string[];

    @ApiPropertyOptional({
        type: String,
        example: '123, Address A, City B, Country C',
        description: 'The address of the user',
    })
    @IsOptional({
        message: 'Address is optional',
    })
    @IsString({
        message: 'Address must be a string',
    })
    @MaxLength(101, {
        message: 'Address is too long, must be at most 100 characters!',
    })
    address: string;

    @ApiPropertyOptional({
        type: String,
        example: '09999999999',
        description: 'The phone number of the user',
    })
    @IsOptional({
        message: 'Phone number is optional',
    })
    @IsString({
        message: 'Phone number must be a string',
    })
    @MaxLength(21, {
        message:
            'Phone number is too long, must be at most maximum 20 characters!',
    })
    @Validate(phoneNumberValidator, { message: 'Phone number is invalid!' })
    phone: string;

    @ApiProperty({
        example: '2021-07-02T05:01:03.938Z',
        type: Date,
        description: 'The date of birth of the user',
    })
    @Type(() => Date)
    @IsDate({
        message: 'Date of birth must be a date type',
    })
    birthdate: Date;

    @ApiPropertyOptional({
        type: Number,
        example: 19,
    })
    @IsNumber()
    @IsOptional({
        message: 'Age is optional',
    })
    @Min(11, {
        message: 'You must be at least 12 years old!',
    })
    @Max(101, {
        message: 'You must be at most 100 years old!',
    })
    age: number;

    @ApiPropertyOptional({
        type: String,
        example: 'This is bio of Hello ABC account',
        description: 'The bio of the user',
    })
    @IsString({
        message: 'Bio must be a string',
    })
    @IsOptional({
        message: 'Bio is optional',
    })
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
    @IsNotEmpty()
    @Min(0)
    @Max(2)
    gender: number;
}
