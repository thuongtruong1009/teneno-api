import { IsEmpty, IsString } from 'class-validator';

export class MessageEntity {
    @IsEmpty()
    @IsString()
    id: string;

    @IsEmpty()
    @IsString()
    type: string;

    @IsEmpty()
    @IsString()
    text: string;

    @IsEmpty()
    @IsString()
    conversationId: string;

    @IsEmpty()
    @IsString()
    senderId: string;
}
