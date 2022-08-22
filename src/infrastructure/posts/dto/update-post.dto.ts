import { PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsString()
  @IsNotEmpty()
  postId: string;

  title?: string;
  description?: string;
  files?: string[];
  authorId: string;
}
