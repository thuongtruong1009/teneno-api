import { ApiProperty } from '@nestjs/swagger';
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

export class UserEntity {
    @ApiProperty({
        description: 'User id',
        example: 'user-id-123-456-789',
        type: String,
    })
    @IsNotEmpty({
        message: 'User id is required',
    })
    @IsString({
        message: 'User id must be a string',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        example: 'example@gmail.com',
    })
    @IsNotEmpty({
        message: 'Email is required',
    })
    @IsEmail({
        discription: 'Email is invalid',
    })
    email: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        example: 'password123',
    })
    @IsNotEmpty({
        message: 'Password is required',
    })
    @IsString({
        message: 'Password must be a string',
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
        description: 'The username of the user',
    })
    @IsString({
        message: 'Username must be a string',
    })
    @IsNotEmpty({
        message: 'Username is required',
    })
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
