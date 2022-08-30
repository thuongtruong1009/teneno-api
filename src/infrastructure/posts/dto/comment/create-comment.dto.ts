import { PartialType } from '@nestjs/swagger';
import { CommentEntity } from '../../entities/comment.entity';

export class CreateCommentDto extends PartialType(CommentEntity) {
  text: string;
  postId: string;
  userId: string;
}
