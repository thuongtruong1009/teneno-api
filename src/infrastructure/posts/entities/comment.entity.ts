import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsJSON, IsNotEmpty, IsString } from 'class-validator';

export class CommentEntity {
    @ApiProperty({
        description: 'Comment id',
        example: 'comment-id-123-456-789',
        type: String,
    })
    @IsNotEmpty({
        message: 'Comment-id is required',
    })
    @IsString({
        message: 'Comment-id must be a string',
    })
    id: string;

    @ApiProperty({
        description: 'Comment type (text, image, video, audio)',
        example: 'text',
        type: String,
    })
    @IsNotEmpty({
        message: 'Comment-type is required',
    })
    @IsString({
        message: 'Comment-type must be a string',
    })
    type: string;

    @ApiProperty({
        description: 'Comment content',
        example: 'This is a comment',
        type: String,
    })
    @IsString({
        message: 'Comment text must be a string',
    })
    @IsNotEmpty({
        message: 'Comment text is required',
    })
    text: string;

    @ApiProperty({
        description: 'Comment author-id',
        example: ['user-id-123-456-789'],
        type: String,
    })
    @IsString({
        message: 'Comment author id must be a string',
    })
    @IsNotEmpty({
        message: 'Comment author id is required',
    })
    userId: string;

    @ApiProperty({
        description: 'Comment post-id',
        example: ['post-id-123-456-789'],
        type: String,
    })
    @IsString({
        message: 'Comment post id must be a string',
    })
    @IsNotEmpty({
        message: 'Comment post id is required',
    })
    postId: string;

    @IsArray({
        message: 'Comment reactions must be an array',
    })
    @IsNotEmpty({
        message: 'Comment reactions is required',
    })
    reactions: number[];

    @IsJSON({
        message: 'Comment metadata must be a JSON object',
    })
    @IsNotEmpty({
        message: 'Comment metadata is required',
    })
    replies: any[];
}
