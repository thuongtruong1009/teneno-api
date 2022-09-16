import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString } from 'class-validator';

export class MessageEntity {
    @ApiProperty({
        example: 'id-123-456-789',
        description: 'Message id',
    })
    @IsEmpty()
    @IsString()
    id: string;

    @ApiProperty({
        example: 'text',
        description: 'Message type: text, image, video, audio',
    })
    @IsEmpty()
    @IsString()
    type: string;

    @ApiProperty({
        example: 'Hello world',
        description: 'Message text',
    })
    @IsEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        example: 'conversation-id-123-456-789',
        description: 'Conversation id',
    })
    @IsEmpty()
    @IsString()
    conversationId: string;

    @ApiProperty({
        example: 'user-id-123-456-789',
        description: 'User id',
    })
    @IsEmpty()
    @IsString()
    senderId: string;
}
