import { PickType } from '@nestjs/swagger';
import { CommentEntity } from '../../entities/comment.entity';

export class DeleteCommentDto extends PickType(CommentEntity, [
  'id',
  'postId',
]) {}
