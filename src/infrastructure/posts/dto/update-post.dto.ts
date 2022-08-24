import { PartialType } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  title?: string;
  description?: string;
  files?: string[];
  authorId: string;

  @IsString()
  @IsNotEmpty()
  postId: string;
}

export class ReactionsPost {
  @IsString()
  @IsNotEmpty()
  postId: string;

  @IsString()
  @IsNotEmpty()
  favouritorId: string;

  @IsNumber()
  @IsNotEmpty()
  reactionType: number;
}
