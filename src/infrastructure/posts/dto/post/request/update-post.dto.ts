import { PickType } from '@nestjs/swagger';
import { PostEntity } from 'src/infrastructure/posts/entities/post.entity';

export class UpdatePostDto extends PickType(PostEntity, [
    'title',
    'description',
    'files',
    'published',
    'authorId',
    'postId',
]) {}

export class ReactionsPost extends PickType(PostEntity, [
    'postId',
    'reactionType',
]) {}
