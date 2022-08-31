import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/infrastructure/posts/entities/post.entity';

export class CreatePostDto extends PickType(PostEntity, [
  'title',
  'description',
  'files',
  'authorId',
]) {}
