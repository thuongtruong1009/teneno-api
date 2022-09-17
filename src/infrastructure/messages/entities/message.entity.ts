import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class MessageEntity {
    @ApiProperty({
        example: 'id-123-456-789',
        description: 'Message id',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    @ApiProperty({
        example: 'text',
        description: 'Message type: text, image, video, audio',
    })
    @IsNotEmpty()
    @IsString()
    type: string;

    @ApiProperty({
        example: 'Hello world',
        description: 'Message text',
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        example: 'conversation-id-123-456-789',
        description: 'Conversation id',
    })
    @IsNotEmpty()
    @IsString()
    conversationId: string;

    @ApiProperty({
        example: 'user-id-123-456-789',
        description: 'User id',
    })
    @IsNotEmpty()
    @IsString()
    senderId: string;
}
