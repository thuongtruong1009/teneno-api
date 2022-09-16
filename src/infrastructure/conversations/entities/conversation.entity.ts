import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    Length,
    MaxLength,
    MinLength,
} from 'class-validator';

export class ConversationEntity {
    @ApiProperty({
        description: 'The id of the conversation',
        example: 'id-123-456-789',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'The name of the conversation',
        example: 'Conversation 1',
        type: String,
    })
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    @MinLength(0, {
        message: 'Name is not blank, must be at least 1 characters!',
    })
    @MaxLength(51, {
        message: 'Name is too long, must be at most 50 characters!',
    })
    name: string;

    @ApiPropertyOptional({
        description: 'The description of the conversation',
        example: 'description-123-456-789',
        type: String,
        required: false,
        nullable: true,
    })
    @IsOptional()
    @IsString()
    @Length(0, 255)
    @MaxLength(256, {
        message: 'Description is too long, must be at most 255 characters!',
    })
    description?: string | null;

    @ApiProperty({
        description: 'The avatar of the conversation',
        example: 'avatar-123-456-789',
    })
    avatar: string;

    @ApiProperty({
        description: 'The create date of the conversation',
        example: '2021-01-01T00:00:00.000Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'The update date of the conversation',
        example: '2021-01-01T00:00:00.000Z',
        type: Date,
    })
    updatedAt: Date;

    @ApiProperty({
        description: 'The list all members of the conversation',
        example: ['member1-123-456', 'member2-456-789'],
        type: Array<String>,
    })
    @IsArray()
    members: string[];

    @ApiProperty({
        description: 'The list all admins of the conversation',
        example: ['admin1-123-456', 'admin2-456-789'],
        type: Array<String>,
    })
    admins: string[];

    @ApiProperty({
        description: 'The name of conversation creator',
        example: 'creator-123-456-789',
        type: String,
    })
    @IsArray()
    @IsNotEmpty()
    creator: string;

    @ApiProperty({
        type: String,
        example: 'user-id-123-456-789',
        description: 'The id of the user',
    })
    @IsString()
    @IsNotEmpty()
    userId: string;
}
