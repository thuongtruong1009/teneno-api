import { ApiProperty, PickType } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { CustomDto } from 'src/core/common/dto';

export class PostEntity extends PickType(CustomDto, ['userId']) {
    @ApiProperty({
        type: String,
        description: 'The id of post',
        example: 'post-id-123-456-789',
    })
    @IsNotEmpty({
        message: 'The id of post is required',
    })
    @IsString({
        message: 'The id of post must be a string',
    })
    id: string;

    @ApiProperty({
        type: String,
        description: 'The title of post',
        example: 'title abcedf',
    })
    @IsString({
        message: 'The post title must be a string',
    })
    @IsNotEmpty({
        message: 'The post title is required',
    })
    title: string;

    @ApiProperty({
        type: String,
        description: 'The content of post',
        example: 'content abcedf',
    })
    @IsString({
        message: 'The post content must be a string',
    })
    @IsNotEmpty({
        message: 'The post content must not be empty',
    })
    description: string;

    @ApiProperty({
        type: Array<String>,
        description: 'The attach files of post',
        example: ['file-id1-123-456', 'file-id2-456-789'],
    })
    @IsArray({
        message: 'The attach files must be an array',
    })
    @IsNotEmpty({
        message: 'The attach files must not be empty',
    })
    files: string[];

    @ApiProperty({
        type: Boolean,
        description: 'The status of post',
        example: true,
    })
    @IsBoolean({
        message: 'The publish status must be a boolean',
    })
    @IsNotEmpty({
        message: 'The publish status is required',
    })
    published: boolean;

    @ApiProperty({
        type: String,
        description: 'The id of post author',
        example: 'author-id-123-456-789',
    })
    @IsString({
        message: 'The author of post must be a string',
    })
    @IsNotEmpty({
        message: 'The author of post is required',
    })
    authorId: string;

    @ApiProperty({
        type: String,
        description: 'The id of post',
        example: 'post-id-123-456-789',
    })
    @IsString({
        message: 'The id of post must be a string',
    })
    @IsNotEmpty({
        message: 'The id of post is required',
    })
    postId: string;

    @ApiProperty({
        type: String,
        description: 'The favourite id in post',
        example: 'favourite-id-123-456-789',
    })
    @IsString({
        message: 'The favourite id of post must be a string',
    })
    @IsNotEmpty({
        message: 'The favourite id of post is required',
    })
    favouritorId: string;

    @ApiProperty({
        type: Number,
        description: 'The type reaction in post',
        example: 0,
    })
    @IsNumber()
    @IsNotEmpty({
        message: 'The type reaction of post is required',
    })
    reactionType: number;
}
