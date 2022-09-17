import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CustomDto {
    @ApiProperty({
        type: String,
        description: 'The id of user',
        example: 'user-id-123-456-789',
    })
    @IsNotEmpty({
        message: 'User id is required',
    })
    @IsString({
        message: 'User id must be a string',
    })
    userId?: string;

    @ApiProperty({
        type: String,
        description: 'The id of sender',
        example: 'sender-id-123-456-789',
    })
    @IsNotEmpty({
        message: 'Sender id is required',
    })
    @IsString({
        message: 'Sender id must be a string',
    })
    senderId?: string;
}
